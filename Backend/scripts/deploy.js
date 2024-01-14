const hre = require("hardhat");

async function main() {
  const instance = await ethers.getContractFactory("UnCloud");
  const token = await instance.deploy();
  const constractAddress = await token.getAddress();

  console.log(constractAddress);
}

main()
  .then(() => {
    console.log("Deployed...");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

// old Scripts
// 0x858f79cDA31a3EC8759441c295912486219e99f9
// 0xDB9841Ac61881fE72274b03A973acd9090F03031
// 0x7802bf38F182D728808a516c19FD3f857ea2D417
// 0x47254904414e9E5fBFe1673F69104863e2Fe7fc1
// 0x5E4b690938A3243f161A6F6dE3897a1d72eBe8cE
// 0xf6811EB4D0320e6babCa8133e1D9a2d4E1709E5f

// latest Scripts
// 0x19b64BE29C6714f652da81E3a0447d891AC744ed