import React, { useEffect, useRef } from 'react';

import {
  Sound,
  RandomContainer,
  SequenceContainer,
  SingleSoundObject,
  MultipleSoundObject,
  SoundField
} from '../../sound-engine';

const createObject = object => {
  switch(object.type) {
    case "random container":
      return new RandomContainer(object);
    case "sequence container":
      return new SequenceContainer(object);
    case "single sound object":
      return new SingleSoundObject(object);
    case "multiple sound object":
      return new MultipleSoundObject(object);
    case "sound":
      return new Sound(object);
    default:
      return object;
  }
}

const resolveLinks = data => {
  const root = data.find(object => object.root);

  const _map = value => {
    if (typeof(value) === 'number') {
      const object = {...data[value]};
      object.objects = object.objects.map(_map);
      return createObject(object);
    } else {
      return createObject(value);
    }
  }

  if (root) {
    root.objects = root.objects.map(_map);
    return createObject(root);
  }
}

function SoundEngine({ data, play, value1 }) {
  const soundField = useRef(new SoundField());

  useEffect(() => {
    if (data) {
      const resolvedData = resolveLinks(data);
      console.log(resolvedData);

      if (resolvedData) {
        resolvedData.setAttenuation(1.0);
        soundField.current.addSound(resolvedData);
      }
    }

  }, [data]);

  useEffect(() => {
    if (play) {
      soundField.current.start();
    } else {
      soundField.current.stop();
    }
  }, [play]);

  useEffect(() => {
    const length = soundField.current.sounds[0] ? soundField.current.sounds[0].objects.length : 0;

    for (let i = 0; i < length; i++) {
      soundField.current.sounds[0].setMutedSound(i, i < value1 ? false : true);
    }
  }, [value1]);

  return <div></div>
}

export default SoundEngine;