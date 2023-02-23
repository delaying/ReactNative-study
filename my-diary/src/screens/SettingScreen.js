import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { Spacer } from "../components/Spacer";

export default () => {
  const navigation = useNavigation();
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon name="arrow-back" onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title="SETTING" />
        </Header.Group>
      </Header>
    </View>
  );
};
