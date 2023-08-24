import 'axios';
import { DfnsApiClient, DfnsApiClientOptions, DfnsError } from '@dfns/sdk';
import { AsymmetricKeySigner } from '@dfns/sdk-keysigner';
/**
 * @class dfnsAuth is the package to interact with the dfns.co API in order to
 * - Spin up the EOA and setup authenticated signin session.
 * - setting up the policy based on certain conditions of spending operations
 *
 *
 *
 */
require('dotenv').config();

export interface signerConfig {
  privateKey: string;
  credId: string;
  endpoint: string; 
  appOrigin: string;
  algorithm?: string;
}
export interface apiClientConfig {
  appId: string;
  baseUrl: string;
  authToken: string;
  signer: AsymmetricKeySigner;
}

/**
 * type for the data request for executing the request for compute.
 * TODO: actual specifications to be decided.
 *
 */
interface requestsSign {
  dockername: string;
  addressUser: string;
}

declare global {
  interface Window {
    apiClient: DfnsApiClient;
  }
}

export class dfnsAuth {
  keySigner: AsymmetricKeySigner;
  apiClient: DfnsApiClient;
  //admins: string[]; // COMPROMISED method, need to change for more secure method

  constructor(
    signerConfig: signerConfig,
    apiClientConfig: DfnsApiClientOptions
  ) {
    this.keySigner = new AsymmetricKeySigner({
      privateKey: signerConfig.privateKey,
      credId: signerConfig.credId,
      appOrigin: signerConfig.appOrigin,
    });
    this.apiClient = new DfnsApiClient({
      appId: 'ap-2gg3n-bbr1t-9p78dlmcl4uikvnt',
      baseUrl: 'https://api.dfns.ninja',
      authToken: process.env.AUTH_TOKEN,
      signer: this.keySigner,
    });
  }

  /**
   * @param params is the input of the request that is to be signed by the user for the validation of the data.
   */
  async signData(params: requestsSign): Promise<any> {
    let returnSign: any;
    // IMP: very stupid technique for now: adding all the corresponding strings and then signing
    let combinedString: string =
      params.addressUser + params.dockername;

    try {
      returnSign = await this.keySigner.sign(combinedString);
    } catch (err: unknown) {
      if (err instanceof DfnsError) {
        console.error(err);
      }
    }
    return returnSign;
  }
}
