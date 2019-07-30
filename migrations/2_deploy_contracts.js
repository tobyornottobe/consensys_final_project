var UBI = artifacts.require("UBI.sol");

module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(UBI);
  const ubi = await UBI.deployed();
  await ubi.deposit({ value: web3.utils.toBN(5000000000000000000), from: accounts[0], gasLimit: 100000});
};
