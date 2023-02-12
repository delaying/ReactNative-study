import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";

import Button from "./src/Button";
import { useCookie } from "./src/use-cookie";
import { useTranslation } from "./src/use-translation";
import { useEffect, useState } from "react";
import LoadingView from "./src/LoadingView";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, locale, setLocale, format } = useTranslation();
  const { cookieKey } = useCookie();

  const [isLoaded, setIsLoaded] = useState(false);

  const y = new Date().getFullYear();
  const m = new Date().getMonth() + 1; //0~11return
  const d = new Date().getDate();
  const todayText = format(t("today_is"), y, m, d);

  useEffect(() => {
    if (cookieKey !== "") {
      setIsLoaded(true);
    }
  }, [cookieKey]);

  useEffect(() => {
    if (locale !== null) {
      SplashScreen.hideAsync();
    }
  }, [locale]);

  if (!isLoaded) return <LoadingView />;

  // if (locale === null || cookieKey === "") return null;

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        resizeMode="cover"
        style={{
          position: "absolute",
          zIndex: -1,
        }}
        source={require("./assets/background.json")}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => setLocale("ko")}
              isSelected={locale === "ko"}
              text="KO"
            />
            <Button
              onPress={() => setLocale("en")}
              isSelected={locale === "en"}
              text="EN"
            />
            <Button
              onPress={() => setLocale("ja")}
              isSelected={locale === "ja"}
              text="JA"
            />
            <Button
              onPress={() => setLocale("zh")}
              isSelected={locale === "jh"}
              text="ZH"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    position: "absolute",
    top: 70,
    fontSize: 13,
    color: "#ffffba",
  },
  cookieText: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25,
  },
});
