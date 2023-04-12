import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Animated,
  Button,
  Easing,
  PanResponder,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export default () => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false);
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureSate) => {
      if (gestureSate > 100) {
        hideModal();
      }
    },
  });

  const hideModal = () => {
    Animated.timing(interpolateAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        setShow(false);
      }
    });
  };
  const showModal = () => {
    setShow(true);
    Animated.timing(interpolateAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 100}}>
        <Button title="열려라" onPress={showModal} />
      </View>
      {/* menu background */}
      {show && (
        <TouchableWithoutFeedback onPress={hideModal}>
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#00000090',
              opacity: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}
          />
        </TouchableWithoutFeedback>
      )}
      {/* menu contents */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          bottom: interpolateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-500, 0],
          }),
          width: '100%',
          backgroundColor: 'white',
          padding: 20,
          paddingBottom: 20 + getBottomSpace(),
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}>
        <ListItem
          onPress={hideModal}
          color
          icon="content-save"
          title="저장하기"
        />
        <ListItem onPress={hideModal} color icon="heart" title="좋아요" />
        <ListItem onPress={hideModal} color icon="delete" title="삭제하기" />
        <ListItem onPress={hideModal} color="#999" icon="close" title="닫기" />
      </Animated.View>
    </View>
  );
};

function ListItem({color = '#333', icon, title, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#f2f2f2',
          borderBottomWidth: 1,
          height: 60,
        }}>
        <Icon name={icon} size={20} color={color} />
        <Text style={{fontSize: 15, marginLeft: 20, color: color}}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
