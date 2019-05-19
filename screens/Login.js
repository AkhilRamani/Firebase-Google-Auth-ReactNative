import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Google } from 'expo';
import firebase from 'firebase'
import {oAuthClientId} from '../configs/oAuth.config'

export default class Login extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }


  onSignIn = (googleUser) => {
    // console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            // googleUser.getAuthResponse().id_token
            googleUser.idToken,
            googleUser.accessToken
          );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            console.log('user signed in')

            if(result.additionalUserInfo.isNewUser){
              firebase.database().ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now()
                })
                .then((snapshot) => {
				  // console.log(snapshot)	  
                })
            }
            else {
              firebase.database()
                .ref('/users/' + result.user.uid)
                .update({
                  last_logged_in: Date.now()
                })
            }
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  
  googleSignin = async () => {
    const result = await Google.logInAsync({
      behavior: 'web',
      clientId: oAuthClientId,
      scopes: ['profile', 'email']
    });
    //result = { type, accessToken, user }
    if (result.type === 'success') {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      this.onSignIn(result);
      // console.log(user);
    }    
  }

  render() {
    return (
      <View>
        <Button title='Login with Google' onPress={this.googleSignin} />
      </View>
    );
  }
}
