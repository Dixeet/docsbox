module.exports = {};
exports = module.exports;

exports.NotDirectoryTypeError = class NotDirectoryTypeError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NotDirectoryTypeError);
  }
};

exports.NotFileTypeError = class NotFileTypeError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, NotFileTypeError);
  }
};

exports.DirectoryDoesntExistError = class DirectoryDoesntExistError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, DirectoryDoesntExistError);
  }
};

exports.FileDoesntExistError = class FileDoesntExistError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, FileDoesntExistError);
  }
};