// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract UnCloud is ERC721URIStorage {
    uint public _metaID;
    address payable UnCloud_owner;

    constructor() ERC721("UNCLOUD", "UC") {
        UnCloud_owner = payable(msg.sender);
    }

    struct MetaData {
        uint metaID;
        string name;
        uint total_Address;
        address owner;
        string secretKey;
        address[] address_List;
        mapping(address => bool) address_Permission;
    }

    // All Available Data
    mapping(uint => MetaData) private entireMetaData;

    // User(address) owned Data(tokenID)
    mapping(address => uint[]) userOwnMetaData;

    // User(address) which access Data(tokenID)
    mapping(address => uint[]) sharedMetaData;

    // Modfier which check ownership of data
    modifier onlyOwner(uint token_ID) {
        MetaData storage temp = entireMetaData[token_ID];
        require(
            msg.sender == temp.owner,
            "Only Owner Can Perform This Action."
        );
        _;
    }

    // Function to Store Data
    function storeMetaData(
        string memory tokenURI,
        string memory _name,
        string memory _SKey
    ) public {
        _metaID += 1;
        _safeMint(msg.sender, _metaID);
        _setTokenURI(_metaID, tokenURI);

        MetaData storage temp = entireMetaData[_metaID];
        temp.metaID = _metaID;
        temp.name = _name;
        temp.secretKey = _SKey;
        temp.owner = msg.sender;

        userOwnMetaData[msg.sender].push(_metaID);
    }

    // Struct to return Data
    struct temp_Data {
        uint metaID;
        string tokenURI;
        string name;
        address owner;
        string secretKey;
    }

    // Function to Get User Owned Data
    function getMyData() public view returns (temp_Data[] memory) {
        uint[] memory allID = userOwnMetaData[msg.sender];
        uint len = allID.length;

        temp_Data[] memory data = new temp_Data[](len);
        uint temp = 0;
        for (uint i = 0; i < len; i++) {
            data[temp++] = temp_Data(
                entireMetaData[allID[i]].metaID,
                tokenURI(allID[i]),
                entireMetaData[allID[i]].name,
                entireMetaData[allID[i]].owner,
                entireMetaData[allID[i]].secretKey
            );
        }

        return data;
    }

    //  Function to Share Data with Other Address (Only Owner Perform this task)
    function shareDataWith(
        address allowedAddress,
        uint token_Id
    ) public onlyOwner(token_Id) {
        require(token_Id <= _metaID, "Token ID Does Not Exist.");

        entireMetaData[token_Id].total_Address += 1;
        entireMetaData[token_Id].address_Permission[allowedAddress] = true;
        entireMetaData[token_Id].address_List.push(allowedAddress);

        sharedMetaData[allowedAddress].push(token_Id);
    }

    // getAllAddress return state
    struct allAccessData {
        address account;
        bool access;
    }

    // Getting all address for specific metaData (Only Owner Perform this task)
    function getAllAddress(
        uint token_Id
    ) public view onlyOwner(token_Id) returns (allAccessData[] memory) {
        require(token_Id <= _metaID, "Token ID does not exist");
        address[] memory temp = entireMetaData[token_Id].address_List;
        uint len = temp.length;

        allAccessData[] memory data = new allAccessData[](len);

        for (uint i = 0; i < len; i++) {
            data[i] = allAccessData(
                temp[i],
                entireMetaData[token_Id].address_Permission[temp[i]]
            );
        }

        return data;
    }

    // Change Permission of Shared Data
    function editAddressPermissions(
        address account,
        uint meta_ID
    ) public onlyOwner(meta_ID) {
        require(meta_ID <= _metaID, "Token ID does not exist");

        MetaData storage temp = entireMetaData[meta_ID];
        if (temp.address_Permission[account] == false) {
            temp.address_Permission[account] = true;
        } else {
            temp.address_Permission[account] = false;
        }
    }

    // (Permissioned Users) Access/View MetaData
    function canAccessMetaData(
        address account,
        uint token_Id
    ) public view returns (bool) {
        require(token_Id <= _metaID, "Token ID does not exist");

        return entireMetaData[token_Id].address_Permission[account];
    }

    function viewMetaData(
        uint tokenID
    )
        public
        view
        returns (string memory, string memory, address, string memory)
    {
        require(
            canAccessMetaData(msg.sender, tokenID),
            "You do not have access to view this NFT"
        );

        return (
            tokenURI(tokenID),
            entireMetaData[tokenID].name,
            entireMetaData[tokenID].owner,
            entireMetaData[tokenID].secretKey
        );
    }

    // Get All Shared MetaData (User which has access)
    function getMySharedData() public view returns (temp_Data[] memory) {
        uint[] memory allID = sharedMetaData[msg.sender];
        uint len = allID.length;

        temp_Data[] memory data = new temp_Data[](len);
        uint temp = 0;
        for (uint i = 0; i < len; i++) {
            if (entireMetaData[allID[i]].address_Permission[msg.sender]) {
                (
                    string memory u,
                    string memory n,
                    address a,
                    string memory s
                ) = viewMetaData(allID[i]);

                data[temp] = temp_Data(allID[i], u, n, a, s);

                // data[temp].metaID = allID[i];
                // data[temp].tokenURI = u;
                // data[temp].name = n;
                // data[temp].owner = a;
                temp++;
            }
        }

        return data;
    }
}
