
import { ethers } from "hardhat";

//import {ModicrumContractAdapter__factory} from "../src/types"
import { HardhatEthersSigner, SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";


export async function deployModicrumContractFixture() {

    const admin: any = await ethers.getSigners()

    console.log('now setting up the wallet admin  ' + admin[0].address)
    const modicrumDeploy = await ethers.deployContract("ModicrumContractAdapter", admin[0])

    console.log('contract deployed for modicrum adapter: ' + (await modicrumDeploy).address )

    return modicrumDeploy
}