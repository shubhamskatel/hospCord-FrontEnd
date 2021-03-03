pragma solidity >=0.4.25;

// Contract for Home Page
contract Hospital {
    struct Patient {
        string name;
        string dob;
        string bGroup;
        bytes32 id;
    }
    
    bytes32 password = 0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a;
    address manager = msg.sender;
    address public addid;
    bytes32 public uniid;
    
    mapping(bytes32 => Patient) uniId;
    mapping(address => bool) authAddress;
    mapping(address => string) doctor;
    mapping(address => string) hospital;
    mapping(bytes32 => address) patid;
    
    address[] public patAddress;
    Patient[] public patInfo;
    
    
    

    //Function adds new doctor (Only Contract deployer can add)
    function addDoctor (string memory _name, string memory _hospital, string memory _password, address _index) public {
        require(msg.sender == manager, "Admin should be the Manager");
        require(!authAddress[_index], "User already entered");
        bytes32 pass = keccak256(abi.encodePacked(_password));
        
        require(pass == password);
        authAddress[_index] = true;
        doctor[_index] = _name;
        hospital[_index] = _hospital; 

    }
    
    
    
    // Function to view the doctor
    function viewDoctor(address _index) public view returns (string memory, string memory, bool) {
        return (
            doctor[_index],
            hospital[_index],
            authAddress[_index]
        );
    }
    
    
    
    //Function to add patient (Only verified doctor can add patient)
    function addPatient(string memory _name, string memory _dob, string memory _bGroup) public onlyOwner {
        //Storing Patient's intitial data
        Patient memory newPatient = Patient ({
            name: _name,
            dob: _dob,
            bGroup: _bGroup,
            id: keccak256(abi.encodePacked(block.difficulty, block.timestamp, _name, _bGroup))
        }); 
        
        patInfo.push(newPatient);
        uniId[newPatient.id] = newPatient;
        
        //Call to Patient's personal records (Contract 2)
        address pat = address(new PatHome(
            newPatient.name,
            newPatient.dob,
            newPatient.bGroup,
            newPatient.id,
            doctor[msg.sender], 
            hospital[msg.sender] 
        ));
        
        patid[newPatient.id] = pat;
        
        addid = pat;
        
        uniid = newPatient.id;
        
    }
    
    
    
    //View patient's records using his unique ID
    function enterPatient(bytes32 _id) public onlyOwner view returns (address){
        require(uniId[_id].id == _id, "Patient doesn't exist");
        
        return (
            patid[_id]  
        );
    }
    
    modifier onlyOwner {
        require (authAddress[msg.sender], "Only Authorized User can access the records");
        _;
    }
}





//Contract to view records and ability to add new ones
contract PatHome {
    string  name;
    string  dob;
    string  bGroup;
    bytes32  id;
    string doctor;
    string hospital;
    address public addr;
    address disAddress;

    // To store all the Record Address of the patient
    address[] public addedRecords;
    
    constructor(string memory _name, string memory _dob, string memory _bGroup, bytes32 _id, string memory _doctor, string memory _hospital) public {
        name = _name;
        dob = _dob;
        bGroup = _bGroup;
        id = _id;
        doctor = _doctor;
        hospital = _hospital;
        disAddress = address(this);
    }
    
    
    //function to add a new record (call to the 3rd contract)
    function addrecord() public {
        address newRecord = address(new Record(name, dob, bGroup, doctor, hospital, disAddress));
        addedRecords.push(newRecord);
        addr = newRecord;
    }
    
    
    //to fetch all the records
    function getRecords() public view returns (address[] memory) {
        return addedRecords;
    }
    
    
    //to get patient's summary
    function getPatient() public view returns(string memory, string memory, string memory, bytes32) {
        return (
            name,
            dob,
            bGroup,
            id
        );
    }
    
    
    //to get doctor's summanry
    function getDoctor() public view returns(string memory, string memory) {
        return (
          doctor,
          hospital
        );
    }
}





//Contract to Add or view individual records
contract Record{
    
    string name;
    string dob;
    string bGroup;
    string doctor;
    string hospital;
    string recHash;
    address public disAddress;
    bool flag = true;
    
    constructor(string memory _name, string memory _dob, string memory _bGroup, string memory _doctor, string memory _hospital, address _disAddress) public {
        name = _name;
        dob = _dob;
        bGroup = _bGroup;
        doctor = _doctor;
        hospital = _hospital;
        disAddress = _disAddress;
    }
    
    function setHash(string memory _recHash) public {
        recHash = _recHash;
    }
    
    function getHash() public view returns (string memory) {
        return recHash;
    }
    
    function setvalidity(bool _flag) public {
        flag = _flag;
    } 
    
    function getvalidity() public view returns (bool) {
        return flag;
    }
    
    function getSummary() public view returns(string memory, string memory, string memory, string memory, string memory) {
        return (
            name,
            dob,
            bGroup,
            doctor,
            hospital
        );
    }
}
