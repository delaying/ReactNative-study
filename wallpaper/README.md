# 배경화면 앱

## 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/220018840-f3c0e70f-a5d0-4527-89ef-bf5f3b5eea38.gif" width="200" height="400">

## 목차

---

- [screenOptions](#screenoptions)
- [파일 저장 관리](#파일-저장-관리)
- [ActivityIndicator](#activityindicator)
- [Animated](#animated)
- [props-drilling](#props-drilling)
- [Redux](#redux)

---

## 실행

```
npx expo start
```

Expo Go 앱을 사용하여 터미널에 출력된 바코드로 결과를 확인할 수 있다.

## 정리

### screenOptions

navigator의 screenOptions로 header와 하단바를 커스텀할 수 있다.

```jsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteImageListScreen from "../screen/FavoriteImageListScreen";
import ImageListScreen from "../screen/ImageListScreen";
import { TabIcon } from "../TabIcon";

const Tabs = createBottomTabNavigator();

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const getIconName = () => {
            if (route.name === "ImageList") {
              return "home";
            }

            if (route.name === "FavoriteImageList") {
              return "star";
            }
          };
          const iconName = getIconName();
          return (
            <TabIcon
              iconName={iconName}
              iconColor={focused ? "tomato" : "grey"}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="ImageList" component={ImageListScreen} />
      <Tabs.Screen
        name="FavoriteImageList"
        component={FavoriteImageListScreen}
      />
    </Tabs.Navigator>
  );
};
```

### 파일 저장 관리

#### expo-file-system

[file-system](https://docs.expo.dev/versions/latest/sdk/filesystem/)라이브러리를 사용하여 로컬로 저장된 파일 시스템에 대한 액세스를 제공한다.

#### media-library

[media-library](https://docs.expo.dev/versions/latest/sdk/media-library/)로 파일사용 권한요청을 할 수 있다.

다음과 같은 값을 가지고있다.

```
permissionResult {
    "accessPrivileges": "none",
    "canAskAgain": true,
    "expires": "never",
    "granted": false,
    "status": "undetermined"}
```

status가 denied면 거부된 상태, granted면 허용, undetermined이면 최초 접근이라 미응답 상태임을 나타낸다.

### ActivityIndicator

이 컴포넌트만 삽입해도 기본 로딩모양을 생성해준다.

[여기](https://reactnative.dev/docs/activityindicator)에서 자세히 확인 가능하다.

색상과 크기값을 지정할 수 있다.

### Animated

[Animated](https://reactnative.dev/docs/animated)라이브러리는 애니메이션을 유연하고 강력하며 쉽게 만들고 유지 관리할 수 있도록 도와준다.

`Animated.Value`애니메이션 구성 요소의 하나 이상의 스타일 속성에 연결한 다음 `Animated.timing()`을 사용한다.

다음은 클릭할때 커지고, 커서를 놓으면 작아지는 애니메이션 예제이다.

```jsx
const [animValue] = useState(new Animated.Value(0));

const onPressIn = useCallback(() => {
  console.log("in");
  Animated.timing(animValue, {
    duration: 200,
    toValue: 1,
  }).start();
});

const onPressOut = useCallback(() => {
  console.log("out");
  Animated.timing(animValue, {
    duration: 200,
    toValue: 0,
  }).start();
});

const scale = animValue.interpolate({
  inputRange: [0, 1],
  outputRange: [1.0, 0.95],
});

return (
  <Animated.View style={{ transform: [{ scale: scale }] }}>
    <RemoteImage url={props.url} width={width - 40} height={width * 1.2} />
  </Animated.View>
);
```

### props-drilling

- 값을 계속하여 하위 컴포넌트의 props로 전달하는 것이다.
- 전달하는 컴포넌트가 많아지면 코드가 복잡해진다.
- props-drilling을 방지하고, 전역적으로 props를 관리하는 방법
  - [redux](https://ko.redux.js.org/introduction/getting-started/), [recoil](https://recoiljs.org/ko/), [context API](https://ko.reactjs.org/docs/context.html)같은 상태관리 라이브러리나 전역변수관리 라이브러리를 사용한다.

### Redux

이 프로젝트는 Redux를 사용하였다.

`npm install —save redux redux-logger react-redux`

Redux는 따로 [블로그](https://delaying.github.io/posts/redux/)에 자세히 정리해두었다.
