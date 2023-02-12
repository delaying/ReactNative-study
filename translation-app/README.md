# 번역 앱

## 결과 화면

<img src="" width="200" height="400">

## 목차

---

- [Localization](#localization)
- [SplashScreen](#splashscreen)
- [Lottie](#lottie)
- [react-string-format](#react-string-format)
- [expo-font](#expo-font)

---

## 실행

```
npx expo start
```

Expo Go 앱을 사용하여 터미널에 출력된 바코드로 결과를 확인할 수 있다.

## 정리

### Localization

[localization](https://docs.expo.dev/versions/latest/sdk/localization/)은 각각의 언어설정에 따라 번역해주는 기능이다.

`npx expo install expo-localization` 로 설치한다.

다음처럼 사용할 수 있다.

```jsx
import { getLocales } from "expo-localization";

const deviceLanguage = getLocales()[0].languageCode;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{deviceLanguage}</Text>
    </View>
  );
}
```

현재 설정되어 있는 언어를 가져와서 그에 따라 문자를 번역한다.

앱 내에서 번역하기위해 [i18n-js](https://www.npmjs.com/package/i18n-js) 라이브러리를 사용한다.
`npx expo install i18n-js`

internalization 약자인데, i와n사이에 18글자가 존재한다는 뜻이다.

언어별로 키와 값을 입력하고, `i18n.t()`에 key를 넣어주면 현재설정된 언어의 value가 출력된다.

```jsx
import { I18n } from "i18n-js";

const i18n = new I18n({
  en: { welcome: "hello" },
  ja: { welcome: "hello" },
});

const deviceLanguage = getLocales()[0].languageCode;
i18n.locale = deviceLanguage;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{deviceLanguage}</Text>
      <Text>{i18n.t("welcome")}</Text>
    </View>
  );
}
```

### SplashScreen

[SplashScreen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)은 앱을 처음 실행했을 때 보이는 로딩화면을 설정할 수 있다.

`npx expo install expo-splash-screen`

splashScreen화면이 자동으로 사라지는 것을 `preventAutoHideAsync()`함수로 막고, 사용자가 커스텀 할 수 있다.

`SplashScreen.hideAsync()`함수로 원하는 타이밍에 로딩화면을 닫을 수 있다.

```jsx
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
}
```

#### splash 이미지 바꾸기

피그마에서 splashScreen [템플릿](https://www.figma.com/community/file/1155362909441341285)을 지원한다.

필요한 템플릿을 copy한 후, 원하는 모양으로 만들 수 있다.

원하는툴에 바꿀 이미지를 넣고 create component로 합친 후 export 한다.

assets폴더에서 splash.png파일을 대체하면 완성이다.

### Lottie

[expo-Lottie](https://docs.expo.dev/versions/latest/sdk/lottie/)는 코드로 작성된 움직이는 애니메이션을 vector 이미지처럼 용량도 가볍고, 사이즈도 구애받지 않고 사용할 수 있다.

`npx expo install lottie-react-native`

[lottieFiles](https://lottiefiles.com/search?q=loading&category=animations)에서 원하는 애니메이션을 고르고 `lottie json`형식으로 다운로드한다.

json파일을 assets폴더에 넣고, `LottiView`를 작성하면된다.

```jsx
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default () => {
  return (
    <View style={{ flex: 1, backgroundColor: "lightblue" }}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#eee",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/loading.json")}
      />
    </View>
  );
};
```

### react-string-format

### expo font

```

```
