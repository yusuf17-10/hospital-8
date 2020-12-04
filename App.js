import * as React from "react";
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import HomeScreen from "./Screens/HomeScreen";
import MapScreen from "./Screens/MapScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const AppSwitchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  HomeScreen:{screen:HomeScreen},
  MapScreen:{screen:MapScreen}

})

var AppContainer = createAppContainer(AppSwitchNavigator)
