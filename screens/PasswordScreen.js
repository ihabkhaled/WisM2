import React, { Component } from 'react';
import { Provider as PaperProvider,Appbar,IconButton,Button as PButton,Avatar,Menu} from 'react-native-paper';
import { StyleSheet,StatusBar,View,Image,Button,Text,ScrollView,SafeAreaView} from 'react-native';
import 'react-native-gesture-handler'
import {NativeModules} from 'react-native';
import {ToastAndroid} from 'react-native';
var HelloWorld = NativeModules.HelloWorld;
import {
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';


export default class PasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropMenu:false,
      currentPassword: '',
      newPassword: ''
    };
  }

   _retrieveMobile() {
    HelloWorld.getMobileNumber()
  }

  _toggleSideMenu = () => {
    this.props.navigation.toggleDrawer()
  }

  _passwordCheck = (text) => {
    if (!text) {
      return "Please enter password!"
    }
    else {
      if (text.length < 8) {
        return "Password should be more than 8 characters"
      }
    }
  }
  
  _savePassword = () => {
    let oldPass = this.state.currentPassword;
    let newPass = this.state.newPassword;
    let checkPassword = this._passwordCheck(newPass);
    if(!checkPassword)
     {
        HelloWorld.getPassword((err) => {  }, (msg) => {
            if(msg && msg.length != 0) {
                if(oldPass === msg)
                {
                    HelloWorld.setPassword(newPass);
                    this.setState({ currentPassword: '' });
                    this.setState({ newPassword: '' });
                    this.props.navigation.navigate('Home');
                }
                else
                {
                    ToastAndroid.showWithGravity('Wrong Current Password!', ToastAndroid.SHORT,ToastAndroid.CENTER);
                }
            }
      })
     }
     else
     {
        ToastAndroid.showWithGravity(checkPassword, ToastAndroid.SHORT,ToastAndroid.CENTER);
     }
  }

  render() {
    return (
        <PaperProvider>
          <StatusBar backgroundColor="#1666b5" barStyle="light-content" />
          <Appbar style={styles.appbar}>
            <Appbar.Action
              onPress={this._toggleSideMenu.bind(this)}
              icon="menu"
            />
            <Appbar.Content
              title="WhereIsMy?"
              subtitle="Change Parent Password"
            />
            <Appbar.Action icon="home" onPress={() => { this.props.navigation.navigate('Home'); }} />
            <Appbar.Action icon="phone" onPress={this._retrieveMobile} />
          </Appbar>

            <View>
                <View style={styles.welcomeContainer}>
                  <Image
                    source={
                      __DEV__
                        ? require('../assets/images/wism.png')
                        : require('../assets/images/wism.png')
                    }
                    style={styles.welcomeImage}
                  />
                </View>

                <View style={styles.getStartedContainer}>
                  <Text style={styles.getStartedText}>Change Parent Password</Text>
                </View>

                <View style={{ padding: 10 }}>
                    <TextInput 
                        style={{ height: 40, borderBottomWidth: 2, borderBottomColor: '#000000' }}
                        placeholder="Old Password"
                        onChangeText={(currentPassword) => this.setState({ currentPassword })}
                        value={this.state.currentPassword}
                    />
                    <TextInput 
                        style={{ height: 40, borderBottomWidth: 2, borderBottomColor: '#000000' }}
                        placeholder="Enter New Password"
                        onChangeText={(newPassword) => this.setState({ newPassword })}
                        value={this.state.newPassword}
                    />
                    <Text style={{ padding: 10, fontSize: 12, color: 'rgba(255,0,0, 1)'}}>
                    {
                      this._passwordCheck(this.state.newPassword)
                    }
                  </Text>
                <Button id="submitButton" title='Submit' onPress={this._savePassword}  />
                </View>
            </View>
        </PaperProvider> 
    );
  }
}

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:0,
    backgroundColor:'#1976d2'
  },
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    backgroundColor: '#fff',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeImage: {
    marginTop: 20,
    width: 200,
    height: 160,
    resizeMode: 'contain',
    marginLeft: -10,
  },
  getStartedContainer: {
    marginTop: -40,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});