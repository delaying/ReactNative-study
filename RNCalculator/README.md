# Native Module 계산기 앱

## 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/222646600-6ee43322-061d-43d1-b2ac-c1c491977a59.GIF" width="400" height="400">

## 목차

---

- [React Native CLI 사용](#react-native-cli-사용)
- [IOS & Android 필수개념](#ios--android-필수-개념)
- [Native Module](#native-module)
- [Calculator Project](#calculator-project)

---

## 실행

```
npm run ios && npm run android
```

xcode와 android studio를 설치하거나, 직접 모바일 기기를 연결하여 프로젝트 결과를 확인할 수 있다.

## 정리

### React Native CLI 사용

delaying's 개발 블로그 [React Native CLI 사용과 Expo CLI의 한계](https://delaying.github.io/posts/rncli/)글에 더 자세히 정리되어있다.

### IOS & Android 필수 개념

delaying's 개발 블로그 [꼭 알아야 할 ios와 android 개념](https://delaying.github.io/posts/iosandroid/)글에 더 자세히 정리되어있다.

### Native Module

delaying's 개발 블로그 [Native Module, New Architecture, Hermes](https://delaying.github.io/posts/nativemodule/)글에 더 자세히 정리되어있다.

### Calculator Project

`npx react-native init RNCalculator --template react-native-template-typescript`

typescript 템플릿을 사용하여 react-native cli project를 생성하였다.

native module 작성 시 visual studio보다 android studio와 xcode에서 직접 작성하는게 더욱 편리하다.

#### android - kotlin

- 프로젝트의 android폴더를 android studio에서 open
- Gradle Scripts → build.gradle 추가 작성
  - kotlinversion 설정
  - dependencies의 kotlinversion의 classpath설정
  ```
  ext {
          targetSdkVersion = 33
          kotlinVersion = "1.6.0"
  }
  dependencies {
          classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:${project.ext.kotlinVersion}"
          classpath("com.android.tools.build:gradle:7.3.1")
          classpath("com.facebook.react:react-native-gradle-plugin")
      }
  ```
- 최상위 build.gradle(app)에서 apply plugin작성

  ```
  apply plugin: "kotlin-android"
  ```

- RNCalculator -> app -> java -> com.rncalculator 경로에서 로직을 작성해준다.
  MainActivity와 MainApplication파일도 필요에따라 수정한다.

#### ios - swift

- 프로젝트폴더 → ios → xcworkspace 폴더를 xcode에서 open
- swift파일에 사용 로직 작성
- bridging-header 파일 작성
  ```
  //react package사용가능하도록 다음을 import
  #import <React/RCTBridgeModule.h>
  ```
- ModuleBridge 파일을 objective_C로 작성
- command + b 키로 build 가능

처음으로 rn cli를 실행했더니 에러가 발생하였다.

```
Singing for "app_name" requires a development team.
```

ios 핸드폰을 개발자 모드로 전환하고 team 설정을 해야했다.

이 [사이트](https://velog.io/@kekeke257/Xcode-development-team)를 참고하여 해결하였다.

위 에러 해결 후, 다음 2가지 에러가 발생했다.

```
Failed to create provisioning profile.
```

```
No profiles for 'org.reactjs.native.example.RNCalculator' were found.
```

실행할 기기가 분명하지 않아 발생한 에러이다.

이 [사이트](https://stackoverflow.com/questions/39603667/failed-to-create-provisioning-profile)를 참고하여 해결하였다.

또한, 다음과 같은 다양한 실행착오를 겪었다.

- 키체인 입력 창이 떠서 아무 입력없이 enter키 누르니까 해결
- 핸드폰이 직접적으로 연결되어 있으면 가상 시뮬레이터가 뜨지 않음

#### View 작성

`NativeModules`를 import한 후 사용하면된다.

```
import {NativeModules} from 'react-native';

export const excuteCalculator = (
  action: 'plus' | 'minus' | 'divide' | 'multiply',
  numA: number,
  numB: number,
): Promise<number> => {
  return NativeModules.CalculatorModule.executeCalc(action, numA, numB);
};
```
