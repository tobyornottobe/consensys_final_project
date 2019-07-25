const UBI = artifacts.require("UBI.sol");

contract("UBI", accounts => {
  let UBI = null;
  before(async () => {
    UBI = await UBI.deployed();
  });


  it('Should add beneficiaries', async () => {
    await UBI.addBeneficiary(accounts[4]).send();
    const isBeneficiary = await UBI.beneficiaries(accounts[4]);
    assert(isBeneficiary == true);
    //console.log(UBI);
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
