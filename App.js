import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';

//page import
import Header from './src/components/Header';
import MenuBar from './src/components/MenuBar';
import TodoListPage from './src/pages/TodoListPage';
import AddItemPage from "./src/pages/AddItemPage";
import LoginPage from "./src/pages/LoginPage";
import InsightPage from './src/pages/InsightPage';
import SignUpPage from './src/pages/SignUpPage';

const Tab = createBottomTabNavigator();



export default function App() {

  //user check

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Menu Modal

  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    
    <View style={styles.container}>
      <StatusBar style="auto"/>
      {/* <Header /> */}
      <Header setMenuVisible ={setMenuVisible} isMenuVisible={isMenuVisible}/>

      <NavigationContainer >
      {isMenuVisible?<MenuBar />:null}
      {user ? (
          <Tab.Navigator initialRouteName="InsightPage">
            <Tab.Screen name="Checklist" component={TodoListPage} />
            <Tab.Screen name="AddItem" component={AddItemPage} />
            <Tab.Screen name="Insight" component={InsightPage} />
          </Tab.Navigator>
        ) : (
          <Tab.Navigator initialRouteName="LoginPage">
            <Tab.Screen name="LoginPage" component={LoginPage} />
            <Tab.Screen name="SignUpPage" component={SignUpPage} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  navnav : {
    height:150,
    backgroundColor:'red',
  }
});
