const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");
const EventEmitter = require('events');
const NotDirectoryTypeError = require('./customErrors/customErrors').NotDirectoryTypeError;
const DirectoryDoesntExistError = require('./customErrors/customErrors').DirectoryDoesntExistError;

exports = module.exports = new EventEmitter();
const mainDirectory = path.dirname(process.argv[1]);
const configDirectory = path.join(mainDirectory, 'configs');

exports.init = init;

function init(cb) {
    return new Promise((resolve, reject) => {
        checkDirectory(configDirectory)
            .then((dir) => console.log(dir))
            .catch(DirectoryDoesntExistError, () => {
                createDirectory(configDirectory)
                    .then(() => init(cb))
                    .catch((err) => emitError(err, reject))
            })
            .catch((err) => emitError(err, reject))
        ;
    }).asCallback(cb)
}

function createDirectory(dir){
    return new Promise((resolve, reject) => {
        console.log(`Creating directory ${dir}`);
        fs.mkdirAsync(dir)
            .then(resolve())
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
                    resolve(dir);
                }
            })
            .catch((err)=> {
                if(err && err.code === 'ENOENT'){
                    return reject(new DirectoryDoesntExistError(`${dir} doesnt exist`));
                } else {
                    return reject(err);
                }
            });
    })
}

function emitError(err, reject) {
    exports.emit('Error', err);
    if(reject && typeof reject === 'function') {
        return reject(err)
    }
}
