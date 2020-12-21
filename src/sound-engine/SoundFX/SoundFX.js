import Pizzicato from 'pizzicato';

import SoundEngineObject from '../base/SoundEngineObject';
import Container from '../containers/Container';
import Equalizer from '../effects/Equalizer';
import ExternalOutput from './ExternalOutput';

import { setCurveValue, setCurves } from '../redux';

const defaultObject = {

}

class SoundFX extends SoundEngineObject
{
  name = "Sound FX";
  type = "SoundFX";
  externalOutputs = [];

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

  setReduxStore(store) {
    super.setReduxStore(store);
    this.redux.store.dispatch(setCurves('soundfx'));
  }

  setCurve(name, value) {
    this.redux.store.dispatch(setCurveValue('soundfx', name, value));
  }

  toPlainObject() {
    return {
      ...super.toPlainObject(),
      externalOutputs: this.externalOutputs
    }
  }
}

export default SoundFX;