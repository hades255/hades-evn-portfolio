const fs = require("fs");
var access = fs.access;
var constants = fs.constants;

const accessDB = (path) =>
  new Promise((res, rej) =>
    access(path, constants.R_OK | constants.W_OK, (err) =>
      err ? rej(err) : res(true)
    )
  );

const readDB = (path) =>
  new Promise((res, rej) =>
    fs.readFile(path, (err, data) => (err ? rej(err) : res(data)))
  );

const writeDB = (path, data) =>
  new Promise((res, rej) =>
    fs.writeFile(path, data, "utf8", (err, data) =>
      err ? rej(err) : res(data)
    )
  );

module.exports = { accessDB, writeDB, readDB };
