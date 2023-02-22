import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { Button } from "../components/Button";
import { Header } from "../components/Header/Header";
import { Typography } from "../components/Typography";

export default () => {
  const navigation = useNavigation();
  const data = useSelector((state) => state.news.favoriteNews);

  const onPressItem = useCallback((newsItem) => {
    navigation.navigate("NewsDetail", { newsItem });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title={"FAVORITE_NEWS_LIST"} />
      </Header>

      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => {
          return (
            <Button onPress={() => onPressItem(item)}>
              <View style={{ flex: 1, padding: 8 }}>
                <Typography fontSize={24} numOfLines={1}>
                  {item.title}
                </Typography>
                <Typography fontSize={16} numOfLines={2} color="gray">
                  {item.description}
                </Typography>
              </View>
            </Button>
          );
        }}
      />
    </View>
  );
};
