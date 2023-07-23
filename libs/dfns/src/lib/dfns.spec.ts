import { dfnsAuth,signerConfig } from './dfns';

import "dotenv";

require('dotenv').config().


const signerParam : signerConfig= {
  privateKey: process.env.PRIVATE_KEY || '',
  credId: process.env.CRED_ID || '',
  endpoint: '<http://localhost:3000>' 
};

const dfnsApiclient: client = {
  appid: process.env.ORG_ID, 
  baseUrl: "<https://api.dfns.ninja>",
  authToken: process.env.AUTH_TOKEN",
  signer: process.env.KEY_SIGNER,


}
describe('dfnsAuth', async () => {
  it('should initiate connection w/ the backend API', () => {

    let authObj = new dfnsAuth(
      signerParam,
      dfnsApiclient

    )
    expect(authObj).toBeInstanceOf(dfnsAuth);

  });
});
