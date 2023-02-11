# 까까오 버스 클론코딩

## 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/218239633-1c89a0c2-15b3-414f-ad0f-42d6a935e0f6.GIF" width="200" height="400">

## 목차

---

- [sectionList](#sectionlist)
- [전역 color 관리](#전역-color-관리)
- [setInterval](#setinterval)
- [refreshcontrol](#refreshcontrol)
- [다크모드](#다크모드)

---

## 실행

```
npx expo start
```

Expo Go 어플을 사용하여 터미널에 출력된 바코드로 결과를 확인할 수 있다.

## 정리

### sectionList

flatList에서는 item들을 목록별로 분리 할 수 없지만, sectionList를 사용하면 분리가 가능하다.

다음코드는 flatList와 sectionList의 차이점이다.

```
<FlatList
          data={[
            { busNum: 146 },
            { busNum: 360 },
            { busNum: 740 },
            { busNum: 3412 },
            { busNum: 1100 },
            { busNum: 1700 },
          ]}
          renderItem={({ item }) => <Text>{item.busNum}</Text>}
        />

<SectionList
          sections={[
            {
              title: "목록1",
              data: [{ busNum: 146 }, { busNum: 360 }, { busNum: 740 }],
            },
            {
              title: "목록2",
              data: [{ busNum: 3412 }],
            },
            {
              title: "목록3",
              data: [{ busNum: 1100 }, { busNum: 1700 }],
            },
          ]}
          renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
          renderItem={({ item }) => <Text>{item.busNum}</Text>}
        />
```

### 전역 color 관리

전역으로 사용하는 color를 관리해주는게 좋다.

키 네이밍 방법은 색상이 쓰이는 사용처로 짓거나, 색상이름을 그대로 사용한다.

```
// src/color.js

export const COLOR = {
  BUS_B: "#3e589d",
  BUS_G: "#72b33e",
  BUS_R: "#e44124",
  YELLOW: "#f7d14a",
  CORAL: "#dd6247",
  WHITE: "#fefeff",
  BLACK: "#333333",
};
```

### setInterval

2번째 인자의 시간마다 내부 블록을 실행한다.

그리고 컴포넌트가 unmount될때 interval도 꼭 종료를 시켜주어야한다.

```
useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 1000);

    return () =>{
      clearInterval(interval);
    }
  }, []);
```

### refreshControl

[refreshControl](https://reactnative.dev/docs/refreshcontrol)은 당겨서 새로고침 기능을 추가 할 때 사용된다.

ScrollView, ListView, sectionList 등에서 사용이 가능하다.

scroll의 y축이 0미만으로 스와이프되면 `onRefresh`이벤트가 트리거된다.

`refreshing`을 true로 설정하지 않으면 새로고침 표시가 즉시 중지된다.

```
<SectionList
        refreshControl={
          <RefreshControl refreshing={true} onRefresh={onRefresh} />
        }
      />
```

onRefresh에 y축이 0미만으로 움직일 때 실행할 함수를 작성해주면 된다.

```
const onRefresh = () => {
    console.log("onRefresh");
    setRefreshing(true);
  };

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        //API refetch 완료되었을 때!
        setRefreshing(false);
      }, 1000);
    }
  }, [refreshing]);
```

### 다크모드

다크모드는 라이트모드 컬러와 다크모드 컬러를 지정하여 state를 이용하면 구현할 수 있다.

1. 키값은 같게하고 색상을 각각 설정해준다.

   ```
   //color.js
   export const LIGHT_COLOR = {
   WHITE_BLACK: COLOR.WHITE,
   BLACK_WHITE: COLOR.BLACK,
   GRAY_1_GRAY_4: COLOR.GRAY_1,
   GRAY_2_GRAY_3: COLOR.GRAY_2,
   GRAY_3_GRAY_2: COLOR.GRAY_3,
   GRAY_4_GRAY_1: COLOR.GRAY_4,
   };

    export const DARK_COLOR = {
    WHITE_BLACK: COLOR.BLACK,
    BLACK_WHITE: COLOR.WHITE,
    GRAY_1_GRAY_4: COLOR.GRAY_4,
    GRAY_2_GRAY_3: COLOR.GRAY_3,
    GRAY_3_GRAY_2: COLOR.GRAY_2,
    GRAY_4_GRAY_1: COLOR.GRAY_1,
    };
   ```

2. 다크모드를 제어하는 코드를 작성한다.
   `NEWCOLOR: isDark ? DARK_COLOR : LIGHT_COLOR`이 부분이 중요하다.

   ```
   //use-theme.js
   export const useTheme = () => {
        const [isDark, setIsDark] = useState(false);

        const toggleIsDark = () => setIsDark(!isDark);

        return {
        NEWCOLOR: isDark ? DARK_COLOR : LIGHT_COLOR,
        toggleIsDark,
        isDark,
        };
    };
   ```

3. 색이 바뀌어야 하는 부분에서 위에서 작성한 `NEWCOLOR`를 사용해 `isDark`값에 따라 색이 바뀌도록 설정한다.

   ```
   export default function App() {
       const { NEWCOLOR } = useTheme();

       return(
           <View
       style={{
           backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
           borderTopWidth: 0.5,
           borderBottomWidth: 0.5,
           borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
           borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3,
       }}
       >
       )
   }
   ```

   component 안에 `NEWCOLOR`를 작성했다면, prop으로 넘겨주거나 전역으로 설정해야한다.

4. [Switch](https://reactnative.dev/docs/switch) 컴포넌트를 사용하여 쉽게 다크모드로 전환할 수 있도록 한다.
   `value`속성에는 boolean값이 들어가고, `onValueChange` 속성으로 value값이 바뀔때마다 실행할 함수를 설정할 수 있다.
   ```
   <Switch
       value={isDark}
       onValueChange={(v) => {
         toggleIsDark();
       }}
     />
   ```
