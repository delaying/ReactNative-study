/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  NativeModules,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {excuteCalculator} from './NativeCalculatorUtils';

export type TypeCalcAction =
  | 'plus'
  | 'minus'
  | 'multiply'
  | 'divide'
  | 'equal'
  | 'clear';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const screenSize = useWindowDimensions();
  const buttonSize = screenSize.width / 4;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [resultNum, setResultNum] = useState('');
  const [inputNum, setInputNum] = useState('');
  const [tempNum, setTempNum] = useState(0);
  const [lastAction, setLastAction] = useState<Exclude<
    TypeCalcAction,
    'equal' | 'clear'
  > | null>(null);

  const onPressNumber = useCallback<(pressed: number) => void>(
    pressed => {
      console.log(pressed);

      if (resultNum !== '') {
        setResultNum('');
      }
      setInputNum(prevState => {
        const nextNum = parseInt(`${prevState}${pressed}`);
        return nextNum.toString();
      });
    },
    [resultNum],
  );

  const onPressAction = useCallback<(action: TypeCalcAction) => Promise<void>>(
    async pressed => {
      console.log(NativeModules.CalculatorModule);
      console.log(pressed);

      if (pressed === 'clear') {
        setInputNum('');
        setTempNum(0);
        setResultNum('');
        return;
      }

      if (pressed === 'equal') {
        if (tempNum !== 0 && lastAction !== null) {
          const result = await excuteCalculator(
            lastAction,
            tempNum,
            parseInt(inputNum),
          );

          console.log('result' + result);
          setResultNum(result.toString());
          setTempNum(0);
        }
        return;
      }
      setLastAction(pressed);

      if (resultNum !== '') {
        setTempNum(parseInt(resultNum));
        setResultNum('');
        setInputNum('');
      } else if (tempNum === 0) {
        setTempNum(parseInt(inputNum));
        setInputNum('');
      } else {
        const result = await excuteCalculator(
          pressed,
          tempNum,
          parseInt(inputNum),
        );
        console.log(result);
        setResultNum(result.toString());
        setTempNum(0);
      }
    },
    [inputNum, lastAction, resultNum, tempNum],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Text style={{fontSize: 48, padding: 48}}>
            {resultNum !== '' ? resultNum : inputNum}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
              <Pressable
                style={{
                  width: buttonSize - 4,
                  height: buttonSize - 4,
                  borderRadius: (buttonSize - 4) * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'gray',
                }}
                onPress={() => onPressNumber(number)}>
                <Text style={{fontSize: 24}}>{number}</Text>
              </Pressable>
            ))}
          </View>
          <View style={{paddingHorizontal: 12}}>
            {[
              {label: '+', action: 'plus'},
              {label: '-', action: 'minus'},
              {label: '*', action: 'multiply'},
              {label: '/', action: 'divide'},
              {label: 'C', action: 'clear'},
              {label: '=', action: 'equal'},
            ].map(action => {
              return (
                <Pressable
                  style={{
                    width: screenSize.width / 6,
                    height: screenSize.width / 6,
                    borderRadius: (buttonSize - 4) * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'lightgray',
                  }}
                  onPress={() =>
                    onPressAction(action.action as TypeCalcAction)
                  }>
                  <Text style={{fontSize: 24}}>{action.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
