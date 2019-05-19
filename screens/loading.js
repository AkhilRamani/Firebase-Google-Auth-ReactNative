import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from "firebase";

export default class Loading extends Component {

    componentDidMount(){
        this.checkIfLogin();
    }

    checkIfLogin = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) this.props.navigation.navigate('HomeScreen')
            else this.props.navigation.navigate('LoginScreen')
        })
    }

  render() {
    return (
      <View styles={styles.container}>
          <ActivityIndicator size='large' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})