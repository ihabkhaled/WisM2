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


export default class GetStartedScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null
}
  constructor(props) {
    super(props);

    this.state = {
      sheetView:false,
      dropMenu:false,
      thePassword: '',
      password: '',
      passwordExist:false,
      loaded: false,
    };
  }

  _savePassword = () => {
    let text = this.state.thePassword;
    HelloWorld.setPassword(text);
    this.props.navigation.navigate('GetStartedNumber');
  }

  _getPassword = () => {
    HelloWorld.getPassword((err) => { this.setState({ password: 'Error: ' + err}) }, (msg) => {
        if(!this.state.password)
        {
            if(msg && msg.length != 0) {
              this.setState({ password:msg }); 
              this.setState({ loaded: true });
            }
            if(!this.state.loaded)
              this.setState({ loaded: true });
        }
      })
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
  
   _toggleButton = (text) => {
    var resp = this._passwordCheck(text);
    if(!resp || typeof resp === "undefined")
      return false;
    else
      return true;
  }

  render() {
    this._getPassword();
    if (this.state.loaded)
    {
      var checkPassword = this.state.password
      if(!checkPassword || typeof checkPassword === "undefined")
      {
        return (
            <PaperProvider>
              <StatusBar backgroundColor="#1666b5" barStyle="light-content" />
              <Appbar style={styles.appbar}>
                <Appbar.Content
                  title="WhereIsMy?"
                  subtitle="Create Parent Password"
                />
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
                      <Text style={styles.getStartedText}>Please write down the parent password to use it in the future as a verficiation</Text>
                    </View>

                    <View style={{ padding: 10 }}>
                      <TextInput 
                        style={{ height: 40, borderBottomWidth: 2, borderBottomColor: '#000000' }}
                        placeholder="Enter Password"
                        onChangeText={(thePassword) => this.setState({ thePassword })}
                        value={this.state.thePassword}
                      />
                      <Text style={{ padding: 10, fontSize: 12, color: 'rgba(255,0,0, 1)'}}>
                        {
                          this._passwordCheck(this.state.thePassword)
                        }
                      </Text>
                      <Button id="submitButton" title='Submit' onPress={this._savePassword} disabled={this._toggleButton(this.state.thePassword)} />
                    </View>
                </View>
            </PaperProvider> 
        );
      }
      else
      {
        this.props.navigation.navigate('GetStartedNumber');
        return (
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/wism.png')
                  : require('../assets/images/wism.png')
              }
              style={styles.welcomeImage}
            />
            <Image
              source={
                __DEV__
                  ? require('../assets/images/loading2.gif')
                  : require('../assets/images/loading2.gif')
              }
              style={styles.welcomeImage}
            />
        </View>
        );
      }
    }
    else
    {
      return (
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/wism.png')
                : require('../assets/images/wism.png')
            }
            style={styles.welcomeImage}
          />
          <Image
            source={
              __DEV__
                ? require('../assets/images/loading2.gif')
                : require('../assets/images/loading2.gif')
            }
            style={styles.welcomeImage}
          />
      </View>
      );
    }
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