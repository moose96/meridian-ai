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
      return new RandomContainer(object.objects);
    case "sequence container": {
      console.log(object);
      return new SequenceContainer(object);
    }
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
      const object = data[value];
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

function SoundEngine({ data, play }) {
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
  }, [play])
  return <div></div>
}

export default SoundEngine;