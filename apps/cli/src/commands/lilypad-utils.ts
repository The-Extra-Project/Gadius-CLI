import {exec} from "child_process"
interface surfaceReconstructionJob {
image?: string,
coorindates: string[],
}


export async function lilypad_job_point(params:surfaceReconstructionJob) {

try {
    exec("/bin/bash  -c lilypad  run" + params.image + "," + params.coorindates[0] + "," + params.coorindates[1])
} catch(error) {
    console.error("Error  while execution:", error);
}



}