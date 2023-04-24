// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract LandRecords {
    address contractOwner;

    constructor() {
        contractOwner = msg.sender;
    }

    struct Land {
        uint id;
        address landOwner;
        uint landArea;
        string landAddress;
        string surveyNumber;
        string landDocument;
        bool isLandVerified;
        bool isForSell;
    }

    struct user {
        uint id;
        string name;
        string email;
        address _userAddress;
        uint age;
        string city;
        string document;
        string aadharCard;
        string panCard;
        bool isVerified;
    }

    struct landInspector {
        uint id;
        address _inspectorAddress;
        string name;
        uint age;
        string city;
    }

    struct landBuyRequest {
        uint landId;
        address buyerId;
        address sellerId;
        reqStatus requestStatus;
    }

    struct landTransferRequest {
        uint landId;
        address sellerId;
        address buyerId;
        reqStatus requestStatus;
    }

    enum reqStatus {
        pending,
        accepted,
        rejected
    }

    uint totalInspectors;
    uint totalUsersCount;
    uint totalLandsCount;
    uint totalRequestCount;
    uint transferCount;

    mapping(address => landInspector) public addressToInspector;
    mapping(uint => address[]) allLandInspectorList;
    mapping(address => bool) RegisteredInspector;
    mapping(address => user) public addressToUser;
    mapping(uint => address) AllUsers;
    mapping(uint => address[]) allUsersList;
    mapping(address => bool) RegisteredUser;
    mapping(address => uint[]) usersLands;
    mapping(uint => Land) public lands;
    mapping(uint => landTransferRequest) public TransferRequest;
    mapping(uint => landBuyRequest) public BuyRequest;
    mapping(address => uint[]) MyReceivedLandRequest;
    mapping(address => uint[]) MySentLandRequest;
    mapping(uint => uint[]) allLandList;
    mapping(uint => uint[]) allTransferRequest;

    function InspectorCount() public view returns (uint) {
        return totalInspectors;
    }

    function LandCount() public view returns (uint) {
        return totalLandsCount;
    }

    function userCount() public view returns (uint) {
        return totalUsersCount;
    }

    function buyRequestCount() public view returns (uint) {
        return totalRequestCount;
    }

    function transferRequestCount() public view returns (uint) {
        return transferCount;
    }

    function isContractOwner(address _address) public view returns (bool) {
        if (_address == contractOwner) return true;
        else return false;
    }

    function changeContractOwner(address _address) public {
        require(msg.sender == contractOwner, "you are not contractOwner");

        contractOwner = _address;
    }

    function addLandInspector(
        address _address,
        string memory _name,
        uint _age,
        string memory _city
    ) public returns (bool) {
        if (contractOwner != msg.sender) return false;
        require(contractOwner == msg.sender);
        RegisteredInspector[_address] = true;
        allLandInspectorList[1].push(_address);
        totalInspectors++;
        addressToInspector[_address] = landInspector(
            totalInspectors,
            _address,
            _name,
            _age,
            _city
        );
        return true;
    }

    function returnAllLandInspectors() public view returns (address[] memory) {
        return allLandInspectorList[1];
    }

    function returnLandInspector(
        address _adrs
    ) public view returns (landInspector memory) {
        return addressToInspector[_adrs];
    }

    function returnAllLandInspectorsDetails()
        public
        view
        returns (landInspector[] memory)
    {
        uint len = allLandInspectorList[1].length;
        landInspector[] memory allInspectors = new landInspector[](len);
        for (uint i = 0; i < len; i++) {
            allInspectors[i] = addressToInspector[allLandInspectorList[1][i]];
        }
        return allInspectors;
    }

    function removeLandInspector(address _adrs) public {
        require(msg.sender == contractOwner, "You are not contractOwner");
        require(RegisteredInspector[_adrs], "Land Inspector not found");
        RegisteredInspector[_adrs] = false;

        uint len = allLandInspectorList[1].length;
        for (uint i = 0; i < len; i++) {
            if (allLandInspectorList[1][i] == _adrs) {
                allLandInspectorList[1][i] = allLandInspectorList[1][len - 1];
                allLandInspectorList[1].pop();
                break;
            }
        }
    }

    function isLandInspector(address _id) public view returns (bool) {
        if (RegisteredInspector[_id]) {
            return true;
        } else {
            return false;
        }
    }

    function registerNewUser(
        string memory _name,
        string memory _email,
        uint _age,
        string memory _city,
        string memory _aadharNumber,
        string memory _panNumber,
        string memory _document
    ) public {
        require(!RegisteredUser[msg.sender]);

        RegisteredUser[msg.sender] = true;
        totalUsersCount++;
        allUsersList[1].push(msg.sender);
        AllUsers[totalUsersCount] = msg.sender;
        addressToUser[msg.sender] = user(
            totalUsersCount,
            _name,
            _email,
            msg.sender,
            _age,
            _city,
            _document,
            _aadharNumber,
            _panNumber,
            false
        );
    }

    function isUserRegistered(address _addr) public view returns (bool) {
        if (RegisteredUser[_addr]) {
            return true;
        } else {
            return false;
        }
    }

    function verifyUser(address _userId) public {
        require(isLandInspector(msg.sender));
        addressToUser[_userId].isVerified = true;
    }

    function isUserVerified(address id) public view returns (bool) {
        return addressToUser[id].isVerified;
    }

    function ReturnAllUserList() public view returns (address[] memory) {
        return allUsersList[1];
    }

    function ReturnUser(address id) public view returns (user memory) {
        return addressToUser[id];
    }

    function ReturnAllUserDetails() public view returns (user[] memory) {
        uint len = allUsersList[1].length;
        user[] memory allUsers = new user[](len);
        for (uint i = 0; i < len; i++) {
            allUsers[i] = addressToUser[allUsersList[1][i]];
        }
        return allUsers;
    }

    function addLand(
        uint _area,
        string memory _address,
        string memory _surveyNum,
        string memory _document
    ) public {
        require(isUserVerified(msg.sender));
        totalLandsCount++;
        lands[totalLandsCount] = Land(
            totalLandsCount,
            msg.sender,
            _area,
            _address,
            _surveyNum,
            _document,
            false,
            false
        );
        usersLands[msg.sender].push(totalLandsCount);
        allLandList[1].push(totalLandsCount);
        // emit AddingLand(landsCount);
    }

    function ReturnAllLandList() public view returns (uint[] memory) {
        return allLandList[1];
    }

    function verifyLand(uint _id) public {
        require(isLandInspector(msg.sender));
        lands[_id].isLandVerified = true;
    }

    function isLandVerified(uint id) public view returns (bool) {
        return lands[id].isLandVerified;
    }

    function myAllLands(address id) public view returns (uint[] memory) {
        return usersLands[id];
    }

    function makeItforSell(uint id) public {
        require(lands[id].landOwner == msg.sender);
        lands[id].isForSell = true;
    }

    function makeItNotforSell(uint id) public {
        require(lands[id].landOwner == msg.sender);
        lands[id].isForSell = false;
    }

    function requestforBuy(uint _landId) public {
        require(isUserVerified(msg.sender) && isLandVerified(_landId));
        totalRequestCount++;
        BuyRequest[totalRequestCount] = landBuyRequest(
            totalRequestCount,
            msg.sender,
            lands[_landId].landOwner,
            reqStatus.pending
        );
        MyReceivedLandRequest[lands[_landId].landOwner].push(totalRequestCount);
        MySentLandRequest[msg.sender].push(totalRequestCount);
    }

    function myReceivedLandRequests() public view returns (uint[] memory) {
        return MyReceivedLandRequest[msg.sender];
    }

    function mySentLandRequests() public view returns (uint[] memory) {
        return MySentLandRequest[msg.sender];
    }

    function acceptRequest(uint _requestId) public {
        require(BuyRequest[_requestId].sellerId == msg.sender);
        BuyRequest[_requestId].requestStatus = reqStatus.accepted;
        transferCount++;
        TransferRequest[transferCount] = landTransferRequest(
            BuyRequest[_requestId].landId,
            msg.sender,
            BuyRequest[_requestId].buyerId,
            reqStatus.pending
        );
        allTransferRequest[1].push(transferCount);
    }

    function allTransferRequestList() public view returns (uint[] memory) {
        return allTransferRequest[1];
    }

    function rejectRequest(uint _requestId) public {
        require(BuyRequest[_requestId].sellerId == msg.sender);
        BuyRequest[_requestId].requestStatus = reqStatus.rejected;
    }

    function buyRequestStatus(uint id) public view returns (bool) {
        return (BuyRequest[id].requestStatus == reqStatus.accepted);
    }

    function transferRequestStatus(uint id) public view returns (bool) {
        return (TransferRequest[id].requestStatus == reqStatus.accepted);
    }

    function transferOwnership(
        uint _requestId,
        string memory documentUrl
    ) public returns (bool) {
        require(isLandInspector(msg.sender));

        TransferRequest[_requestId].requestStatus = reqStatus.accepted;
        usersLands[TransferRequest[_requestId].buyerId].push(
            TransferRequest[_requestId].landId
        );

        uint len = usersLands[TransferRequest[_requestId].sellerId].length;
        for (uint i = 0; i < len; i++) {
            if (
                usersLands[TransferRequest[_requestId].sellerId][i] ==
                TransferRequest[_requestId].landId
            ) {
                usersLands[TransferRequest[_requestId].sellerId][
                    i
                ] = usersLands[TransferRequest[_requestId].sellerId][len - 1];
                //MyLands[LandRequestMapping[_requestId].sellerId].length--;
                usersLands[TransferRequest[_requestId].sellerId].pop();
                break;
            }
        }
        lands[TransferRequest[_requestId].landId].landDocument = documentUrl;
        lands[TransferRequest[_requestId].landId].isForSell = false;
        lands[TransferRequest[_requestId].landId].landOwner = TransferRequest[
            _requestId
        ].buyerId;
        return true;
    }
}
