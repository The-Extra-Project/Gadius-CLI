import {exec, spawn} from "child_process"
import {ContractOperations} from "./contract-operations"
import { RPC } from "src/utils/auth-web3";

interface surfaceReconstructionJob {
image?: string,
coorindates: string[]
}


class lilypadFunction() {
    
contractAddress: String

constructor(address: str) {
        this.contractAddress = address
    }

async createJobPoint(parameters: surfaceReconstructionJob) {

exec("/bin/bash -c lilypad /user/src/app/ ")

}



}



export async function lilypad_job_point(Xcoordinate, Ycoordinate, privkey) {

    try {

    

    
} catch(error) {
    console.error("Error  while execution:", error);
    
}



}

