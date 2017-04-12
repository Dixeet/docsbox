const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");
const EventEmitter = require('events');
const NotDirectoryError = require('./customErrors/customErrors').NotDirectoryError;

exports = module.exports = new EventEmitter();
const mainDirectory = path.dirname(process.argv[1]);
const configDirectory = path.join(mainDirectory, 'configs');

exports.init = init;

function init(cb) {
    return new Promise((resolve, reject) => {
        checkDirectory(configDirectory)
            .catch(NotDirectoryError, (err) => {
                emitError(err, reject);
            })
            .catch((err) => {
                if(err && err.code === 'ENOENT'){

                } else {
                    emitError(err);
                    return reject(err)
                }
            })
            .finally(()=> {
                console.log('endInit');
                resolve('promiseDone');
            })
        ;
    }).asCallback(cb)
}

function checkDirectory(dir) {
    return new Promise((resolve, reject) => {
        fs.statAsync(dir)
            .then((stats) => {
                if (!stats.isDirectory()) {
                    let error = new NotDirectoryError(`${dir} is not a directory type`);
                    error.code = 'ENOTDIR';
                    return reject(error);
                } else {
                    resolve();
                }
            })
            .catch((err)=> {
                return reject(err);
            });
    })
}

function emitError(err, reject) {
    exports.emit('Error', err);
    if(reject && typeof reject === 'function') {
        return reject(err)
    }
}
