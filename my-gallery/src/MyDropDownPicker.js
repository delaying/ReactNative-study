import { View, Text, TouchableOpacity } from "react-native";

const headerHeight = 50;

export default({selectedAlbumTitle, onPressAddAlbum})=>{
    return(
        <View style={{
            height: headerHeight, 
            justifyContent:'center', 
            alignItems:'center',
        }}>
            <Text style={{fontWeight:'bold'}}>{selectedAlbumTitle}</Text>
            <TouchableOpacity 
            onPress={onPressAddAlbum}
                style={{
                    position:'absolute',
                    height:headerHeight,
                    right:0,
                    justifyContent:'center', 
                    alignItems:'center',
                    paddingHorizontal:10,
                }}>
                <Text style={{fontSize:12}}>앨범 추가</Text>
            </TouchableOpacity>
        </View>

    );
}