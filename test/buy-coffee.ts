import hre from "hardhat";
import { formatEther, parseEther } from "viem";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

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
    const tipAmount= memo.tipAmount;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}


async function main() {
  // Get the wallet clients and public client
  const [owner, bobWalletClient, aliceWalletClient] =
    await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();

  // Deploy the BuyMeACoffee contract
  const buyMeACoffee = await hre.viem.deployContract("BuyMeACoffee", {
    from: owner.account.address,
    args: [],
  });

  // Check balances before the coffee purchase.
  const addresses = [
    owner.account.address,
    bobWalletClient.account.address,
    aliceWalletClient.account.address,
  ];
  console.log("== start ==");
  await printBalances(addresses);

  // Buy the owner a few coffees
  const tip = parseEther("1") ;
  await buyMeACoffee.write.buyCoffee([
    "Owner",
    "Thanks for your hard work!",
  ]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
