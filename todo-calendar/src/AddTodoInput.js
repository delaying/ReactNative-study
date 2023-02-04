import { TextInput, TouchableOpacity, View } from "react-native"
import { bottomSpace, ITEM_WIDTH } from "./util"
import {AntDesign} from '@expo/vector-icons';


export default ({
    value,
    onChangeText,
    placeholder,
    onPressAdd,
    onSubmitEditing,
    onFocus,
})=>{
    return(
        <View style={{
            width:ITEM_WIDTH,
            flexDirection:'row',
            alignItems:"center",
            alignSelf:'center',
            }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={{
                    flex:1,
                    padding:5,
                    //아래 bottom패딩값만 다른값으로 바꾸고싶을 때, 아래처럼 추가작성하면 10으로 덮어씌워짐.
                    //paddingBottom:10,
                    color:'#595959',
                }}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={false}
                onFocus={onFocus}
            />
            <TouchableOpacity onPress={onPressAdd} style={{padding:5}}>
                <AntDesign name="plus" size={18} color='#595959'/>
            </TouchableOpacity>
        </View>
    )
}