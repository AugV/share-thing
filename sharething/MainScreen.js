import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import firebase from './Firebase';

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Share List',
        headerRight: (
            <Button
                buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
                icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
                onPress={() => { navigation.push('AddScreen') }}
            />
        ),
    };
};
constructor() {
  super();
  this.ref = firebase.firestore().collection('things');
  this.unsubscribe = null;
  this.state = {
      isLoading: true,
      things: []
  };
}
render() {
  if (this.state.isLoading) {
      return (
          <View style={styles.activity}>
              <ActivityIndicator size="large" color='black' />
          </View>
      )
  }
  return (
      <ScrollView style={styles.container}>{
          this.state.things.map((item, i) => (
              <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{ name: 'circle', type: 'font-awesome' }}
                  onPress={() => {
                      // this.props.navigation.navigate(/*'BoardDetails', {
                      //     boardkey: `${JSON.stringify(item.key)}`,
                      // }*/);
                  }}
              />
          ))
      }
      </ScrollView>
  );
}
componentDidMount() {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
}

onCollectionUpdate = (querySnapshot) => {
  const things = [];
  querySnapshot.forEach((doc) => {
      const { title, description } = doc.data();
      things.push({
          key: doc.id,
          doc, // DocumentSnapshot
          title,
          description,
      });
  });
  this.setState({
      things,
      isLoading: false,
  });
}
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingBottom: 22
  },
  item: {
      padding: 10,
      fontSize: 18,
      height: 44,
  },
  activity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
  }
})
export default MainScreen;