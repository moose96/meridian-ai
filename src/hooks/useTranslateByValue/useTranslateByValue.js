import { useTranslation } from 'react-i18next';

export default function useTranslateByValue({ ns, value, subKey }) {
  const { t, i18n } = useTranslation(ns);
  let rawResources = i18n.getResourceBundle('en', ns);

  if (subKey) {
    rawResources = rawResources[subKey];
  }

  const resources = Object.entries(rawResources).map(([key, value]) => ({
    key,
    value,
  }));

  const resource = resources.find((object) => object.value === value);

  console.log(resources, resource, subKey);

  if (resource) {
    if (subKey) {
      return t(`${subKey}.${resource.key}`);
    } else {
      return t(resource.key);
    }
  } else {
    return value;
  }
}
