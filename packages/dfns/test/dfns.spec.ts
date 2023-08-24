// import { signerConfig, apiClientConfig } from '../src/types'; 
// import {dfnsAuth} from '../src/dfns'
// import "dotenv";
// import {expect} from 'chai'
// require('dotenv').config()


// const signerParam : signerConfig= {
//   privateKey: process.env.PRIVATE_KEY || '',
//   credId: process.env.CRED_ID || '',
//   endpoint: 'http://localhost:3000' ,
//   appOrigin: ''
// };

// export const dfnsApiclient: apiClientConfig  = {
//   appId: process.env.ORG_ID, 
//   baseUrl: "https://api.dfns.ninja",
//   authToken: process.env.AUTH_TOKEN,
//   signer: signerParam,


// }
// describe('dfnsAuth', async () => {
//   it('should initiate connection w/ the backend API', () => {

//     let authObj = new dfnsAuth(
//       signerParam,
//       dfnsApiclient

//     )
//     expect(authObj).to.be.not.null;

//   });
// });