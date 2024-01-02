import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditItem from './EditItem';


const AddItem = () => {
  const [item, setItem] = useState('');
  const [storedData, setStoredData] = useState('');
  const key = 'todoItem'; // 아무 문자열이나 사용 가능


  const storeData = async (newValue) => {
    try {
        let value = await AsyncStorage.getItem(key);
        // Get previous values and convert them into array
        let parsedValue = value ? JSON.parse(value) : [];
        let newTodo =
         { 
          id: parsedValue.length > 0 ? parsedValue[parsedValue.length - 1].id + 1 : 0, 
          name: newValue, 
          done : false 
        };
        // Add new value
        parsedValue.push(newTodo);

      await AsyncStorage.setItem(key, JSON.stringify(parsedValue));
      alert('Data stored successfully!');
    } catch (e) {
      // saving error
      console.error('Error storing data', e);
    }
  }

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(key);
      alert('Data removed successfully!');
    } catch(e) {
      // remove error
      console.error('Error removing data', e);
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        // console.log(value);
        setStoredData(value);
      }
    } catch(e) {
      // error reading value
      console.error('Error reading data', e);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ margin: 30 }}>
        <EditItem/>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setItem(text)}
        value={item}
      />
      <Button title="Store Data" onPress={() => storeData(item)} />
      <Button title="Remove Data" onPress={() => removeData()} />
    </View>
  );
}

export default AddItem;
