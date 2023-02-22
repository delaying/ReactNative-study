import { View } from "react-native";
import { Header } from "../components/Header/Header";

export default () => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title={"NEWS_DETAIL"} />
      </Header>
    </View>
  );
};
