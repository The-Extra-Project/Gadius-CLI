import { Command } from 'commander';
import { exec } from 'child_process';
import * as figlet from 'figlet';
//import { lilypad_job_point } from './commands/lilypad-utils';
import {
  mintTokens
} from './commands/contract-operations';

import {
  createWallet,
  walletStatus
}
from './commands/wallet'


import { config } from '../../cli/deployedAddress.config';
import { createStreamlitPopup } from './commands/result-visualization';

/**
 * credits to the lighthouse-package : https://github.com/lighthouse-web3/lighthouse-package/ for the referencing their codebase for some of the integration scripts.
 *
 */

let program = new Command('Gadus-cli');
console.log(figlet.textSync('Gadus CLI', { font: 'Slant' }));

enum applicationState {
  started,
  walletCreated,
  tokensAccessed
}

const currentState = applicationState.started;

program.addHelpText(
  'before',
  'CLI tool for running compute 3D geospatial compute jobs'
);

program.version('0.1.0');

program
  .command('create-wallet')
  .description('this onboards the user wallet to run jobs on lillypad')
  .option(
    '-p, --private_key <key>',
    'integrates the wallet to the specific account'
  )
  .action(createWallet);

program
  .command('current-wallet-status')
  .description('gets current wallet amount and status')
  .action(walletStatus);

program
  .command('mint_token')
  .description(
    'demo function for transferringf some test token in order to schedule the jobs on bacalau testnet'
  )
  .option('-t, --amount <amount>', 'Amount of tokens to mint')
  .option('-a, --address <address>', 'Address to mint tokens to')
  .action(mintTokens);

program
  .command('create-cod-point')
  .option(
    '-c, --coordiantes <Xcoordinate> <Ycoordinate>',
    'Coordinates for the point onto which you want to genetate the rendering'
  )
  .description(
    'allows user to create compute job on bacalhau / lillypad network with given catesian points as location'
  );
//  .action(lilypad_job_point);
program
  .command('create-cod-polygon')
  .option(
    '-i,--input <longitudeMax> <longitudeMin> <lattitudeMax> <lattitudeMin>',
    'defines the corresponding boundation which is used for the generation the rendering'
  )
  .description(
    'allows user to create compute job resulting rendering of the bounded polygon region'
  );

program
  .command('result job')
  .description(
    'allows user to create compute job result with the input as the various input parameters as output'
  )
  .option('-r, --result <jobId>', 'gets the state of the job value parameter')
  .option(
    '-a, --accept-result <jobId>',
    'it accepts the job result onchain, and then pays for the compute job'
  );

program
  .command('get-status')
  .description('gets the status of the current job on the lilypad network')
  .option('-j, --jobId <jobId>', 'jobId to check status')
  .option(
    '-r, --resultid <resultId>',
    'resultId corresponding to the stored job'
  );

program
  .command('open visualizer')
  .description(
    'poups the brower based rendering application in order to visualize the details'
  )
  .action(createStreamlitPopup);

program.parse(process.argv);
const options = program.opts();

// if(options.job_point) {
//     console.log('now running the job, waiting for getting back the result')
// if (process.argv[1] == 'lxet/geo_coordinate' && process.argv[2] == typeof Number && process.argv[3] == typeof Number) {
//     lilypad_job_point({
//         image: process.argv[1],
//        coorindates:[process.argv[2],
//         process.argv[3]]})

// }
// }

// else if(options.create_wallet) {
//     console.log('setting up the user wallet')
// }
