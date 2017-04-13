/* Requires */
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");
const EventEmitter = require('events');
const ldObj = require('lodash/object');
const NotDirectoryTypeError = require('./customErrors/customErrors').NotDirectoryTypeError;
const NotFileTypeError = require('./customErrors/customErrors').NotFileTypeError;
const DirectoryDoesntExistError = require('./customErrors/customErrors').DirectoryDoesntExistError;
const FileDoesntExistError = require('./customErrors/customErrors').FileDoesntExistError;

/* Internals */
exports = module.exports = new EventEmitter();
const mainDirectory = path.dirname(process.argv[1]);
const configDirectory = path.join(mainDirectory, 'configs');
let alreadyInit = false;
let config = {};

/* Exports */
exports.init = init;
exports.get = get;
exports.set = set;
exports.isInit = isInit;
exports.resetConfig = resetConfig;


/* Initiate Promise||Callback */
function init(cb) {
    return new Promise((resolve, reject) => {
        checkDirectory(configDirectory)
            .then(checkFile)
            .then(loadFile)
            .then(() => emitDone(resolve))
            .catch(DirectoryDoesntExistError, () => {
                createDirectory(configDirectory)
                    .then(() => init(cb))
                    .catch((err) => emitError(err, reject))
            })
            .catch(FileDoesntExistError, () => {
                createFile(configDirectory)
                    .then(() => init(cb))
                    .catch((err) => emitError(err, reject))
            })
            .catch((err) => emitError(err, reject))
        ;
    }).asCallback(cb)
}


/* Handle Directory */
function createDirectory(dir) {
    return new Promise((resolve, reject) => {
        console.log(`Creating directory ${dir}`);
        fs.mkdirAsync(dir)
            .then(resolve(dir))
            .catch((err) => reject(err))
    })
}

function checkDirectory(dir) {
    return new Promise((resolve, reject) => {
        console.log('Checking directory...');
        fs.statAsync(dir)
            .then((stats) => {
                if (!stats.isDirectory()) {
                    let error = new NotDirectoryTypeError(`${dir} is not a directory type`);
                    error.code = 'ENOTDIR';
                    return reject(error);
                } else {
                    console.log("OK!");
                    resolve(dir);
                }
            })
            .catch((err)=> {
                if (err && err.code === 'ENOENT') {
                    console.log("NOT OK!");
                    return reject(new DirectoryDoesntExistError(`${dir} doesnt exist`));
                } else {
                    return reject(err);
                }
            });
    })
}

/* Handle File */
function checkFile(dir) {
    return new Promise((resolve, reject) => {
        console.log('Checking configuration file...');
        let filePath = path.join(dir, 'simpleConfig.json');
        fs.statAsync(filePath)
            .then((stats) => {
                if (!stats.isFile()) {
                    let error = new NotFileTypeError(`${filePath} is not a file type`);
                    error.code = 'ENOTDIR';
                    return reject(error);
                } else {
                    console.log("OK!");
                    resolve(dir);
                }
            })
            .catch((err)=> {
                if (err && err.code === 'ENOENT') {
                    console.log("NOT OK!");
                    return reject(new FileDoesntExistError(`${filePath} doesnt exist`));
                } else {
                    return reject(err);
                }
            });
    })
}

function createFile(dir) {
    return new Promise((resolve, reject) => {
        let filePath = path.join(dir, 'simpleConfig.json');
        console.log(`Creating configuration file ${filePath}`);
        fs.writeFileAsync(filePath ,JSON.stringify({}))
            .then(() => resolve(dir))
            .catch((err) => reject(err))
    })
}

function loadFile(dir) {
    return new Promise((resolve, reject) => {
        let filePath = path.join(dir, 'simpleConfig.json');
        console.log(`Loading configuration file ${filePath}`);
        fs.readFileAsync(filePath )
            .then((data) => {
                config = JSON.parse(data);
                resolve(dir)
            })
            .catch((err) => reject(err))
    })
}

/* Events */
function emitError(err, reject) {
    exports.emit('Error', err);
    if (reject && typeof reject === 'function') {
        return reject(err)
    }
}

function emitDone(resolve) {
    alreadyInit = true;
    console.log('Simple config Init Done!');
    if (resolve && typeof resolve === 'function') {
        return resolve(alreadyInit)
    }
}

/* Controls */
function get(path, cb) {
    return new Promise((resolve, reject) => {
        if (typeof path === 'undefined') {
            return reject(new Error('path must be defined'));
        }
        if (!isInit()) {
            return reject(new Error('simple config must be init first'));
        }
        return resolve(ldObj.get(config, path))
    }).asCallback(cb)
}

function set(path, value, cb) {
    return new Promise((resolve, reject) => {
        if (typeof path === 'undefined' || typeof value === 'undefined') {
            return reject(new Error('path or value must be defined'));
        }
        if (!isInit()) {
            return reject(new Error('simple config must be init first'));
        }
        ldObj.set(config, path, value);
        updateFile().catch((err) => console.error(err));
        return resolve(ldObj.get(config, path))
    }).asCallback(cb)
}

function resetConfig(obj, cb) {
    return new Promise((resolve, reject) => {
        config = typeof obj === 'object' ? obj : {};
        if (!isInit()) {
            return reject(new Error('simple config must be init first'));
        }
        updateFile()
            .then(() => resolve())
            .catch((err) => reject(err))
    }).asCallback(cb)
}

function updateFile() {
    return new Promise((resolve, reject) => {
        let filePath = path.join(configDirectory, 'simpleConfig.json');
        fs.writeFileAsync(filePath ,JSON.stringify(config, null, 2))
            .then(() => resolve())
            .catch((err) => reject(err))
    })
}

function isInit() {
    return alreadyInit;
}