import hre from "hardhat";
async function main() {
  const Token = await hre.viem.deployContract("BuyMeACoffee",[]);

  console.log("Token address:", Token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
