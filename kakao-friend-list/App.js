import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { friendProfiles, myProfile } from "./src/data";
import Division from "./src/Division";
import FriendList from "./src/FriendList";
import FriendSection from "./src/FriendSection";
import Header from "./src/Header";
import Margin from "./src/Margin";
import Profile from "./src/Profile";
import TabBar from "./src/TabBar";

export default function App() {
  const [isOpened, setIsOpened] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = () => {
    setIsOpened(!isOpened);
  }

  const ItemSeparatorComponent = () => <Margin height={13} />
  const renderItem = ({ item }) => (
    <View>
      <Profile
        uri={item.uri}
        name={item.name} 
        introduction={item.introduction}
        isMe={false}
      />
    </View>
  )
  const ListHeaderComponent = () => (
    <View style={{ backgroundColor:"white" }}>
      <Header />
        
        <Margin height={10} />

        <Profile
          uri={myProfile.uri}
          name={myProfile.name} 
          introduction={myProfile.introduction}
          isMe={true}
        />

        <Margin height={15} />

        <Division />

        <Margin height={12} />

        <FriendSection 
          friendProfileLen={friendProfiles.length} 
          onPressArrow={onPressArrow}
          isOpened={isOpened}
        />

        <Margin height={5} />
    </View>
  )
  const ListFooterComponent = () => <Margin height={10} />

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={['top', 'right', 'bottom', 'left']} // 예외없이 모두 안전영역 적용
      >
        <FlatList
          data={isOpened ? friendProfiles : []}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          keyExtractor={(_, index) => index}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          showsVerticalScrollIndicator={false}
        />
        <TabBar selectedTabIdx={selectedTabIdx} setSelectedTabIdx={setSelectedTabIdx} />
      </SafeAreaView>
    </SafeAreaProvider>
  )

  return (
    <View style={styles.container}>
      <View style={{
          flex: 1,
          paddingHorizontal: 15,
      }}>
        <FriendList data={friendProfiles} isOpened={isOpened} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});