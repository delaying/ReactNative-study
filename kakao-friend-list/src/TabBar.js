import { TouchableOpacity, View } from "react-native"
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const TabButton = ({
    isSelected,
    onPress, 
    activeIconName, 
    inactiveIconName,
}) =>{  
    return(
        <TouchableOpacity 
        activeOpacity={1}
        onPress={onPress}
        style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            paddingVertical:10,
            }}

        >
            <Ionicons name={isSelected ? activeIconName : inactiveIconName} size={24} color="black"/>
        </TouchableOpacity>
    )
}

export default ({selectedTabIdx, setSelectedTabIdx})=>{
    return(
        <View style={{
            flexDirection:"row",
            width:"100%",
            borderTopWidth:0.5,
            borderTopColor:"grey"}}>
            <TabButton
                isSelected={selectedTabIdx === 0}
                onPress={()=> setSelectedTabIdx(0)}
                activeIconName={"person-sharp"}
                inactiveIconName={"person-outline"}
            />
            <TabButton
                isSelected={selectedTabIdx === 1}
                onPress={()=> setSelectedTabIdx(1)}
                activeIconName={"chatbubble"}
                inactiveIconName={"chatbubble-outline"}
            />
            <TabButton
                isSelected={selectedTabIdx === 2}
                onPress={()=> setSelectedTabIdx(2)}
                activeIconName={"pricetag"}
                inactiveIconName={"pricetag-outline"}
            />
            <TabButton
                isSelected={selectedTabIdx === 3}
                onPress={()=> setSelectedTabIdx(3)}
                activeIconName={"add-circle"}
                inactiveIconName={"add-circle-outline"}
            />
        </View>
    )
}