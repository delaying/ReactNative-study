import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSetRecoilState } from "recoil";
import { Button } from "../components/Button";
import { Header } from "../components/Header/Header";
import { Icon } from "../components/Icon";
import { RemoteImage } from "../components/RemoteImage";
import SingleLineInput from "../components/SingleLineInput";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
import { atomLinkList } from "../states/atomLinkList";
import { getClipboardString } from "../utils/ClipboardUtils";
import { getOpenGraphData } from "../utils/OpenGraphTagUtils";

export default () => {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const [url, setUrl] = useState();
  const updateList = useSetRecoilState(atomLinkList);
  const [metaData, setMetaData] = useState(null);
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressSave = useCallback(() => {
    if (url === "") return;

    updateList((prevState) => {
      const list = [
        {
          title: metaData.title,
          image: metaData.image,
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
    setMetaData(null);
  }, [url, metaData]);

  const onSubmitEditing = useCallback(async () => {
    setLoading(true);
    const result = await getOpenGraphData(url);
    setMetaData(result);
    setLoading(false);
  }, [url]);

  const onGetClipBoardString = useCallback(async () => {
    const result = await getClipboardString();
    if (result.startsWith("https://")) {
      setUrl(result);
      const ogResult = await getOpenGraphData(result);
      setMetaData({
        title: ogResult.title,
        image: ogResult.image,
        description: ogResult.description,
      });
    }
    console.log("result", result);
  }, []);

  useEffect(() => {
    onGetClipBoardString();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="ADD LINK" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={onPressClose} />
      </Header>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          padding: 24,
        }}
      >
        <View>
          <SingleLineInput
            value={url}
            onChangeText={setUrl}
            placeholder="https://example.com"
            onSubmitEditing={onSubmitEditing}
          />
          <View
            style={{
              position: "absolute",
              right: 10,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onPress={() => {
                setUrl("");
                setMetaData(null);
              }}
            >
              <Icon name="close" color="black" size={20} />
            </Button>
          </View>
        </View>

        {loading ? (
          <>
            <Spacer space={20} />
            <View
              style={{ borderWidth: 1, borderRadius: 4, borderColor: "gray" }}
            >
              <Spacer space={(width - 48) * 0.5} />
              <Spacer space={50} />

              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            </View>
          </>
        ) : (
          metaData !== null && (
            <>
              <Spacer space={20} />
              <View
                style={{ borderWidth: 1, borderRadius: 4, borderColor: "gray" }}
              >
                <RemoteImage
                  url={metaData.image}
                  width={width - 48}
                  height={(width - 48) * 0.5}
                />
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
          )
        )}
      </View>

      <Button onPress={onPressSave}>
        <View style={{ backgroundColor: url === "" ? "gray" : "black" }}>
          <View
            style={{
              height: 52,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="white" fontSize={18}>
              저장하기
            </Typography>
          </View>
          <Spacer space={safeAreaInset.bottom} />
        </View>
      </Button>
    </View>
  );
};
