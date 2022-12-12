const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PASSWORD,
    process.env.PRIVATE_KEY
  );
  console.log(encryptedJsonKey);
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}
main()
  .then(() => {
    console.log("Encryption Successful!");
  })
  .catch(e => {
    console.error(e.message);
  });
