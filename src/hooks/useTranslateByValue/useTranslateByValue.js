import { useTranslation } from 'react-i18next';

const escapeLineBreaks = (word) => word.replace(/(\s+)/g, ' ');

export default function useTranslateByValue({ ns, value, subKey }) {
  const { t, i18n } = useTranslation(ns);
  let rawResources = i18n.getResourceBundle('en', ns);

  if (subKey) {
    rawResources = rawResources[subKey];
  }

  const resources = Object.entries(rawResources).map(([key, value]) => ({
    key,
    value: typeof value === 'string' ? escapeLineBreaks(value) : value,
  }));

  const resource = resources.find(
    (object) => object.value === escapeLineBreaks(value)
  );

  // console.log(resources, resource, subKey, ns, value);

  if (resource) {
    if (subKey) {
      return t(`${subKey}.${resource.key}`);
    } else {
      console.log(t(resource.key));
      return t(resource.key);
    }
  } else {
    return value;
  }
}
