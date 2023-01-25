import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TranslationButton } from '../components/Tranlation/TranslationButton';
import { useCookie } from '../hooks/Translation/use-cookie';
import { useTranslation } from '../hooks/Translation/use-translation';

export const Translation = () => {
  const { t, locale, setLocale } = useTranslation();
  const { cookieKey } = useCookie();

  if (locale === null) return null;

  return (
    <View style={styles.container}>
      <Text>{t(cookieKey)}</Text>

      <View style={styles.buttonsContainer}>
        <TranslationButton
          onPress={() => setLocale('ko')}
          isSelected={locale === 'ko'}
          text="KO"
        />
        <TranslationButton
          onPress={() => setLocale('en')}
          isSelected={locale === 'en'}
          text="EN"
        />
        <TranslationButton
          onPress={() => setLocale('ja')}
          isSelected={locale === 'ja'}
          text="JA"
        />
        <TranslationButton
          onPress={() => setLocale('zh')}
          isSelected={locale === 'zh'}
          text="ZH"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});
