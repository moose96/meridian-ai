const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

const {
  SOUNDS_PATH,
  ALLOWED_EXTENSIONS,
  ALLOWED_TYPES
} = require('../constants');
const { readJSON } = require('./json');

const validateDirname = (id) => {
  const version = uuid.version;
  const validate = uuid.validate;

  return validate(id) && version(id) === 4;
}

const checkDirname = (id) => {
  try {
    const stat = fs.lstatSync(`${SOUNDS_PATH}/${id}`);

    if (stat.isDirectory()) {
      return !validateDirname(id);
    } else {
      return false;
    }
  } catch(err) {
    throw Error(err);
  }
}

const validateSoundPackage = (_path) => {
  const filenames = fs.readdirSync(_path, { encoding: 'utf-8' });
  const mainJSON = readJSON(`${_path}/index.json`);

  filenames.forEach(filename => {
    if (filename !== 'index.json' &&
      !ALLOWED_EXTENSIONS.includes(path.extname(filename))) {
        throw Error(`${filename} is not one of allowed file types: ${ALLOWED_EXTENSIONS}`);
    }
  });

  validateIndexJSON(mainJSON);
}

const validateIndexJSON = (json) => {
  json.forEach(object => {
    if (!ALLOWED_TYPES.includes(object.type)) {
      throw Error(`object of type ${object.type} is not a valid sound engine object`);
    }
  });
}

module.exports = {
  checkDirname,
  validateSoundPackage,
}