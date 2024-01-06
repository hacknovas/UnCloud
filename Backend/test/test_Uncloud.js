const { expect } = require("chai");
// const { ethers } = require("ethers");

describe("Uncloud Testing", async () => {
  //   second;

  it("createNFT", async () => {
    const [owner, second, third] = await ethers.getSigners();
    console.log(owner.address);

    const instance = await ethers.deployContract("NFTHub");

    const createT = await instance.createNFT("sdgjgskahkshffdka");
    // console.log(tokenID3.returnValue);

    const token = await instance._tokenId();
    console.log(token);

    const mynft = await instance.getMyNFT();
    console.log(mynft);

    const shareNFT = await instance.shareNFTWith(second.address, 1);

    const getAlladdrr = await instance.connect(owner).getAllowedAddresses(1);
    console.log(getAlladdrr);

    const viewNFT = await instance.connect(second).viewNFT(1);
    console.log(viewNFT);

    const getAllNFT = await instance.connect(owner).getAllNFTs();
    console.log(getAllNFT);
  });
});
