import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ImageBackground
} from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
import firebase from "firebase";


export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      searchList:[],
      hospitalList:[]
      
    };
  }


  searchHospitals=async()=>{
    this.state.searchList.map(async(item)=>{
      var hospitals = await db.collection("hospital").where("hospitalId","==",item.hospitalId).get()
      hospitals.forEach(doc=>{
        this.setState({
          hospitalList:[...this.state.hospitalList,doc.data()]
        })
      })
    })
   
  }

  searchDiseases=async()=>{
    var diseaseName = this.state.text.toLowerCase().trim()
    var hospitals = await db.collection("diseases").where("diseaseName","==",diseaseName).get()
    hospitals.forEach(doc=>{
      this.setState({
        searchList:[...this.state.searchList,doc.data()]
      })
    })

  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'red'}
          centerComponent={{
            text: 'Hospital Advisor',
            style: {
              color: 'gold',
              fontSize: 22,
              fontStyle: 'italic',
              textShadowColor: 'black',
              textShadowRadius: 1,
              textShadowOffset: {
                width: 2,
                height: 2,
              },
            },
          }}
        />

        <ImageBackground
          style={styles.imageIcon}
          source={require('../assets/bg2.jpg')}
        />

        <Text style={styles.text}>
          Type The Disease From Which You Are Suffering From
        </Text>

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.goButton} onPress={() => {
         
          this.searchDiseases()
          this.searchHospitals()
          this.state.hospitalList.map(item => {
            Alert.alert(item.name)
          })
          this.setState({
          hospitalList:[],
            searchList:[]
          })
          this.props.navigation.navigate("MapScreen",{color:1})
        }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  inputBox: {
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
   
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    borderRadius: 30,
    backgroundColor: 'green',
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 2,
    fontStyle: 'italic',
  },

  imageIcon: {
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignSelf:"center",
    alignItems:"center",
    borderRadius: 5,
  },
});
