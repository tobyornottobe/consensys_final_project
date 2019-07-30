## Design Patterns


# Restricting access
Not for testing, but for production I have commented in the smart contract what I would change to restrict access, e.g. setting mapping to private. The more explicit the contract is, the better gets the protection.

# Circuit breakers
Circuit Breakers are design patterns that allow contract functionality to be stopped. Freezing the contract is beneficial for reducing harm before a fix can be implemented. This is implemented with the pausable.sol contract of OpenZeppelin.

# Speed bump
The idea that a beneficiary can only withdraw an income all 24hours is not only a measure to better equality on the platform, but acts the same time as a speed bump. Speed bumps slow down actions so that if malicious actions occur, there is time to recover.

# Withdrawal pattern
The logic for calculation the UBI and the withdrawal is separated to protect against re-entrancy and denial of service attack.

# Additional (considered, but not implemented)
For the future I would like to implement a multisig access, to have no powerful admin. This wasn't implemented yet, due to time constraints.
