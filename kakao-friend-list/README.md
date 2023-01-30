## 까까오톡 친구목록 클론코딩

#### 결과 화면 
<img src="https://raw.githubusercontent.com/fastcampus-rn-intruduction/part2-ch1-kakao-friend-list/main/src/result-screenshot.png" width="250" height="400">


#### 실행 
```
npx expo start
```

#### 정리
1. 각 핸드폰마다 상단바와 하단바가 차지하는 영역이 다르므로 유동적으로 관리해줄 라이브러리가 필요하다.
    - react-native 자체의 SafeAreaView 사용
    - react-native-safe-area-context 라이브러리에서 SafeAreaView 사용,  edge옵션으로 세부적으로 설정가능
2. 아이콘 삽입 시 expo 에 포함된 icons 라이브러리를 활용하면 된다.
    `import { Ionicons } from '@expo/vector-icons';` 
    이런식으로 import 하여 사용하고, [expo-icons 페이지](https://icons.expo.fyi/)에서 원하는 아이콘을 찾아 사용한다.
3. 친구목록 화살표 view를 터치에 응답하도록 하는 래퍼인 TouchableOpacity로 감싼다. 
4. 친구목록은 스크롤이 가능하도록 ScrollView로 감싼다.
5. 친구목록의 데이터는 map함수를 사용하여 데이터 길이만큼 컴포넌트를 반환시킨다.
    - map함수는 key 값이 있어야 한다.
    - key옵션은 map함수 내의 최상단 루트컴포넌트에 있어야한다.
