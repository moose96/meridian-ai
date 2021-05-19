import _ from 'lodash';

const OFFSET_RAND_OPTIONS = {
  floating: false,
  min: 0,
  max: 100,
};

const validateOffsetBounds = (args) => {
  const { top, bottom, deltaTop, deltaBottom } = args;

  if (deltaTop + deltaBottom > 0) {
    //check if the bounds are higher than max - min
    const scaleValue = Math.max(deltaTop, deltaBottom);
    return {
      top: top - scaleValue,
      bottom: bottom + scaleValue,
    };
  } else if (deltaTop > 0) {
    return {
      top: top - deltaTop,
      bottom: bottom - deltaTop,
    };
  } else if (deltaBottom > 0) {
    return {
      top: top + deltaBottom,
      bottom: bottom + deltaBottom,
    };
  } else {
    return {
      top,
      bottom,
    };
  }
};

const offsetRand = (value, offset, options = OFFSET_RAND_OPTIONS) => {
  const { min, max, floating } = options;
  let rawTop = value + offset;
  let rawBottom = value - offset;
  const deltaTop = rawTop - max;
  const deltaBottom = min - rawBottom;

  const { top, bottom } = validateOffsetBounds({
    top: rawTop,
    bottom: rawBottom,
    deltaTop,
    deltaBottom,
  });

  return _.random(top, bottom, floating);
};

const mutateValue = (value, options) => {
  const { mutationProbability, mutationSize, PRECISION } = options;
  let newValue = value;

  if (_.random(PRECISION) < Math.floor(mutationProbability * PRECISION)) {
    newValue = offsetRand(value, mutationSize);
  }

  return newValue;
};

export default function mixParams(leftParams, rightParams, options) {
  const PRECISION = 10000;
  let resultObject = {};

  const mutateOptions = { ...options, PRECISION };

  Object.entries(leftParams).forEach(([key, value]) => {
    if (_.random(PRECISION) > Math.floor(0.5 * PRECISION)) {
      resultObject[key] = mutateValue(value, mutateOptions);
    } else {
      resultObject[key] = mutateValue(rightParams[key], mutateOptions);
    }
  });

  return resultObject;
}
