import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "./src/Button";
import { useCookie } from "./src/use-cookie";
import { useTranslation } from "./src/use-translation";

export default function App() {
  const { t, locale, setLocale } = useTranslation();
  const { cookieKey } = useCookie();

  if (locale === null) return null;
  return (
    <View style={styles.container}>
      <Text>{t(cookieKey)}</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});
