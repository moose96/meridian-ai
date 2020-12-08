import React, { useRef, Fragment } from 'react';

import EqualizerView from '../EqualizerView';

const EffectView = React.forwardRef(({ object, id, onChange }, ref) => {
  const effects = object?.effects;
  let effectView = null;

  const effectRef = useRef();

  const handleChange = () => {
    onChange(ref.current.toPlainObject());
  }

  if (effects?.length > 0) {
    effectRef.current = ref.current.effects[id];

    switch (effects[id].type) {
      case 'Equalizer':
        effectView = <EqualizerView ref={effectRef} data={effects[id]} onChange={handleChange} />
      break;
      default:
        effectView = null;
      break;
    }
  }

  return (
    <Fragment>
      {effectView}
    </Fragment>
  );
});

export default EffectView;