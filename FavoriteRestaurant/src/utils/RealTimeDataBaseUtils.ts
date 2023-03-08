import database from '@react-native-firebase/database';

export const saveNewRestraunt = async (params: {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}) => {
  // const ref = await database().
  const db = database().ref('/restaurant');

  const saveItem = {
    title: params.title,
    address: params.address,
    latitude: params.latitude,
    longitude: params.longitude,
  };

  await db.push().set({
    ...saveItem,
  });
};

export const getRestrauntList = async (): Promise<
  {title: string; address: string; latitude: number; longitude: number}[]
> => {
  const db = database().ref('/restaurant');
  const snapshotValue = await db.once('value').then(snapshot => snapshot.val());

  return Object.keys(snapshotValue).map(key => snapshotValue[key]);

  //   return (await db
  //     .once('value')
  //     .then(snapshot => snapshot.val())
  //     .then(result => Object.keys(result).map(key => result[key]))) as {
  //     title: string;
  //     address: string;
  //     latitude: number;
  //     longitude: number;
  //   }[];
  //   return restrauntList.map(item => ({
  //     title: item.title,
  //     address: item.address,
  //     latitude: item.latitude,
  //     longitude: item.longitude,
  //   }));
};
