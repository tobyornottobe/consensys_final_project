const UBI = artifacts.require("UBI");

contract("UBI", accounts => {
  let instance = null;
  beforeEach(async () => {
    const instance = await UBI.deployed();
  });

/*
  it('Should add beneficiaries', async () => {

    await instance.addBeneficiary(accounts[4]).send();
    const isBeneficiary = await instance.beneficiaries(accounts[4]);
    assert(isBeneficiary == true);
    //console.log(UBI);
  })*/



  const owner = accounts[0];
  const ginot = accounts[1];
  const gracia = accounts[2];
  const deposit = web3.utils.toBN(2);



  it("withdrawal is not possible if contract is paused", async () => {
    const setPause = await instance.pause();
    expect(instance.paused()).toBe(true);


})

  it("should deposit 2 ether into the interest account", async () => {
    await instance.deposit({from: ginot, value: deposit})
    //const balance = await instance.getBalance({from: alice})
    const balance = await instance.getBalance.call({from: alice})

    //assert.equal(deposit.toString(), balance, 'deposit amount incorrect, check deposit method')
    assert.equal(balance.valueOf(), 2, 'deposit amount incorrect, check deposit method')
  })


it('should add beneficiaries', async () => {
    await instance.addBeneficiary(gracia).send();
    const isBeneficiary = await instance.beneficiaries(gracia);

    assert(isBeneficiary == true);
    //console.log(instance);
  })

it("should withdraw correct amount", async () => {
    const initialAmount = 0
    await instance.deposit({from: ginot, value: deposit})
    await instance.withdraw(deposit, {from: gracia})
    const balance = await instance.getBalance({from: gracia})

    assert.equal(balance.toString(), initialAmount.toString(), 'balance incorrect after withdrawal, check withdraw method')
  })


it('should not be possible to withdraw before payTime', async () => {
    await instance.deposit({from: ginot, value: deposit})
    await catchRevert(instance.withdraw(payTime - 3, {from: gracia}))

  })

  // it("...should store the value 89.", async () => {
  //   const simpleStorageInstance = await SimpleStorage.deployed();
  //
  //
  //
  //   // Set value of 89
  //   await simpleStorageInstance.set(89, { from: accounts[0] });
  //
  //   // Get stored value
  //   const storedData = await simpleStorageInstance.get.call();
  //
  //   assert.equal(storedData, 89, "The value 89 was not stored.");
  //});
});
