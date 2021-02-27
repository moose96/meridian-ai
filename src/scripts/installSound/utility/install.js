const fs = require('fs');
const uuid = require('uuid');

const { SOUNDS_PATH } = require('../constants');
const { isDirectory, isUUID, validateSoundPackage } = require('./validators');

const installNewSounds = (files) => {
  const newSounds = [];

  try {
    files.forEach(filename => {
      if (!isDirectory(filename)) {
        throw Error(`${filename} should be a directory`);
      }

      const path = `${SOUNDS_PATH}/${filename}`;
      validateSoundPackage(path);

      let newPath = filename;
      if (!isUUID(newPath)) {
        newPath = uuid.v4();
        fs.renameSync(path, `${SOUNDS_PATH}/${newPath}`);
      }

      newSounds.push(newPath);
    });
  } catch(err) {
    throw Error(err);
  }

  return newSounds;
}

module.exports = {
  installNewSounds
}