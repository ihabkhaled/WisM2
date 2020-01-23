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


export default class GetStartedScreen2 extends Component {
  static navigationOptions = {
    drawerLabel: () => null
}
  constructor(props) {
    super(props);

    this.state = {
      sheetView:false,
      dropMenu:false,
      number: '',
      loaded: false,
    };
  }

  _retrieveMobileStr = () => {
    HelloWorld.getNumber( (err) => { 
        this.setState({ number: 'Error: ' + err });
    }, (msg) => {
        if(!this.state.number)
        {
            if(msg && msg.length != 0 && !isNaN(msg))
            {
                this.setState({ number: msg });
                this.setState({ loaded: true });
            }

            if(!this.state.loaded)
              this.setState({ loaded: true });
        }
    })
  }

  _saveMobile = () => {
    let text = this.state.text;
    HelloWorld.myMobile(text)
    this.props.navigation.navigate('DrawerNav');
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

  render() {
    this._retrieveMobileStr();
    if (this.state.loaded)
    {
      var checkNumber = this.state.number
      if(!checkNumber || typeof checkNumber === "undefined")
      {
        return (
            <PaperProvider>
              <StatusBar backgroundColor="#1666b5" barStyle="light-content" />
              <Appbar style={styles.appbar}>
                <Appbar.Content
                  title="WhereIsMy?"
                  subtitle="Create Emergency Password"
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
                      <Text style={styles.getStartedText}>Write down the phone number for emergency</Text>
                    </View>

                    <View style={{ padding: 10 }}>
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
                      <Button id="submitButton" title='Submit' onPress={this._saveMobile} disabled={this._toggleButton(this.state.text)} />
                    </View>
                </View>
            </PaperProvider> 
        );
      }
      else
      {
        this.props.navigation.navigate('DrawerNav');
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
            <Text>Loading Mobile Number</Text>
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