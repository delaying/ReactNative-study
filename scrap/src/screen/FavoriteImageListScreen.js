import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { Header } from "../components/Header/Header";
import PhotoListItem from "../components/PhotoListItem";
import { Typography } from "../components/Typography";

export default (props) => {
  const imageList = useSelector((state) => state.favorite.favorite);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="FAVORITE"></Header.Title>
      </Header>
      <FlatList
        style={{ flex: 1 }}
        data={imageList}
        renderItem={({ item }) => {
          return <PhotoListItem url={item} />;
        }}
      />
    </View>
  );
};
