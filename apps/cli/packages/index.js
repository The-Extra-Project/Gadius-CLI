"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var child_process_1 = require("child_process");
var program = new commander_1.Command();
program.name('gadius-cli').description('CLI to run the orchestrating geospatial compute on bacalau').version('0.0.1');
var image = 'lxet/lidar_geocoordinate';
program.command('create-lillypad-job')
    .description('creates the job with the specified point parameters')
    .argument("<Xcoordinate> ", "XCoorindate of the place ")
    .argument("<Ycoordinate> ", "YCoorindate of the place ")
    .action(function (Xcoordinate, Ycoordinate) {
    (0, child_process_1.exec)("lillypad run " + image + "" + Xcoordinate + "" + Ycoordinate, function (error) {
        if (error) {
            console.log("error: ".concat(error.message));
            return;
        }
    });
});
program.command("get-the-job-status")
    .description('gets the status of the job based on the jobId')
    .action(function () {
    (0, child_process_1.exec)("lillypad server-logs ", function (error) {
        if (error) {
            console.log("error: ".concat(error.message));
            return;
        }
    });
});
program.parse();
