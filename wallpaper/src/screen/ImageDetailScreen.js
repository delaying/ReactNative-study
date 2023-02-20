import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header/Header";
import { Icon } from "../components/Icon";
import { RemoteImage } from "../components/RemoteImage";
import { Typography } from "../components/Typography";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [downloading, setDownloading] = useState(false);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onPreesDownload = useCallback(async () => {
    setDownloading(true);
    const downloadResumable = FileSystem.createDownloadResumable(
      route.params.url,
      `${FileSystem.documentDirectory}${new Date().getMilliseconds()}.jpg`
    );
    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("file download", uri);

      const permissionResult = await MediaLibrary.getPermissionsAsync(true);
      console.log("permissionResult", permissionResult);

      if (permissionResult.status === "denied") {
        // 아예 못쓰는 상태
        setDownloading(false);

        return;
      }

      if (permissionResult.status === "undetermined") {
        await MediaLibrary.requestPermissionsAsync();
        if (requestResult.status === "denied") {
          setDownloading(false);

          return;
        }
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.createAlbumAsync(
        "MyFirstAlbum",
        asset,
        false
      );

      console.log(album);
      setDownloading(false);
    } catch (ex) {
      console.log(ex);
      setDownloading(false);
    }
  });

  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName={"arrow-back"} onPress={onPressBack} />
          <Header.Title title="Image Detail" />
        </Header.Group>
      </Header>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <RemoteImage
          url={route.params.url}
          width={width}
          height={width * 1.5}
        />
      </View>
      <Button onPress={onPreesDownload}>
        <View style={{ paddingBottom: 24, backgroundColor: "black" }}>
          {downloading ? (
            <View
              style={{
                height: 52,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <View
              style={{
                height: 52,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color={"white"}>DOWNLOAD</Typography>
              <Icon iconName="download" iconSize={24} iconColor="white" />
            </View>
          )}
        </View>
      </Button>
    </View>
  );
};
