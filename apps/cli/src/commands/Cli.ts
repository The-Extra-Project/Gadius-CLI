import { exec, execSync } from 'child_process';
import { surfaceReconstructionType } from './lilypad-utils';
import * as fs from 'fs';
const path = require('path');
export async function surfaceReconstructionJob(
  Xcoord: number,
  Ycoord: number,
  shp_file_identifiers: string,
  template_name: string
) {
  // return new Promise((resolve, reject) => {
  //     console.log("running cli command")
  //     exec("/Users/decroissant/go/bin/lilypad run + image_file + Xcoord + Ycoord + shp_file_identifiers",async (error, stdout, stderr) => {
  //         if (error) {
  //             console.error(`exec error: ${error}`);
  //             return;
  //         }
  //         console.log(`execution result ${stdout}`);
  //         console.error(`stderr: ${stderr}`);

  //     } );
  // })
  try {
    const output = execSync(
      `/Users/decroissant/go/bin/lilypad run  devextralabs/georender ${image_file} ${Xcoord} ${Ycoord} ${shp_file_identifiers}`
    );
    console.log('generated trace' + output.toString());
  } catch (error) {
    console.log('error', error);
  }
}

export async function surfaceReconstructionJobPolygon(
  XMax: number,
  YMax: number,
  Xmin: number,
  YMin: number,
  shp_file_identifiers: string,
  template_name: string
) {
  try {
    const output = execSync(
      `/Users/decroissant/go/bin/lilypad run devextralabs/georender ${XMax} ${YMax} ${Xmin} ${YMin} ${shp_file_identifiers} ${template_name}`
    );
    console.log('generated trace' + output.toString());
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * outputs the result that is output in the temporary folder.
 *
 *
 *
 */
export function fetch_result(cid_file: string) {
  console.log('fetching the file output details');

  const extendedPath = path.join(
    __dirname,
    '/tmp' + '/lilypad/' + cid_file + '/output'
  );
  fs.readdir('.', function (err, files) {
    files.forEach(function (file) {
      console.log('output:' + file);
    });
  });
}
