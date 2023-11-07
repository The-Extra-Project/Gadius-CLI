/**
 * these are the commands for running 
 * 
 */
import { execSync } from 'child_process';
import * as fs from 'fs';
const path = require('path');

export async function surfaceReconstructionJob(
  Xcoord: number,
  Ycoord: number,
  shp_file_identifiers: string,
  template_name: string
) {
  
  try {
    console.log("running surface construction job")
    const output = execSync(
      `/Users/decroissant/go/bin/lilypad run cowsay ${Xcoord} ${Ycoord} ${shp_file_identifiers}`
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

export async function cityGMLPipelineGeneration(
  xml_file_path: string,
  object_file_path:  string,
  output_citygml_file: string,
  cityGML_output_format: string
) {
try {
  const output = execSync(
`/Users/decroissant/go/bin/lilypad run devextralabs/citygml ${xml_file_path} ${object_file_path} ${output_citygml_file} ${cityGML_output_format}`
  )
  console.log('generated trace' + output.toString());
  }
  catch(error) {
  console.log('error', error);
}

}

/*
*
*/

export async function neuralangelo_training(
  group_name:string,
  experient_name: string,
  name_file: string,
  mesh_resolution: number,
  block_resolution: number,
  directory_dataset: string
)
{

  try {
    const output = execSync(
  `/Users/decroissant/go/bin/lilypad run devextralabs/citygml ${group_name} ${experient_name} ${name_file} ${mesh_resolution} ${block_resolution} ${directory_dataset}`
    )
    console.log('generated trace' + output.toString());
    }
    catch(error) {
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
