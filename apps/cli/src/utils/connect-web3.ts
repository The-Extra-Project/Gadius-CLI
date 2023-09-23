import { ethers } from 'ethers';
import { configDotenv } from 'dotenv';
configDotenv({ path: '../.env' });

export const RPC = process.env.RPC;
export const provider = new ethers.providers.JsonRpcProvider(RPC);


