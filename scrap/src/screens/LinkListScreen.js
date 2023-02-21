import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { Button } from "../components/Button";
import { Header } from "../components/Header/Header";
import { Icon } from "../components/Icon";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
import { atomLinkList } from "../states/atomLinkList";

export default () => {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const data = useRecoilValue(atomLinkList);

  const onPressListItem = useCallback((item) => {
    navigation.navigate("LinkDetail", { item });
  }, []);
  const onPressAddButtton = useCallback(() => {
    navigation.navigate("AddLink");
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="LINT LIST" />
        </Header.Group>
      </Header>

      <FlatList
        style={{ flex: 1 }}
        data={data.list}
        renderItem={({ item }) => {
          return (
            <Button
              onPress={() => onPressListItem(item)}
              paddingHorizontal={24}
              paddingVertical={24}
            >
              <View>
                <Typography fontSize={20}>{item.link}</Typography>
                <Spacer space={4} />
                <Typography fontSize={16} color="gray">
                  {`${
                    item.title !== "" ? item.title.slice(0, 20) + " | " : ""
                  }`}
                  {new Date(item.createdAt).toLocaleString()}
                </Typography>
              </View>
            </Button>
          );
        }}
      />

      <View
        style={{
          position: "absolute",
          right: 24,
          bottom: 24 + safeAreaInset.bottom,
        }}
      >
        <Button onPress={onPressAddButtton}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
            }}
          >
            <Icon name="add" color="white" size={32} />
          </View>
        </Button>
      </View>
    </View>
  );
};
