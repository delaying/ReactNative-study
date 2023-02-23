import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";

export default () => {
  const navigation = useNavigation();
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="ADD DIARY" />
        </Header.Group>
        <Header.Icon name="close" onPress={onPressBack} />
      </Header>
    </View>
  );
};
