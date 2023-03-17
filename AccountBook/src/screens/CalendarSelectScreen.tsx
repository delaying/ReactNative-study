import React from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {convertToDateString} from '../utils/DataUtils';

const today = new Date();
// 날짜가 내일 날짜까지 나오는 문제 해결
today.setHours(0);
today.setMinutes(0);

export const CalendarSelectScreen: React.FC = () => {
  const navigation = useRootNavigation<'CalendarSelect'>();
  const routes = useRootRoute<'CalendarSelect'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="날짜 선택" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <Calendar
        // initialDate={convertToDateString(today.getDate())}
        onDayPress={day => {
          console.log(day);
          routes.params.onSelectDay(day.timestamp);
          navigation.goBack();
        }}
        maxDate={convertToDateString(today.getTime())}
      />
    </View>
  );
};
