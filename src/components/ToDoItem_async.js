// components/ToDoItem.js
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ToDoItem = ({ item }) => {
  const [isCompleted, setIsCompleted] = useState(item.done);
  const key = "todoItem";
  
  
  console.log(item._id);
  
  const toggleCompletion = async () =>{
    // console.log(isCompleted);

    let value = await AsyncStorage.getItem(key);
    let todos = JSON.parse(value);

    // find the todo item and toggle its done attribute
    let todoItem = todos.find(todo => todo._id === item._id);
    if (todoItem) {
      todoItem.done = !todoItem.done;
    }

    // save the updated todos back to AsyncStorage
    await AsyncStorage.setItem(key, JSON.stringify(todos));

    // update the state
    setIsCompleted(todoItem.done);
  } 

  return (
    <View style={styles.item} onPress ={toggleCompletion}>
      <Text onPress ={toggleCompletion} style={isCompleted ? styles.itemTextCompleted : styles.itemText}>{item.name} </Text>
      <Switch 
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isCompleted ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleCompletion}
        value={isCompleted} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
  },
  itemTextCompleted: {
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
});

export default ToDoItem;
