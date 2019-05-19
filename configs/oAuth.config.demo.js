import {Platform} from 'react-native';

export const oAuthClientId = Platform.OS === 'android'
    ? 'android client id'
    : 'ios client id'