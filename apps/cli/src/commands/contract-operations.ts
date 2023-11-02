// import { ethers } from 'ethers';
// import { configDotenv } from 'dotenv';
// import { config, abi_erc20 } from '../../deployedAddress.config';
// import { LocalSigner } from '@celo/wallet-local';
// import {
//   ModicrumContractAdapter,
//   ModicrumContractAdapter__factory
// } from 'contracts/src/types/index';
// import { provider } from '../utils/connect-web3';

// import { Wallet } from './wallet';

// configDotenv({ path: '../.env' });

// /**
//  * @abstract defines the contract interactions of cli with the adapter contract.
//  *
//  */
// export class ContractOperations {
//   provider: ethers.providers.JsonRpcProvider;
//   wallet: Wallet;
//   addressToken: string; // fees token (lilETH on v0 and v2).
//   addressModicrum: string; // contract address of the adapter.
//   tokenInterface: ethers.utils.Interface;
//   tokenContract: ethers.Contract;
//   modicrumContractAdapterAbi: any;
//   walletAddress: string;

//   constructor(createdWallet: Wallet) {
//     this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC || '');
//     this.addressToken = config.testnetTokenAddress;
//     this.addressModicrum = config["modicrum"];
//     this.tokenInterface = new ethers.utils.Interface(abi_erc20);
//     this.modicrumContractAdapterAbi = ModicrumContractAdapter__factory.abi;
//     this.tokenContract = new ethers.Contract(
//       config.testnetTokenAddress,
//       abi_erc20
//     );
//     this.wallet = createdWallet;
//     this.provider = provider;
//   }

//   async createReconstructionJobPoint(params: surfaceReconstructionJob) {
//     let computeJob_param: ethers.utils.UnsignedTransaction = {
//       to: config['modicrum'],
//       data: this.modicrumContractAdapterAbi.encodeFunctionData('computeJob', [
//         params
//       ])
//     };

//     let signer = await this.provider.getSigner(this.wallet.walletAddress);

//     let modicrumObject: ethers.Contract = new ethers.Contract(
//       this.addressModicrum, this.modicrumContractAdapterAbi,signer
//     );

//     let inputParameters: ethers.utils.UnsignedTransaction = {
//       to: config['modicrum'],
//       data: this.modicrumContractAdapterAbi.encodeFunctionData(
//         'runComputeJob',
//         [
//           ''.concat(
//             params.coorindates[0],
//             '',
//             params.coorindates[1],
//             '',
//             params.shp_file_identifiers[0],
//             '',
//             params.shp_file_identifiers[1],
//             '',
//             params.username
//           ),
//           params.image
//         ]
//       )
//     };

//     // let simulateTransaction = signer.sendTransaction(inputParameters);
//     // console.log(
//     //   'approximate results of the gas costs',
//     //   (await simulateTransaction).gasPrice
//     // );
//     try {
//       const signTransaction = this.wallet.signTransaction(computeJob_param);
//       console.log('transaction hash', (await signTransaction).sighash);
//       //await modicrumObject.
//     } catch (error) {
//       console.log('error', error);
//     }
//   }

//   async transferToken(destinationAddress: string, amount: string) {
//     let erc20transfer_transaction_encoding: ethers.utils.UnsignedTransaction = {
//       //from: this.wallet.address,
//       to: destinationAddress,
//       data: this.tokenInterface.encodeFunctionData('transfer', [
//         destinationAddress,
//         ethers.utils.parseEther(amount)
//       ])
//     };

//     const signer = await this.provider.getSigner(this.wallet.walletAddress);

//     //airdropping the tokens.
//     let transferOperation = signer.populateTransaction(
//       erc20transfer_transaction_encoding
//     );

//     let simulateTransaction = signer.sendTransaction(await transferOperation);
//     console.log(
//       'approximate results of the gas costs',
//       (await simulateTransaction).gasPrice
//     );

//     try {
//       const signTransaction = signer.signTransaction(
//         erc20transfer_transaction_encoding
//       );
//       const transaction = await signer.sendTransaction(await transferOperation);
//       console.log('transaction hash', transaction.hash);
//     } catch (error) {
//       console.log('error', error);
//     }
//   }

//   /**
//    * this function allows the client for
//    */
//   async AcceptResult(jobOfferId: number, resultId: number) {
//     const signer = await this.provider.getSigner(this.wallet.walletAddress);
//     let transaction_encoding: ethers.utils.UnsignedTransaction = {
//       to: config['modicrum'],
//       data: this.modicrumContractAdapter.encodeFunctionData('acceptResult', [
//         jobOfferId,
//         resultId
//       ])
//     };

//     try {
//       const populate_txn = await signer.populateTransaction(
//         transaction_encoding
//       );

//       const transaction = await signer.sendUncheckedTransaction(populate_txn);
//       console.log('transaction hash', transaction);
//     } catch (error) {
//       console.log('error', error);
//     }
//   }

//   async mintTokens(address: string, amount: string) {
//     let addressToken = config['testnetTokenAddress'];
//     try {
//       this.transferToken(address, amount);
//     } catch (e: any) {
//       console.log(e);
//     }
//   }
// }
