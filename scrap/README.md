# 웹페이지 스크랩 앱

## 결과 화면

<img src="https://user-images.githubusercontent.com/72879145/220271369-0bee4910-575e-416e-ade3-5651da2e3422.GIF" width="200" height="400">

## 목차

---

- [Recoil](#recoil)
- [Webview](#webview)
- [Open Graph Tag](#open-graph-tag)
- [Clipboard](#clipboard)

---

## 실행

```
npx expo start
```

Expo Go 앱을 사용하여 터미널에 출력된 바코드로 결과를 확인할 수 있다.

## 정리

### Recoil

- atom을 먼저 작성한다

```jsx
import { atom } from "recoil";

export const atomLinkList = atom({
  key: "MAIN/LINK_LIST",
  default: {
    list: [],
  },
});
```

- `useSetRecoilState()`를 사용하여 저장할 값들을 입력받는다

```jsx
import { useSetRecoilState } from "recoil";
import { atomLinkList } from "../states/atomLinkList";

export default () => {
  const updateList = useSetRecoilState(atomLinkList);

  const onPressSave = useCallback(() => {
    if (url === "") return;

    updateList((prevState) => {
      const list = [
        {
          title: "",
          image: "",
          link: url,
          createdAt: new Date().toISOString(),
        },
        ...prevState.list,
      ];

      return {
        list,
      };
    });
    setUrl("");
  }, [url]);
};
```

- `useRecoilValue()`로 값을 받아온다.

```jsx
import { useRecoilValue } from "recoil";
import { atomLinkList } from "../states/atomLinkList";

export default () => {
  const data = useRecoilValue(atomLinkList);

  return (
    <FlatList
      style={{ flex: 1 }}
      data={data.list}
      renderItem={({ item }) => {}}
    />
  );
};
```

### webview

`npx expo install react-native-webview`

[webview](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md)에서 자세한 사용방법을 확인할 수 있다.

웹뷰란 프레임워크에 내장된 웹 브라우저 컴포넌트 뷰의 형태로 앱 안에 HTML iframe을 넣어놓은 것이다.

### Open Graph Tag

- Meta에서 개발한 HTML 프로토콜
- Title, Type, Image URL 등 페이지에 대한 정보를 조회할 수 있음
- Html Head태그 안에 들어있는 정보
- 사용

  - `npm install react-native-opengraph-kit —save`
  - `OpenGraphParser`를 사용해서 metadata를 활용할 수 있도록 작성

  ```jsx
  import { OpenGraphParser } from "react-native-opengraph-kit";

  export const getOpenGraphData = async (url) => {
    const result = await OpenGraphParser.extractMeta(url);

    return result[0] || null;
  };
  ```

  작성한 함수를 사용해서 metadata값을 받아올 수 있음

  ```jsx
  import SingleLineInput from "../components/SingleLineInput";
  import { getOpenGraphData } from "../utils/OpenGraphTagUtils";

  export default () => {
    const [metaData, setMetaData] = useState(null);

    const onSubmitEditing = useCallback(async () => {
      const result = await getOpenGraphData(url);
      setMetaData(result);
    }, [url]);

    return (
      <View style={{ flex: 1 }}>
        <SingleLineInput
          value={url}
          onChangeText={setUrl}
          placeholder="https://example.com"
          onSubmitEditing={onSubmitEditing}
        />
        {metaData !== null && (
          <>
            <Spacer space={20} />
            <View
              style={{ borderWidth: 1, borderRadius: 4, borderColor: "gray" }}
            >
              <RemoteImage url={metaData.image} />
              <View style={{ padding: 12 }}>
                <Spacer space={10} />
                <Typography fontSize={20} color="black">
                  {metaData.title}
                </Typography>
                <Spacer space={4} />
                <Typography fontSize={16} color="gray">
                  {metaData.description}
                </Typography>
              </View>
            </View>
          </>
        )}
      </View>
    );
  };
  ```

### Clipboard

[Clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/)은 복사 및 붙여 넣기 기능을 추가할 수 있다.

`npx expo install expo-clipboard`

- 사용

  - `getStringAsync()`를 사용

  ```jsx
  import { getStringAsync } from "expo-clipboard";

  export const getClipboardString = () => {
    return getStringAsync();
  };
  ```

  - 위에서 작성한 함수를 사용

  ```jsx
  import { getClipboardString } from "../utils/ClipboardUtils";

  export default () =>{
  const onGetClipBoardString = useCallback(async () => {
      const result = await getClipboardString();
      console.log("result", result);
  }, []);

  useEffect(() => {
      onGetClipBoardString();
  }, []);
      return()
  }
  ```
