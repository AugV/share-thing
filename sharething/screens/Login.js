import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { Google } from 'expo';
import { AppAuth } from 'expo-app-auth';
const { URLSchemes } = AppAuth;
import firebase from 'firebase';

class Login extends Component {

  
  signInWithGoogleAsync = async () => {
    const { navigate } = this.props.navigation;
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user
      alert('You have logged in as ' + user.name);
        this.setState({
          signedIn: true,
          name: user.name,
          email: user.email
        })
      navigate('Home', {userEmail:this.state.email});
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }


  render() {
    return (
      <View>
        <Button
          title="Sign in with Google"
          onPress={() => this.signInWithGoogleAsync()}
        />
      </View>
    )
  }
}

export default Login;