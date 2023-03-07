import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {SingleLineInput} from '../components/SingleLineInput';
import {
  getAddressFromCoords,
  getCoordsFromAddress,
  getCoordsFromKeyword,
} from '../utils/GeoUtils';

export const MainScreen: React.FC = () => {
  // latitude : 37.3331425
  // longitude : 127.541649
  const [query, setQuery] = useState<string>('');
  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.3331425,
    longitude: 127.541649,
  });

  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  const onChangeLocation = useCallback<
    (item: {latitude: number; longitude: number}) => Promise<void>
  >(async item => {
    setCurrentRegion({
      latitude: item.latitude,
      longitude: item.longitude,
    });

    getAddressFromCoords(item.latitude, item.longitude).then(setCurrentAddress);
  }, []);

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      onChangeLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [onChangeLocation]);

  const onFindAddress = useCallback<() => Promise<void>>(async () => {
    const keywordResult = await getCoordsFromKeyword(query);
    if (keywordResult !== null) {
      setCurrentAddress(keywordResult.address);
      setCurrentRegion({
        latitude: parseFloat(keywordResult.latitude.toString()),
        longitude: parseFloat(keywordResult.longitude.toString()),
      });
    }

    const addressResult = await getCoordsFromAddress(query);
    if (addressResult === null) {
      console.error('주소값을 찾지 못했습니다.');
      return;
    }
    setCurrentAddress(addressResult.address);
    setCurrentRegion({
      latitude: parseFloat(addressResult.latitude.toString()),
      longitude: parseFloat(addressResult.longitude.toString()),
    });
  }, [query]);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onLongPress={event => {
          onChangeLocation(event.nativeEvent.coordinate);
        }}>
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        />
      </MapView>

      <View style={{position: 'absolute', top: 24, left: 24, right: 24}}>
        <View style={{backgroundColor: 'white', borderRadius: 5}}>
          <SingleLineInput
            value={query}
            placeholder="주소를 입력해 주세요"
            onChangeText={setQuery}
            onSubmitEditing={onFindAddress}
          />
        </View>
      </View>

      {currentAddress !== null && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
