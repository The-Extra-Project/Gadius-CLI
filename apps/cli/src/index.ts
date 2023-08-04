import {Command} from "commander"
import {exec} from "child_process"
import * as figlet from "figlet"
import {lilypad_job_point} from "./commands/lilypad-utils"
import {} from "./commands/contract-operations"

/**
 * credits to the lighthouse-package : https://github.com/lighthouse-web3/lighthouse-package/ for the referencing their codebase for some of the integration scripts.
 * 
 */

let program = new Command("Gadus-cli");
console.log(figlet.textSync("Gadus CLI", { font: "Slant" }))

enum applicationState {
started,
walletCreated,
tokensAccessed,
}

const currentState = applicationState.started


program.addHelpText("before", "CLI tool for running compute jobs")


program
  .version("0.1.0")


  program.command("create-wallet").description("this creates the user wallet to run jobs on lillypad").action()
  program.command("current-wallet-status").description("gets current wallet amount and status").action()
  
  program.command("mint-token").description("demo function for transferringf some test token in order to schedule the jobs on bacalau testnet")
  .option('-t, --amount <amount>', 'Amount of tokens to mint')
  .option('-a, --address <address>', 'Address to mint tokens to')
  .action()

  program.command("create-cod-point")
  .option('-c, --coordiantes <Xcoordinate> <Ycoordinate>', 'Coordinates for the point onto which you want to genetate the rendering')
  .description("allows user to create compute job on bacalhau / lillypad network with given catesian points as location").action()
  
  program.command("create-cod-polygon")
  .option('-i,--input <longitudeMax> <longitudeMin> <lattitudeMax> <lattitudeMin>', "defines the corresponding boundation which is used for the generation the rendering")
  .description("allows user to create compute job resulting rendering of the bounded polygon region").action()
  
  
  program.command("result job").description("allows user to create compute job result with the input as the various input parameters as output").action()
  .option("-r, --result <jobId>", "gets the state of the job value parameter")
  .option("-a, --accept-result <jobId>", "it accepts the job result onchain, and then pays for the compute job")
 
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