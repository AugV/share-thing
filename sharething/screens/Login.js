import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { Google } from 'expo';
import { AppAuth } from 'expo-app-auth';
const { URLSchemes } = AppAuth;
<<<<<<< HEAD
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
=======

class Login extends Component {



    signInWithGoogleAsync = async () => {

              try {
                const clientId = '141243147234-kbbp89ug2d4tjvcm9t827k1rn223nqc2.apps.googleusercontent.com';
                const result = await Expo.Google.logInAsync({
                    androidClientId: '141243147234-kbbp89ug2d4tjvcm9t827k1rn223nqc2.apps.googleusercontent.com',
                    scopes: ["profile", "email"]
                  })

                if (type === 'success') {
                /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
                console.log(user);
            }
              } catch ({ message }) {
                alert('login: Error:' + message);
              }


            // const { type, accessToken } = await Google.logInAsync({
            //     behavior: 'web',
            //     scopes: ['profile', 'email'],
            //     webClientId: '141243147234-c4g7b8j627kkumbo8s8n2h54161n6u1l.apps.googleusercontent.com',
            //     iosClientId: '141243147234-9q7jthjbp891h88udgid7fbnso2pjm81.apps.googleusercontent.com',
            //     androidClientId: '141243147234-kbbp89ug2d4tjvcm9t827k1rn223nqc2.apps.googleusercontent.com'
            //   })
        
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
>>>>>>> 936470fe69436357f1277894a8eb17a58a64eadf
}

export default Login;