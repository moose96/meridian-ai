const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

const {
  SOUNDS_PATH,
  ALLOWED_EXTENSIONS,
  ALLOWED_TYPES
} = require('../constants');
const { readJSON } = require('./json');

const isUUID = (id) => {
  const version = uuid.version;
  const validate = uuid.validate;

  return validate(id) && version(id) === 4;
}

const isDirectory = (id) => {
  try {
    const stat = fs.lstatSync(`${SOUNDS_PATH}/${id}`);
    return stat.isDirectory();
  } catch(err) {
    throw Error(err);
  }
}

const validateSoundPackage = (_path) => {
  let filenames = fs.readdirSync(_path, { encoding: 'utf-8' });
  const mainJSON = readJSON(`${_path}/index.json`);

  filenames = filenames.filter(filename => filename !== 'index.json');

  filenames.forEach(filename => {
    if (!ALLOWED_EXTENSIONS.includes(path.extname(filename))) {
      throw Error(`${filename} is not one of allowed file types: ${ALLOWED_EXTENSIONS}`);
    }
  });

  validateIndexJSON(mainJSON);
}

const validateIndexJSON = (json) => {
  if (!Array.isArray(json)) {
    throw Error('Main package json file should be an array.');
  }
  json.forEach(object => {
    if (!ALLOWED_TYPES.includes(object.type)) {
      throw Error(`object of type ${object.type} is not a valid sound engine object`);
    }
  });
}

module.exports = {
  isDirectory,
  validateSoundPackage,
  isUUID
}