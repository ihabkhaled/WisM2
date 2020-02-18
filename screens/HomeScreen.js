import React, { Component } from 'react';
import { Provider as PaperProvider,Appbar,IconButton,Button as PButton,Avatar,Menu} from 'react-native-paper';
import { StyleSheet,StatusBar,View,Image,Button,Text,ScrollView,SafeAreaView} from 'react-native';
import 'react-native-gesture-handler'
import {NativeModules,NativeEventEmitter} from 'react-native';
var HelloWorld = NativeModules.HelloWorld;
import {
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import CallDetectorManager from 'react-native-call-detection'
import {PermissionsAndroid , Vibration, ToastAndroid, Linking} from 'react-native';
import SystemSetting from 'react-native-system-setting'
import Geolocation from 'react-native-geolocation-service';

// const axios = require('axios');

var countries        = require('country-data').countries,
    currencies       = require('country-data').currencies,
    regions          = require('country-data').regions,
    languages        = require('country-data').languages,
    callingCountries = require('country-data').callingCountries;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sheetView:false,
      dropMenu:false,
      text: '',
      text2: '',
      number: '',
      callingNumber: ''
    };
  }

   requestCallPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'The app need Call Log Permission',
          message:
            'The app need Call Log Permission ' +
            'So you can access the feature',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the Call Log');
      } else {
        // console.log(' Call Log permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'The app need Location Permission',
          message:
            'The app need Location Permission ' +
            'So you can access the feature',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the Location');
      } else {
        // console.log('Location permission denied');
      }
      Geolocation.getCurrentPosition(
        (position) => {

        },
        (error) => {

        }
      );
    } catch (err) {
      console.warn(err);
    }
  }

   _retrieveMobile() {
    HelloWorld.getMobileNumber()
  }

  _retrieveMobileStr() {
    HelloWorld.getNumber((err) => {console.log(err)}, (msg) => { this.state.number = msg; console.log(msg)})
  }

   _sayHiFromJava() {
    HelloWorld.sayHi( (err) => {console.log(err)}, (msg) => {/* console.log(msg) */} );
  }

  _handleSettings = () => { this._sayHiFromJava(); }

  _toggleSideMenu = () => {
    this.props.navigation.toggleDrawer()
  }

startListenerTapped() {
  this.callDetector = new CallDetectorManager((event, number)=> {
    if (event === 'Disconnected') {
      HelloWorld.getNumber( (err) => {

      }, (msg) => {
            if(msg && msg.length != 0 && !isNaN(msg))
            {
                if(this.state.callingNumber == msg)
                {
                  ToastAndroid.showWithGravity('Bye Daddy <3', ToastAndroid.LONG,ToastAndroid.CENTER);
                  Vibration.cancel();
                }
            }
      })
    } 
    else if (event === 'Connected') {
      
    } 
    else if (event === 'Incoming') {
      if(!this.state.callingNumber)
      {
        this.setState({ callingNumber: number })
      }

      HelloWorld.getNumber( (err) => {

      }, (msg) => {
            if(msg && msg.length != 0 && !isNaN(msg))
            {
                if(this.state.callingNumber == msg)
                {
                  ToastAndroid.showWithGravity('It\' Your Daddy! <3', ToastAndroid.LONG,ToastAndroid.CENTER);
                  this.triggerDaddy(number);
                }
            }
      })
    }
    else if (event === 'Dialing') {
      // console.log('Dialing')
    } 
    else if (event === 'Offhook') {
      HelloWorld.getNumber( (err) => {
        
      }, (msg) => {
            if(msg && msg.length != 0 && !isNaN(msg))
            {
                if(this.state.callingNumber == msg)
                {
                  ToastAndroid.showWithGravity('Hello Daddy <3', ToastAndroid.LONG,ToastAndroid.CENTER);
                  Vibration.cancel();
                }
            }
      })
    }
    else if (event === 'Missed') {
      // console.log('Missed')
    }
},
false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
(err)=>{ console.log(err) }, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
{
title: 'Phone State Permission',
message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
} // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
)

}

stopListenerTapped() {
  this.callDetector && this.callDetector.dispose();
}

triggerDaddy = (number) => {
  const PATTERN = 2000;
  Vibration.vibrate(PATTERN, true);

  var val = 1;
  var config = {};
  const SystemSettingNative = NativeModules.SystemSetting;
  const eventEmitter = new NativeEventEmitter(SystemSettingNative)

  config = {};
  config = Object.assign({
    playSound: true,
    type: 'system',
    showUI: true
  }, config)
  SystemSettingNative.setVolume(val, config)

  config = {};
  config = Object.assign({
    playSound: true,
    type: 'music',
    showUI: true
  }, config)
  SystemSettingNative.setVolume(val, config)

  config = {};
  config = Object.assign({
    playSound: true,
    type: 'call',
    showUI: true
  }, config)
  SystemSettingNative.setVolume(val, config)

  config = {};
  config = Object.assign({
      playSound: true,
      type: 'ring',
      showUI: true
  }, config)
  SystemSettingNative.setVolume(val, config)

  config = {};
  config = Object.assign({
    playSound: true,
    type: 'alarm',
    showUI: true
  }, config)
  SystemSettingNative.setVolume(val, config)

  config = {};
  config = Object.assign({
    playSound: true,
    type: 'notification',
    showUI: true
  }, config)
  SystemSettingNative.setVolume(val, config)

  /* SystemSetting.switchLocation(()=>{
  
  }) */

  Geolocation.getCurrentPosition(
      (position) => {
          var text = "Latitude : " + position.coords.latitude;
          text += " ,Longitude : " + position.coords.longitude;
          var locationAttrs = this.convertDMS(position.coords.latitude,position.coords.longitude);
          var locationURL = "https://www.google.com/maps/place/"+locationAttrs;
          console.log(locationURL)
      },
      (error) => {

      }
  );
}

convertDMS = (lat, lng) => {
  var latitude = this.toDegreesMinutesAndSeconds(lat);
  var latitudeCardinal = lat >= 0 ? "N" : "S";

  var longitude = this.toDegreesMinutesAndSeconds(lng);
  var longitudeCardinal = lng >= 0 ? "E" : "W";

  return latitude + "" + latitudeCardinal + "+" + longitude + "" + longitudeCardinal;
}

toDegreesMinutesAndSeconds = (coordinate) => {
  var absolute = Math.abs(coordinate);
  var degrees = Math.floor(absolute);
  var minutesNotTruncated = (absolute - degrees) * 60;
  var minutes = Math.floor(minutesNotTruncated);
  var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

  return degrees + "°" + minutes + "'" + seconds + "''";
}

  render() {
    for(var c in countries)
    {
      if(Array.isArray(countries[c].countryCallingCodes))
        {
          if(countries[c].countryCallingCodes[0])
          {
            let prefix = countries[c].alpha2;
            let countryName = countries[c].name;
            let countryCallCode = countries[c].countryCallingCodes[0];
            // console.log(prefix + " " + countryName + " " + countryCallCode)
          }
        }
    }

    this.requestCallPermission();
    this.requestLocationPermission();

    try {    
      this.startListenerTapped(); 
    } catch(err) {
      console.log(err);
    }
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
              subtitle="Home"
            />
            <Appbar.Action icon="settings" onPress={() => { this.props.navigation.navigate('Settings'); this._handleSettings(); }} />
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
                  <View style={{paddingTop: '40%'}}><Button id="submitButton" title="Check Mobile Number" onPress={this._retrieveMobile} /></View>
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
