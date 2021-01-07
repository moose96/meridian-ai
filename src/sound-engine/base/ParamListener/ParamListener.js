/** params
 * an array of objects:
 * {
 *  name: string,
 *  key: string,
 *  min: number,
 *  max: number
 * }
**/
const defaultObject ={
  params: []
};

class ParamListener
{
  params = [];
  paramStore;
  oldParamState;

  constructor(_initObject) {
    const initObject = {...defaultObject, ..._initObject};

    this.params = initObject.params;
  }

  getKeysOfAudioParams() {
    return [];
  }

  paramListener = () => {
    const linear = (min, max, x) => {
      return ((max - min) / 100.0) * x + min;
    }

    const compareStores = () => {
      const params = this.paramStore.getState().params;
      const oldParams = this.oldParamState;
      let diffParams = {};

      Object.entries(params).forEach(([key, value]) => {
        if (value !== oldParams[key]) {
          diffParams = {
            ...diffParams,
            [key]: value
          };
        }
      });

      this.oldParamState = {...params};

      return diffParams;
    }

    const audioParams = this.getKeysOfAudioParams(); //problem
    const params = compareStores();
    const settings = this.paramStore.getState().settings;

    this.params.forEach(param => {
      const { name, key, min, max } = param;
      const value = params[name];

      if (value !== undefined) { //set value by callback?
        if (settings.gradual && audioParams.indexOf(key) !== -1) {
          this[key] = {
            value: linear(min, max, value),
            time: settings.time
          };
        } else {
          this[key] = linear(min, max, value);
        }
      } /*else {
        console.warn(`${param.name} is ignored`);
      }*/
    })
  }

  setParamStore(store) {
    this.paramStore = store;
    this.oldParamState = store.getState().params;
    this.paramStore.subscribe(this.paramListener);
  }
}

export default ParamListener;