// import {
//   newLedgerWalletWithSetup,
//   AddressValidation
// } from '@celo/wallet-ledger';

// import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';

// //import {} from "@ledgerhq/hw-transport-node-hid"

// import { LocalWallet } from '@celo/wallet-local';

// import { FileKeystore } from '@celo/keystores';
// import { ReadOnlyWallet } from '@celo/connect';
// import { ethers, Signer } from 'ethers';
// import { provider } from '../utils/connect-web3';

// import { appendFileSync } from 'fs';

// enum WalletType {
//   noncustodial_demo,
//   custodial,
//   ledger
// }

// export class Wallet {
//   private _wallet?: ReadOnlyWallet | LocalWallet;
//   private signer: Signer;
//   walletAddress: string;
//   private keystore: FileKeystore;
//   walletType: WalletType

//   constructor(
//     walletType: WalletType
//   )

//   {
// this.walletType = WalletType
//   }

//   /**
//    * function for importing pre-existing wallet or the present wallet.
//    * @param privateKey is the private key of the pre-existing wallet (only for setting up the non custodial EOA).
//    * @param walletChoice defines the nature of wallet that you want to set it up.
//    */

//   async createWallet(
//     privateKey?: string,
//     walletChoice: WalletType = WalletType.noncustodial_demo
//   ) {
//     let formattedKey = ethers.utils.hexlify(privateKey);

//     try {
//       // pretty unsafe, need to replace the private key with the secure enclave integration within the
//       if (privateKey && walletChoice == WalletType.noncustodial_demo) {
//         this._wallet = new LocalWallet();
//         this.signer = new LocalSigner(privateKey);
//         this.walletAddress = this._wallet.getAccounts()[0];
//         // this._wallet.addAccount(formattedKey);
//       } else if (walletChoice == WalletType.ledger) {
//         // taking reference integrations from the celocli code for the ledger wallet creation.
//         const transportNodeHID = TransportNodeHid.open('');
//         const derivativePaths: number[] = [44, 60, 0, 0]; // gets by default the first address., need to handle the old addresses.
//         console.log('now getting the ledger confirmation from the device:');

//         let ledgerConfirm = AddressValidation.never;
//         try {
//           this._wallet = await newLedgerWalletWithSetup(
//             transportNodeHID,
//             derivativePaths,
//             undefined,
//             AddressValidation.everyTransaction as any
//           );
//         } catch (error: any) {
//           throw new Error(error.message);
//         }

//         console.log('Wallet address created:' + this._wallet.getAccounts()[0]);
//       }
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   }
//   async walletStatus() {
//     const walletAmount = ethers.utils.formatEther(
//       await provider.getBalance(this._wallet.getAccounts()[0])
//     );
//     console.log(
//       'the address' +
//         this._wallet.getAccounts()[0] +
//         'has wallet amount' +
//         walletAmount
//     );
//   }

//   async signTransaction(params: ethers.utils.UnsignedTransaction): Promise<ethers.utils.TransactionDescription> {
//     try {
//       return
//       await this.signer.signTransaction(params);
//     } catch (e: any) {
//       new Error(e);
//     }
//   }
// }
