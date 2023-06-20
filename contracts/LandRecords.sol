// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract LandRecords {
    address contractOwner;

    constructor() {
        contractOwner = msg.sender;
    }

    struct Land {
        uint id;
        uint landArea;
        string landAddress;
        uint landPrice;
        string allLatitudeLongitude;
        uint propertyPID;
        string surveyNumber;
        string landDocument;
        string landPicture;
        bool isForSell;
        address payable landOwner;
        bool isLandVerified;
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
        string designation;
        string city;
    }

    struct LandRequest {
        uint reqId;
        address payable sellerId;
        address payable buyerId;
        uint landId;
        reqStatus requestStatus;
        bool isPaymentDone;
    }
    enum reqStatus {
        notstarted,
        requested,
        accepted,
        rejected,
        paymentdone,
        completed
    }

    uint totalInspectors;
    uint public totalUsersCount;
    uint public totalLandsCount;
    uint public transferCount;
    uint totalRequestCount;

    mapping(address => landInspector) public addressToInspector;
    mapping(uint => address[]) allLandInspectorList;
    mapping(address => bool) RegisteredInspector;
    mapping(address => user) public addressToUser;
    mapping(uint => address) AllUsers;
    mapping(uint => address[]) allUsersList;
    mapping(address => bool) RegisteredUser;
    mapping(address => uint[]) usersLands;
    mapping(uint => Land) public lands;
    mapping(uint => LandRequest) public landRequest;
    mapping(address => uint[]) MyReceivedLandRequest;
    mapping(address => uint[]) MySentLandRequest;
    mapping(uint => uint[]) allLandList;
    mapping(uint => uint[]) paymentDoneList;

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
        string memory _designation,
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
            _designation,
            _city
        );
        return true;
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

    function ReturnUser(address id) public view returns (user memory) {
        return addressToUser[id];
    }

    function ReturnAllUserDetails(
        string memory city
    ) public view returns (user[] memory) {
        uint len = allUsersList[1].length;
        user[] memory allUsers = new user[](len);
        for (uint i = 0; i < len; i++) {
            if (
                keccak256(
                    abi.encodePacked(addressToUser[allUsersList[1][i]].city)
                ) == keccak256(abi.encodePacked(city))
            ) {
                allUsers[i] = addressToUser[allUsersList[1][i]];
            }
        }
        return allUsers;
    }

    function addLand(
        uint _area,
        string memory _address,
        uint _landPrice,
        string memory _allLatitudeLongitude,
        uint _propertyPID,
        string memory _surveyNum,
        string memory _document,
        string memory _picture
    ) public {
        require(isUserVerified(msg.sender));
        totalLandsCount++;
        lands[totalLandsCount] = Land(
            totalLandsCount,
            _area,
            _address,
            _landPrice,
            _allLatitudeLongitude,
            _propertyPID,
            _surveyNum,
            _document,
            _picture,
            false,
            payable(msg.sender),
            false
        );
        usersLands[msg.sender].push(totalLandsCount);
        allLandList[1].push(totalLandsCount);
        // emit AddingLand(landsCount);
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

    function myAllLandsDetails(address id) public view returns (Land[] memory) {
        uint len = usersLands[id].length;
        Land[] memory myLands = new Land[](len);
        for (uint i = 0; i < len; i++) {
            myLands[i] = lands[usersLands[id][i]];
        }
        return myLands;
    }

    function returnAllLands() public view returns (Land[] memory) {
        uint len = allLandList[1].length;
        Land[] memory allLands = new Land[](len);
        for (uint i = 0; i < len; i++) {
            allLands[i] = lands[allLandList[1][i]];
        }
        return allLands;
    }

    function returnAllLandsByCity(string memory city)
        public
        view
        returns (Land[] memory)
    {
        uint len = allLandList[1].length;
        Land[] memory allLands = new Land[](len);
        for (uint i = 0; i < len; i++) {
            if (
                keccak256(
                    abi.encodePacked(addressToUser[lands[allLandList[1][i]].landOwner].city)
                ) == keccak256(abi.encodePacked(city))
            ) {
                allLands[i] = lands[allLandList[1][i]];
            }
        }
        return allLands;
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
        landRequest[totalRequestCount] = LandRequest(
            totalRequestCount,
            lands[_landId].landOwner,
            payable(msg.sender),
            _landId,
            reqStatus.requested,
            false
        );
        MyReceivedLandRequest[lands[_landId].landOwner].push(totalRequestCount);
        MySentLandRequest[msg.sender].push(totalRequestCount);
    }

    function requestStatus(uint id) public view returns (reqStatus) {
        return landRequest[id].requestStatus;
    }

    function myReceivedLandRequestsDetails()
        public
        view
        returns (LandRequest[] memory)
    {
        uint len = MyReceivedLandRequest[msg.sender].length;
        LandRequest[] memory receivedLandRequests = new LandRequest[](len);
        for (uint i = 0; i < len; i++) {
            receivedLandRequests[i] = landRequest[
                MyReceivedLandRequest[msg.sender][i]
            ];
        }
        return receivedLandRequests;
    }

    function mySentLandRequestsDetails()
        public
        view
        returns (LandRequest[] memory)
    {
        uint len = MySentLandRequest[msg.sender].length;
        LandRequest[] memory sentLandRequests = new LandRequest[](len);
        for (uint i = 0; i < len; i++) {
            sentLandRequests[i] = landRequest[MySentLandRequest[msg.sender][i]];
        }
        return sentLandRequests;
    }

    function allLandRequestsDetails()
        public
        view
        returns (LandRequest[] memory)
    {
        uint len = totalRequestCount;
        LandRequest[] memory allLandRequests = new LandRequest[](len);
        for (uint i = 0; i < len; i++) {
            allLandRequests[i] = landRequest[i + 1];
        }
        return allLandRequests;
    }

    function allLandRequestsDetailsByCity (string memory city)
        public
        view
        returns (LandRequest[] memory)
    {
        uint len = totalRequestCount;
        LandRequest[] memory allLandRequests = new LandRequest[](len);
        for (uint i = 0; i < len; i++) {
            if (
                keccak256(
                    abi.encodePacked(addressToUser[landRequest[i + 1].buyerId].city)
                ) == keccak256(abi.encodePacked(city))
            ) {
                allLandRequests[i] = landRequest[i + 1];
            }
        }
        return allLandRequests;
    }

    function acceptRequest(uint _requestId) public {
        require(landRequest[_requestId].sellerId == msg.sender);
        landRequest[_requestId].requestStatus = reqStatus.accepted;
    }

    function rejectRequest(uint _requestId) public {
        require(landRequest[_requestId].sellerId == msg.sender);
        landRequest[_requestId].requestStatus = reqStatus.rejected;
    }

    function landPrice(uint id) public view returns (uint) {
        return lands[id].landPrice;
    }

    function makePayment(uint _requestId) public payable {
        require(
            landRequest[_requestId].buyerId == msg.sender &&
                landRequest[_requestId].requestStatus == reqStatus.accepted
        );

        landRequest[_requestId].requestStatus = reqStatus.paymentdone;
        lands[landRequest[_requestId].landId].landOwner.transfer(msg.value);
        landRequest[_requestId].isPaymentDone = true;
        paymentDoneList[1].push(_requestId);
    }

    function transferOwnership(
        uint _requestId,
        string memory documentUrl
    ) public returns (bool) {
        require(isLandInspector(msg.sender));
        if (landRequest[_requestId].isPaymentDone == false) return false;
        transferCount++;
        landRequest[_requestId].requestStatus = reqStatus.completed;
        usersLands[landRequest[_requestId].buyerId].push(
            landRequest[_requestId].landId
        );

        uint len = usersLands[landRequest[_requestId].sellerId].length;
        for (uint i = 0; i < len; i++) {
            if (
                usersLands[landRequest[_requestId].sellerId][i] ==
                landRequest[_requestId].landId
            ) {
                usersLands[landRequest[_requestId].sellerId][i] = usersLands[
                    landRequest[_requestId].sellerId
                ][len - 1];
                //MyLands[LandRequestMapping[_requestId].sellerId].length--;
                usersLands[landRequest[_requestId].sellerId].pop();
                break;
            }
        }
        lands[landRequest[_requestId].landId].landDocument = documentUrl;
        lands[landRequest[_requestId].landId].isForSell = false;
        lands[landRequest[_requestId].landId].landOwner = payable(
            landRequest[_requestId].buyerId
        );
        return true;
    }

    function makePaymentTestFun(address payable _receiver) public payable {
        _receiver.transfer(msg.value);
    }
}
