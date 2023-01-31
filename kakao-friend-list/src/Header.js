import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = (props)=>{
    return(
        <TouchableOpacity hitSlop={{top:15, bottom:15}} style={{paddingHorizontal:6}}>
            <Ionicons name={props.name} size={24} color="black" />
        </TouchableOpacity>
    )
}

export default ()=>{
    return(
        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
            <Text style={{fontSize:22, fontWeight:"bold"}}>친구</Text>
            <View style={{flexDirection:"row"}}>
                <IconButton name="search-outline"/>
                <IconButton name="person-add-outline"/>
                <IconButton name="md-musical-notes-outline"/>
                <IconButton name="ios-settings-outline"/>
            </View>
        </View>
    )
}
