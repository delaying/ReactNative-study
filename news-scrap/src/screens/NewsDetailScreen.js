import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

import { Header } from "../components/Header/Header";
import { Spacer } from "../components/Spacer";

export default () => {
  const navigation = useNavigation();
  const routes = useRoute();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  console.log(routes.params);
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon name="arrow-back" onPress={onPressBack} />
          <Spacer horizontal space={12} />
          <View style={{ maxWidth: 200 }}>
            <Header.Title title={"NEWS_DETAIL"} />
          </View>
        </Header.Group>
      </Header>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: routes.params.newsItem.link }}
      />
    </View>
  );
};
