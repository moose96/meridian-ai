export function mixParams(leftParams, rightParams, options) {
  const PRECISION = 10000;
  const { mutationProbability, mutationSize } = options;
  let resultObject = {};
  let mutationOffset = 0.0;

  Object.entries(leftParams).forEach(([key, value]) => {
    if (Math.floor(Math.random() * PRECISION) < Math.floor(mutationProbability * PRECISION)) {
      mutationOffset = 2* Math.random() * mutationSize + value - mutationSize;
    } else if (Math.floor(Math.random() * PRECISION) > Math.floor(0.5 * PRECISION)) {
      resultObject[key] = value + mutationOffset;
    } else {
      resultObject[key] = rightParams[key] + mutationOffset;
    }
  });

  return resultObject;
}

export function oscillateParams(params, offset) {
  const newParams = {...params};

  Object.entries(newParams).forEach(([key, value]) => {
    newParams[key] = 2* Math.random() * offset + value - offset;
  });

  return newParams;
}

export function oscillateOffset(time, factor = 0.1) {
  return (time * factor) * Math.sin(time * factor);
}
