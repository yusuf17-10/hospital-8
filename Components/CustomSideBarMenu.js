import * as React from "react";
import {StyleSheet,View,Text,TouchableOpacity} from "react-native";
import {DrawerItems} from "react-navigation-drawer";
import firebase from "firebase";
import WelcomScreen from "../Screens/WelcomeScreen";

export default class CustomSideBarMenu extends React.Component {

    render(){
        return(
            <View style={{flex:1}}>
                <View>
                    <DrawerItems {...this.props}/>

                    <View>
                        <TouchableOpacity style = {{flex:1,justifyContent:"flex-end",paddingBottom:30}}>
                            <Text style={{justifyContent:"center",padding:10,height:30,width:"100%"}}
                            onPress={()=>{
                                this.props.navigation.navigate("WelcomeScreen")
                                firebase.auth().signOut()
                            }}
                            >LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}