import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { Header } from "../components/Header/Header";
import { Icon } from "../components/Icon";
import { Spacer } from "../components/Spacer";
import { RemoteImage } from "../components/RemoteImage";
import { Typography } from "../components/Typography";

export default () => {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const onPressSettings = useCallback(() => {
    navigation.navigate("Setting");
  }, []);

  const onPressAdd = useCallback(() => {
    navigation.navigate("AddDiary");
  }, []);

  const [data, setData] = useState([
    {
      id: 0,
      title: "title_00",
      content: "content_00",
      createdAt: "2022-02-02",
      updatedAt: "2022-02-03",
      imageUrl:
        "https://docs.expo.dev/static/images/tutorial/background-image.png",
    },
    {
      id: 1,
      title: "title_01",
      content: "content_01",
      createdAt: "2022-02-02",
      updatedAt: "2022-02-03",
      imageUrl:
        "https://docs.expo.dev/static/images/tutorial/background-image.png",
    },
    {
      id: 2,
      title: "title_02",
      content: "content_02",
      createdAt: "2022-02-02",
      updatedAt: "2022-02-03",
      imageUrl:
        "https://docs.expo.dev/static/images/tutorial/background-image.png",
    },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header>
          <Header.Group>
            <Header.Title title="DIARY LIST" />
          </Header.Group>
          <Header.Icon name="settings" onPress={onPressSettings} />
        </Header>

        <FlatList
          data={data}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 30,
          }}
          renderItem={({ item }) => {
            return (
              <Button
                onPress={() => {
                  navigation.navigate("DiaryDetail", { item });
                }}
              >
                <View style={{ paddingVertical: 12 }}>
                  {item.imageUrl !== null && (
                    <>
                      <RemoteImage
                        url={item.imageUrl}
                        width={width - 24 * 2}
                        height={(width - 24 * 2) * 0.5}
                        style={{ borderRadius: 8 }}
                      />
                      <Spacer space={4} />
                    </>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Typography fontSize={18}>{item.title}</Typography>
                      <Spacer space={4} />
                      <Typography fontSize={12}>{item.content}</Typography>
                    </View>
                    <Typography fontSize={12}>{item.updatedAt}</Typography>
                  </View>
                </View>
              </Button>
            );
          }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          right: 12,
          bottom: safeAreaInset.bottom + 24,
        }}
      >
        <Button onPress={onPressAdd}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="add" color="white" size={30} />
          </View>
        </Button>
      </View>
    </View>
  );
};
