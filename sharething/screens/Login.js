import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { Google } from 'expo';


class Login extends Component {

    signInWithGoogleAsync = async () => {
        try {
            const clientId = '141243147234-9q7jthjbp891h88udgid7fbnso2pjm81.apps.googleusercontent.com';
            
            const { type, accessToken, user } = await Google.logInAsync({ clientId });

            if (type === 'success') {
            /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
            console.log(user);
            }
        }
        catch (e) { error: true };
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