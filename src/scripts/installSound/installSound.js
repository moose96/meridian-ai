const fs = require('fs');

const { SOUNDS_PATH } = require('./constants');
const { readJSON, writeJSON } = require('./utility/json');
const { installNewSounds } = require('./utility/install');

fs.readdir(SOUNDS_PATH, (err, files) => {
  let mainJSON = {};

  if (!err) {
    try {
      const newSounds = installNewSounds(files);

      if (newSounds.length > 0) {
        mainJSON = readJSON(`${SOUNDS_PATH}/index.json`);
        mainJSON = [...mainJSON, ...newSounds];
        writeJSON(`${SOUNDS_PATH}/index.json`, mainJSON);
        console.log('successfully installed')
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