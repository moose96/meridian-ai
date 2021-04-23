const getControl = (state) => state.guide.control;
const getData = (state) => state.guide.data;

export const getIsGuide = (state) => getControl(state).guideMode;
export const getCurrentFrame = (state) => getControl(state).currentFrame;
export const getIsVisited = (state) => getControl(state).visited;

export const getGuideData = (state) => getData(state).data;
