import { createStore } from 'redux';

// import SoundEngineObject from '../base/SoundEngineObject';
import EngineNode from '../base/EngineNode';
import Container from '../containers/Container';
import Equalizer from '../effects/Equalizer';
import ExternalOutput from './ExternalOutput';

import reducer, { setParamValue, setParamValueImmediately } from './redux';

const defaultObject = {

}

class SoundFX extends EngineNode
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
        frequency: 8000,
        params: [{
          name: 'brightness',
          key: 'gain',
          min: -3.0,
          max: 0.0
        }]
      }, {
        type: "peaking",
        frequency: 6500,
        params: [{
          name: 'sharpness',
          key: 'gain',
          min: -3.0,
          max: 0.0
        }]
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
      // template place of this code
      const _initObject = {
        params: [{
          name: 'distance',
          key: 'gain',
          min: 1.0,
          max: 0.0
        }]
      };
      // ...
      const newExternal = new ExternalOutput(_initObject);
      newExternal.setParamStore(this.paramStore);
      this.outputNode.connect(newExternal.source);
      this.externalOutputs.push(newExternal);
    }
  }

  externalConnect(index, external) {
    this.externalOutputs[index].connect(external);
  }

  get storedParams() {
    return this.paramStore.getState().params;
  }

  setParam(name, value, variant = 'gradual') {
    let action;

    if (variant === 'gradual') {
      action = setParamValue(name, value);
    } else if (variant === 'immediately') {
      action = setParamValueImmediately(name, value);
    } else {
      throw Error('Variant argument of setParam function must be one of the two following values: gradual or immediately.');
    }

    if (this.paramStore.getState().params[name] !== undefined) {
      if (value >= 0 && value <= 100) {
        this.paramStore.dispatch(action);
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
      params: this.paramStore.getState(),
      storedParams: this.storedParams
    }
  }

  setParamStore(store) {
    super.setParamStore(store);
    this.source.setParamStore(store);
  }
}

export default SoundFX;