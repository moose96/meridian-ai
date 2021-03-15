function round(value) {
  if (value < 0) {
    return 0;
  } else if (value > 100) {
    return 100;
  } else {
    return value;
  }
}

export function mixParams(leftParams, rightParams, options) {
  const PRECISION = 10000;
  const { mutationProbability, mutationSize } = options;
  let resultObject = {};
  let mutationOffset = 0.0;

  Object.entries(leftParams).forEach(([key, value]) => {
    if (Math.floor(Math.random() * PRECISION) < Math.floor(mutationProbability * PRECISION)) {
      mutationOffset = 2* Math.random() * mutationSize + value - mutationSize;
    }
    if (Math.floor(Math.random() * PRECISION) > Math.floor(0.5 * PRECISION)) {
      resultObject[key] = round(value + mutationOffset);
    } else {
      resultObject[key] = round(rightParams[key] + mutationOffset);
    }
  });

  return resultObject;
}

export function oscillateParams(params, offset) {
  const newParams = {...params};

  Object.entries(newParams).forEach(([key, value]) => {
    newParams[key] = round(2* Math.random() * offset + value - offset);
  });

  return newParams;
}

export function oscillateOffset(time, factor = 0.1) {
  return (time * factor) * Math.sin(time * factor);
}
