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

const readJSON = (path) => {
  try {
    const json = fs.readFileSync(path, { encoding: 'utf-8'});
    // console.log(json);
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

const installNewSounds = (files) => {
  const newSounds = [];

  try {
    files.forEach(filename => {
      if (checkDirname(filename)) {
        const path = `${SOUNDS_PATH}/${filename}`;
        validateSoundPackage(path);
        const newUUID = uuid.v4();
        fs.renameSync(path, `${SOUNDS_PATH}/${newUUID}`);
        newSounds.push(newUUID);
      }
    });
  } catch(err) {
    throw Error(err);
  }

  return newSounds;
}

fs.readdir(SOUNDS_PATH, (err, files) => {
  let mainJSON = {};

  if (!err) {
    try {
      const newSounds = installNewSounds(files);

      if (newSounds.length > 0) {
        mainJSON = readJSON(`${SOUNDS_PATH}/index.json`);
        mainJSON = [...mainJSON, ...newSounds];
        writeJSON(`${SOUNDS_PATH}/index.json`, mainJSON);
      } else {
        console.log('nothing to install');
      }
    } catch(err) {
      console.log(err);
    }
  } else {
    console.error(err);
  }
});