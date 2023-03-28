# Love Dog

## 목차

---

- [요구사항](#요구사항)
- [bottomtab 이미지 설정](#android-bottomtab-이모티콘-나오지-않는문제-해결)
- [firebase 설정](#회원등록---firebase-설정)
- [이메일 유효성 검사](#이메일-유효성검사)
- [갤러리 이미지 불러오기](#프로필-설정을-위한-갤러리-이미지-불러오기)
- [firebase 데이터 저장](#firebase에-데이터-저장)
- [react-native-gesture-handler](#react-native-gesture-handler)
- [react-native-reanimated](#react-native-reanimated)
- [deeplink](#deeplink)
- [퍼포먼스 향상 체크리스트](#퍼포먼스-향상을-위해-반드시-체크해야-할-것)
- [in-app 결제](#수익화를-위한-in-app-결제)

---

## 실행

```
npm run ios && npm run android
```

xcode와 android studio를 설치하거나, 직접 모바일 기기를 연결하여 프로젝트 결과를 확인할 수 있다.

## 정리

### 요구사항

- 회원가입 → 회원정보입력 → 프로필설정
- google로 로그인가능
- 최초 로그인시 추가정보 입력
- 강아지 사진을 보거나 좋아요를 누를 수 있음
- 좋아요를 누른 강아지들을 모아볼 수 있음 → 사진 확대 가능
- 마이화면은 유저정보와 히스토리를 볼 수 있음
- 하루 6개이상 좋아요를 누르기 위해서는 결제가 필요함

### android bottomtab 이모티콘 나오지 않는문제 해결

- 다음처럼 아이콘을 확실하게 설정해주기

  ```jsx
  <BottomTab.Navigator
        screenOptions={({route}) => {
          const getIconName = (): string => {
            if (route.name === 'My') {
              return 'person';
            }
            return 'home';
          };
          const routeIconName = getIconName();
          return {
            headerShown: false,
            tabBarIcon: ({color}) => {
              return (
                <TabIcon
                  visibleBadge={false}
                  iconName={routeIconName}
                  iconColor={color}
                />
              );
            },
          };
        }}>
  ```

### 회원등록 - firebase 설정

- firebase console에서 프로젝트 및 앱 등록
- google service 파일들을 각 ios>프로젝트와 android>app경로로 이동
- [https://rnfirebase.io/](https://rnfirebase.io/)
- 위 사이트 참고해서 설정

  - npm install @react-native-firebase/app
  - android

    - android>build.gradle dependencies에 다음내용추가

      ```jsx
      classpath 'com.google.gms:google-services:4.3.15'
      ```

      - android>app>build.gradle에 맨위에 다음내용추가

      ```jsx
      apply plugin: 'com.google.gms.google-services'
      ```

    - ios xcode → 프로젝트>AppDelegate(M+모양 이모지) 다음추가

      ```jsx
      #import <Firebase.h>

      ...

      [FIRApp configure];
      ```

      - ios>podfile 다음추가

        ```jsx
        use_frameworks! :linkage => :static
        $RNFirebaseAsStaticFramework = true
        ```

      - cd ios > pod install

  - auth 모듈설정
    - [rnfirebase](https://rnfirebase.io/auth/usage) 사이트 참고
    - npm install `@react-native-firebase/auth` —save
  - react-native-google-signin사용하기

    - [android guide](https://github.com/react-native-google-signin/google-signin/blob/master/docs/android-guide.md)
    - [ios guide](https://github.com/react-native-google-signin/google-signin/blob/master/docs/ios-guide.md)
    - ios와 android각각 설정
    - `npm install @react-native-google-signin/google-signin`
    - auth와 함께 사용하기

    ```jsx
    const onPressGoogleSignin = useCallback(async () => {
      const isSignIn = await GoogleSignin.isSignedIn();
      if (isSignIn) {
        await GoogleSignin.signOut();
      }

      const result = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        result.idToken,
      );
      const authResult = await auth().signInWithCredential(googleCredential);

      rootNavigation.push('Signup', {
        screen: 'InputEmail',
        params: {
          preInput: {
            email: result.user.email,
            name: result.user.name ?? 'Unknown',
            profileImage: result.user.photo ?? '',
          },
          uid: authResult.user.uid,
        },
      });
    }, [rootNavigation]);
    ```

### 이메일 유효성검사

- npm install email-validator

```jsx
import EmailValidator from 'email-validator';

return EmailValidator.validate(inputEmail);
```

### 프로필 설정을 위한 갤러리 이미지 불러오기

- [rn image crop picker](https://github.com/ivpusic/react-native-image-crop-picker)
- npm i react-native-image-crop-picker

```jsx
import ImagePicker from 'react-native-image-crop-picker';

ImagePicker.openPicker({
  width: 300,
  height: 400,
  cropping: true,
}).then(image => {
  console.log(image);
});
```

- react-native-actionsheet

  - [react-native-actionsheet](https://www.npmjs.com/package/react-native-actionsheet)
  - `npm install react-native-actionsheet --save`
  - typescript 지원을 위해 다음 추가
    - npm install --save-dev @types/react-native-a
      ctionsheet
  - 사용

    ```jsx
    import ActionSheet from 'react-native-actionsheet';

    class Demo extends React.Component {
      showActionSheet = () => {
        this.ActionSheet.show();
      };
      render() {
        return (
          <View>
            <Text onPress={this.showActionSheet}>Open ActionSheet</Text>
            <ActionSheet
              ref={o => (this.ActionSheet = o)}
              title={'Which one do you like ?'}
              options={['Apple', 'Banana', 'cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={1}
              onPress={index => {
                /* do something */
              }}
            />
          </View>
        );
      }
    }
    ```

### firebase에 데이터 저장

- npm install --save @react-native-firebase/database @react-native-firebase/storage
- storage와 realtime database 사용시작 설정하기

### 제스쳐로 like와 not like 표시하기

#### react-native-gesture-handler

- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/#installation)
- `npm install --save react-native-gesture-handler`
- 사용

  - GestureHandlerRootView를 root에서 감싸주어야함

  ```jsx
  export default function App() {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        {/* content */}
      </GestureHandlerRootView>
    );
  }
  ```

#### pan gesture 사용

[pan-gesture](https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/pan-gesture/)

- 패닝(끌기) 제스처를 인식하고 움직임을 추적할 수 있는 연속 제스처입니다.
- begin은 터치시작, finalize는 터치끝
  ```
    const gesture = Gesture.Pan()
        .runOnJS(true)
        .onBegin(() => {
          console.log('onBegin');
        })
        .onUpdate(event => {
          console.log('onUpdate', event);
        })
        .onFinalize(() => {
          console.log('onFinalize');
        });
  ```
  - gestureDetector로 getsture를 사용할 부분을 감싼다
  ````tsx
    <GestureDetector gesture={gesture}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <RemoteImage
          url={dog.photoUrl}
          width={width * 0.7}
          height={width * 0.7}
        />
      </View>
    </GestureDetector>
    ```
  ````

### react-native-reanimated

- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/)
- `npm install --save react-native-reanimated`

  - babel.config.js파일에 다음내용넣기
    ```jsx
    module.exports = {
        presets: [
          ...
        ],
        plugins: [
          ...
          'react-native-reanimated/plugin',
        ],
      };
    ```

### DeepLink

- 특정 페이지로 이동하기 위한 수단
- push notification, 외부 마케팅 링크 등에서 중요하게 사용됨
- [deep-linking](https://reactnavigation.org/docs/deep-linking/)
- ios 설정

  - xcode> AppDelegate.m에서 다음내용추가

  ```jsx
  // Add the header at the top of the file:
  #import <React/RCTLinkingManager.h>

  // Add this inside `@implementation AppDelegate` above `@end`:
  - (BOOL)application:(UIApplication *)application
     openURL:(NSURL *)url
     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
  {
    return [RCTLinkingManager application:application openURL:url options:options];
  }

  // Add this inside `@implementation AppDelegate` above `@end`:
  - (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
   restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
  {
   return [RCTLinkingManager application:application
                    continueUserActivity:userActivity
                      restorationHandler:restorationHandler];
  }
  ```

  - `npx uri-scheme add mydog --ios` 명령어실행
    ⇒ info > url types에 mydog이 추가됨

- android 는 다음 명령어만 입력하면됨.
  - `npx uri-scheme add mydog --android`
- 사용
  [configuring-links](https://reactnavigation.org/docs/configuring-links)
- 테스트

  - npx uri-scheme open “mydog://main/page” --ios
  - 처럼 딥링크와 플랫폼 지정

### 퍼포먼스 향상을 위해 반드시 체크해야 할 것

#### FlatList의 사용

- 큰 list를 사용하는 경우, scrollView는 모든 컴포넌트를 렌더링하므로 이를 피하기 위해 flatList 사용을 권장

#### useCallback, useMemo 등의 사용

- 자주 렌더가 일어나느 경우에는 매번 변수 또는 함수가 재생산됨
- 자주 일어난다면 비정상적인 memory를 가지게 되므로 이런경우, useMemo와 useCallback등의 사용을 권장

#### Image Cache처리

- 매번 새롭게 이미지를 불러오기 보다는 로컬에 캐싱처리
- 두번째 요청할 때는 비교적 빠르게 가져올 수 있음
- react-native-fast-image 패키지 이용가능

#### JPG보다는 PNG처리

- 이미지 용량이 jpg가 더 큼
- 좀더 빠른 렌더 및 모바일 환경에 맞추어 png사용권장

#### 이미지 사이즈 처리

- 이미지의 사이즈를 명확히 명시하지 않아 render가 무한히 호출됨
  - ex: width:’100%’사용x
- 가급적이면 정수로 되어있는 width, height값 선언 권장

### 수익화를 위한 in-app 결제

- 인앱결제란?
  - 앱에서 구매에 대한 액션이 발생하는 경우 사용
  - 디지털 컨텐츠에 대한 구매인 경우에는 강제
  - 구매 이후 받는 상품이 현물이라면 하지 않아도 됨
- 결제 방식
  - 일반 소모품 아이템 : 일반적으로 특정 아이템을 구매하는 액션에서 사용하게 되는 기능
  - 구독형 아이템 : 특정 주기에 한번씩 구매하고, 그 기간동안 무제한으로 이용
- 결제 과정
  - 구매할 아이템 클릭
  - play store / app store 구매요청
  - 다시 app으로 영수증 전달
  - app에서 서버로 영주증 전달, store에서 영수증 유효성 체크
  - 서버에서 store로 영수증 유효성 체크
  - 서버에서 아이템 지급
  - 서버에서 완료처리 후 app에서 아이템 소급처리
- 인앱결제 주의할점(ios)
  - 판매하는 상품이 스토어에 명확히 보여야 함
  - 결제시에는 어떤 상품을 결제하는지에 대해 prompt로 보여야 함
  - 백그라운드 결제를 할 경우 reject
- react native IAP 사용

  - [react-native-iap](https://react-native-iap.dooboolab.com/docs/get-started)
  - npm 후 ios와 android환경 설정
  - ios xcode에서 signing&capabilities>+capability > in-app purchase 설정
  - 사용

    ```jsx
    import React from 'react';
    import {withIAPContext} from 'react-native-iap';

    const App = () => <View />;

    export default withIAPContext(App);
    ```

    구매시 requestPurchase 요청

    ```jsx
    const {requestPurchase, getProducts} = useIAP();
    ```

  - 인앱결제 테스트시 제약사항 (ios)
    - 개발자 계정이 사전에 등록되어 있어야함.
    - 사전에 세금, 은행 관련 정보가 모두 입력되고 확인 되어야함.(사업자등록)
  - 인앱결제 테스트시 제약사항 (android)
    - 개발자 계정이 사전에 등록되어 있어야함
    - 빌드의 결과물이 업로드 되어있어야 상품 등록가능
    - 내부 테스트로서 초대가 완료 되어 있어야 함
