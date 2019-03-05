import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './screens/MainScreen.js';
import AddScreen from './screens/AddScreen.js'

const MainNavigator = createStackNavigator({
  Home: {screen: MainScreen},
  AddScreen: {screen: AddScreen}
},
{
  initialRouteName: 'Home'
},
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component{
  render(){return<AppContainer />}
}


