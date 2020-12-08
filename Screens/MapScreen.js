import * as React from "react";
import {Text,View,Dimensions,Alert,StyleSheet} from "react-native";
import MapView,{Marker} from "react-native-maps";
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

    getHospitals=()=>{
        var hospital = db.collection("hospital")
        .onSnapshot((snapshot)=>{
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
                             <Marker

                             coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}
                             
                             />
                         </MapView>
                         {
                             this.state.hospitalList.map((hospital)=>{
                                 <MapView.Marker
                                 title={hospital.hospitalName}
                                 coordinate={{latitude:hospital.position.longitude,longitude:hospital.position.latitude}}

                                 />
                             })
                         }
                     </View> 
                    ):(Alert.alert("Reading the Position"))
                }
            </View>
        )
    }
}