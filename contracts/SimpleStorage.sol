pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';

/*
contract SimpleStorage {
  uint storedData;


  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
*/


contract UBI {

    address agent;

    mapping(address => uint256) public deposits;

    uint Now;
    uint payTime;

    modifier onlyAgent() {
        require(msg.sender == agent);
        _;
    }

    modifier onlyOnPayDay() {
        require (block.timestamp > payTime);
        _;
    }

    constructor() public {
        agent = msg.sender;
    }

    function claimTime() public {
         Now = now;
         payTime = Now + 10 seconds;
    }

    function deposit(address beneficiary) public onlyAgent payable {
        uint256 amount = msg.value;
        deposits[beneficiary] = deposits[beneficiary] + amount;
    }

    function withdraw(address payable beneficiary) public onlyOnPayDay onlyAgent

    {
        uint256 payment = deposits[beneficiary];
        deposits[beneficiary] = 0;
        claimTime();
        beneficiary.transfer(payment);

    }




}
