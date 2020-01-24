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


export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sheetView:false,
      dropMenu:false,
      text: '',
      text2: '',
      number: '',
      editable: true,
      password: '',
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    
  }

  async _myMethod(theMobile) {
      HelloWorld.myMobile(theMobile)
      this.setState({ password: ''})
      this.setState({ text: ''})
      this.setState({ number: theMobile })
    }

   _retrieveMobile() {
    HelloWorld.getMobileNumber()
  }

  async _retrieveMobileStr() {
    HelloWorld.getNumber( (err) => { 
        this.setState({ number: 'Error: ' + err });
    }, (msg) => {
        if(!this.state.number)
        {
            if(msg && msg.length != 0 && !isNaN(msg))
            {
                this.setState({ number: msg })
            }
            else
            {
                this.setState({ number: 'Not found, Please insert a number' });
            }
        }
        else
        {
            if(this.state.number != msg)
            {
                this.setState({ number: msg })
            }
        }
    })
  }

  _toggleSideMenu = () => {
    this.props.navigation.toggleDrawer()
  }

   _mobileSubmit = (text) => {
    if (!text) {
      return "Please enter mobile number!"
    }
    else {
  
      if (isNaN(text)) {
        return "Please enter only numbers!"
      }
  
      if (text.length != 11) {
        return "Mobile number should be 11 numbers!"
      }
  
      var phoneRe = /^01[0125]\d{8}$/;
      if (!phoneRe.test(text)) {
        return "Wrong mobile number!";
      }
    }
  }
  
   _toggleButton = (text) => {
    var resp = this._mobileSubmit(text);
    if(!resp || typeof resp === "undefined")
      return false;
    else
      return true;
  }

  _toggleTextField = (text) => {
    var resp = text;
    if(!resp || typeof resp === "undefined")
      return 'Submit';
    else
      return 'Overwrite';
  }

  _overwrite = (text) => {
    this._toggleTextField('')
  }
  
   _saveMobile = () => {
     let text = this.state.text;
     let password = this.state.password;
     HelloWorld.getPassword((err) => { this.setState({ password: 'Error: ' + err}) }, (msg) => {
            if(msg && msg.length != 0) {
                if(password === msg)
                {
                    this._myMethod(text);
                }
                else
                {
                    ToastAndroid.showWithGravity('Wrong Password!', ToastAndroid.SHORT,ToastAndroid.CENTER);
                }
            }
      })
  }

  render() {
    this._retrieveMobileStr()
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
              subtitle="Settings"
            />
            <Appbar.Action icon="home" onPress={() => { this.props.navigation.navigate('Home'); }} />
            <Appbar.Action icon="phone" onPress={this._retrieveMobile} />
          </Appbar>

          {/* <KeyboardAvoidingView style={styles.container} behavior="padding" enabled> */}
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
                  <Text style={styles.getStartedText}>Write down the phone number for emergency</Text>
                  <Text style={styles.getStartedText, {color:'red'}}>Number: {this.state.number}</Text>
                </View>

                <View style={{ padding: 10 }}>
                    <TextInput secureTextEntry={true}
                        style={{ height: 40, borderBottomWidth: 2, borderBottomColor: '#000000' }}
                        placeholder="Enter Current Password"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                  <TextInput 
                    style={{ height: 40, borderBottomWidth: 2, borderBottomColor: '#000000' }}
                    placeholder="Enter Mobile Number"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                  />
                  <Text style={{ padding: 10, fontSize: 12, color: 'rgba(255,0,0, 1)'}}>
                    {
                      this._mobileSubmit(this.state.text)
                    }
                  </Text>
                  <Button id="submitButton" title={this._toggleTextField(this.state.number)} onPress={this._saveMobile} disabled={this._toggleButton(this.state.text)} />
                </View>
            </View>
          {/* </KeyboardAvoidingView> */}
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