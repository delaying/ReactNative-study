import React, {useCallback, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';

export const AddUpdateScreen: React.FC = () => {
  const navigation = useRootNavigation<'Add' | 'Update'>();
  const routes = useRootRoute<'Add' | 'Update'>();

  const [item, setItem] = useState<AccountBookHistory>(
    routes.params?.item ?? {
      type: '사용',
      price: 0,
      comment: '',
      date: 0,
      createdAt: 0,
      updatedAt: 0,
      photoUrl: null,
    },
  );

  const onPressType = useCallback<(type: AccountBookHistory['type']) => void>(
    type => {
      if (routes.name === 'Update') {
        return;
      }
      setItem(prevItem => {
        return {
          ...prevItem,
          type: type,
        };
      });
    },
    [routes.name],
  );

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Add/Update Screen" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 32, paddingHorizontal: 24}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Button
              onPress={() => {
                onPressType('사용');
              }}>
              <View
                style={{
                  backgroundColor: item.type === '사용' ? 'black' : 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}>
                <Typography
                  fontSize={20}
                  color={item.type === '사용' ? 'white' : 'black'}>
                  사용
                </Typography>
              </View>
            </Button>
          </View>

          <View style={{flex: 1}}>
            <Button
              onPress={() => {
                onPressType('수입');
              }}>
              <View
                style={{
                  backgroundColor: item.type === '수입' ? 'black' : 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                }}>
                <Typography
                  fontSize={20}
                  color={item.type === '수입' ? 'white' : 'black'}>
                  수입
                </Typography>
              </View>
            </Button>
          </View>
        </View>
        <Spacer space={20} />
      </ScrollView>
    </View>
  );
};
