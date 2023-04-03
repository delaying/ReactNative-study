import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export default () => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get('window').width;

  const onOpenPress = () => {
    Animated.timing(interpolateAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  };
  const onHidePress = () => {
    Animated.timing(interpolateAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  };
  return (
    <>
      {/* menu */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          width: '90%',
          height: '120%',
          backgroundColor: interpolateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#ffffff90', '#fff'],
          }),
          zIndex: 2,
          transform: [
            {
              translateX: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-width * 0.9, 0],
              }),
            },
          ],
        }}>
        <SafeAreaView
          style={{
            margin: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{padding: 10, fontSize: 22}}>Menu</Text>
            <Text style={{padding: 10, fontSize: 22}}>Menu</Text>
            <Text style={{padding: 10, fontSize: 22}}>Menu</Text>
            <Text style={{padding: 10, fontSize: 22}}>Menu</Text>
          </View>
          <View>
            <TouchableHighlight
              underlayColor={'#aff10050'}
              onPress={onHidePress}
              style={{borderRadius: 100}}>
              <View style={{padding: 14}}>
                <Icon name="close" size={30} color="#222" />
              </View>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Menu Background */}
      <TouchableWithoutFeedback onPress={onHidePress}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '120%',
            backgroundColor: interpolateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['#00000000', '#00000090'],
            }),
            zIndex: interpolateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}
        />
      </TouchableWithoutFeedback>

      {/* home */}
      <View style={{backgroundColor: '#366', flex: 1}}>
        <SafeAreaView style={{alignItems: 'flex-end'}}>
          <TouchableHighlight
            underlayColor={'#ffffff50'}
            onPress={onOpenPress}
            style={{borderRadius: 100}}>
            <View style={{padding: 14}}>
              <Icon name="menu" size={30} color="black" />
            </View>
          </TouchableHighlight>
        </SafeAreaView>
      </View>
    </>
  );
};
