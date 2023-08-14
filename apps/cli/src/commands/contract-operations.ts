import { ethers } from "ethers"
import { configDotenv, } from "dotenv"
import { config, abi_erc20 } from "../../deployedAddress.config"
import { ModicrumContractAdapter__factory } from "../../../contracts/src/types"
import { provider } from "../utils/auth-web3"
import { appendFileSync } from "fs"


configDotenv({ path: "../.env" })

export class ContractOperations {
    provider: ethers.providers.JsonRpcProvider
    wallet: ethers.Wallet
    addressToken: string
    addressModicrum: string
    tokenInterface: ethers.utils.Interface
    tokenContract: ethers.Contract
    modicrumContractAdapter: ethers.utils.Interface

    constructor(
        createdWallet: ethers.Wallet
    ) {
        this.provider = new ethers.providers.JsonRpcProvider(process.env.JSON_PROVIDER || '')
        this.addressToken = config.testnetTokenAddress
        this.addressModicrum = config.modicrum
        this.tokenInterface = new ethers.utils.Interface(abi_erc20)
        this.modicrumContractAdapter = new ethers.utils.Interface(ModicrumContractAdapter__factory.abi)
        this.tokenContract = new ethers.Contract(config.testnetTokenAddress, abi_erc20)
        this.wallet = createdWallet
    }

    async transferToken(
        destinationAddress: string, amount: string
    ) {

        let erc20transfer_transaction_encoding: ethers.utils.UnsignedTransaction  = {
            //from: this.wallet.address,
            to: destinationAddress,
            data: this.tokenInterface.encodeFunctionData("transfer", [
                destinationAddress,
                ethers.utils.parseEther(amount)
            ])
        }

        const signer = await this.provider.getSigner(this.wallet.address)

        //airdropping the tokens.
        let transferOperation = (signer).populateTransaction(
            erc20transfer_transaction_encoding
        )


        let simulateTransaction = (signer).sendTransaction(await transferOperation)
        console.log("approximate results of the gas costs", (await simulateTransaction).gasPrice)

        try {
            const signTransaction = signer.signTransaction(erc20transfer_transaction_encoding)
            const transaction = await signer.sendTransaction(await transferOperation)
            console.log("transaction hash", transaction.hash)
        } catch (error) {
            console.log("error", error)
        }
    }

    /**
     * this function allows the client for 
     */
    async AcceptResult(
        jobOfferId: number,
        resultId: number
    ) {

        const signer = await this.provider.getSigner(this.wallet.address)
        let transaction_encoding: ethers.utils.UnsignedTransaction = {
            to: config["modicrum"],
            data: this.modicrumContractAdapter.encodeFunctionData("acceptResult", [
                jobOfferId,resultId
            ])
        }; 
    
        try {

            const populate_txn = await signer.populateTransaction(transaction_encoding);
            const signTransaction =  signer.signTransaction(populate_txn);

            const transaction = await signer.sendUncheckedTransaction(populate_txn );
            console.log("transaction hash", transaction)
        } catch (error) {
            console.log("error", error)
        }
        
    }


    async executePointcloudData(Xcooddinate, Ycoordinate, imageInformation ) {
        const signer = await this.provider.getSigner(this.wallet.address);
        

    }

}



enum WalletType {
    noncustodial_demo,
    custodial
}


let walletAddress: string

/**
 * function for importing pre-existing wallet or the present wallet.
 * @param privateKey is the private key of the pre-existing wallet (only for setting up the non custodial EOA).
 * @param walletChoice defines the nature of wallet that you want to set it up.
 */

export async function createWallet(privateKey?: string, walletChoice: WalletType = WalletType.noncustodial_demo) {
  let formattedKey = ethers.utils.hexlify(privateKey)
    let wallet: ethers.Wallet
    try {
        if (!privateKey) {
            // wallet = ethers.Wallet.createRandom(
            //     provider
            // )
            // not a secure way for build package, need to make it valid from the secure enclave.
            appendFileSync('../../.env', 'PRIVATE_KEY_TREASURY=' + wallet.privateKey)
            walletAddress = wallet.address

        }

       wallet = new ethers.Wallet(formattedKey, provider)
       appendFileSync('../../.env', 'PRIVATE_KEY_TREASURY=' + wallet.privateKey)

    }

    catch (error: any) {
        throw new Error(error.message)
    }

    console.log("Wallet address created:"+privateKey)


}

export async function walletStatus(address: string) {
    //const walletAmount = ethers.formatUnits(await provider.getBalance(address), 'number')
    const walletAmount = ethers.utils.formatEther(await provider.getBalance(address))
    console.log('the address'+ walletAmount)
}


export async function mintTokens(address: string, amount: string ) {
    let addressToken = config["testnetTokenAddress"]
    let contractObject = new ContractOperations(new ethers.Wallet(process.env.PRIVATE_KEY_TREASURY));
    try {
        contractObject.transferToken(address, amount)

    }

    catch( e: any ) {
        console.log(e)
    }
}


export async function acceptResult() {
    let contractObject = new ContractOperations(new ethers.Wallet(process.env.PRIVATE_KEY_TREASURY));

}



