//Insight_Item.js

import React, { useState, useEffect } from 'react';

import { SERVER_URL } from '../../config.js';
import { TouchableOpacity, Alert, View, Text, StyleSheet } from 'react-native';
import auth from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

function Insight_Item() {
  //유저 체크 후 데이터 가져오기
  const [todos, setTodos] = useState([]);
  const fetchData = async () => {
    try {
      const user = auth.currentUser;
      if (user !== null) {
        const userId = user.uid; // 로그인된 사용자의 uid를 가져옵니다.
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
  };

  // 각 할 일 항목의 달성 비율을 계산하는 함수
  const calculateCompletionRate = (todo) => {
    // "1"의 수를 계산합니다.
    let count = todo.doneTotal.filter(item => item === 1).length;
  
    // 전체 배열 길이로 나누고 퍼센트로 변환합니다.
    let percentage = Math.ceil((count / todo.doneTotal.length) * 100);

    // 결과를 반환합니다.
    return percentage;
  };

  //달성률 구하기 위해서 fetch
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    
    // todos 배열에 대해 calculateCompletionRate 함수를 호출합니다.
    todos.forEach(todo => {
      let percentage = calculateCompletionRate(todo);
      console.log(`Todo: ${todo.id}, Completion Rate: ${percentage}%`);
    });
    return unsubscribe;
  }, [navigation, todos]);

  return (
    <>
      <Text>Insight_Item</Text>
      {todos.map((todo, index) => (
        <Text style={styles.item} key={index}>
          Todo{+index}: {todo.id}, Completion Rate: {calculateCompletionRate(todo)}%
        </Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  item:{
    fontSize: 20,
  }
});

export default Insight_Item;
