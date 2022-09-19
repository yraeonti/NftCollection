require("dotenv").config()
const {ethers} = require("hardhat")

const {METADATA_URL, WHITELIST_CONTRACT_ADDRESS} = require("../constants")


async function main() {


    const cryptoDevsContract = await ethers.getContractFactory("CryptoDevs")

    const deployedContract = await cryptoDevsContract.deploy(
        METADATA_URL,
        WHITELIST_CONTRACT_ADDRESS
    )

    console.log("Crypto Devs Contract Address:", deployedContract.address);

}

main().then(() => process.exit(0)).catch((error) =>{
    console.error(error);
    process.exit(1)
} )