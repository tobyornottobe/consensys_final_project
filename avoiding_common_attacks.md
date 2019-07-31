## Avoiding common attacks


# Test
I have written tests to verify correct contract behaviour and to avoid logic errors.

# Circuit breaker
I have added Open Zeppelins Pausable.sol contract to interrupt a contract if something goes wrong.

# Re-entrancy attacks
Prepared for a re-entrancy attack by implementing solution 1 at the moment and considering implementing solutions 2 and 3 in the future.
Solution 1: update balance before calling transfer
Solution 2: put in place re-entrancy guard (OpenZeppelin)
Solution 3: limit gas available in call contract

# Private storage variables
Marked in the contract variables and mapping, that I would set to private for the production (mainnet) environment. In order to not make sensitive variables accessible to other contracts.

# Timestamp
Set up the time logic (24 hours until next withdrawal) in Solidity, not in Javascript, as this is a security relevant logic.

# msg.sender
Used everywhere msg.sender instead of tx.origin.

# Security analysis tool
https://tool.smartdec.net/ is used for static analysis of code, result "no bug".

# Over-and underflow (not used, but considered)
Did not use OpenZeppelin's SafeMath contract to minimize the risk of integer overflow and underflow, but would definitely use it, if I continue with this project for production.
