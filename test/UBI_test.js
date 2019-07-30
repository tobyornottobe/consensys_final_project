const UBI = artifacts.require("UBI");

contract("UBI", accounts => {
  let contract = null;
  let owner = null;
  let ginot = null;
  let gracia = null;
  let deposit = null;

  before(async () => {
    contract = await UBI.deployed();
    owner = accounts[0];
    ginot = accounts[1];
    gracia = accounts[2];
    deposit = web3.utils.toBN(100);
  });

  //this test should check if the contract can be paused
  it("contract can be paused", async () => {
    const setPause = await contract.pause();

    assert(await contract.paused());
  })

 //this test checks if a donor can place an amount into the foundation capital (contract address)
  it("should deposit some ether into the contract", async () => {
    await contract.unpause();
    const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(contract.address));
    await contract.deposit({ value: deposit, from: ginot, gasLimit: 200000});
    const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(contract.address));

    assert(balanceAfter.sub(balanceBefore).eq(deposit));
  })

  //this test adds or registers a beneficiary
  it('should add beneficiary', async () => {
    await contract.addBeneficiary(gracia);
    const isBeneficiary = await contract.beneficiaries.call(gracia);

    assert(isBeneficiary === true);
  })

  //this test is the most complicated in here and checks if an amount can be withdrawn from the contract
  // the difficulty was to calculate the interest and actually find out that a very low basic income doesn't actually surpass the gas fees
  // an approach for a better interest calculation could be:
  // const interest = contract.calculateInterest();
  // const numberBeneficiaries = contract.numberBeneficiaries();
  // const expected = deposit.mul(interest / beneficiaries);
  it("should withdraw correct amount", async () => {
    const sleep = new Promise((resolve, reject) => setTimeout(resolve,  6000));
    const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(gracia));
    await contract.deposit({ value: deposit, from: ginot, gasLimit: 200000});
    await sleep;
    const receipt = await contract.withdraw({from: gracia, gasPrice: 1});
    const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(gracia));
    const expected = web3.utils.toBN(2000000000000000000).sub(web3.utils.toBN(receipt.receipt.gasUsed)); //const expected = deposit.mul(102).div(10000);

    assert(balanceAfter.sub(balanceBefore).eq(expected));
  })

  //this test is to check if an amount can be withdrawn, when it is claimed within the time period, in which no additional amount can be claimed
  it('should not be possible to withdraw before payTime', async () => {
    const sleep = new Promise((resolve, reject) => setTimeout(resolve,  4000));
    const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(gracia));
    await contract.deposit({ value: deposit, from: ginot, gasLimit: 200000});
    await sleep;
    try {
      await contract.withdraw({from: gracia, gasPrice: 1});
    } catch (e) {
      assert(e.message.includes("onlyOnPayDay"));
      return;
    }

    assert(false);
  })

});//end of contract
