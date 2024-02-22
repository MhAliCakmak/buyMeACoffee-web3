import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ethers";

const config: any = {
  solidity: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    },
  },
};

export default config;
