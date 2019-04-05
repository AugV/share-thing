import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';


class AddScreen extends Component {
    static navigationOptions = {
        title: 'Add a thing you want to share',
    };
    constructor() {
        super();
        this.ref = firebase.firestore().collection('things');
        this.state = {
            title: '',
            decription: '',
            isLoading: false,
            
        };
    }
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    saveBoard() {
        this.setState({
            isLoading: true,
        });
        this.ref.add({
            title: this.state.title,
            description: this.state.description
        }).then((docRef) => {
            this.setState({
                title: '',
                description: '',
                isLoading: false,
            });
            this.props.navigation.goBack();
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
                this.setState({
                    isLoading: false,
                });
            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.subContainer}>
                    <TextInput
                        placeholder={'title'}
                        value={this.state.title}
                        onChangeText={(text) => this.updateTextInput(text, 'title')}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder={'description'}
                        value={this.state.description}
                        onChangeText={(text) => this.updateTextInput(text, 'description')}
                    />
                </View>
                <View >
                    <Button style={styles.button}
                        large
                        leftIcon={{ name: 'save' }}
                        title='share'
                        onPress={() => this.saveBoard()} />
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    subContainer: {
        flex: 1,
        marginBottom: 20,
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        color: '#CCCCCC',
        
    }
})
export default AddScreen;