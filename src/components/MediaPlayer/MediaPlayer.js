import React from 'react';

const MediaPlayer = React.forwardRef(({ sources, source, type }, ref) => {
  let sourceObject = null;

  if (source && type) {
    sourceObject = <source src={source} type={type} />;
  }

  return (
    <audio ref={ref}>
      {sourceObject}
      {sources?.map(({ src, type }) => <source src={src} type={type} />)}
    </audio>
  );
});

export default MediaPlayer;