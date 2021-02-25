const fs = require('fs');

const readJSON = (path) => {
  try {
    const json = fs.readFileSync(path, { encoding: 'utf-8'});
    return JSON.parse(json);
  } catch(err) {
    throw Error(err);
  }
}

const writeJSON = (path, json) => {
  try {
    const string = JSON.stringify(json);
    fs.writeFileSync(path, string);
  } catch(err) {
    throw Error(err);
  }
}

module.exports = {
  readJSON,
  writeJSON
}