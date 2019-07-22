pragma solidity ^0.5.0;

contract SimpleStorage {
  uint storedData;


  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}


// UBI stands for Universal Block Income
contract UBI {

  uint n_receiver;
  uint n_donor;
  uint interest;
  /*

  // This struct represents a single receiver of the UBI.
    struct Receiver {
        address receiver; // person that receives UBI
        bool human;  // if true, the person is a human
        bool claimed; // true if UBI claimed, will be reset to false everytime UBI is received
        uint UBIclaimed;   // number of (daily) UBIs claimed
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


  modifier isHuman (bool _human) {require(receivers[_human].state == true); _;}
  modifier didClaim (bool _claimed) {require(receivers[_claimed].state == true); _;}


  function claim()
    public
    isHuman()
    {
      if (block.timestamp >= 86400) {

      }
    }



  /// previous votes into account.
  function payout()
    public
    view
    isHuman()
    didClaim()
    returns (bool claimed, uint UBIamountReceived)
  {

      for (uint p = 0; p < receivers.length; p++) {


              receivers[_address].transfer(value);
              receivers[_claimed] = false;
              receivers[_UBIamountReceived] += value;

      }
  }*/
}
