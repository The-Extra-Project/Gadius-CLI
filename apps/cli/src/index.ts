import { Command } from 'commander';
import { exec } from 'child_process';
import * as figlet from 'figlet';
//import { lilypad_job_point } from './commands/lilypad-utils';
import { surfaceReconstructionType } from './commands/lilypad-utils';
import {
  surfaceReconstructionJob,
  surfaceReconstructionJobPolygon,
  cityGMLPipelineGeneration,
  neuralangelo_training
} from './commands/jobs';

/**
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

// program
//   .command('createWallet')
//   .description('this onboards the user wallet to run jobs on lillypad')
//   .option(
//     '-p, --private_key <key>',
//     '-o, --option <option>',
//     'integrates the wallet to the specific account'
//   )
//   .action(async (privateKey, option) => {
//     try {
//       walletObject = new Wallet(option);
//       await walletObject.createWallet(privateKey, option);

//       contractObject = new ContractOperations(walletObject);
//     } catch (e: any) {
//       console.error(e);
//     }
//   });

// program
//   .command('current-wallet-status')
//   .description('gets current wallet amount and status')
//   .action(async () => {
//     await walletObject.walletStatus();
//   });

// program
//   .command('mint_token')
//   .description(
//     'demo function for transferringf some test token in order to schedule the jobs on bacalau testnet'
//   )
//   .option('-t, --amount <amount>', 'Amount of tokens to mint')
//   .option('-a, --address <address>', 'Address to mint tokens to')
//   .action(async (amount, address) => {
//     await contractObject.mintTokens(address, amount);
//   });

program
  .command('create-cod-point')
  .option(
    '-c, --coordiantes <Xcoordinate> <Ycoordinate>',
    'Coordinates for the point onto which you want to genetate the rendering in 3Dtiles format'
  )
  .description(
    'allows user to create compute job on bacalhau / lillypad network with given cartesian points as location'
  )
  .action(async (image_name, xcoord, ycoord, shape_file_cid) => {
    surfaceReconstructionJob(image_name, xcoord, ycoord, shape_file_cid);
  });
program
  .command('create-cod-polygon')
  .option(
    '-i,--input <longitudeMax> <longitudeMin> <lattitudeMax> <lattitudeMin>',
    'defines the corresponding boundation which is used for the generation the rendering in 3Dtiles format'
  )
  .option('-s, --shape_file <shape_file_cid>')
  .description(
    'allows user to create compute job resulting rendering of the bounded polygon region'
  )
  .action(async (XMax, YMax, Xmin, YMin) => {
    try {
      surfaceReconstructionJobPolygon(
        XMax,
        YMax,
        Xmin,
        YMin,
        '',
        'devextralabs/colmap_processing'
      );
    } catch (e: any) {
      console.log(e);
    }
  });

program
  .command('create-job-cityGML')
  .description(
    'converts the given cropped laz file into the cityGML format given the associated geometric mapping datasets'
  )
  .option(
    '-Y, --yaml <input_yaml_file>',
    'path of the yaml configuration file as defined by the user'
  )
  .option(
    '-O',
    '--obj_file <output_obj_file>',
    'path of the output object file'
  )
  .option(
    '-C',
    '--citygml_file <output_citygml_file>',
    'path of the output citygml file'
  )
  .action(async (input_yaml_file, output_obj_file, output_citygml_file) => {
    exec(
      'lilypad docker run devextralabs/citygml' +
        input_yaml_file +
        output_obj_file +
        output_citygml_file,
      (error, stdout, stderr) => {
        if (stdout) {
          console.log('the output log is', stdout);
        }
      }
    );
  });

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
  );

program.parse();

const options = program.opts();
