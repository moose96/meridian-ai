import Equalizer from './Equalizer';

export default function createEffect(effect) {
  switch(effect.type) {
    case 'equalizer':
      return new Equalizer(effect);
    default :
      return effect;
  }
}