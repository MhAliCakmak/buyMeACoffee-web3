// Setup: npm install alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");
//ethers
const { ethers } = require("ethers");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "UE0EGfnZU3g3LMzlItA_j0pgLRWk92kI", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
let vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

const alchemy = new Alchemy(settings);

async function main() {
    let response = await alchemy.core.getTokenBalances(vitalikAddress);
    for(let i = 0; i < response.tokenBalances.length; i++) {
        const metadata = await alchemy.core.getTokenMetadata(
            response.tokenBalances[i].contractAddress
          );
        console.log(metadata.name)
    }
}

main();