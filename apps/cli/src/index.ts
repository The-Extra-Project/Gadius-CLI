import {Command} from "commander"
import {exec} from "child_process"
import * as figlet from "figlet"
import {lilypad_job_point} from "./commands/lilypad-utils"
import {createDummyWallet} from "./utils/auth-web3"
//import "dfns"

let program = new Command();
console.log(figlet.textSync("Gadius CLI", { font: "Slant" }))

program
  .version("0.1.0")
  .description("CLI for running gis jobs on bacalhau network")
  .option("-w, --create_wallet ", "this creates the user wallet to run jobs on lillypad")
  .option("-jp,--job_point ", "defines the parameters to be run on surface reconstruction job for single point").description(" -jp lxet/geo_coordinate 10 20")
  .option("-r, --result <jobId>", "gets the state of the job value parameter")
  .parse(process.argv);

  program.parse(process.argv)
const options = program.opts();


if(options.job_point) {
    console.log('now running the job, waiting for getting back the result')
if (process.argv[1] == 'lxet/geo_coordinate' && process.argv[2] == typeof Number && process.argv[3] == typeof Number) {
    lilypad_job_point({
        image: process.argv[1],
       coorindates:[process.argv[2],
        process.argv[3]]})

} 
}

else if(options.create_wallet) {
    console.log('setting up the user wallet')
    createDummyWallet()
}