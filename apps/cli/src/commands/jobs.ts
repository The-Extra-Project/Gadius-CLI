/**
 * script to define functions for executing container applications on the docker container.
 *
 */
import { execSync, spawn, spawnSync } from 'child_process';
import * as fs from 'fs';
const path = require('path');
import { join } from 'path';

// TODO: get the stack.sh file access from the infra directory, evantually this will be implemented natively in the package.
let stack_file_access = fs.readFileSync(
  join(__dirname, '../../../infra/stack'),
  'utf8'
);

export async function surfaceReconstructionJob(
  Xcoord: number,
  Ycoord: number,
  shp_file_identifiers: string,
  template_name: string
) {
  try {
    console.log('running surface cropping pipeline at the start');
    const output = spawnSync('bash', [
      '-c',
      stack_file_access,
      `${template_name}`,
      ` ${Xcoord} ${Ycoord} ${shp_file_identifiers}`
    ]);
    if (output.stderr) {
      console.log('generated error' + output.stderr);
    } else if (output.stdout) {
      console.log('generated trace' + output.stdout);
    }
  } catch (error) {
    console.log('error', error);
  }
  console.log();
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
    console.log('running surface cropping pipeline at the start');
    const output = spawnSync('bash', [
      '-c',
      stack_file_access,
      `${template_name}`,
      ` ${XMax} ${YMax} ${Xmin} ${YMin} ${shp_file_identifiers}`
    ]);
    console.log('generated trace' + output.toString());
  } catch (error) {
    console.log('error', error);
  }
}

export async function cityGMLPipelineGeneration(
  xml_file_path: string,
  object_file_path: string,
  output_citygml_file: string,
  cityGML_output_format: string,
  template_name: string
) {
  try {
    console.log('running surface cropping pipeline at the start');
    const output = spawnSync('bash', [
      '-c',
      stack_file_access,
      `${template_name}`,
      `${xml_file_path} ${object_file_path} ${output_citygml_file} ${cityGML_output_format}`
    ]);
    console.log('generated trace' + output.toString());
  } catch (error) {
    console.log('error', error);
  }
}

/*
 *
 */

export async function neuralangelo_training(
  group_name: string,
  experient_name: string,
  name_file: string,
  mesh_resolution: number,
  block_resolution: number,
  directory_dataset: string
) {
  try {
    console.log('running surface cropping pipeline at the start');
    const output = spawnSync('bash', [
      '-c',
      stack_file_access,
      `devextralabs/colmap_preprocessing`,
      `${group_name} ${experient_name} ${name_file} ${mesh_resolution} ${block_resolution} ${directory_dataset} `
    ]);
    console.log('generated trace' + output.toString());
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * gets the result that is output in the temporary folder in the container.
 * cid_file is the folder name where the output is stored.
 *
 *
 */
export function fetch_result(cid_file: string) {
  console.log('fetching the output results of the given function execution');

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
