# 뉴스 스크랩 앱

## 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/220528372-5be3808e-1023-48c4-9c65-08a6b3a6ff5c.gif" width="200" height="400">

## 목차

---

- [검색 API](#검색-api)
- [Redux-thunk](#redux-thunk)

---

## 실행

```
npx expo start
```

Expo Go 앱을 사용하여 터미널에 출력된 바코드로 결과를 확인할 수 있다.

## 정리

### 검색 API

[naver Developers](https://developers.naver.com/apps/#/list)에서 검색 api사용을 위해 application을 등록한다.

클라이언트 id와 암호를 메모해두고 다음 [사용방법](https://developers.naver.com/docs/serviceapi/search/news/news.md#뉴스)을 참고하여 api를 활용한다.

요청 url `https://openapi.naver.com/v1/search/news.json`에 get메서드를 사용하면 된다고 나와있다.

client-id와 client-secret부분에 application등록 후 발급받은 id와 secret 키를 작성한다.

```
export const GET_NEWS_LIST_REQUEST = "GET_NEWS_LIST_REQUEST";
export const GET_NEWS_LIST_SUCCESS = "GET_NEWS_LIST_SUCCESS";
export const GET_NEWS_LIST_FAILURE = "GET_NEWS_LIST_FAILURE";

export const getNewsList = (query) => (dispatch) => {
  dispatch({ type: GET_NEWS_LIST_REQUEST });

  fetch(
    `https://openapi.naver.com/v1/search/news.json?query=${decodeURIComponent(
      "TEST"
    )}`,
    {
      headers: {
        "X-Naver-Client-Id": "",
        "X-Naver-Client-Secret": "",
      },
    }
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      dispatch({ type: GET_NEWS_LIST_SUCCESS, result });
    })
    .catch((ex) => {
      dispatch({ type: GET_NEWS_LIST_FAILURE, ex });
    });
};
```

redux와 함께 사용하였으므로, Redux-thunk부분에서 나머지 코드를 확인할 수 있다.

### Redux-thunk

이 미들웨어는 객체 대신 함수를 생성하는 액션 생성함수를 작성 할 수 있게 해준다.

`$ yarn add redux-thunk`

사용할 컴포넌트에서 `useDispatch()`를 사용하여 액션함수를 실행할 수 있다.

```jsx
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { getNewsList } from "../actions/news";
import { Button } from "../components/Button";
import { Typography } from "../components/Typography";

export default () => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <Button
        onPress={() => {
          dispatch(getNewsList());
        }}
      >
        <Typography fontSize={24}>ACTION 요청하기</Typography>
      </Button>
    </View>
  );
};
```

위처럼 작성 후 버튼을 누르면 뉴스들이 다음처럼 출력된다.

여기에서 원하는 정보들을 뽑아 사용하면된다.

<img src="https://user-images.githubusercontent.com/72879145/220495762-0f22b62b-847c-4870-a551-b462b5da3454.png" width="450" height="250">

또한, reducer에서 필요한 정보들을 상태마다 관리할 수 있다.

```
import {
  GET_NEWS_LIST_FAILURE,
  GET_NEWS_LIST_REQUEST,
  GET_NEWS_LIST_SUCCESS,
} from "../actions/news";

const defalutNewsReducer = {
  favoriteNews: [],
  newsList: [],
  loading: false,
};

export default (state = defalutNewsReducer, action) => {
  switch (action.type) {
    case GET_NEWS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NEWS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        newsList: action.result.items,
      };
    case GET_NEWS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };
  }
  return {
    ...state,
  };
};
```
