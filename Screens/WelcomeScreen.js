import * as React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isModalVisible: 'false',
      firstname: '',
      lastname: '',
      address: '',
      phone: '',
      confirmPassword: '',
    };
  }

  userSignUp = (username, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => {
        return Alert.alert('USER ADDED SUCCESSFULLY');
      })
      .catch((error) => {
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  userLogin = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        return this.props.navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });

    db.collection('user').add({
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      phone: this.state.phone,
      address: this.state.address,
    });
  };

  showModal = () => {
    return (
      <Modal
        visible={this.state.isModalVisible}
        animationType="fade"
        transparent={false}>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <Text>Registration</Text>
              <TextInput
                style={styles.input}
                placeholder={'FirstName'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ firstname: text });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder={'LastName'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ lastname: text });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder={'address'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder={'PhoneNumber'}
                keyboardType={'numeric'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ phone: text });
                }}
              />

              <TextInput
                style={styles.input}
                placeholder={'ConfirmPassword'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}>
                <Text>cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={{backgroundColor:"#FED8B1"}}>
       {this.showModal()}
        <Image
          style={styles.imageIcon}
          source={require('../assets/giphy.gif')}
        />
        <Text style={styles.text1}>Enter Your Email And Password To Login</Text>

        <Text style={styles.text2}>
          If You Are New User Then Type Email And Password Then Click On SignUp
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          value={this.state.password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.userLogin(this.state.email, this.state.password);
          }}>
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({ isModalVisible: true });

            
          }}>
          <Text>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'lightpink',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginTop: 10,
    borderWidth: 3,
    width: 200,
    height: 50,
  },
  button: {
    backgroundColor: 'aqua',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 10,
    borderWidth: 2,
    width: 150,
    height: 50,
  },

  imageIcon: {
    width: 300,
    height: 150,
    marginLeft: 20,
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  text1: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 2,
    fontStyle: 'italic',
  },

  text2: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 2,
    fontStyle: 'italic',
  },
});
