## Design Patterns

Why did I chose to use the design patterns that I did?

What other design patterns have you used / not used?
■  	Why did you choose the patterns that you did?
■  	Why not others?


Implemented a circuit breaker (emergency stop) pattern with OpenZeppelins Pausable.sol.



/*
pragma solidity ^0.5.0;

contract UBI {

uint n_beneficiary;
uint n_donor;
uint interest;

address public owner;

constructor() public {
  owner = msg.sender;
}

// This struct represents a single beneficiary of the UBI.
  struct Receiver {
      address beneficiary; // person that receives UBI
      bool human;  // if true, the person is a human
      bool isOpen; //24hours have passed, user can claim UBI again
      bool claimed; // true if UBI claimed, will be reset to false everytime UBI is received
      uint UBIclaimed;   // number of (daily) UBIs claimed
      uint UBIclaimedAt;   // block timestamp when UBIs was claimed last
      uint UBIamountReceived; // total amount of UBI the person has received on this platform
  }

// This declares a state variable that
// stores a `Receiver` struct for each possible address.
mapping(address => Receiver) public receivers;

// This struct represents a single donor of the UBI.
  struct Donor {
      address donor; // person that donates UBI
      uint UBIamountDonated; // total amount of UBI the person has donated on this platform
  }

// This declares a state variable that
// stores a `Receiver` struct for each possible address.
mapping(address => Donor) public donors;

modifier restricted() {if (msg.sender == owner) _;}
modifier isHuman (bool _human) {require(receivers[_human].state == true); _;}
modifier didOpen (bool _isOpen) {require(receivers[_isOpen].state == true); _;}
modifier didClaim (bool _claimed) {require(receivers[_claimed].state == true); _;}



  function withdraw() public {
      msg.sender.transfer(address(this).balance);
  }

  function deposit(uint256 amount) payable public {
      require(msg.value == amount);
      // nothing else to do!
  }

  function getBalance() public view returns (uint256) {
      return address(this).balance;
  }


function readBalance(address beneficiary)
  public
  view
  returns(bool human, bool isOpen, bool claimed, uint UBIclaimed, uint UBIamountReceived)
  {
    return (
      receivers[beneficiary].beneficiary,
      receivers[beneficiary].human,
      receivers[beneficiary].isOpen,
      receivers[beneficiary].claimed,
      receivers[beneficiary].UBIclaimed,
      receivers[beneficiary].UBIamountReceived,
    );

  }



function claimIt()
  public
  restricted()
  isHuman()
  didOpen()
  returns (bool claimed, uint UBIclaimed)
  {
        receivers.claimed = true;
        receivers.UBIclaimed += 1;
  }


function openIt(uint UBIclaimedAt)
  internal
  returns (bool isOpen)
  {
    if (UBIclaimedAt >= 86400) {

      receivers.isOpen = true;

    }
  }



/// previous votes into account.
function payout()
  public
  view
  restricted()
  isHuman()
  didClaim()
  returns (uint UBIamountReceived)
{

    for (uint p = 0; p < receivers.length; p++) {


          uint claimAmount = interest / n_beneficiary;
          receivers.UBIamountReceived += claimAmount;
          receivers.UBIclaimedAt = now;
          owner.transfer(claimAmount);



    }
}
}
