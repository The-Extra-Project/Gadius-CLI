
import { AsymmetricKeySigner } from '@dfns/sdk-keysigner';
import { DfnsApiClient } from '@dfns/sdk';


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


export type apiKeyDetails =  {
name: string // name of the given API key requested 
private_key: string // its the actual key :radioactive: . 
}
  

export type requestHeaders = {
dfnsAppid: string
dfnsNonce: string
}



export type dfnsIds = {
prefix: string
suffix:string
hash: string
}

/**
   * type for the data request for executing the request for compute.
   * TODO: actual specifications to be decided.
   *
   */
export  interface requestsSign {
    dockername: string;
    addressUser: string;
  }
  
  declare global {
    interface Window {
      apiClient: DfnsApiClient;
    }
  }
  