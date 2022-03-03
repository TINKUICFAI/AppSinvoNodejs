const fs = require("fs");
const path = require("path");

const logFolderPath = path.resolve(__dirname, `..${path.sep}..${path.sep}`, "logs");
console.log("Logs Path:", logFolderPath);

// check if log folder exists
if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath, { recursive: true });
}

const infoWriteStream = fs.createWriteStream(`${logFolderPath}${path.sep}info.txt`);
const logWriteStream = fs.createWriteStream(`${logFolderPath}${path.sep}log.txt`);
const errorWriteStream = fs.createWriteStream(`${logFolderPath}${path.sep}error.txt`);
const debugWriteStream = fs.createWriteStream(`${logFolderPath}${path.sep}debug.txt`);

function info(moduleName, functionName, msg) {
    const message = `${new Date().toISOString()} : ${moduleName} : ${functionName} : ${JSON.stringify(msg)} \n`;
    infoWriteStream.write(message);
}

function log(moduleName, functionName, msg) {
    const message = `${new Date().toISOString()} : ${moduleName} : ${functionName} : ${JSON.stringify(msg)} \n`;
    logWriteStream.write(message);
}

function error(moduleName = "", functionName = "", msg) {
    let message = "";

    try {
        message = `${new Date().toISOString()} : ${moduleName} : ${functionName} : ${JSON.stringify(msg)} \n`;
    } catch (err) {
        message = `${new Date().toISOString()} : ${moduleName} : ${functionName} : ${msg.toString()} \n`;
    }

    errorWriteStream.write(message);
}

function debug(moduleName, functionName, msg) {
    const message = `${new Date().toISOString()} : ${moduleName} : ${functionName} : ${JSON.stringify(msg)} \n`;
    debugWriteStream.write(message);
}

module.exports = { info, debug, error, log };
