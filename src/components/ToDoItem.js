// components/ToDoItem.js
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_URL } from '../../config.js';


const ToDoItem = ({ item }) => {
  const [isCompleted, setIsCompleted] = useState(item.doneToday);
  // console.log(item.doneToday);
  // console.log(item._id);
  const toggleCompletion = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/todos/${item._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doneToday: !isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error('Could not update item.');
      }

      // Update the state to reflect the new completion status
      setIsCompleted(!isCompleted);
    } catch (e) {
      console.error('Error updating item', e);
    }
  };


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
