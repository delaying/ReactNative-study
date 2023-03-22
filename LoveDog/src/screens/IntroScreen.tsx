import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootStackNavigation';

export const IntroScreen: React.FC = () => {
  const rootNavigation = useRootNavigation<'Intro'>();
  const safeArea = useSafeAreaInsets();

  const onPressGoogleSignin = useCallback(async () => {
    const isSignIn = await GoogleSignin.isSignedIn();
    if (isSignIn) {
      await GoogleSignin.signOut();
    }

    const result = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);

    rootNavigation.push('Signup', {
      screen: 'InputEmail',
      params: {
        preInput: {
          email: result.user.email,
          name: result.user.name ?? 'Unknown',
          profileImage: result.user.photo ?? '',
        },
        uid: authResult.user.uid,
      },
    });
  }, [rootNavigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="IntroScreen" />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 32 + safeArea.bottom,
        }}>
        <GoogleSigninButton onPress={onPressGoogleSignin} />
      </View>
    </View>
  );
};
