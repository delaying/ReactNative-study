# 나만의 갤러리

## 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/218002869-1cbf4d4a-6256-49e2-b88b-51e02310849f.GIF" width="200" height="400">

## 목차

---

- [admob으로 광고 추가하기](#admob으로-광고-추가하기)
- [imagePicker](#imagepicker)
- [화면 너비값 가져오기](#화면-너비값-가져오기)
- [modal](#modal)

---

## 실행

```
npx expo start
```

Expo Go 앱을 사용하여 터미널에 출력된 바코드로 결과를 확인할 수 있다.

## 정리

### admob으로 광고 추가하기

이 프로젝트에서는 앨범을 2개 이상 만들려면 광고를 본 후에 만들 수 있다.

위 기능을 [admob](https://docs.expo.dev/versions/v45.0.0/sdk/admob/)을 이용하여 구현했다.

자세한 이용방법은 [블로그](https://delaying.github.io/posts/admob/)에 따로 정리 되어있다.

### ImagePicker

[ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)는 expo에서 제공한다.

저장된 이미지나 영상 또는 카메라로 직접 찍은 이미지를 프로그램으로 전달하는 역할을 한다.

`npx expo install expo-image-picker` 명령어로 설치하여 사용한다.

- 사용법

  ```
  import * as ImagePicker from "expo-image-picker";

  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
      };
      }
  };
  ```

### 화면 너비값 가져오기

[Dimensions](https://reactnative.dev/docs/dimensions)를 사용한다.

다양한 화면의 너비와 높이값을 동적으로 가져올 수 있다.

```
import {Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;
```

### Modal

팝업형태의 창을 Modal이라고 한다.

React Native에서 [Modal](https://reactnative.dev/docs/modal)을 제공한다.

```
<Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
></Modal>
```

#### 모달창 배경은 투명하게

modal에서 배경 부분만 투명도값을 지정하고, 하위요소들에는 영향을 주고 싶지 않을 경우에는 style에 다음값을 설정 하면된다.

`backgroundColor: rgba(255,255,255,0.8)`
