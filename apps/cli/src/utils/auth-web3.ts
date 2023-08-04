  import {ethers, SigningKey} from 'ethers'
import { cyan, green, red } from 'kleur'
import {config} from "../../deployedAddress.config"
import {ContractOperations} from "../commands/contract-operations"
import "dotenv"
  /**
   * tools only for simulating the transactions for the test deployment.
   * it will help also user to interact the EOA wallet to interact with the  FEVM based chains.
   * 
   * 
   */

// wallet: ethers.Wallet


// const RPC = process.env.RPC;
// const KEY: string | SigningKey  = process.env.PRIVATE_KEY; // NOTE: only for the testing purposes. 
// const provider = new ethers.JsonRpcProvider(
//   RPC
//       )
  
  // export const  sign_auth_message = async(message: string): Promise<string> => {
  //   const signer = new ethers.Wallet(KEY, provider)
  //   return signer.signMessage(message)
  // }


  // export async function createDummyWallet() {
  //  this.wallet = new ethers.Wallet(KEY, provider)
    
  // }