import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

import {Button} from '../components/Button';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import {RemoteImage} from '../components/RemoteImage';
import {SingleLineInput} from '../components/SingleLineInput';
import {Spacer} from '../components/Spacer';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootStackNavigation';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation';

export const InputNameScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Signup'>();
  const navigation = useSignupNavigation<'InputName'>();
  const routes = useSignupRoute<'InputName'>();
  const safeArea = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheet>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<{uri: string} | null>(
    null,
  );
  const [profileImage] = useState(routes.params.preInput.profileImage);
  const [inputName, setInputName] = useState(routes.params.preInput.name);

  const isValid = useMemo(() => {
    return true;
  }, []);

  const onPressProfileImage = useCallback(async () => {
    actionSheetRef.current?.show();
  }, []);

  const onPressSubmit = useCallback(() => {
    rootNavigation.replace('Main');
  }, [rootNavigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Title title="InputNameScreen" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <Button onPress={onPressProfileImage}>
          <View style={{width: 100, height: 100}}>
            {profileImage !== '' ? (
              <View>
                <RemoteImage
                  width={100}
                  height={100}
                  url={
                    selectedPhoto !== null ? selectedPhoto.uri : profileImage
                  }
                  style={{borderRadius: 50}}
                />
                <View style={{position: 'absolute', right: 0, bottom: 0}}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: 'gray',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="add" size={16} color="white" />
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="add" size={32} color="black" />
              </View>
            )}
          </View>
        </Button>
        <Spacer space={24} />
        <SingleLineInput
          value={inputName}
          onChangeText={setInputName}
          placeholder="이름을 입력해 주세요"
          onSubmitEditing={onPressSubmit}
        />
      </View>

      <Button onPress={onPressSubmit}>
        <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
          <Spacer space={16} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Typography fontSize={20} color="white">
              회원가입
            </Typography>
          </View>
          <Spacer space={safeArea.bottom + 12} />
        </View>
      </Button>
      <ActionSheet
        ref={actionSheetRef}
        options={['사진 촬영하여 선택', '갤러리에서 선택', '취소']}
        cancelButtonIndex={2}
        onPress={async index => {
          if (index === 0) {
            rootNavigation.push('TakePhoto', {
              onTakePhoto: uri => {
                console.log(uri);
                setSelectedPhoto({uri: uri});
              },
            });
          }
          if (index === 1) {
            const photoResult = await ImagePicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
            });
            setSelectedPhoto({uri: photoResult.path});
          }
        }}
      />
    </View>
  );
};
