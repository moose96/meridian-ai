function getFilename(soundID, filename) {
  return `/data/sounds/${soundID}/${filename}`;
}

function hasObjectsNumbers(objects) {
  return objects && objects.length > 0  && typeof objects[0] === 'number';
}

function hasObjectsObjects(objects) {
  return objects && objects.length > 0  && typeof objects[0] !== 'number';
}

export function prepareObjects(soundID, array) {
  return array.map(object => {
    if (object.type === 'sound') {
      return {
        ...object,
        filename: getFilename(soundID, object.filename)
      }
    }
    if (hasObjectsObjects(object.objects)) {
      console.log(object);
      return {
        ...object,
        objects: prepareObjects(soundID, object.objects)
      }
    }
    if (object.root) {
      return {
        ...object,
        id: soundID
      }
    }
    return object;
  })
}

export function joinObjects(objects) {
  let result = [];

  objects.forEach(array => {
    const offset = result.length;

    array.forEach(object => {
      if (hasObjectsNumbers(object.objects)) {
        result.push({
          ...object,
          objects: object.objects.map(o => o + offset)
        });
      } else {
        result.push(object);
      }
    });
  });

  return result;
}