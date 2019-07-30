## Avoiding common attacks



# Test
I have written tests to verify correct contract behaviour and prevent logic bugs.

# Circuit breaker
I have added Open Zeppelins Pausable.sol contract in order to pause a contract if things go wrong.

# Re-entrancy attacks
Prepared for a re-entrancy attack by implementing solution 1 for the moment and did consider to implement solution 2 and 3 in the future.
Solution 1: update balance before calling transfer
Solution 2: put in place re-entrancy guard (OpenZeppelin)
Solution 3: limit gas available in call contract

# Private storage variables
Marked in the contract variables and mapping, which I would set to private for the productive environment. In order to not make sensitive variables accessible to other contracts.

# Timestamp
Did setup the time logic (24 hours until new withdrawal can be made) in Solidity, not Javascript, as this is a security relevant logic.

# msg.sender
Used everywhere msg.sender rather than tx.origin

# Security Analysis Tool
Used https://tool.smartdec.net/ for static analysis of code, result "no bug".


# Over-and Underflow (not used, but considered)
Did not use OpenZeppelin's SafeMath contract to mitigate the risk of integer over- and underflows, but would definitely use for when continuing with this project for production
