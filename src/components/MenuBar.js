// components/Header.js
import React from 'react';
import { TouchableOpacity, Alert, View, Text, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import auth from '../../firebaseConfig';
import Calendar from './Insight_Cal';



const MenuBar = () => {

    const fx1 = () => {
      navigation.navigate('Calendar');
    }
    const onLogout = async () => {
      try {
        await signOut(auth);
        alert('User logged out!');
      } catch (error) {
        alert(error);
      }
    }

    return (
        <View style={styles.box_menuBar}>
            <Btn_Setting title="Calender" fx={fx1} number="01"/>
            <Btn_Setting title="2" fx={fx1} number="02"/>
            <Btn_Setting title="3" fx={onLogout} number="03"/>
            <Btn_Setting title="4" fx={onLogout} number="04"/>
            <Btn_Setting title="Account" fx={onLogout} number="05"/>
            <Btn_Setting title="Logout" fx={onLogout} number="06"/>
        </View>
    );
}
const styles = StyleSheet.create({
  box_menuBar: {

    top:0,
    width:"100%",
    // height: 400,
    padding: 15,
    backgroundColor: 'gray',
    flexDirection: 'column', // Add this to align child elements horizontally
    // justifyContent: 'space-between', // Add this to put space between elements
    transition: "all 0.5s ease-in-out",
  }
});


const Btn_Setting= ({title, fx, number})=>{
  const styles = StyleSheet.create({
    btn_setting:{
      margin:10,
    },  
    btn_setting01:{
      backgroundColor:"white",
    },
    btn_setting02:{
      backgroundColor:"red",
    },
    btn_setting03:{
      backgroundColor:"blue",
    },
    btn_setting04:{
      backgroundColor:"green",
    },
    btn_setting05:{
      backgroundColor:"yellow",
    },
    btn_setting06:{
      backgroundColor:"lightgray",
    },
    btn_text:{
      fontSize:30,
      textAlign:"center",
    },
    
  });
  
  return(
    <>
      <TouchableOpacity style={[styles.btn_setting, styles[`btn_setting${number}`]]} onPress={fx}>
        <Text style={styles.btn_text}>{title}</Text>
      </TouchableOpacity>
    </>

    
  )
}





export default MenuBar;
