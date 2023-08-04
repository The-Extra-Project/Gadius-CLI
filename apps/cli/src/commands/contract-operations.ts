import {ethers, JsonRpcProvider, parseEther, TransactionRequest, EthersError } from "ethers"
import { configDotenv } from "dotenv"
import {config, abi_erc20} from "../../deployedAddress.config"
import {ModicrumContractAdapter__factory} from "../../../contracts/src/types"

configDotenv( { path: "../.env" })

export class ContractOperations {
    provider: ethers.JsonRpcProvider
    wallet: ethers.Wallet
    addressToken: string
    addressModicrum: string
    tokenInterface: ethers.Interface
    tokenContract: ethers.Contract
    modicrumContractAdapter: ethers.Contract
    
    constructor(walletPrivKey: string, provider: string) {
        this.provider = new JsonRpcProvider(process.env.JSON_PROVIDER ||'')
        this.wallet =  new ethers.Wallet(process.env.PRIVATE_KEY_TREASURY,this.provider )
        this.addressToken = config.testnetTokenAddress
        this.addressModicrum = config.modicrum
        this.tokenInterface = new ethers.Interface(abi_erc20)
        this.modicrumContractAdapter = new ethers.Contract(config.modicrum,ModicrumContractAdapter__factory.abi)
        this.tokenContract = new ethers.Contract(config.testnetTokenAddress,abi_erc20)
   
    }

    async transferToken(
        destinationAddress: string , amount: string
    ) {

        let erc20transfer_transaction_encoding: TransactionRequest =  {
            from: this.wallet.address,
            to: destinationAddress,
            data: this.tokenInterface.encodeFunctionData("transfer",[
                destinationAddress,
                parseEther(amount)
            ])
        }

      const signer = await  this.provider.getSigner(this.wallet.address)

        //airdropping the tokens.
       let transferOperation =  (signer).populateTransaction(
        erc20transfer_transaction_encoding
       )


      let simulateTransaction = (signer).sendTransaction(await transferOperation)
       console.log("approximate results of the gas costs", (await simulateTransaction).gasPrice as any)

       try {
       const signTransaction = signer.signTransaction(erc20transfer_transaction_encoding)

       const transaction = await signer.sendTransaction(await transferOperation)
       console.log("transaction hash", transaction.hash)
       } catch (error) {
           console.log("error", error)
       }
    }
}