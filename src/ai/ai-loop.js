let id;

export function startLoop(sounds /*object*/) {
  id = setInterval(() => {
    sounds.forEach(sound => {
      Object.entries(sound.storedParams).forEach(([key, value]) => {
        if (key !== 'gradual') {
          sound.setParam(key, Math.floor(Math.random() * 100));
        }
      });

      console.log(sound.storedParams);
    });
  }, 10000);
}

export function stopLoop() {
  clearInterval(id);
}