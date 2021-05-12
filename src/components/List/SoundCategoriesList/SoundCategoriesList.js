import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export default function SoundCategoriesList() {
  const { t } = useTranslation();

  return (
    <List>
      <ListItem button selected>
        <ListItemText primary={t('categories.all')} />
      </ListItem>
      <Divider />
      <ListSubheader>{t('headers.categories')}</ListSubheader>
      <ListItem button>
        <ListItemText primary={t('categories.other')} />
      </ListItem>
    </List>
  );
}
