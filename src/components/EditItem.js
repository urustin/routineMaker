import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditItem = () => {
  const [storedData, setStoredData] = useState([]);
  const key = 'todoItem'; // 아무 문자열이나 사용 가능


  const removeData = async (id) => {
    try {
      const value = await AsyncStorage.getItem(key);
      let items = value != null ? JSON.parse(value) : [];
      let updatedItems = items.filter(item => item.id !== id);
      await AsyncStorage.setItem(key, JSON.stringify(updatedItems));
      setStoredData(updatedItems);
    } catch(e) {
      // remove error
    //   console.error('Error removing data', e);
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        let newValue = JSON.parse(value);
        
        setStoredData(newValue);

      }
    } catch(e) {
      // error reading value
      console.error('Error reading data', e);
    }
  }


  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    // console.log(storedData);
  }, [storedData]);
  

  return (
    <View style={{ margin: 50 }}>
        {
            storedData.map((item,index)=>{
                return(
                    <View id={item.id} onClick={removeData} style={{ padding: 10 }} key={index} >
                        <TouchableOpacity onPress={() => removeData(item.id)}>
                          <Text>{item.id} : {item.name}</Text>
                        </TouchableOpacity>
                    </View>
                );
            })
        }
        
    </View>
  );
}

export default EditItem;
