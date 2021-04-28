import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import loginScreen from './screens/loginScreen'
import chatScreen from './screens/chatScreen'


const appNavigator = createStackNavigator (

  {
    Login: loginScreen,
    Chat: chatScreen
  },
  {
    headerMode : "none"
  }
);

export default createAppContainer(appNavigator);