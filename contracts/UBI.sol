pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';
//import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/lifecycle/Pausable.sol';



contract UBI is Pausable {

    uint payTime;
    uint claimWaitSeconds = 5 seconds;
    uint beneficiaryCount;
    uint interest;
    uint public deposits; //no other contracts can call it
    address private agent;
    mapping(address => bool) public beneficiaries;

    constructor() public {
        agent = msg.sender;
        updateClaimTime();
    }

    function updateClaimTime() public {
         payTime = now + claimWaitSeconds;
    }

    function deposit()
    external //only people from outside can call it, want to be as restrictive as possible
    whenNotPaused()
    payable
    {
        deposits += msg.value;
    }

    function addBeneficiary(address payable beneficiary)
    external
    onlyAgent()
    whenNotPaused()
    payable
    {
        if (beneficiaries[beneficiary] == false) {
            beneficiaryCount += 1;
        }
        beneficiaries[beneficiary] = true;

    }

    function withdraw()
    public
    onlyOnPayDay()
    whenNotPaused()
    onlyBeneficiary()
    payable
    {
        beneficiaries[msg.sender] = false;
        msg.sender.transfer(interest/beneficiaryCount);
        updateClaimTime();
        beneficiaryCount -= 1;

    }

    modifier onlyAgent() {
        require(msg.sender == agent);
        _;
    }

    modifier onlyBeneficiary() {
        require(beneficiaries[msg.sender] == true);
        _;
    }

    modifier onlyOnPayDay() {
        require (block.timestamp > payTime);
        _;
    }


}
