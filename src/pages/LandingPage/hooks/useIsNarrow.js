import { useMediaQuery } from '@material-ui/core';

export default function useIsNarrow() {
  return useMediaQuery('(max-width: 945px)');
}
