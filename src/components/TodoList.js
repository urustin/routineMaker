import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ToDoItem from './ToDoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '../../firebaseConfig';
import { SERVER_URL } from '../../config.js';

const ToDoList = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  if (user == null) {
    throw new Error('User not signed in');
  }

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {
      const user = auth.currentUser;
      if (user !== null) {
        const userId = user.uid; // bring uid
        const res = await fetch(`${SERVER_URL}/api/todos?userId=${userId}`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        });
        const data = await res.json();
        setTodos(data);
      }
    } catch(e) {
      console.error('Error reading data', e);
    }
  }

  return (
    <View>
      <FlatList
        data={todos}
        renderItem={({ item }) => <ToDoItem item={item} />}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default ToDoList;
