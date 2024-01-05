require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const sepolia_key =
  "8e3e6175e88b98c07ba0364a415cf2b05f0e36840a123bac9f5806ce72a41593";
const Alchemy_key = "Py6rLN9ET0CGeE0LTZ_7egTeOmTvnGao";

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${Alchemy_key}`,
      accounts: [`${sepolia_key}`],
    },
  },
};
