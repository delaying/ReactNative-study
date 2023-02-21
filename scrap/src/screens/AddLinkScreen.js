import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSetRecoilState } from "recoil";
import { Button } from "../components/Button";
import { Header } from "../components/Header/Header";
import { RemoteImage } from "../components/RemoteImage";
import SingleLineInput from "../components/SingleLineInput";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
import { atomLinkList } from "../states/atomLinkList";
import { getOpenGraphData } from "../utils/OpenGraphTagUtils";

export default () => {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const [url, setUrl] = useState();
  const updateList = useSetRecoilState(atomLinkList);
  const [metaData, setMetaData] = useState(null);
  const { width } = useWindowDimensions();

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, []);

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

  const onSubmitEditing = useCallback(async () => {
    const result = await getOpenGraphData(url);
    console.log(result);
    setMetaData(result);
  }, [url]);

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
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 24,
        }}
      >
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
