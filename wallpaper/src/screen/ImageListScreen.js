import { FlatList, View } from "react-native";
import { Header } from "../components/Header/Header";
import PhotoListItem from "../components/PhotoListItem";
import { Typography } from "../components/Typography";
import { IMAGE_LIST } from "../constants";

export default ({ props }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="Image List" />
        </Header.Group>
      </Header>
      <FlatList
        style={{ flex: 1 }}
        data={IMAGE_LIST}
        renderItem={({ item }) => {
          return <PhotoListItem url={item} />;
        }}
      ></FlatList>
      <Typography color={"black"} fontSize={14} text="image list"></Typography>
    </View>
  );
};
