
function searchTree(object, callback, result) {
  if (callback(object)) {
  result = object;
  } else {
    if (Array.isArray(object.source)) {
      object.source.forEach(source => result = searchTree(source, callback, result));
    } else {
      // result = searchTree(object.source, callback, result);
    }
  }

  return result;
}

export const modifyTreeValue = (object, callback) => {
  callback(object);
  if (Array.isArray(object.source)) {
    object.source.forEach(source => modifyTreeValue(source, callback));
  }
}

export default searchTree;