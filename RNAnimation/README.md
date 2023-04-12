# Animated 실습

## 목차

---

- [Animated 실습](#animated)
  - [Drawer Menu](#drawer-menu)
  - [Collapse](#collapse)
  - [Progress Bar](#progress-bar)
  - [Skeleton](#skeleton)
  - [Snow Background](#snow-background)
- [LayoutAnimation](#layoutanimation)
  - [Page Header](#page-header)
- [PanResponder](#panresponder)
  - [공던지기](#공던지기)
  - [Modal UI](#modal-ui)
  - [Banner Slider](#banner-slider)
  - [Font Slider](#font-slider)
- [유튜브뮤직 클론 코딩](#유튜브뮤직-클론-코딩)
- [모바일페이 클론 코딩](#모바일페이-클론-코딩)

---

## Animated

### Drawer Menu

<img src="https://user-images.githubusercontent.com/72879145/231386816-cab8c934-3523-402a-93a0-b7600eed431a.GIF" width="200" height="400">

- 서랍처럼 열고 닫을 수 있는 형태로 일반적인 메뉴 UI로 많이 사용됨
- UI 내용
  - 햄버거 버튼이 있는 바깥영역
  - 메뉴가 나왔을 때의 메뉴 영역
- 에니메이션 내용
  - 메뉴가 열리고 닫히는 과정에서 메뉴가 자연스럽게 움직임
  - 메뉴가 열리고 닫히는 과정에서 뒷배경의 컬러의 투명도가 변화

### Collapse

<img src="https://user-images.githubusercontent.com/72879145/231386545-4ee97e1c-ca16-412c-85c5-4b6be65d0ae6.GIF" width="200" height="400">

- 클릭하면 아래로 펼쳐지고, 다시 누르면 접히는 UI
- 공지사항에서 많이 접하던 UI

### Progress Bar

<img src="https://user-images.githubusercontent.com/72879145/231386563-07b8f7b7-0c27-4c72-87a9-57678ca5dbb1.GIF" width="200" height="400">

- 상태 값에 맞춰 변화하는 UI
- 다양한 방식으로 바리에이션을 줄 수 있는 UI

### Skeleton

<img src="https://user-images.githubusercontent.com/72879145/231388142-a1310c0b-6320-4ce5-8381-35b7d271a2d8.GIF" width="200" height="400">

- 본격적인 데이터가 뜨기 전 나오는 애니메이션 화면
- 데이터가 뜨기 전 로딩시간이 체감적으로 감소
- 유저가 로딩시간을 짧게 느끼는 스켈레톤 규칙
  - 맥박효과 보다는 웨이브효과
  - 왼쪽에서 오른쪽으로 움직이는 효과
  - 주의를 끄지 않을 만큼의 속도의 애니메이션
- react-native-linear-gradient
  - [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
  ```
  <LinearGradient
    start={\{x: 0, y: 0}\}
    end={\{x: 1, y: 0}\}
    colors={['#ffffff00', '#ffffff90', '#ffffff00']}>
    <View style={\{width: 40, height: 100}\} />
  </LinearGradient>
  ```

### Snow Background

<img src="https://user-images.githubusercontent.com/72879145/231388165-70e4ade1-8412-4d56-bbea-812549c8e34e.GIF" width="200" height="400">

- 눈 아이콘을 100개 각각 애니메이션 컨트롤
- 랜덤한 x 좌표
- interpolate 기능으로 top 값을 변경 시키는 애니메이션

## LayoutAnimation

- LayoutAnimation 개념

  - [layoutanimation](https://reactnative.dev/docs/layoutanimation)
  - new Animated.Value 가 아닌 useState로 변하는 값을 감지해서 애니메이션 효과를 주는것

  ```
  const animation = () => {
  	LayoutAnimation,configureNext(...);
  	setCount(value => value + 1);
  }
  ```

  → useState의 set함수와 함께 호출

- android에서는 다음과 같은 초기세팅이 필요함

  ```
  import {UIManager, Platform} from 'react-native';

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  ```

- useState로 컴포넌트가 create, update, delete될 때 작동
- LayoutAnimation은 미리 Native로 코드를 전달해놓고, 상태가 변화할 때마다 애니메이션이 발생시키는 방식
- LayoutAnimation 호출 시, 행동할 setState를 같이 핸들링 해줌으로써, 해당 state에 애니메이션을 반영할 수 있음

  ```
  LayoutAnimation.configureNext(
  {
    duration: 300,
    // type:easeIn, spring, linear
    // property:opacity, scaleX, scaleY, scaleXY
    create: {type: 'easeIn', property: 'opacity'},
    update: {type: 'spring', property: 'scaleX', springDamping: 0.3},
    delete: {type: 'linear', property: 'scaleXY'},
  },
  () => console.log('end'),
  () => console.log('fail'),
  );
  ```

  다음과 같은 미리 정의된 Presets을 사용가능

  ```
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  ```

### Page Header

<img src="https://user-images.githubusercontent.com/72879145/231389420-cd3a68f0-7f77-4135-b098-e2f345931e9d.GIF" width="200" height="400">

- 큰 영역의 header, 작은 영역의 header 두 부분의 ui 구현
- ScrollView 컴포넌트로 스크롤이 되는 뷰를 만들것
- ScrollView 컴포넌트의 onLayout 메소드를 이용해 스크롤 높이를 측정하여 일정 높이가 되면 animation 작동
- LayoutAnimation preset을 이용

## PanResponder

- 소개
  - gesture를 감지해서 response로 터치상태를 콜백해주는 api
  - 터치로 핸들링하는 컴포넌트는 많지만, 터치액션을 세세하게 인식해서 콜백해주는 경우는 많지 않음
    - ex(ScrollView, Flatlist,SectionList)
  - PanResponder는 x,y터치좌표, 누적이동거리, 제스쳐의 속도, 현재 화면에 터치 갯수 등의 정보를 콜백으로 던져줌
  - gestureState
    - “dx”, “dy” : 터치 시작 후 누적거리, 음수는 왼쪽이나 하단으로이동이며 양수는 오른쪽이나 상단으로 이동했다는 것을 알 수 있음
    - “moveX”, “moveY” : 제일 최신에 찍힌 좌표이며 절대값으로 나타냄
    - “numberActiveTouches” : 액정에 터치 갯수
    - “stateID” : 터치 아이디, 터치가 움직이면 값도 변화함
    - “vx”, “vy” : 제스쳐 현재 속도
    - “x0”, “y0” : 이동 직전의 좌표, 제스쳐 시작할 때의 메소드에만 찍힘
  - Animated를 주로 같이 사용함
- 기능

  - 컴포넌트에 PanResponder 심기

  ```
  import React from 'react';
  import {PanResponder, Text, View} from 'react-native';

  export default () => {
    const panResponder = PanResponder.create({
      // permission method
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true, //움직이는 메소드를 사용할지
      //  response method
      onPanResponderGrant: () => {}, //터치응답이 잘 되는지
      onPanResponderReject: () => {}, //터치가 잘 안됐을때 response가 옴
      //  handler method
      onPanResponderStart: () => {}, //터치액션이 start됐을 때 작동
      onPanResponderMove: () => {}, //터치가 제스쳐로 전환될 때 response
      onPanResponderEnd: () => {}, //터치가 끝났을 때
      onPanResponderRelease: () => {}, //터치 액션이 최후로 끝났을 때
    });
    return (
      <View
        // 컴포넌트에 PanResponder 심기
        {...panResponder.panHandlers}
        style={\{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffa100',
        }\}>
        <Text>Panresponder Intro</Text>
      </View>
    );
  };
  ```

### 공던지기

<img src="https://user-images.githubusercontent.com/72879145/231389433-21a20f25-f063-436e-a5a6-0197187f3ff3.GIF" width="200" height="400">
- 공을 터치방향과 속도에 맞추어 던지기

### Modal UI

<img src="https://user-images.githubusercontent.com/72879145/231392187-9263b546-fa41-44e0-b5b1-5172f7fdb377.GIF" width="200" height="400">

- 저장하기, 좋아요,삭제하기, 닫기 등의 여러개의 선택지가 있는 menu modal UI
- react-native-iphone-x-helper이용
- show-hide될 때 timing 인터렉션 연결
- modal 부분의 (내리는)제스쳐 기반 인터렉션 구현

### Banner Slider

<img src="https://user-images.githubusercontent.com/72879145/231392232-fd31598f-cf4d-4f38-a669-f79c1dca8a1f.GIF" width="200" height="400">

- 4개의 영역이 나란하게 화면을 차지
- 하단의 네비게이션 버튼을 누르면 각 영역으로 이동
- 왼쪽 혹은 오른쪽으로 제스쳐를 하면, 슬라이딩 애니메이션 작동
- 한번에 여러개의 애니메이션이 작동되지 않도록 트리거도 넣기

  - useRef로 애니메이션 시작시 false값을 주고, 애니메이션이 끝난후 start()구문 안에 작성한 내용처럼 다시 true로 바꿔줌
  - padingRef값이 true여야 애니메이션이 실행됨

  ```
  const pandingRef = useRef(true);

  if (toRight && pandingRef.current) {
    pandingRef.current = false;
    setFocus(focus + 1);
    Animated.timing(bannerAnim, {
      toValue: -(focus + 1) * width,
      duration: 500,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        pandingRef.current = true;
      }
    });
  }
  ```

- Dimensions 활용

  - 모바일 화면의 영역크기를 알 수 있음

  ```
  import {Dimensions} from 'react-native';

  const {width} = Dimensions.get('window');
  ```

- 빈 배열로 따로 컴포넌트 만들지 않아도 여러개 생성 가능함.
  ```
  <View style={\{position: 'absolute', left: 0, flexDirection: 'row'}\}>
    {[...Array(4)].map((value, index) => (
      <View
        key={index}
        style={\{
          width,
          height: width,
          backgroundColor: '#ffa100',
          justifyContent: 'center',
          alignItems: 'center',
        }\}>
        <Text style={\{fontSize: 50, color: '#fff'}\}>{index}</Text>
      </View>
    ))}
  </View>
  ```

### Font Slider

<img src="https://user-images.githubusercontent.com/72879145/231392218-0c578b2a-e269-426e-8806-71e6aa3288ac.GIF" width="200" height="400">

- 1~4단계의 폰트가 있고, 단계마다 폰트 스타일 값을 가지는 ui
- 다른 단계까지는 클릭으로 이동
- 각 단계까지 슬라이더가 자연스럽게 이동하는 모습구현
- 드래그 엔 드롭 제스쳐로 상태를 바꿀 수 있게 작업

## 유튜브뮤직 클론 코딩

### 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/231377328-62dc1b05-74de-4681-ada9-16724a35670b.GIF" width="200" height="400">

### 정리

- 그라데이션 배경
  react-native-linear-gradient
- `<Image source={\{uri: '[https://picsum.photos/300](https://picsum.photos/300)'}\} />`
  위 링크는 숫자(300)너비만큼의 랜덤 이미지를 뽑아줌

- @faker-js/faker
  [fakerjs](https://fakerjs.dev/api/) 이 사이트에서 원하는 값을 골라서 사용할 수 있음

- scroll에 따른 애니메이션
  ScrollView에서 다음 3가지 옵션들을 활용하여 y좌표 움직임을 확인할 수 있음
  ```
  <ScrollView
          scrollEventThrottle={1}
          onScrollBeginDrag={e => {
            console.log(e.nativeEvent.contentOffset.y);
          }\}
          onScroll={e => {
            console.log(e.nativeEvent.contentOffset.y);
          }\}
          onScrollEndDrag={e => {
            console.log(e.nativeEvent.contentOffset.y);
          }\}>
  ```

## 모바일페이 클론 코딩

### 결과 화면

<img src="" width="200" height="400">

### 정리
