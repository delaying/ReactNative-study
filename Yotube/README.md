# 요튜브 클론 앱

## 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/226363395-648b7286-3dfb-417f-9c14-74a08093990b.GIF" width="200" height="400">

## 목차

---

- [](#)

---

## 실행

```
npm run ios && npm run android
```

xcode와 android studio를 설치하거나, 직접 모바일 기기를 연결하여 프로젝트 결과를 확인할 수 있다.

## 정리

### 요구사항

- 사용자는 유튜브 영상 리스트를 불러올 수 있다.
- 제일 끝까지 스크롤 한 경우 게시물을 불러 올 수 있다.

### youtube data api

- [google developer](https://developers.google.com/youtube/v3/getting-started?hl=ko)

  ```
  const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
  });

  const loadData = useCallback(async () => {
    try {
      const videoResults = await axiosInstance.get<TypeVideoListResponse>(
        '/videos',
        {
          params: {
            key: API_KEY,
            part: 'snippet, contentDetails, statistics',
            chart: 'mostPopular',
            regionCode: 'KR',
          },
        },
      );
    } catch (ex) {
      console.error(ex);
    }
  }, []);
  ```

### axios

- 브라우저, node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
- 사용법
  - get
    ```jsx
    const getUser = async () => {
      try {
        const response = await axios.get('');
        console.log(response);
      } catch (ex) {}
    };
    ```
  - post
    ```jsx
    const getUser = async () => {
      try {
        const response = await axios.post('', body값);
        console.log(response);
      } catch (ex) {}
    };
    ```

#### axios와 fetch의 차이점

- axios는 data속성을 다루고, fetch는 body속성을 다룬다.
  fetch의 경우 json을 호출하여 사용하지만, axios는 바로 사용 가능하다.
- axios는 status code가 200인경우 success
- fetch는 응답 객체가 ok속성을 포함하면 success
- axios는 요청에 대한 취소 또는 timeout 설정이 가능하지만, fetch는 해당기능이 제공되지 않는다.
- axios는 generic을 통한 typescript type추론이 쉽다.

### infinity scroll

#### 방식

- page 처리
  - 특정 페이지에 해당하는 값들을 불러오는 방식 ( ex.게시판)
  - 게시물 이동과 게시물추가에따른 에러가 발생할 수 있음
- cursor 처리
  - 특정 아이템을 기준으로 그 뒤에 있는 아이템을 불러오는 방식

#### FlatList

- onEndReached : 끝까지 scroll되었을 때 trigger되는 함수
- onEndReachedThreshold : 어느 영역에서 onEndReached를 trigger시킬지 설정하는 함수 (0~1사이 값)
