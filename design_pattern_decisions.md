## Design Patterns


# Access restriction
Not for testing, but for production I commented in the smart contract what I would change to restrict access, e.g. set the mapping to private. The more explicit the contract, the better the protection.

# Circuit breakers
Circuit Breakers are design patterns that allow contract functionality to be stopped. Freezing the contract is beneficial for reducing harm before a fix can be implemented. This is implemented with the pausable.sol contract from OpenZeppelin.

# Speed bump
The idea that a beneficiary can only withdraw one income every 24 hours is not only a measure for better equality on the platform, but also acts as a speed bump. Speed bumps slow down actions, leaving time for recovery in the event of malicious actions.

# Withdrawal pattern
The logic for calculating the UBI and the withdrawal is separate to protect against re-entry and denial of service attacks.

# Additional (considered but not implemented)
For the future I would like to implement a multisig access to have no powerful administrator. This has not yet been implemented due to lack of time.
