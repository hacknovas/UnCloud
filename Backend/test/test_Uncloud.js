const { expect } = require("chai");
// const { ethers } = require("ethers");

describe("Uncloud Testing", async () => {
  //   second;

  it("createNFT", async () => {
    const [owner, second, third] = await ethers.getSigners();
    // console.log(owner);

    const instance = await ethers.deployContract("NFTHub");

    // console.log(constractAddress);
    // console.log(JSON.stringify(await instance._tokenId));
    const tokenID3 = await instance.createNFT("sdgjgskahkshffdka");
    console.log("createNFT=>" + tokenID3);

    const tokenID = await instance.createNFT("sdgjgskahkshdka");
    console.log("createNFT=>" + tokenID.toString());

    const tokenID1 = await instance.createNFT("sdgjgskahkshdkdsfsa");
    console.log("createNFT=>" + JSON.stringify(tokenID1));

    // expect;
    // chai.expect.toString.eqaul
  });
});
