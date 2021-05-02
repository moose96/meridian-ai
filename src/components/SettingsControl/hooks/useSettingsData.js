import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { getLanguage, setLanguage } from '../../../redux/settings';

export default function useSettingsData() {
  const { i18n } = useTranslation();
  const currentLanguage = useSelector(getLanguage);
  const dispatch = useDispatch();

  const languages = Object.keys(i18n.options.resources).map((lang) => ({
    id: lang,
    label: i18n.getResource(lang, 'common', 'languageName'),
  }));

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const language = {
    languages,
    current: i18n.language,
    onChange: (value) => dispatch(setLanguage(value)),
  };

  return {
    language,
  };
}
