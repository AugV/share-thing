import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { Google } from 'expo';
import { AppAuth } from 'expo-app-auth';
const { URLSchemes } = AppAuth;

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
}

export default Login;