import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import auth from '../../firebaseConfig';
import { SERVER_URL } from '../../config.js';

const AddItem = () => {

  //userId//
  const user = auth.currentUser;
  if (user == null) {
    throw new Error('User not signed in');
  }

  const uid = user.uid;

  const [item, setItem] = useState('');

  // fetch
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchItems();
  }, []);
  // Fetch all items for the user
  const fetchItems = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/todos?userId=${uid}`);
      const data = await response.json();
      setTodos(data);
    } catch (e) {
      console.error('Error fetching items', e);
    }
  }

  // Post a new item to the server
  const addItem = async (item) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: item,
          doneToday: false,
          userId: uid,
        }),
      });
  
      const text = await response.text();
      // console.log(text);
  
      if (!response.ok) {
        throw new Error(text || 'Could not add item.');
      }
  
      const data = JSON.parse(text);
  
      alert('Item added successfully!');
      fetchItems();
    } catch (e) {
      console.error('Error adding item', e);
    }
  }

  // Delete all items for the user
  const deleteItem = async (_id) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/todos/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Could not delete item.');
      }

      alert('Item deleted successfully!');
      fetchItems();
    } catch (e) {
      console.error('Error deleting item', e);
    }
  }

  return (
    <View style={{ margin: 30 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setItem(text)}
        value={item}
      />
      <Button title="Add Item" onPress={() => addItem(item)} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({item}) => 
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item.name}</Text>
            <Button title="x" onPress={() => deleteItem(item._id)} />
          </View>
        }
      />
    </View>
  );
}

export default AddItem;
