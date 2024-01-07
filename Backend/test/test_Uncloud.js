const { expect } = require("chai");
// const { ethers } = require("ethers");

describe("Uncloud", async () => {
  it("Basic Check", async () => {
    const [owner, second, third] = await ethers.getSigners();
    console.log(owner.address);

    const instance = await ethers.deployContract("UnCloud");

    const createT = await instance.storeMetaData("sdgjgskahkshffdka", "Mahi");
    // console.log(tokenID3.returnValue);

    const token = await instance._metaID();
    console.log(token);

    const mynft = await instance.getMyData();
    console.log(mynft);

    const shareNFT = await instance.shareDataWith(second.address, 1);

    const getAlladdrr = await instance.connect(owner).getAllAddress(1);
    console.log(getAlladdrr);

    const viewNFT = await instance.connect(second).viewMetaData(1);
    console.log(viewNFT);

    const getAllNFT = await instance.connect(second).getMySharedData();
    console.log(getAllNFT);
  });
});
