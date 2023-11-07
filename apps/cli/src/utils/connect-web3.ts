import { ethers } from 'ethers';
import { configDotenv } from 'dotenv';
configDotenv({ path: '../.env' });

export const RPC = process.env.RPC;
export const provider = new ethers.providers.JsonRpcProvider(RPC);
// to be updated once the infra is deployed by the localhost
export const SERVICE_SOLVER=""
export const SERVICE_MEDIATORS=""
