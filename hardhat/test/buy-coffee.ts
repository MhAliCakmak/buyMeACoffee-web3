import hre from "hardhat";
import { formatEther, parseEther } from "viem";
import viem from "viem";
import { ethers } from "ethers";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { Network, Alchemy } from "alchemy-sdk";

interface MemosParamsType {
  timestamp: string;
  name: string;
  tipAmount: string;
  from: string;
  message: string;
}

// Returns the Ether balance of an address
async function getBalance(address: any) {
  const publicClient = await hre.viem.getPublicClient();
  const balance = await publicClient.getBalance({
    address,
  });
  return formatEther(balance);
}

// Logs Ether balance of each address
async function printBalances(addresses: `0x${string}`[]) {
  let idx = 1;
  for (const address of addresses) {
    const balance = await getBalance(address);
    console.log(`${idx}. ${address}: ${balance}`);
    idx++;
  }
}

// Logs the memos stored on-chain from coffee purchases
async function printMemos(memos: MemosParamsType[]) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipAmount = memo.tipAmount;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}

async function createAccount() {
  const signer = ethers.Wallet.createRandom();
  console.log("signer", signer.privateKey);
}
async function main() {
  // Get the wallet clients and public client
  const [owner, bobWalletClient, aliceWalletClient] =
    await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();
  // Deploy the BuyMeACoffee contract

  // Check balances before the coffee purchase.
  const addresses = [
    owner.account.address,
    bobWalletClient.account.address,
    aliceWalletClient.account.address,
  ];
  console.log("== start ==");

  const settings = {
    apiKey: "UE0EGfnZU3g3LMzlItA_j0pgLRWk92kI", // Replace with your Alchemy API Key.
    network: Network.MATIC_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  // Access standard Ethers.js JSON-RPC node request
  alchemy.core.getBlockNumber().then(console.log);

  // Access Alchemy Enhanced API requests
  alchemy.core
    .getTokenBalances("0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE")
    .then(console.log);

  // Access the Alchemy NFT API
  alchemy.nft.getNftsForOwner("vitalik.eth").then(console.log);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
