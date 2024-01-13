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

  // old
  // 0x858f79cDA31a3EC8759441c295912486219e99f9
  // 0xDB9841Ac61881fE72274b03A973acd9090F03031

  // latest
  // 0x7802bf38F182D728808a516c19FD3f857ea2D417