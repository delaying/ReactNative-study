import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import BusInfo from "./src/BusInfo";
import { COLOR } from "./src/color";
import {
  busStop,
  getBusNumColorByType,
  getRemainedTimeText,
  getSeatStatusText,
  getSections,
} from "./src/data";
import Margin from "./src/Margin";
import BookmarkButton from "./src/BookmarkButton";
import { useTheme } from "./src/use-theme";

const busStopBookmarkSize = 20;
const busStopBookmarkPadding = 6;

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);

  const { NEWCOLOR, isDark, toggleIsDark } = useTheme();

  const onPressBusStopBookmark = () => {};

  const HeaderIcon = ({ name }) => {
    return (
      <TouchableOpacity style={{ padding: 10 }}>
        <SimpleLineIcons name={name} size={20} color={NEWCOLOR.WHITE_BLACK} />
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = () => (
    <View
      style={{
        backgroundColor: COLOR.GRAY_3,
        height: 170,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 정류소 번호, 이름, 방향 */}
      <Margin height={10} />
      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 13 }}>
        {busStop.id}
      </Text>
      <Margin height={4} />
      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 20 }}>
        {busStop.name}
      </Text>
      <Margin height={4} />

      <Text style={{ color: NEWCOLOR.GRAY_1_GRAY_2, fontSize: 14 }}>
        {busStop.directionDescription}
      </Text>
      <Margin height={20} />

      {/* 북마크 */}
      <BookmarkButton
        NEWCOLOR={NEWCOLOR}
        size={busStopBookmarkSize}
        isBookmarked={busStop.isBookmarked}
        onPress={onPressBusStopBookmark}
        style={{
          borderWidth: 0.3,
          borderColor: NEWCOLOR.GRAY_1_GRAY_4,
          borderRadius: busStopBookmarkSize + (busStopBookmarkPadding * 2) / 2,
          padding: busStopBookmarkPadding,
        }}
      />
      <Switch
        value={isDark}
        onValueChange={(v) => {
          toggleIsDark();
        }}
      />
      <Margin height={25} />
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View
      style={{
        paddingLeft: 13,
        paddingVertical: 3,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
        borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3,
      }}
    >
      <Text style={{ fontSize: 12, color: NEWCOLOR.GRAY_4_GRAY_1 }}>
        {title}
      </Text>
    </View>
  );
  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);
    /**
     * Start
     */
    // undefined ?? null -> null
    // { ... } ?? null -> { ... }
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    /**
     * End
     */
    return (
      <BusInfo
        NEWCOLOR={NEWCOLOR}
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}}
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
    );
  };

  const ItemSeparatorComponent = () => (
    <View
      style={{
        width: "100%",
        height: 1,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
      }}
    ></View>
  );

  const ListFooterComponent = () => <Margin height={30} />;

  const onRefresh = () => {
    console.log("onRefresh");
    setRefreshing(true);
  };

  useEffect(() => {
    if (refreshing) {
      setNow(dayjs());
      setRefreshing(false);

      //   //API refetch 완료되었을 때!
      // setTimeout(() => {
      //   setRefreshing(false);
      // }, 1000);
    }
  }, [refreshing]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: NEWCOLOR.WHITE_BLACK,
      }}
    >
      {/* 뒤로가기, 홈 아이콘 */}
      <View style={{ backgroundColor: COLOR.GRAY_3, width: "100%" }}>
        <SafeAreaView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <HeaderIcon name="arrow-left" />
          <HeaderIcon name="home" />
        </SafeAreaView>

        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 500,
            backgroundColor: COLOR.GRAY_3,
            zIndex: -1,
          }}
        />
      </View>

      <SectionList
        style={{ flex: 1, width: "100%" }}
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
