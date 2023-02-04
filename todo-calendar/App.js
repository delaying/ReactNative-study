import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { Image, FlatList, StyleSheet, Text, View, KeyboardAvoidingView, Platform, Pressable, Keyboard, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Ionicons} from '@expo/vector-icons';

import Margin from './src/Margin';
import { runPracticeDayjs } from './src/practice-dayjs';
import { bottomSpace, getCalendarColumns, ITEM_WIDTH, StatusBarHeight } from './src/util';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';
import Calendar from './src/Calendar';
import AddTodoInput from './src/AddTodoInput';


export default function App() {
  const now = dayjs();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);
  const {
    todoList,
    input,
    setInput,
    toggleTodo,
    removeTodo,
    addTodo,
    resetInput,
  } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const flatListRef = useRef(null);

  const onPressLeftArrow = subtract1Month;
  const onPressRightArrow = add1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = ()=>(
    <View>
      <Calendar
              columns={columns}
              selectedDate={selectedDate}
              onPressLeftArrow={onPressLeftArrow}
              onPressHeaderDate={onPressHeaderDate}
              onPressRightArrow={onPressRightArrow}
              onPressDate={onPressDate}
        />
        <Margin height={15}/>

        <View style={{
          width:4, 
          height:4, 
          borderRadius:4/2,
          backgroundColor:'#a3a3a3',
          alignSelf:'center',
          }}/>
            <Margin height={15}/>
    </View>
    
  )

  const renderItem = ({item:todo}) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert('삭제하시겠어요?','',[
        {
          style:'cancel',
          text:'아니요'
        },
        {
          text:'네',
          onPress:()=>removeTodo(todo.id),
        }
      ])
    };

    return(
      <Pressable 
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          // backgroundColor: todo.id%2===0?'pink':'lightblue',
          flexDirection:'row',
          width:ITEM_WIDTH, 
          alignSelf:"center",
          paddingHorizontal:5,
          paddingVertical:10,
          borderBottomWidth:0.2,
          borderBottomColor:'#a6a6a6',
        }}>
        <Text style={{flex:1,fontSize:14, color:'#595959'}}>{todo.content}</Text>

        <Ionicons 
          name="ios-checkmark" 
          size={17} 
          color={isSuccess ? '#595959' : '#bfbfbf'}
          />
      </Pressable>
    )
  }
  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 400);
  }

  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }

  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }

  const onFocus = () => {
    scrollToEnd();
  }

  useEffect(() => {
    runPracticeDayjs();
  }, []);


  return (
    <Pressable 
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <Image
        source={{
          // 출처: https://kr.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1189772.htm
          uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS ==="ios" ? "padding" : "height"}
      >
        <View>
          <FlatList
            ref={flatListRef}
            data={todoList}
            focusable={true}
            style={{flex:1}}
            contentContainerStyle={{paddingTop:StatusBarHeight+30}}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
          />
          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format('MM.D')}에 추가할 투두`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
          />  
        </View>
        
      </KeyboardAvoidingView>

      <Margin height={bottomSpace}/>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
