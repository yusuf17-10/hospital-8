import * as React from "react";
import {Text,View,Dimensions,Alert,StyleSheet} from "react-native";
import MapView,{Callout, Marker} from "react-native-maps";
import db from '../config';
import firebase from "firebase";


export default class MapScreen extends React.Component{
    constructor(){
        super();
        this.state={
            longitude:"",
            latitude:"",
            hospitalList:[]
        }
    }



    componentDidMount(){
        this.getHospitals();
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({
                longitude:position.coords.longitude,
                latitude:position.coords.latitude

            })
        })
    }

    getHospitals=async()=>{
        var hospital = await db.collection("hospital")
        hospital.onSnapshot((snapshot)=>{
            var hospitalList = snapshot.docs.map(document => document.data())
            this.setState({
                hospitalList:hospitalList
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
                         <MapView 
                         zoomEnabled={true}
                         style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}}
                            initialRegion={{latitude:this.state.latitude,longitude:this.state.longitude,longitudeDelta:0.01,latitudeDelta:0.01}}
                         >

                             <Marker.Animated
                             pinColor={"red"}

                             coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}
                             
                             />
                               {
                                   this.state.hospitalList.length !== 0 ? 
                    (
                                    this.state.hospitalList.map((hospital)=>{
                                        return(
                                        
                                        <Marker.Animated
                                        pinColor={"blue"}
                                        title={hospital.name}
                                        coordinate={{latitude:hospital.position.latitude,longitude:hospital.position.longitude}}
                                        >
                                            <Callout tooltip>
                                               
                                                    <View style={{backgroundColor:"white",padding:10}}>
                                                    <Text>{hospital.name}</Text>
                                                    </View>
                                                
                                            </Callout>
                                        </Marker.Animated>
                                        )
                                    })
                    ):(Alert.alert("Reading the Position"))
                            
                         }
                         </MapView>
                       
                     </View> 
                    ):(Alert.alert("Reading the Position"))
                }
            </View>
        )
    }
}