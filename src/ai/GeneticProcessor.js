class GeneticProcessor
{
  sounds = [];
  elite = [];
  #timerID;

  constructor(sounds) {
    this.sounds = sounds;
  }

  loop = () => {
    this.sounds.forEach(sound => {
      Object.entries(sound.storedParams).forEach(([key, value]) => {
        if (key !== 'gradual') {
          sound.setParam(key, Math.floor(Math.random() * 100));
        }
      });
      console.log(sound.storedParams);
    });
  }

  start() {
    this.#timerID = setInterval(this.loop, 5000);
  }

  stop() {
    clearInterval(this.#timerID);
  }
}

export default GeneticProcessor;