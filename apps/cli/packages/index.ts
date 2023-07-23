import {Command} from "commander" 
import {exec} from "child_process"
let program = new Command();

program.name('gadius-cli').description('CLI to run the orchestrating geospatial compute on bacalau').version('0.0.1')

const image = 'lxet/lidar_geocoordinate'


program.command('create-lillypad-job')
.description('creates the job with the specified point parameters')
.argument("<Xcoordinate> ", "XCoorindate of the place ")
.argument("<Ycoordinate> ", "YCoorindate of the place ")
.action((Xcoordinate, Ycoordinate) => {
    exec(
        "lillypad run " + image + "" + Xcoordinate + "" + Ycoordinate, 
         (error) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        }
    )
})

program.command("get-the-job-status")
.description('gets the status of the job based on the jobId')
.action(() => {
    exec(
        "lillypad server-logs ", 
         (error) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        }
    )
})

program.parse();