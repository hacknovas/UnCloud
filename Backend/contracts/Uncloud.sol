// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.6 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTHub is ERC721URIStorage {
    uint public _tokenId;
    address payable Uncloud_owner;

    constructor() ERC721("UNCLOUD", "UC") {
        Uncloud_owner = payable(msg.sender);
    }

    struct NFTData {
        uint tokenId;
        uint totalAllowedAddress;
        address owner;
        address[] totalAddresses;
        mapping(address => bool) allowedAddresses;
    }
    // owner NFT
    mapping(address => uint[]) ownerNFT;

    // All NFT(Data)
    mapping(uint => NFTData) private nftData;

    // User with access of nft(data)
    mapping(address => uint[]) sharedNFTData;

    modifier onlyOwner(uint token_ID) {
        NFTData storage temp = nftData[token_ID];
        require(
            msg.sender == temp.owner,
            "Only the owner can perform this action."
        );
        _;
    }

    // Store nft(Data)
    function createNFT(string memory tokenURI) public returns (uint) {
        _tokenId += 1;
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, tokenURI);
        // nftData[newTokenId] = NFTData(newTokenId, owner);

        NFTData storage temp = nftData[_tokenId];
        temp.tokenId = _tokenId;
        temp.owner = msg.sender;

        ownerNFT[msg.sender].push(_tokenId);

        return _tokenId;
    }

    // get My NFT
    function getMyNFT() public view returns (string[] memory) {
        uint[] memory allID = ownerNFT[msg.sender];
        uint len = allID.length;

        string[] memory data = new string[](len);
        uint temp = 0;
        for (uint i = 0; i < len; i++) {
            data[temp++] = tokenURI(allID[i]);
        }

        return data;
    }

    //  Sharing nft(Data) (Only owner)
    function shareNFTWith(
        address allowedAddress,
        uint token_Id
    ) public onlyOwner(token_Id) {
        require(token_Id <= _tokenId, "Token ID does not exist");

        nftData[token_Id].totalAllowedAddress += 1;
        nftData[token_Id].allowedAddresses[allowedAddress] = true;

        sharedNFTData[allowedAddress].push(token_Id);
    }

    // Getting all allowed address for specific nft(data) (Only Owner)
    function getAllowedAddresses(
        uint token_Id
    ) public view onlyOwner(token_Id) returns (address[] memory) {
        require(token_Id <= _tokenId, "Token ID does not exist");
        // NFTData storage data = nftData[token_Id];
        return nftData[token_Id].totalAddresses;
    }

    // Accessing nft(Data) (Who has Access)
    function canAccessNFT(
        address account,
        uint token_Id
    ) public view returns (bool) {
        require(token_Id <= _tokenId, "Token ID does not exist");

        return nftData[token_Id].allowedAddresses[account];
    }

    function viewNFT(uint tokenId) public view returns (string memory) {
        require(
            canAccessNFT(msg.sender, tokenId),
            "You do not have access to view this NFT"
        );
        return tokenURI(tokenId);
    }

    // Get All NFT(User with allowed NFT)
    function getAllNFTs() public view returns (string[] memory) {
        uint[] memory allID = sharedNFTData[msg.sender];
        uint len = allID.length;

        string[] memory data = new string[](len);
        uint temp = 0;
        for (uint i = 0; i < len; i++) {
            if (nftData[allID[i]].allowedAddresses[msg.sender]) {
                data[temp++] = tokenURI(allID[i]);
            }
        }

        return data;
    }
}
