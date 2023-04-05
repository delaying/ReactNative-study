import React, {useState} from 'react';
import {
  Button,
  LayoutAnimation,
  Text,
  View,
  UIManager,
  Platform,
} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// useState update, create, delete 어떤/어떻게 인터렉션을 줄 수 있을까
export default () => {
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(true);

  const onButtonPress = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    LayoutAnimation.configureNext(
      {
        duration: 300,
        // type:easeIn, spring, linear
        // property:opacity, scaleX, scaleY, scaleXY
        create: {type: 'easeIn', property: 'opacity'},
        update: {type: 'spring', property: 'scaleX', springDamping: 0.3},
        delete: {type: 'linear', property: 'scaleXY'},
      },
      () => console.log('end'),
      () => console.log('fail'),
    );
    setCount(value => value * 10);
    setShow(value => !value);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="layout animation" onPress={onButtonPress} />
      <View style={{width: 300, height: 300}}>
        {/* update */}
        <View style={{backgroundColor: 'orange'}}>
          <Text style={{fontSize: 50}}>{count}</Text>
        </View>
        {/* create, delete */}
        {show && (
          <View style={{backgroundColor: 'green', marginTop: 10}}>
            <Text style={{fontSize: 50}}>비밀</Text>
          </View>
        )}
      </View>
    </View>
  );
};
