import read, { Options } from 'read'

/**
 * function to read the input from command line and accept only the parameters
 * @return returns user string params
 * @param {inputParams} any these are the parameters to be read for the various keys of option defined in the command
 * 
 */

export default async  (inputParams: Options): Promise<any>  => {
    return new Promise(
        function (resolve, reject) {
            read(inputParams, async (err, result) => {
              result ? resolve(result.trim()) : reject(err)
            })
        });
    }



    
    

