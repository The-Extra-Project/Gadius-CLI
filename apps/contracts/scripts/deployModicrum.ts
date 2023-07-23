import {ethers} from "hardhat"
import {modicrumContractAdapterSol} from "../src/types/contracts/bacalhau_lillypad"
import {AuthModule} from "../src/types/contracts/worldcoin"

 require('dotenv').config() 



const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    

    }





