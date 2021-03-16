function round(value) {
  if (value < 0) {
    return 0;
  } else if (value > 100) {
    return 100;
  } else {
    return value;
  }
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
