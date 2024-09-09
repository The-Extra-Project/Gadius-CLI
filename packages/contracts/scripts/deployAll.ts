import {ethers} from "hardhat"
import {ModicrumContractAdapter__factory } from "../src/types"
import { writeFileSync } from "fs"
import config from "../hardhat.config"
import  path  =  require("path")
require('dotenv').config() 


const main = async () => { 

    const admin = await ethers.getSigners()
    console.log('now setting up the wallet admin  ' + admin[0].address)
    const modicrumDeploy = await ethers.deployContract("ModicrumContractAdapter", admin[0] as any)
    console.log('contract deployed for modicrum adapter: ' + (await modicrumDeploy).address )

    const deployedAddress = {
        modicrum: (await modicrumDeploy).address,
        testnetTokenAddress: '0x566c29566F2ceAD87273127F90c6f71aE5cF686B', // for the demo token
        network: config.networks.lillypadTestnet.chainId
        
    }

    // storing in the cli apps in order to be accessible for wallet operation
    const pathCli = path.join(
        __dirname,
        '../../cli/',
        'deployedAddress.json'
    )


    writeFileSync(
        pathCli, JSON.stringify(deployedAddress,null,2)
    )

    // writeFileSync(
    //     ModicrumContractAdapter__factory, JSON.stringify(deployedAddress,null,2)
    // )


}
main()




