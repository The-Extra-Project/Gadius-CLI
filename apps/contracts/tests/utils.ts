
import { ethers } from "hardhat";

import {ModicrumContractAdapter__factory} from "../src/types"
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";


export async function deployModicrumContractFixture() {

    const admin: HardhatEthersSigner[] = await ethers.getSigners()

    console.log('now setting up the wallet admin  ' + admin[0].address)
    const modicrumDeploy = await ethers.deployContract("ModicrumContractAdapter", admin[0] as any)


    console.log('contract deployed for modicrum adapter: ' + (await modicrumDeploy).address )

    return modicrumDeploy
}