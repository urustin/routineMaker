import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import auth from '../../firebaseConfig';
import { SERVER_URL } from '../../config.js';
import { useNavigation } from '@react-navigation/native';




export default function Insight_Cal() {
  

  const formatDate = (date) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  }


  //Name of months
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  // 달 옮기기
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const goNextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.setMonth(calendarMonth.getMonth() + 1)));
  };
  
  const goPrevMonth = () => {
    setCalendarMonth(new Date(calendarMonth.setMonth(calendarMonth.getMonth() - 1)));
    // console.log(calendarMonth.getMonth());
    // console.log(calendarMonth.getFullYear());
  };


  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', ];
  // 다음달의 -1일을 구해서 이번달의 마지막날을 구한다.
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  // 이번달의 1일의 요일을 구한다. daysOfWeek의 인덱스를 맞추기 위해 +1을 한다. (일요일맨앞으로 옮기려고)
  const firstDayOfMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay()+1;

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
  }
  //달성률 구하기 위해서 fetch
  const navigation = useNavigation();
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  // console.log(todos);




  const renderDaysOfWeek = () => (
    // 요일 표시 //맨윗줄
    <View style={styles.weekContainer}>
      {daysOfWeek.map((day) => (
        <Text key={day} style={styles.dayOfWeek}>{day}</Text>
      ))}
    </View>
  );
  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }


  const renderDays = () => {
    let days = [];
    let weeks = [];
    // 없는날들 표시

    for (let i = 0; i < firstDayOfMonth - 1; i++) {
      days.push(
        <View key={`emptyday${i}`} style={styles.emptyDay}>
          <Text> </Text>
        </View>
      );
    }


    //이번달 1일부터 반복문 돌리기. 
    //1. 1일부터 마지막날까지 중에 
    //2. todo의 createAt + 배열의 길이만큼 더한 값을 비교하여 (만든날짜와 그 이후의 010101(습관진행상황))
    //각 날짜의 doneCount를 구하고
    //3. 반복문 돌아가는 값 currentDay가 createAt 이후라면
    //doneTotal을 하나씩 늘리는 로직
    
    for (let i = 1; i <= daysInMonth; i++) {
      let currentDate = calendarMonth;
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth(); // 주의: JavaScript에서는 월이 0부터 시작합니다. 즉, 1월은 0, 12월은 11입니다.
      //전월의 마지막날 +1일로 첫날짜를 만든다.
      let day = 0;
      // -i는 월의 첫날짜부터 하루씩 더하면서 검사 //뒤에 forEach에서 검사
      currentDate = new Date(year, month, day +i);


      //doneCount로 달성률 구하기
      let doneCount = 0;
      let doneLength = 0;
      let percent = "" ;

      todos.forEach((todo) => {

        //doneLength구하기.
        let todoDate = startOfDay(new Date(todo.createAt));
        let comparingDate = startOfDay(currentDate);
        // console.log(todoDate);
        // console.log(comparingDate);
        if (todoDate <= comparingDate) {
          doneLength++;
        }


        //createAt부터 배열 길이만큼 01010101 추가.
        for(let j = 0; j < todo.doneTotal.length; j++){
          //만든날짜에 j더해야해서 dateFromCreateAt생성
          let dateFromCreateAt = new Date(todo.createAt);
          dateFromCreateAt.setDate(dateFromCreateAt.getDate() + j);

          //만약 이 숫자가 같다면 (오늘날짜 === createAt+j(doneTotal 배열 길이만큼))
          if (formatDate(dateFromCreateAt) === formatDate(currentDate)) {
            //그리고 만약 doneTotal[j]가 true라면
            if(todo.doneTotal[j]===1){
              //currentDate에 해당하는 doneCount++
              doneCount++;
              // console.log(doneCount);

              //doneLength를 구해야됨. dateFromCreate
            }
          }
        }
      });

      

      //그 날짜에 해당하는 todo의 doneTotal 배열의 true의 개수를 구한다.

      if(doneLength !== 0){
        percent = Math.ceil((doneCount / doneLength) * 100)+"%";
      }


      //검증맨들
      // console.log(i);
      // console.log(formatDate(currentDate));
      // console.log("doneLength = "+doneLength);
      // console.log("doneCount = "+doneCount);
      // console.log("percent = "+percent);


      days.push(
        <TouchableOpacity key={`day${i}`} onPress={() => console.log(`You pressed day ${i}`)}>
          <Text style={styles.day}>{i}</Text>
          {/* <Text>{formatDate(currentDate)}</Text> */}
          <Text style={styles.percent}>{percent}</Text>
        </TouchableOpacity>
      );

      // After completing each week, or reaching the end of the month, add the week array to the weeks array.
      if (days.length % 7 === 0 || i === daysInMonth) {
          weeks.push(
              <View key={`week${weeks.length}`} style={styles.weekContainer}>
                  <Text>{days}</Text>
              </View>
          );
          days = [];  // reset the days array
      }
    }

    return <View style={styles.daysContainer}>{weeks}</View>;
    };

    return (
      <>
      {/* 달력네비게이터 */}
      <View style={styles.navigator}>
        <Text onPress={goPrevMonth}>이전 달</Text>
        <Text>{calendarMonth.getFullYear()} {monthNames[calendarMonth.getMonth()]}</Text>
        <Text onPress={goNextMonth}>다음 달</Text>
      </View>

      {/* 달력내용 */}
      <View>
        {renderDaysOfWeek()}
        {renderDays()}
      </View>
      </>
      );
    };

// Get device width
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// Calculate day container width
// const dayContainerWidth = deviceWidth;



const styles = StyleSheet.create({
  // 달 옮기는 친구 이름 : 네비게이터
  navigator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#a3a3c2',
    height:60,
  },
  
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayOfWeek: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: deviceWidth,
    // height:deviceHeight-500,
  },
  emptyDay: {
    flex: 1,
    padding: 10,
    width:deviceWidth/7,
    // backgroundColor:"black",
  },
  day: {
    flex: 1,
    width:deviceWidth/7,
    padding: 10,
    textAlign: 'center',
  },
  percent: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    color:"blue",
    // marginBottom: 10,
  }
});