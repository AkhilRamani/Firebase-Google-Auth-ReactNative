import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './navigation/switch.navigaton';

import {firebaseConfig} from './configs/firebase.config'
import firebase from 'firebase'
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
