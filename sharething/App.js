import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './screens/MainScreen.js';
import AddScreen from './screens/AddScreen.js'
import Login from './screens/Login.js'

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Home: {screen: MainScreen},
  AddScreen: {screen: AddScreen}
},
{
  initialRouteName: 'Login'
},
);
const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component{
  render(){return<AppContainer />}
}


