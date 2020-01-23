import React, { Component } from 'react';
import { Provider as PaperProvider,Appbar,IconButton,Button as PButton,Avatar,Menu} from 'react-native-paper';
import { StyleSheet,StatusBar,View,Image,Button,Text,ScrollView,SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import LinearGradient from 'react-native-linear-gradient';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import DocumentPicker from 'react-native-document-picker';
import {NativeModules} from 'react-native';
var HelloWorld = NativeModules.HelloWorld;
import {
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import PasswordScreen from './screens/PasswordScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import GetStartedScreen2 from './screens/GetStartedScreen2';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1.5, y: 1.5}} colors={['#7ea7cf', '#1a71c7', '#1976d2']} >
      <View style={{height:170,flex:1,alignItems:'center',flexDirection:'row'}}>
         <Text style={{ marginLeft:10,fontSize:20,fontWeight:'bold',color:'white'}}>WIsM?</Text>
      </View>
    </LinearGradient>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);


const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: (
          <Icon name="phone" size={24} color="#717171" onPress={() => navigate('Home')}/>
      ),
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: (
          <Icon name="settings" size={24} color="#717171" onPress={() => navigate('Settings')}/>
      ),
    }
  },
  ParentPassword: {
    screen: PasswordScreen,
    navigationOptions: {
      drawerLabel: 'Change Parent Password',
      drawerIcon: (
          <Icon name="key" size={24} color="#717171" />
      ),
    }
  },
  Info: {
    screen: AboutScreen,
    navigationOptions: {
      drawerLabel: 'About',
      drawerIcon: (
          <Icon name="information-variant" size={24} color="#717171" />
      ),
    }
  },
},
{
  contentComponent: CustomDrawerContentComponent,
}
);


const StackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen, },
    Settings: {screen: SettingsScreen, },
    Password: {screen: PasswordScreen, },
    About: {screen: AboutScreen, },
    GetStarted: {screen: GetStartedScreen, },
    GetStartedNumber: {screen: GetStartedScreen2, },
    DrawerNav: MyDrawerNavigator
  },
  {
    initialRouteName: 'GetStarted',
    headerMode: 'none',
  }
);

// const MyApp = createAppContainer(MyDrawerNavigator);


const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;
