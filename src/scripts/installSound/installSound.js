const fs = require('fs');

const { SOUNDS_PATH } = require('./constants');
const { readJSON, writeJSON } = require('./utility/json');
const { installNewSounds } = require('./utility/install');
const { isDirectory } = require('./utility/validators');

fs.readdir(SOUNDS_PATH, (err, files) => {
  let mainJSON = {};

  if (!err) {
    try {
      mainJSON = readJSON(`${SOUNDS_PATH}/index.json`);
      let dirs = files.filter(filename => isDirectory(filename));

      if (!Array.isArray(mainJSON)) {
        throw Error("Main index.json should be an array");
      }

      dirs = dirs.filter(dir => !mainJSON.includes(dir));
      const newSounds = installNewSounds(dirs);

      if (newSounds.length > 0) {
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