import { ContractOperations } from './contract-operations';
import { RPC } from 'src/utils/auth-web3';
import {modicrumAdapter, config } from "cli/deployedAddress.config"
import {Conf} from "conf"
import {Wallet, ethers} from "ethers"

export interface surfaceReconstructionJob {
  image?: string;
  coorindates: string[];
  username: string;
  shp_file_identifiers: string;
}

class lilypadFunction {
  contractAddress: String;
  AdapterFunctions: ContractOperations;
  wallet: Wallet
  constructor(address: String) {

    this.contractAddress = address;
    this.wallet = new Wallet(process.env.PRIVATE_KEY, new ethers.providers.JsonRpcProvider(RPC) )
    this.AdapterFunctions = new ContractOperations(
      this.wallet
    )
  }

  /**
   * @param parameters  defines the parameters (X,Y, ipfs cid for the referent template files and the shape file ) and optional coordinate system.
   */
  async createJobPoint(parameters: surfaceReconstructionJob) {
    try {
      let jobId  = this.AdapterFunctions.createReconstructionJobPoint(
          parameters
        )

        console.log("computejob realised with" + jobId)
        
    } catch (error: any) {
     
    }
  }



}
