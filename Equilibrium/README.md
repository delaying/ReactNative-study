# 평형계 앱

## 결과 화면

- 수평일 경우 위아래 모두 초록색화면이 되고, 기울어지면 빨간색으로 변한다.
- 기기를 세울경우, 위쪽에 위치하는 부분이 빨간색으로 변한다.
- 핸드폰을 정상방향으로 세우면 y값이 `-1~0`값이 되고, 거꾸로 세우면 `0~1`값이 된다.

<img src="https://user-images.githubusercontent.com/72879145/223045215-9080677a-3c9b-45f1-8f07-50d60bcccb3a.GIF" width="200" height="400">

## 목차

---

- [가속도 센서](#가속도-센서)
- [자이로스코프 센서](#자이로스코프-센서)
- [react-native-sensors](#react-native-sensors)

---

## 실행

```
npm run ios && npm run android
```

xcode와 android studio를 설치하거나, 직접 모바일 기기를 연결하여 프로젝트 결과를 확인할 수 있다.

## 정리

### 가속도 센서

가속도센서란 지구의 중력가속도를 기준으로 사물이 얼마만큼의 힘을 받고 있는지를 측정하는 센서이다.

가만히 있을 때 센서에 작용하는 중력 가속도를 X, Y, Z 축 벡터 3개로 나누어 크기를 측정한다.

시간이 지나도 오차에 강하며, 가속도센서의 값들은 정지된 상태에서도 특정한 값을 갖기 때문에 기울어진 정도를 파악하거나 진동을 파악하는데 많이 사용된다.

### 자이로스코프 센서

Gyro : 회전하는 것

자이로 센서는 물체의 회전속도인 각속도의 값을 이용하는 센서이기 때문에 ‘각속도 센서’ 라고도 한다.

각속도는 어떤 물체가 회전 운동할 때 생기는 코리올리 힘(Coriolis Force)을 전기적 신호로 변환하여 계산할 수 있다.

코리올리 힘이란 운동하는 물체의 속도에 비례하며 운동방향에 수직인 힘을 의미한다.

자이로 센서는 회전하는 물체의 회전각과 기울기 등을 알 수 있기 때문에 물체의 가속도나 충격의 세기를 측정하는 ‘가속도 센서’와 함께 사용되어 동작 인식을 효과적으로 하는 역할을 한다.

### react-native-sensors

핸드폰의 sensor들을 사용하기 위해 [react-native-sensors](https://react-native-sensors.github.io/docs/Usage.html)라이브러리를 사용한다.

`npm install react-native-sensors --save`로 설치 후, ios폴더에서도 `pod install`을 해준다.

`import {accelerometer} from 'react-native-sensors';`필요한 센서를 import한 후 사용한다.

```
useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      accelerometerValue.value = {x, y, z};
      setValue({x, y, z});
    });
    return () => subscription.unsubscribe();
  }, [accelerometerValue]);

  const leftBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [-1, 0],
        ['red', 'green'],
      ),
    };
  });
  const rightBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [0, 1],
        ['green', 'red'],
      ),
    };
  });

...

<View
        style={{
          flex: 1,
        }}>
        <Animated.View style={[{flex: 1}, leftBackground]} />
        <Animated.View style={[{flex: 1}, rightBackground]} />
      </View>
```

- 실행 실패 1
  기기의 센서를 사용해야하므로 아이폰을 직접 연결해서 실행했는데 다음과 같은 에러가 발생했다.

  ```
  Failed to register bundle identifier.
  ```

  → Bundle Identifier를 변경하고 try again버튼을 누르니 해결되었다.

- 실행 실패 2
  아이폰에서 앱 설치후 실행 시 ‘신뢰하지 않는 개발자’라는 경고창이 떴다.

  → '설정 - 일반 - VPN 및 기기관리'에서 신뢰버튼 클릭하면 해결된다.
