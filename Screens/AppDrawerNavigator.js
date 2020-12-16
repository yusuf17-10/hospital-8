import React from "react";
import {createDrawerNavigator} from "react-navigation-drawer";
import {AppTabNavigator} from "../Components/AppTabNavigator";
import CustomSideBarMenu from "../Components/CustomSideBarMenu";
export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator}
    
    
},

{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:"Home"
})