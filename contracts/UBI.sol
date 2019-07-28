pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';
//import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/lifecycle/Pausable.sol';


/** @title Universal Block Income (UBI) */
contract UBI is Pausable {

    uint payTime;
    uint claimWaitSeconds = 5 seconds; //this needs to be set to 86400 seconds (24 hours) for PROD, current 5 seconds are for testing purposes
    uint beneficiaryCount;
    uint interest;
    uint public deposits; //set to private for PROD, that no other contracts can call it
    address private agent;
    mapping(address => bool) public beneficiaries;

    constructor() public {
        agent = msg.sender;
        updateClaimTime();
    }

    /** @dev Updates a time, when a claim is made with additional 24 hours
      *  now = current block timestamp
      *  claimWaitSeconds is specified in the variables on the top
      * @return payTime, the time when then next claim can be made
      */
    function updateClaimTime() public {
         payTime = now + claimWaitSeconds;
    }

    /** @dev donor can deposit an amount to an account accessible by the beneficiaries
      * @return deposit made by donor
      */
    function deposit()
    external //only people from outside can call it, want to be as restrictive as possible
    whenNotPaused()
    payable
    {
        deposits += msg.value;
    }

    /** @dev adds a UBI beneficiary to a mapping
      *  adds a beneficiary if the beneficiary isn't in the mapping yet
      *  beneficiaryCount is number of beneficiaries
      * @return beneficiaryCount
      */
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

    /** @dev Beneficiary can withdraw her/his share of the UBI
      *  interest available in deposit account is divided by the count of beneficiaries
      *  time of claim is updated, that beneficiaries can't claim multiple times in 24 hours
      *  beneficiary count is reset
      * @return payment for beneficiary
      */
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

    /** @dev defines owner of contract
      */
    modifier onlyAgent() {
        require(msg.sender == agent);
        _;
    }
    /** @dev defines who is a beneficiary
      */
    modifier onlyBeneficiary() {
        require(beneficiaries[msg.sender] == true);
        _;
    }
    /** @dev defines when future withdrawal will be possible
      */
    modifier onlyOnPayDay() {
        require (block.timestamp > payTime);
        _;
    }


}
