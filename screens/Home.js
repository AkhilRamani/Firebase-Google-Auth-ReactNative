import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Home screen</Text>
        <Button title='sign out' onPress={() => firebase.auth().signOut() } />
      </View>
    );
  }
}
