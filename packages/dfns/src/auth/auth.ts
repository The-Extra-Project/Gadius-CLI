import 'dotenv';
import {apiClientConfig, apiKeyDetails, requestHeaders } from "../types"

const ORG_ID = process.env.ORG_ID;
const API  = process.env.API_RPC;
const applicationId = process.env.APPLICATION_ID;
/**
 * this library consist of the functions that permits user login
 * using user login challenge.
 * 
 */

class Auth {

 apiClientConfig: apiClientConfig
 requesteaders: requestHeaders

 /**
  *
  */
 constructor(
    _apiClientConfig: apiClientConfig
 ) {
    
    this.apiClientConfig = _apiClientConfig
    this.requesteaders.dfnsAppid = applicationId
 }


}