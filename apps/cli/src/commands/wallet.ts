import {
  newLedgerWalletWithSetup,
  AddressValidation
} from '@celo/wallet-ledger';

import TransportNodeHid from "@ledgerhq/hw-transport-node-hid" 

import { LocalWallet } from '@celo/wallet-local';
import {ReadOnlyWallet} from '@celo/connect'
import { ethers } from 'ethers';
import { provider } from '../utils/connect-web3';
import { appendFileSync } from 'fs';

enum WalletType {
  noncustodial_demo,
  custodial, 
  ledger
}

export class Wallet {

private _wallet?: ReadOnlyWallet | ethers.Wallet | LocalWallet;
walletAddress: string;

/**
 * function for importing pre-existing wallet or the present wallet.
 * @param privateKey is the private key of the pre-existing wallet (only for setting up the non custodial EOA).
 * @param walletChoice defines the nature of wallet that you want to set it up.
 */

async createWallet(
  privateKey?: string,
  walletChoice: WalletType = WalletType.noncustodial_demo
) {
  let formattedKey = ethers.utils.hexlify(privateKey);
  
  try {
    // pretty unsafe, need to replace the private key with the secure enclave integration within the
    if (!privateKey && walletChoice == WalletType.noncustodial_demo) {
      this._wallet = ethers.Wallet.createRandom();

    } else if (privateKey && walletChoice == WalletType.noncustodial_demo) {
      this._wallet = new LocalWallet();
     // this._wallet.addAccount(formattedKey);
    } else if (walletChoice == WalletType.ledger) {
      // taking reference integrations from the celocli code for the ledger wallet creation.
      const transportNodeHID = TransportNodeHid.open('');
      const derivativePaths = '' // gets by default the first address., need to handle the old addresses.
      console.log('now getting the ledger confirmation from the device: {}', AddressValidation.never)
      // this._wallet = await newLedgerWalletWithSetup(
      // );
    }
  } catch (error: any) {
    throw new Error(error.message);
  }

  console.log('Wallet address created:' + privateKey);
}







}

export async function walletStatus(address: string) {
  //const walletAmount = ethers.formatUnits(await provider.getBalance(address), 'number')
  const walletAmount = ethers.utils.formatEther(
    await provider.getBalance(address)
  );
  console.log('the address' + walletAmount);
}

async function removeWallet() {
  this.conf.delete(process.env.PRIVATE_KEY_TREASURY);
}
