const fs = require('fs');
const uuid = require('uuid');

const { SOUNDS_PATH } = require('../constants');
const { checkDirname, validateSoundPackage } = require('./validators');

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

module.exports = {
  installNewSounds
}