// components/Header.js
import React from 'react';
import { TouchableOpacity, Alert, View, Text, StyleSheet } from 'react-native';



const Header = ({setMenuVisible, isMenuVisible}) => {

  
  return (
    <>
      <View style={styles.box_userbar}>
          <Text style={styles.txt_account}>AccountName</Text>
          <TouchableOpacity style={styles.btn_setting} onPress={()=>{setMenuVisible(!isMenuVisible); console.log(isMenuVisible)}}/>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
box_userbar: {

  marginTop:20,
  top:0,
  width:"100%",
  height: 60,
  padding: 15,
  backgroundColor: 'gray',
  flexDirection: 'row', // Add this to align child elements horizontally
  justifyContent: 'space-between', // Add this to put space between elements
},
txt_account: {
  color: '#fff',
  fontSize: 23,
  textAlign: 'center',
  width:"60%"
},
btn_setting:{
  width:40,
  height:40,
  backgroundColor:"white",
}
});

export default Header;
