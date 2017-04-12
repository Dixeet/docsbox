exports = module.exports = {};

exports.NotDirectoryError = class NotDirectoryError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, NotDirectoryError)
    }
};