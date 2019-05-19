import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoadingScreen from '../screens/loading'
import HomeScreen from '../screens/Home'
import LoginScreen from '../screens/Login'

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen,
    LoginScreen,
    HomeScreen,
})

export default createAppContainer(AppSwitchNavigator);