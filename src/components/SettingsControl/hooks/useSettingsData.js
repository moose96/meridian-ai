import { useTranslation } from 'react-i18next';

export default function useSettingsData() {
  const { i18n } = useTranslation();

  const languages = Object.keys(i18n.options.resources).map((lang) => ({
    id: lang,
    label: i18n.getResource(lang, 'common', 'languageName'),
  }));

  const language = {
    languages,
    current: i18n.language,
    onChange: (value) => i18n.changeLanguage(value),
  };

  return {
    language,
  };
}
