import { Box, Select, MenuItem, InputLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import FlagIcon from './FlagIcon';

export default function SettingsContent({ language }) {
  const { t } = useTranslation('common');
  const { languages, current, onChange } = language;

  return (
    <Box style={{ padding: '1rem' }}>
      <InputLabel id="language-select">{t('language')}</InputLabel>
      <Select
        labelId="language-select"
        value={current}
        onChange={(event) => onChange(event.target.value)}
        style={{ marginTop: '0.5rem', width: '200px' }}
      >
        {languages.map(({ id, label }) => (
          <MenuItem key={`language-select-${id}`} value={id}>
            <FlagIcon id={id === 'en' ? 'us' : id} />
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
