import {deployModicrumContractFixture} from './utils';
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import {ModicrumContractAdapter, IModicrumAdapter} from "../src/types"
import { Contract } from 'ethers';
import {ethers} from "hardhat"

describe('Modicrum',async () => {
    let deployer = await ethers.getSigners()
  let modicrum:  (ModicrumContractAdapter)
  let dockerImageName = 'lxet/lidar_geocoordinate'
    // todo: change the parameters
  let jobInputParameters: IModicrumAdapter.GeorenderPointParamsStruct   = {
    coordX: '43',
    CoordY: '34',
    ipfsCID: 'bafyDemoOZIAEAOININDOIXNAIOJZiazeioue',
    username: 'toto'
  }

  before(async () => {
    modicrum = await loadFixture(deployModicrumContractFixture);

    console.log("fixture function loaded", modicrum.address);
  }); 

  it('should be deployed', async () => {
    expect(modicrum.address).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it('should be able to setup the job', async () => {
   let jobId =  modicrum.attach(await deployer[0].getAddress()).runComputeJob(
        jobInputParameters, dockerImageName
    )
    expect(jobId).to.be.a('number')
  })
});
