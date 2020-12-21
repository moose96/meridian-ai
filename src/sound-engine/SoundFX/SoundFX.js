import Pizzicato from 'pizzicato';
import { createStore } from 'redux';

import SoundEngineObject from '../base/SoundEngineObject';
import Container from '../containers/Container';
import Equalizer from '../effects/Equalizer';
import ExternalOutput from './ExternalOutput';

import reducer, { setParamValue } from './redux';

const defaultObject = {

}

class SoundFX extends SoundEngineObject
{
  name = "Sound FX";
  type = "SoundFX";
  externalOutputs = [];
  params = [{
    name: 'volume',
    key: 'volume',
    min: 0,
    max: 1
  }]

  constructor(_initObject) {
    const initObject = {...defaultObject, ..._initObject};
    super(initObject);

    if (initObject.objects[0] instanceof Container) {
      this.source = initObject.objects[0];
    } else {
      throw Error('Source has to be an instance of Container class');
    }

    this._connectSource(this.outputNode);

    const eq = new Equalizer({
      effects: [{
        type: "highshelf",
        frequency: 10000
      }]
    });
    this.addEffect(eq);

    this.setParamStore(createStore(reducer));
  }

  _connectSource(destination) {
    this.source.connect(destination);
  }

  _disconnectSource() {
    this.source.disconnect();
  }

  play() {
    super.play();
    this.source.play();
  }

  stop() {
    super.stop();
    this.source.stop();
  }

  createExternalOutputs(size) {
    for (let i = 0; i < size; i++) {
      // const gain = Pizzicato.context.createGain();
      // gain.gain.value = 0.0;
      const newExternal = new ExternalOutput();
      this.outputNode.connect(newExternal.node);
      this.externalOutputs.push(newExternal);
    }
  }

  externalConnect(index, external) {
    this.externalOutputs[index].connect(external);
  }

  setParam(name, value) {
    if (this.paramStore.getState()[name] !== undefined) {
      if (value >= 0 && value <= 100) {
        this.paramStore.dispatch(setParamValue(name, value));
      } else {
        throw Error(`Value has to be between 0 and 100 (now value is ${value}`);
      }
    } else {
      throw Error(`Can't find ${name} param in param store`);
    }
  }

  toPlainObject() {
    return {
      ...super.toPlainObject(),
      externalOutputs: this.externalOutputs,
      params: this.paramStore.getState()
    }
  }

  setParamStore(store) {
    super.setParamStore(store);
    this.source.setParamStore(store);
  }
}

export default SoundFX;