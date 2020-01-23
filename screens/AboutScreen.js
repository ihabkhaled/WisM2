import React, { Component } from 'react';
import { Provider as PaperProvider,Appbar,IconButton,Button as PButton,Avatar,Menu} from 'react-native-paper';
import { StyleSheet,StatusBar,View,Image,Button,Text,ScrollView,SafeAreaView} from 'react-native';
import 'react-native-gesture-handler'
import {NativeModules} from 'react-native';
var HelloWorld = NativeModules.HelloWorld;
import {
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

// const axios = require('axios');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sheetView:false,
      dropMenu:false,
      text: '',
      text2: '',
    };
  }

   _retrieveMobile() {
    HelloWorld.getMobileNumber()
  }

   _sayHiFromJava() {
    HelloWorld.sayHi( (err) => {console.log(err)}, (msg) => {console.log(msg)} );
  }

  _handleSettings = () => { this._sayHiFromJava(); }

  _toggleSideMenu = () => {
    this.props.navigation.toggleDrawer()
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
              subtitle="About Us"
            />
            <Appbar.Action icon="home" onPress={() => { this.props.navigation.navigate('Home'); this._handleSettings(); }} />
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
                  <Text style={styles.getStartedText}>You'll know whenever you need where are they.</Text>
                  <Text style={styles.getStartedText}>They are safe with us.</Text>
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