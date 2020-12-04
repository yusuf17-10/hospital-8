import * as React from "react";
import {Text,View,Dimensions,Alert,StyleSheet} from "react-native";
import MapView,{Marker} from "react-native-maps";


export default class MapScreen extends React.Component{
    constructor(){
        super();
        this.state={
            longitude:"",
            latitude:""
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({
                longitude:position.coords.longitude,
                latitude:position.coords.latitude
            })
        })
    }
    render(){
        return(
            <View>
                {
                    this.state.longitude && this.state.latitude ?
                    (
                      <View style={{justifyContent:"center",alignItems:"center"}}>
                         <MapView style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}}
                            initialRegion={{latitude:this.state.latitude,longitude:this.state.longitude,longitudeDelta:0.01,latitudeDelta:0.01}}
                         >
                             <Marker

                             coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}
                             
                             />
                         </MapView>
                     </View> 
                    ):(Alert.alert("Reading the Position"))
                }
            </View>
        )
    }
}