# 까까오톡 친구목록 클론코딩

## 결과 화면 
<img src="https://user-images.githubusercontent.com/72879145/215688680-4bcb24ae-916e-4479-a274-180f0c7d1ebd.gif" width="200" height="500">


## 실행 
```
npx expo start
```
Expo Go 어플을 사용하여 터미널에 출력된 바코드로 결과를 확인할 수 있다.

## 정리
### SafeAreaView
각 핸드폰마다 상단바와 하단바가 차지하는 영역이 다르므로 유동적으로 관리해줄 라이브러리가 필요하다.

- react-native 자체의 SafeAreaView 사용
- react-native-safe-area-context 라이브러리에서 SafeAreaView 사용,  edge옵션으로 세부적으로 설정가능

### Expo icons
아이콘 삽입 시 expo 에 포함된 icons 라이브러리를 활용하면 된다.

`import { Ionicons } from '@expo/vector-icons';`

이처럼 import 하여 사용하고, [expo-icons 페이지](https://icons.expo.fyi/)에서 원하는 아이콘을 찾아 사용한다.

### TouchableOpacity
친구목록 화살표 view를 터치에 응답하도록 하는 래퍼인 TouchableOpacity로 감싼다. 

`activeOpacity`속성은 터치 시에 깜빡이는 정도를 설정할 수 있다.


또한,편리한 사용과 다른 기능을 방해하지 않도록 터치범위를 조정해주어야 한다.
- margin이나 padding 값 조절
- [hitSlop](https://reactnative.dev/docs/pressable#hitslop)속성 사용하면 더 쉽게 조절가능

### FlatList
친구목록은 스크롤이 가능하도록 FlatList로 감싼다.

ScrollView를 사용해도 되지만, ScrollView는 데이터 양이 많지않고 고정적일 때 사용하는 것이 좋다.

친구목록은 데이터의 양이 적지않고, 가변적이므로 [FlatList](https://reactnative.dev/docs/flatlist)를 사용하는 것이 좋다.

FlatList는 렌더링시 한번에 모든데이터를 출력하는 ScrollView와 달리 화면에 보여지는 부분만 렌더링하므로 ScrollView보다 성능이 훨씬좋다.


### map()
친구목록의 데이터는 map함수를 사용하여 데이터 길이만큼 컴포넌트를 반환시킨다.
- map함수는 key 값이 있어야 한다.
- key옵션은 map함수 내의 최상단 루트컴포넌트에 있어야한다.

### Styled-Components
CSS를 적용하는 방법은 inline, StyleSheet, [Styled-Components](https://styled-components.com/docs/basics#react-native) 이 3가지를 사용하는게 대표적이다.

inline 스타일링은 앱이 커지면 최적화 측면에서 렌더링 될때마다 새로운 오브젝트가 계속 할당되어 성능에 좋지않다.

이를 보완하는 StyleSheet나 Styled-Components를 사용하면 된다.

이 프로젝트에서는 Profile 컴포넌트만 Styled Components를 활용하여 스타일링했다.