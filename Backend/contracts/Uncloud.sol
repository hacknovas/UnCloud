// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTHub is ERC721URIStorage {
    uint256 private _tokenId;

    constructor() ERC721("NFTHub", "NFT Hub") {
        // owner = msg.sender;
    }

    struct NFTData {
        uint tokenId;
        uint totalAllowedAddress;
        address owner;
        address[] totalAddresses;
        mapping(address => bool) allowedAddresses;
    }

    mapping(uint => NFTData) private nftData;

    modifier onlyOwner(uint256 token_ID) {
        NFTData storage temp = nftData[token_ID];
        require(
            msg.sender == temp.owner,
            "Only the owner can perform this action"
        );
        _;
    }

    // creating nft
    function createNFT(string memory tokenURI) public returns (uint) {
        _tokenId += 1;
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, tokenURI);
        // nftData[newTokenId] = NFTData(newTokenId, owner);

        NFTData storage temp = nftData[_tokenId];
        temp.tokenId = _tokenId;
        temp.owner = msg.sender;

        return _tokenId;
    }

    //  sharing nft
    function shareNFTWith(
        address allowedAddress,
        uint token_Id
    ) public onlyOwner(token_Id) {
        require(token_Id <= _tokenId, "Token ID does not exist");
        nftData[token_Id].totalAllowedAddress += 1;
        nftData[token_Id].allowedAddresses[allowedAddress] = true;
    }

    // getting all access address i.e shared with
    function getAllowedAddresses(
        uint token_Id
    ) public view returns (address[] memory) {
        require(token_Id <= _tokenId, "Token ID does not exist");
        // NFTData storage data = nftData[token_Id];
        return nftData[token_Id].totalAddresses;
    }

    // For accessing nft i.e shared
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
}