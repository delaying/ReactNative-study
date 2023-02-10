import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useGallery } from "./src/use-gallery";
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from "./src/TextInputModal";
import BigImgModal from "./src/BigImgModal";
import { useRewardAD } from "./src/use-reward-ad";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const {
    imagesWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdwonOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const { loadRewardAd, isRewarded, isClosed, resetAdValue } = useRewardAD();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage = (imageId) => deleteImage(imageId);
  const onPressWatchAd = () => {
    loadRewardAd();
  };
  const onPressAddAlbum = () => {
    if (albums.length >= 2) {
      Alert.alert("광고를 시청해야 앨범을 추가할 수 있습니다.", "", [
        {
          style: "cancel",
          text: "닫기",
        },
        {
          text: "광고 시청",
          onPress: onPressWatchAd,
        },
      ]);
    } else {
      openTextInputModal();
    }
  };

  const onSubmitEditing = () => {
    if (!albumTitle) return;
    addAlbum();
    closeTextInputModal();
    resetAlbumTitle();
  };

  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
  };

  const onPressHeader = () => {
    if (isDropdwonOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropdown();
  };

  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId);
  };

  const onPressImage = (image) => {
    selectImage(image);
    openBigImgModal();
  };

  const onPressBigImgModalBackdrop = () => {
    closeBigImgModal();
  };

  const onPressLeftArrow = () => {
    moveToPreviousImage();
  };
  const onPressRightArrow = () => {
    moveToNextImage();
  };

  useEffect(() => {
    if (isRewarded && isClosed) {
      openTextInputModal();
      resetAdValue();
    }
  }, [isRewarded, isClosed]);

  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "100", fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPressImage(id)}
      >
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 dropdown, 앨범추가버튼 */}
      <MyDropDownPicker
        isDropdwonOpen={isDropdwonOpen}
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />
      {/* 앨범을 추가하는 TextInputModal */}
      <TextInputModal
        textInputModalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
      />
      {/* 이미지를 크게 보는 modal */}
      <BigImgModal
        modalVisible={bigImgModalVisible}
        onPressBackdrop={onPressBigImgModalBackdrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />

      {/* 이미지 리스트 */}
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        numColumns={3}
        style={{ zIndex: -1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});
