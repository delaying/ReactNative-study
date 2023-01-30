import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import Header from './src/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MyProfile from './src/Profile';
import {friendProfiles, myProfile} from './src/data'
import Margin from './src/Margin';
import Division from './src/Division';
import FriendSection from './src/FriendSection';
import FriendList from './src/FriendList';

export default function App() {
  const onPressArrow =()=>{
    console.log('cliked arrow');
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header/>
        <Margin height={10}/>        
        <MyProfile uri={myProfile.uri} name={myProfile.name} introduction={myProfile.introduction}/>
        <Margin height={15}/>
        <Division/>
        <Margin height={12}/>
        <FriendSection friendProfileLen={friendProfiles.length} 
          onPressArrow/>
          <FriendList data={friendProfiles}/>
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingHorizotal 좌우여백 줄 때 사용
    paddingHorizontal:15,
    backgroundColor: "#fff",
  },
});