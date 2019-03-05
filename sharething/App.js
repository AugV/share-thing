import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './MainScreen.js';
import AddScreen from './AddScreen.js'

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


