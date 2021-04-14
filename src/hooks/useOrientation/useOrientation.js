import { useMediaQuery } from '@material-ui/core';

export default function useOrientation() {
  const portrait = useMediaQuery('(orientation: portrait)');
  const landscape = useMediaQuery('(orientation: landscape)');

  return {
    portrait,
    landscape,
    orientation: portrait ? 'portrait' : landscape ? 'landscape' : 'unknown',
  };
}
