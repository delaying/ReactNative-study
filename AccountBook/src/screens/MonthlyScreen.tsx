import React, {useCallback, useEffect, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
import {Header} from '../components/Header/Header';
import {useAccountBookHistoryItem} from '../hooks/useAccountBookHistoryItem';
import {useRootNavigation} from '../navigations/RootNavigation';

export const MonthlyScreen: React.FC = () => {
  const navigation = useRootNavigation();
  const {getMonthlyAverage} = useAccountBookHistoryItem();
  const [average, setAverage] = useState<{month: number; data: number[]}[]>([]);
  const {width} = useWindowDimensions();

  const getAverage = useCallback(async () => {
    const result = await getMonthlyAverage();
    setAverage(result);
  }, [getMonthlyAverage]);

  useEffect(() => {
    getAverage();
  }, [getAverage]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Monthly Screen" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StackedBarChart
          data={{
            labels: average.map(item => `${item.month + 1}월`),
            legend: ['사용', '수입'],
            data: average.map(item => item.data),
            barColors: ['#f25', '#143'],
          }}
          hideLegend
          width={width}
          height={220}
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'gray',
            color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          }}
        />
      </View>
    </View>
  );
};
