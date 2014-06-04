/**
 * Created by filip on 02/06/14.
 */
if(process.argv[2] === undefined){
    throw new Error("Source file missing. Format: 'node setEnv.js sourceFile destinationFile'")
}
if(process.argv[3] === undefined){
    throw new Error("Destination file missing. Format: 'node setEnv.js sourceFile destinationFile'")
}

var fs = require('fs');
var configurer = require("../app/configurer");

fs.readFile(process.argv[2], 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var result = configurer.configure(JSON.parse(data));
    fs.writeFile(process.argv[3], "[" + JSON.stringify(result[0], null, '\t') + "]");
});