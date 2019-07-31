pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';
//import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/lifecycle/Pausable.sol';


/** @title Universal Block Income (UBI) */
contract UBI is Pausable {

    uint payTime; //is the time the user claimed the last time the UBI plus the time the user has to wait to claim a new UBI
    uint claimWaitSeconds = 5; //this needs to be set to 86400 seconds (24 hours) for PROD, current 5 seconds are for testing purposes
    uint beneficiaryCount; //is the number of beneficiaries that claimed a UBI
    uint interest; //is the return on investment, when investing the foundation capital
    uint public deposits; //set to private for PROD, that no other contracts can call it, deposits are the amount donated to the foundation capital
    address private agent; //is the agent address
    mapping(address => bool) public beneficiaries; //set to private for PROD, beneficiaries are the ones claiming the UBI

    constructor() public {
        agent = msg.sender;
        updateClaimTime();
    }

    /** @dev Updates a time, when a claim is made with additional 24 hours
      *  now = current block timestamp
      *  claimWaitSeconds is specified in the variables on the top
      */
    function updateClaimTime() public {
         payTime = now + claimWaitSeconds;
    }


    /** @dev donor can deposit an amount to an account accessible by the beneficiaries
      */
    function deposit()
    external //only people from outside can call it, want to be as restrictive as possible
    whenNotPaused()
    payable
    {
        deposits += msg.value;
        interest += (msg.value * 2) / 100;
    }

    /** @dev adds a UBI beneficiary to a mapping
      *  adds a beneficiary if the beneficiary isn't in the mapping yet
      *  beneficiaryCount is number of beneficiaries
      *  @param beneficiary address of beneficiary
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
      */
    function withdraw()
    public
    onlyOnPayDay()
    whenNotPaused()
    onlyBeneficiary()
    {
        beneficiaries[msg.sender] = false;
        msg.sender.transfer(2000000000000000000); //for now I send an arbitrary number as there was not enough time to work on the interest function, I needed to understand the gas fee first
        updateClaimTime();
        beneficiaryCount -= 1;

    }

    /** @dev defines owner of contract
      */
    modifier onlyAgent() {
        require(msg.sender == agent, "only Agent");
        _;
    }
    /** @dev defines who is a beneficiary
      */
    modifier onlyBeneficiary() {
        require(beneficiaries[msg.sender] == true, "only Beneficiary");
        _;
    }
    /** @dev defines when future withdrawal will be possible
      */
    modifier onlyOnPayDay() {
        require(now > payTime, "onlyOnPayDay");
        _;
    }


}
