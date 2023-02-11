# Todo 리스트와 Calendar

## 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/216976253-743c1b5d-3400-43c9-a5c2-e4c55d99f3c3.gif" width="200" height="400">

## 목차

---

- [날짜 라이브러리](#날짜-라이브러리)
- [json pretty print](#json-pretty-print)
- [javascript 함수](#javascript-함수)
- [keyboardavoidingview](#keyboardavoidingview)
- [pressable 컴포넌트](#pressable-컴포넌트)
- [onLongpress](#onlongpress)
- [alert](#alert)
- [textInput](#textinput)
- [asyncStorage](#asyncstorage)
- [사소한 tip](#사소한-tip)

---

## 실행

```
npx expo start
```

Expo Go 앱을 사용하여 터미널에 출력된 바코드로 결과를 확인할 수 있다.

## 정리

### 날짜 라이브러리

날짜를 쉽게 다루기 위해 라이브러리를 사용하는데 [moment.js](https://momentjs.com/)와 [day.js](https://day.js.org/)가 많이 사용된다.

day.js가 번들사이즈가 작아서 많이 사용된다.

다양한 함수를 사용할 수 있다.

```
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const runPracticeDayjs = () => {
  const hour = new Date().getHours();
  console.log('hour', hour);

  const now = dayjs("2022-11-04 16:01:30");
  console.log("===== Practice Dayjs =====");
  console.log(
    "1. set minute - hh",
    dayjs(now).set("minute", 5).format("YYYY.MM.DD hh:mm:ss a A")
  );
  console.log(
    "2. set minute - HH",
    dayjs(now).set("minute", 5).format("YYYY.MM.DD HH:mm:ss")
  );
  console.log(
    "3. set hour",
    dayjs(now).set("hour", 10).format("YYYY.MM.DD HH:mm:ss")
  );
  console.log("4. get year", dayjs(now).get("year"));
  console.log("5. get month", dayjs(now).get("month")); // 0~11(1월~12월)
  console.log("6. get date", dayjs(now).get("date"));
  console.log("7. get day", dayjs(now).get("day")); // 0:일 ~ 6:토 요일을 가져옴
  console.log("8. get second", dayjs(now).get("second"));
  console.log(
    "9. add hour",
    dayjs(now).add(3, "hour").format("YYYY.MM.DD HH:mm:ss")
  );
  console.log(
    "10. subtract hour",
    dayjs(now).subtract(3, "hour").format("YYYY.MM.DD HH:mm:ss")
  );
  console.log("11. startOf", dayjs(now).startOf("month").format("YYYY.MM.DD"));
  console.log("12. endOf", dayjs(now).endOf("month").format("YYYY.MM.DD"));
  const aDate = dayjs("2022-10-29 15:00:20");
  const bDate = dayjs("2022-10-29 16:00:00");
  console.log("13. isSame month", dayjs(aDate).isSame(bDate, "month"));
  console.log("14. isSame hour", dayjs(aDate).isSame(bDate, "hour"));
  console.log("15. isBefore", dayjs(aDate).isBefore(bDate));
  console.log("16. isBefore date", dayjs(aDate).isBefore(bDate, "date"));
  console.log("17. isAfter a,b", dayjs(aDate).isAfter(bDate));
  console.log("18. isAfter b,a", dayjs(bDate).isAfter(aDate));
  console.log("19. isSameOrBefore", dayjs(aDate).isSameOrBefore(bDate, "date"));
  console.log("20. isSameOrAfter", dayjs(aDate).isSameOrAfter(bDate, "date"));
  console.log(
    "21. isBetween",
    dayjs("2022-10-29 15:30:00").isBetween(aDate, bDate)
  );
  console.log(
    "22. isBetween date",
    dayjs("2022-10-29 15:30:00").isBetween(aDate, bDate, "date")
  );
  console.log("23. diff minute a,b", dayjs(aDate).diff(bDate, "minute"));
  console.log("24. diff minute b,a", dayjs(bDate).diff(aDate, "minute"));
};
```

isBetween등의 함수는 import와 extend를 따로 작성해주어야 사용가능하다.

### json Pretty Print

이 [링크](https://jsonformatter.org/json-pretty-print)에서 보기힘든 json 파일형식을 보기쉽도록 변환할 수 있다.

json 내용을 붙여넣고 Make Pretty 버튼을 누르면 깔끔하게 변환시켜준다.

### javascript 함수

- unshift 함수 : 배열의 맨 앞에 요소를 추가한다.
  ```
  [1,2,3].unshift(0);
  -> [0,1,2,3]
  ```
- push 함수 : 배열의 맨 뒤에 요소를 추가한다.
  ```
  [1,2,3].unshift(0)
  -> [0,1,2,3]
  ```

### 날짜 선택 라이브러리

터치시 달력이 뜨고 날짜를 선택할 수 있는 라이브러리가 많이 사용된다.

이 프로젝트에서는 달력이 모달창으로 뜨는[react-native-modal-datetime-picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker)라이브러리를 사용하였다.

먼저 expo cli를 `npm install -g expo-cli`로 설치한 후, `expo install react-native-modal-datetime-picker @react-native-community/datetimepicker`로 설치 후 사용하면된다.

### keyboardAvoidingView

이 [keyboardavoidingview](https://reactnative.dev/docs/keyboardavoidingview)에 감싸진 컴포넌트들은 키보드 높이를 기준으로 위치를 자동으로 조절하여 키보드에 가리지않는다.

behavior프롭을 필수로 작성해야한다.

```
import {Platform} from 'react-native';

<KeyboardAvoidingView
        behavior={Platform.OS ==="ios" ? "padding" : "height"}
      >
	<>
		<View/>
		<View/>
	</>
</KeyboardAvoidingView>
```

### Pressable 컴포넌트

터치가 되는순간 반짝이는 효과를 제거한 컴포넌트이다.

`<TouchableOpacity activeOpacity={1}>`과 같은 역할을 한다.

`onPress={keyboard.dismiss}`를 작성하면 키보드 말고 다른화면을 터치하면 키보드가 사라진다.

```
import {Keyboard } from 'react-native';

<Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
>
</Pressable>
```

### onLongPress = {}

onPress보다 터치를 길게 했을 때 실행된다.

```
<View>
	onPress={onPress}
	onLongPress={onLongPress}
</View>
```

### alert

무언가를 삭제할 때 사용자에게 다시한번 확인과정을 거치는게 좋다.

취소버튼은 style에 cancel값을 주면된다.

```
const onLongPress = () => {
      Alert.alert('삭제하시겠어요?','',[
        {
          style:'cancel',
          text:'아니요'
        },
        {
          text:'네',
          onPress:()=>removeTodo(todo.id),
        }
      ])
    };
```

### TextInput

[TextInput](https://reactnative.dev/docs/textinput)에 옵션으로 들어갈 수 있는 내용들이다.

#### onSubmitEditing

Enter를 눌렀을 때 호출되는 함수를 설정할 수 있다.
`onSubmitEditing={onPress}`

#### blurOnSumbit

키보드로 입력 후 enter로 submit하면 키보드가 자동으로 사라지는 걸 blur된다고 표현한다.

`blurOnSubmit={false}` 처리해주면 submit해도 키보드가 닫히지않는다.

#### onFocus

`<TextInput>`이 포커스될 경우 실행할 함수를 작성할 수 있다.

다음의 코드는 focus됐을 때 flatList의 마지막부분으로 자동으로 스크롤 되게 한다.

FlatList의 style이 flex:1이 아니면 안먹히는 버그가 있다고한다.

```
const flatListRef = useRef(null);

const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 400);
  }

const onFocus = () => {
    scrollToEnd();
  }


<FlatList
            ref={flatListRef}
            data={todoList}
            focusable={true}
            style={{flex:1}}
            contentContainerStyle={{paddingTop:StatusBarHeight+30}}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
          />
```

### asyncStorage

`npx expo install @react-native-async-storage/async-storage`로 설치하여 사용한다.

[asyncStorage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)를 사용하여 앱을 종료한 후에도, 키값을 가진 데이터를 다시 불러올 수 있다.

asyncStorage에 저장하기 위해서는 객체형식으로는 저장할 수 없고, string 형식으로만 저장이 가능하다.

setItem으로 저장하고, getItem으로 값을 가져올 수 있다.

string으로 바꿔서 저장했으므로, 값을 다시 사용할 때는 다시 객체로 parse하여 사용해야한다.

```
import AsnycStorage from '@react-native-async-storage/async-storage';

AsnycStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));

useEffect(()=>{
        init();
    },[]);
    const init = async () => {
        const result = await AsnycStorage.getItem(TODO_LIST_KEY);
        if(result){
            const newTodoList = JSON.parse(result);
            setTodoList(newTodoList);
        }
    }
```

### 사소한 tip

- ios 시뮬레이터 키보드 on/off : cmd + shift + k
- 컨솔에서 r을 누르면 refresh된다.
- 상태바 height값 알아내는 또다른 라이브러리 : [react-antive-iphone-x-helper](https://www.npmjs.com/package/react-native-iphone-x-helper)
- vscode 플러그인 `color Highlight` 를 사용하면 색상을 코드위에 하이라이트로 입혀서 미리 보여준다.
