import { Button ,Dimensions,FlatList,Image,Platform,SafeAreaView,StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useGallery } from './src/use-gallery';
import MyDropDownPicker from './src/MyDropDownPicker';

const width = Dimensions.get('screen').width;
const columnSize = width/3;

export default function App() {
  const {
    imagesWithAddButton,
    pickImage, 
    deleteImage,
    selectedAlbum,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  }

  const onLongPressImage = (imageId) => deleteImage(imageId);
  const onPressAddAlbum = () => {};

  const renderItem = ({item:{id,uri}, index}) => {
    if(id===-1){
      return(
        <TouchableOpacity 
          onPress={onPressOpenGallery}
          style={{
            width:columnSize,
            height:columnSize, 
            backgroundColor:'lightgrey',
            justifyContent:'center',
            alignItems:'center',
            }}>
          <Text style={{fontWeight:"100", fontSize:45}}>+</Text>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onLongPress={()=>onLongPressImage(id)}>
         <Image 
          source={{uri}} 
          style={{width:columnSize, height:columnSize}} 
        />
      </TouchableOpacity>
     
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <MyDropDownPicker 
        selectedAlbumTitle={selectedAlbum.title}
        onPressAddAlbum={onPressAddAlbum}
        />
      <FlatList 
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:Platform.OS === 'android' ? 30 : 0,
  },
});
