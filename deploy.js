const ethers = require("ethers");
const fs = require("fs");

require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  //   const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  //   let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //     encryptedJson,
  //     process.env.PASSWORD
  //   );
  //   wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  //   console.log(contract);
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number : ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated Favorite Number : ${updatedFavoriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
