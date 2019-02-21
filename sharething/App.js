import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './MainScreen.js';

const MainNavigator = createStackNavigator({
  Home: {screen: MainScreen}
},
{
  initialRouteName: 'Home'
},
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component{
  render(){return<AppContainer />}
}


