import { getLocales } from 'react-native-localize';
import { I18n } from 'i18n-js';
import { useEffect, useState } from 'react';

const ko = require('../../data/Translation/lang/lang.ko.json');
const en = require('../../data/Translation/lang/lang.en.json');
const ja = require('../../data/Translation/lang/lang.ja.json');
const zh = require('../../data/Translation/lang/lang.zh.json');

// i18n = internationalization의 약자
const i18n = new I18n({
  ko,
  en,
  ja,
  zh,
});

// Set the locale once at the beginning of your app
const deviceLanguage: string = getLocales()[0].languageCode;
// i18n.locale = deviceLanguage;
// console.log(i18n.t('welcome'));

export const useTranslation = () => {
  const [locale, setLocale] = useState<string | null>(null);

  useEffect(() => {
    setLocale(deviceLanguage);
  }, []);

  return {
    locale,
    setLocale,
    t: (scope: string) => i18n.t(scope, { locale }),
  };
};
