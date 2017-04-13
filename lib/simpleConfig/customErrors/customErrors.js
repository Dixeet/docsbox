exports = module.exports = {};

exports.NotDirectoryTypeError = class NotDirectoryTypeError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, NotDirectoryTypeError)
    }
};

exports.DirectoryDoesntExistError = class DirectoryDoesntExistError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, DirectoryDoesntExistError)
    }
};