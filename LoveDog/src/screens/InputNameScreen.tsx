import React from 'react';
import {View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootStackNavigation';
import {useSignupNavigation} from '../navigation/SignupNavigation';

export const InputNameScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Signup'>();
  const navigation = useSignupNavigation<'InputName'>();
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Title title="InputNameScreen" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          onPress={() => {
            rootNavigation.replace('Main');
          }}>
          <Typography fontSize={16}>회원가입 완료</Typography>
        </Button>
      </View>
    </View>
  );
};
