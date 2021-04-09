export const linear = (x, options) => {
  const { minX, maxX, minY, maxY } = options; //0 500 0 1

  return ((maxY - minY) / (maxX - minX)) * (x - minX) + minY;
};
