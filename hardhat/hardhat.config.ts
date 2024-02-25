import "@nomicfoundation/hardhat-toolbox-viem";
const { mnemonic, bscscanApiKey } = require("./secrets.json");
import "@nomicfoundation/hardhat-ethers";

module.exports = {
  networks: {
    testnet: {
      url: `https://data-seed-prebsc-1-s1.bnbchain.org:8545`,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [mnemonic],
    },
    mainnet: {
      url: `https://bsc-dataseed.bnbchain.org/`,
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [mnemonic],
    },
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: bscscanApiKey,
  },
};
