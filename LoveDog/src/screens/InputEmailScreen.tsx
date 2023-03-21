import React from 'react';
import {View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Typography} from '../components/Typography';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation';

export const InputEmailScreen: React.FC = () => {
  const navigation = useSignupNavigation<'InputEmail'>();
  const routes = useSignupRoute<'InputEmail'>();
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Title title="InputEmailScreen" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          onPress={() => {
            navigation.push('InputName', {
              uid: '',
              preInput: routes.params.preInput,
              inputEmail: '',
            });
          }}>
          <Typography fontSize={16}>회원가입 화면으로 이동하기</Typography>
        </Button>
      </View>
    </View>
  );
};
