// import { ContractOperations } from './contract-operations';
//import { RPC } from 'src/utils/connect-web3';
// import { modicrumAdapter, config } from 'cli/deployedAddress.config';
//import { ethers } from 'ethers';
//import { Wallet } from 'cli/src/commands/wallet';

export interface surfaceReconstructionType {
  image?: string;
  coorindates: string[];
  username: string;
  shp_file_identifiers: string;
}

// export class lilypadFunctions {
//   contractAddress: String;
//   AdapterFunctions: ContractOperations;
//   wallet: Wallet;

//   constructor(address: String) {
//     this.contractAddress = address;
//     this.wallet = new Wallet();
//     this.AdapterFunctions = new ContractOperations(this.wallet);
//   }

//   /**
//    * @param parameters  defines the parameters (X,Y, ipfs cid for the referent template files and the shape file ) and optional coordinate system.
//    */
//   async createJobPoint(parameters: surfaceReconstructionJob) {
//     try {
//       let jobId =
//         this.AdapterFunctions.createReconstructionJobPoint(parameters);

//       console.log('computejob realised with' + jobId);
//     } catch (error: any) {}
//   }

// }
