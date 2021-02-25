const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

const SOUNDS_PATH = './public/data/sounds';
const ALLOWED_EXTENSIONS = ['.wav', 'mp3'];
const ALLOWED_TYPES = ['sound', 'parallel container', 'sequence container', 'random container', 'sound fx'];

const validateDirname = (id) => {
  const version = uuid.version;
  const validate = uuid.validate;

  return validate(id) && version(id) === 4;
}

const checkDirname = (id) => {
  return new Promise((resolve, reject) => {
    try {
      fs.lstat(`${SOUNDS_PATH}/${id}`, (err, stat) => {
        if (!err) {
          if (stat.isDirectory()) {
            resolve(validateDirname(id));
          }
        } else {
          reject(err);
        }
      });
    } catch(err) {
      reject(err);
    }
  });
}

const validateSoundPackage = (path) => {
  let mainJSON;
  const filenames = fs.readdirSync(path, { encoding: 'utf-8' });

  filenames.forEach(filename => {
    if (filename === 'index.json') {
      mainJSON = readJSON(`${path}/${filename}`);
    } else if (!ALLOWED_EXTENSIONS.includes(path.extname(filename))) {
      throw Error(`${filename} is not one of allowed file types: ${ALLOWED_EXTENSIONS}`);
    }
  });
}

const validateIndexJSON = (json) => {
  json.forEach(object => {
    if (!ALLOWED_TYPES.includes(object.type)) {
      throw Error(`object of type ${object.type} is not a valid sound engine object`);
    }
  });
}

const readJSON = (path) => {
  const json = fs.readFileSync(path, { encoding: 'utf-8'});
  return JSON.parse(json);
}

fs.readdir(SOUNDS_PATH, (err, files) => {
  let mainJSON = {};

  if (!err) {
    files.forEach(async filename => {
      try {
        if (filename === 'index.json') {
          mainJSON = readJSON(`${SOUNDS_PATH}/${filename}`);
        }
        else if (!(await checkDirname(filename))) {
          validateSoundPackage(`${SOUNDS_PATH}/${filename}`);
        }
      } catch(err) {
        console.error(err);
      }
    });
  } else {
    console.error(err);
  }
});