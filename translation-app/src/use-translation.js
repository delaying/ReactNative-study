import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { useEffect, useState } from "react";
import { format } from "react-string-format";

const ko = require("./lang/lang.ko.json");
const en = require("./lang/lang.en.json");
const ja = require("./lang/lang.ja.json");
const zh = require("./lang/lang.zh.json");

const i18n = new I18n({
  ko,
  en,
  ja,
  zh,
});

i18n.enableFallback = true;
i18n.defaultLocale = "ko";

const deviceLanguage = getLocales()[0].languageCode;

const LOCALE_KEY = "locale";

export const useTranslation = () => {
  const [locale, _setLocale] = useState(null);

  const setLocale = (v) => {
    _setLocale(v);
    AsyncStorage.setItem(LOCALE_KEY, v);
  };

  const init = async () => {
    const fs = await AsyncStorage.getItem(LOCALE_KEY);
    if (fs !== null) {
      _setLocale(fs);
    } else {
      _setLocale(deviceLanguage);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return {
    locale,
    setLocale,
    t: (scope) => i18n.t(scope, { locale }),
    format,
  };
};
