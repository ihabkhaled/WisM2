import React, { Component } from 'react';
import { Provider as PaperProvider,Appbar,IconButton,Button as PButton,Avatar,Menu} from 'react-native-paper';
import { StyleSheet,StatusBar,View,Image,Button,Text,ScrollView,SafeAreaView, Picker} from 'react-native';
import 'react-native-gesture-handler'
import {NativeModules,AsyncStorage} from 'react-native';
var HelloWorld = NativeModules.HelloWorld;
import {
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

var countries = require('country-data').countries;

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
      text: '',
      countryCode:''
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

  /* _retrieveCountries = () => {
    for (var c of countries.all) {
      if(Array.isArray(c.countryCallingCodes))
        {
          if(c.countryCallingCodes.length > 0)
          {
            // console.log(c.countryCallingCodes)
            if(c.countryCallingCodes.length == 1)
            {
              let prefix = c.alpha2;
              let countryName = c.name;
              let countryCallCode = c.countryCallingCodes[0];
              let picker = '<Picker.Item label="' + countryName + ' ' + countryCallCode + '" value="' + countryCallCode + '" />';
              console.log(picker)
            }
            // return picker;
          }
        }
    }
  } */

  _storeCountryCode = async (theCountryCode) => {
    try {
      await AsyncStorage.setItem('theCountryCode', theCountryCode);
    } catch (error) {
      // Error saving data
    }
  };

  _saveMobile = () => {
    let text = this.state.text;
    let theCountryCode = this.state.countryCode;
    this._storeCountryCode(theCountryCode);
    HelloWorld.myMobile(text)
    this.setState({ text: '' }); 
    this.setState({ countryCode: '' }); 
    this.props.navigation.navigate('DrawerNav');
 }

 _mobileSubmit = (text,theCountryCode) => {
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

    if(!theCountryCode){
      return "Please choose country code!"
    }
    else
    {
      return '';
    }
  }
  
   _toggleButton = (text,theCountryCode) => {
    var resp = this._mobileSubmit(text,theCountryCode);
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
                  subtitle="Create Emergency Number"
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

                    <Picker
                      selectedValue={this.state.countryCode}
                      style={{height: 50}}
                      onValueChange={(itemValue, itemIndex) =>
                        {
                          this.setState({countryCode: itemValue});
                        }
                      }>
                        <Picker.Item label="Choose Country Code" value="" />
                      <Picker.Item label="Ascension Island +247" value="+247" />
                      <Picker.Item label="Andorra +376" value="+376" />
                      <Picker.Item label="United Arab Emirates +971" value="+971" />
                      <Picker.Item label="Afghanistan +93" value="+93" />
                      <Picker.Item label="Antigua And Barbuda +1 268" value="+1 268" />
                      <Picker.Item label="Anguilla +1 264" value="+1 264" />
                      <Picker.Item label="Albania +355" value="+355" />
                      <Picker.Item label="Armenia +374" value="+374" />
                      <Picker.Item label="Angola +244" value="+244" />
                      <Picker.Item label="Antarctica +672" value="+672" />
                      <Picker.Item label="Argentina +54" value="+54" />
                      <Picker.Item label="American Samoa +1 684" value="+1 684" />
                      <Picker.Item label="Austria +43" value="+43" />
                      <Picker.Item label="Australia +61" value="+61" />
                      <Picker.Item label="Aruba +297" value="+297" />
                      <Picker.Item label="Åland Islands +358" value="+358" />
                      <Picker.Item label="Azerbaijan +994" value="+994" />
                      <Picker.Item label="Bosnia & Herzegovina +387" value="+387" />
                      <Picker.Item label="Barbados +1 246" value="+1 246" />
                      <Picker.Item label="Bangladesh +880" value="+880" />
                      <Picker.Item label="Belgium +32" value="+32" />
                      <Picker.Item label="Burkina Faso +226" value="+226" />
                      <Picker.Item label="Bulgaria +359" value="+359" />
                      <Picker.Item label="Bahrain +973" value="+973" />
                      <Picker.Item label="Burundi +257" value="+257" />
                      <Picker.Item label="Benin +229" value="+229" />
                      <Picker.Item label="Saint Barthélemy +590" value="+590" />
                      <Picker.Item label="Bermuda +1 441" value="+1 441" />
                      <Picker.Item label="Brunei Darussalam +673" value="+673" />
                      <Picker.Item label="Bolivia, Plurinational State Of +591" value="+591" />
                      <Picker.Item label="Bonaire, Saint Eustatius And Saba +599" value="+599" />
                      <Picker.Item label="Brazil +55" value="+55" />
                      <Picker.Item label="Bahamas +1 242" value="+1 242" />
                      <Picker.Item label="Bhutan +975" value="+975" />
                      <Picker.Item label="Botswana +267" value="+267" />
                      <Picker.Item label="Belarus +375" value="+375" />
                      <Picker.Item label="Belize +501" value="+501" />
                      <Picker.Item label="Canada +1" value="+1" />
                      <Picker.Item label="Cocos (Keeling) Islands +61" value="+61" />
                      <Picker.Item label="Democratic Republic Of Congo +243" value="+243" />
                      <Picker.Item label="Central African Republic +236" value="+236" />
                      <Picker.Item label="Republic Of Congo +242" value="+242" />
                      <Picker.Item label="Switzerland +41" value="+41" />
                      <Picker.Item label="Côte d'Ivoire +225" value="+225" />
                      <Picker.Item label="Cook Islands +682" value="+682" />
                      <Picker.Item label="Chile +56" value="+56" />
                      <Picker.Item label="Cameroon +237" value="+237" />
                      <Picker.Item label="China +86" value="+86" />
                      <Picker.Item label="Colombia +57" value="+57" />
                      <Picker.Item label="Costa Rica +506" value="+506" />
                      <Picker.Item label="Cuba +53" value="+53" />
                      <Picker.Item label="Cabo Verde +238" value="+238" />
                      <Picker.Item label="Curacao +599" value="+599" />
                      <Picker.Item label="Christmas Island +61" value="+61" />
                      <Picker.Item label="Cyprus +357" value="+357" />
                      <Picker.Item label="Czech Republic +420" value="+420" />
                      <Picker.Item label="Germany +49" value="+49" />
                      <Picker.Item label="Djibouti +253" value="+253" />
                      <Picker.Item label="Denmark +45" value="+45" />
                      <Picker.Item label="Dominica +1 767" value="+1 767" />
                      <Picker.Item label="Dominican Republic +1 809" value="+1 809" />
                      <Picker.Item label="Algeria +213" value="+213" />
                      <Picker.Item label="Ecuador +593" value="+593" />
                      <Picker.Item label="Estonia +372" value="+372" />
                      <Picker.Item label="Egypt +20" value="+20" />
                      <Picker.Item label="Western Sahara +212" value="+212" />
                      <Picker.Item label="Eritrea +291" value="+291" />
                      <Picker.Item label="Spain +34" value="+34" />
                      <Picker.Item label="Ethiopia +251" value="+251" />
                      <Picker.Item label="European Union +388" value="+388" />
                      <Picker.Item label="Finland +358" value="+358" />
                      <Picker.Item label="Fiji +679" value="+679" />
                      <Picker.Item label="Falkland Islands +500" value="+500" />
                      <Picker.Item label="Micronesia, Federated States Of +691" value="+691" />
                      <Picker.Item label="Faroe Islands +298" value="+298" />
                      <Picker.Item label="France +33" value="+33" />
                      <Picker.Item label="France, Metropolitan +241" value="+241" />
                      <Picker.Item label="Gabon +241" value="+241" />
                      <Picker.Item label="United Kingdom +44" value="+44" />
                      <Picker.Item label="Grenada +473" value="+473" />
                      <Picker.Item label="Georgia +995" value="+995" />
                      <Picker.Item label="French Guiana +594" value="+594" />
                      <Picker.Item label="Guernsey +44" value="+44" />
                      <Picker.Item label="Ghana +233" value="+233" />
                      <Picker.Item label="Gibraltar +350" value="+350" />
                      <Picker.Item label="Greenland +299" value="+299" />
                      <Picker.Item label="Gambia +220" value="+220" />
                      <Picker.Item label="Guinea +224" value="+224" />
                      <Picker.Item label="Guadeloupe +590" value="+590" />
                      <Picker.Item label="Equatorial Guinea +240" value="+240" />
                      <Picker.Item label="Greece +30" value="+30" />
                      <Picker.Item label="Guatemala +502" value="+502" />
                      <Picker.Item label="Guam +1 671" value="+1 671" />
                      <Picker.Item label="Guinea-bissau +245" value="+245" />
                      <Picker.Item label="Guyana +592" value="+592" />
                      <Picker.Item label="Hong Kong +852" value="+852" />
                      <Picker.Item label="Honduras +504" value="+504" />
                      <Picker.Item label="Croatia +385" value="+385" />
                      <Picker.Item label="Haiti +509" value="+509" />
                      <Picker.Item label="Hungary +36" value="+36" />
                      <Picker.Item label="Indonesia +62" value="+62" />
                      <Picker.Item label="Ireland +353" value="+353" />
                      <Picker.Item label="Israel +972" value="+972" />
                      <Picker.Item label="Isle Of Man +44" value="+44" />
                      <Picker.Item label="India +91" value="+91" />
                      <Picker.Item label="British Indian Ocean Territory +246" value="+246" />
                      <Picker.Item label="Iraq +964" value="+964" />
                      <Picker.Item label="Iran, Islamic Republic Of +98" value="+98" />
                      <Picker.Item label="Iceland +354" value="+354" />
                      <Picker.Item label="Italy +39" value="+39" />
                      <Picker.Item label="Jersey +44" value="+44" />
                      <Picker.Item label="Jamaica +1 876" value="+1 876" />
                      <Picker.Item label="Jordan +962" value="+962" />
                      <Picker.Item label="Japan +81" value="+81" />
                      <Picker.Item label="Kenya +254" value="+254" />
                      <Picker.Item label="Kyrgyzstan +996" value="+996" />
                      <Picker.Item label="Cambodia +855" value="+855" />
                      <Picker.Item label="Kiribati +686" value="+686" />
                      <Picker.Item label="Comoros +269" value="+269" />
                      <Picker.Item label="Saint Kitts And Nevis +1 869" value="+1 869" />
                      <Picker.Item label="Korea, Democratic People's Republic Of +850" value="+850" />
                      <Picker.Item label="Korea, Republic Of +82" value="+82" />
                      <Picker.Item label="Kuwait +965" value="+965" />
                      <Picker.Item label="Cayman Islands +1 345" value="+1 345" />
                      <Picker.Item label="Kazakhstan +7" value="+7" />
                      <Picker.Item label="Lao People's Democratic Republic +856" value="+856" />
                      <Picker.Item label="Lebanon +961" value="+961" />
                      <Picker.Item label="Saint Lucia +1 758" value="+1 758" />
                      <Picker.Item label="Liechtenstein +423" value="+423" />
                      <Picker.Item label="Sri Lanka +94" value="+94" />
                      <Picker.Item label="Liberia +231" value="+231" />
                      <Picker.Item label="Lesotho +266" value="+266" />
                      <Picker.Item label="Lithuania +370" value="+370" />
                      <Picker.Item label="Luxembourg +352" value="+352" />
                      <Picker.Item label="Latvia +371" value="+371" />
                      <Picker.Item label="Libya +218" value="+218" />
                      <Picker.Item label="Morocco +212" value="+212" />
                      <Picker.Item label="Monaco +377" value="+377" />
                      <Picker.Item label="Moldova +373" value="+373" />
                      <Picker.Item label="Montenegro +382" value="+382" />
                      <Picker.Item label="Saint Martin +590" value="+590" />
                      <Picker.Item label="Madagascar +261" value="+261" />
                      <Picker.Item label="Marshall Islands +692" value="+692" />
                      <Picker.Item label="Macedonia, The Former Yugoslav Republic Of +389" value="+389" />
                      <Picker.Item label="Mali +223" value="+223" />
                      <Picker.Item label="Myanmar +95" value="+95" />
                      <Picker.Item label="Mongolia +976" value="+976" />
                      <Picker.Item label="Macao +853" value="+853" />
                      <Picker.Item label="Northern Mariana Islands +1 670" value="+1 670" />
                      <Picker.Item label="Martinique +596" value="+596" />
                      <Picker.Item label="Mauritania +222" value="+222" />
                      <Picker.Item label="Montserrat +1 664" value="+1 664" />
                      <Picker.Item label="Malta +356" value="+356" />
                      <Picker.Item label="Mauritius +230" value="+230" />
                      <Picker.Item label="Maldives +960" value="+960" />
                      <Picker.Item label="Malawi +265" value="+265" />
                      <Picker.Item label="Mexico +52" value="+52" />
                      <Picker.Item label="Malaysia +60" value="+60" />
                      <Picker.Item label="Mozambique +258" value="+258" />
                      <Picker.Item label="Namibia +264" value="+264" />
                      <Picker.Item label="New Caledonia +687" value="+687" />
                      <Picker.Item label="Niger +227" value="+227" />
                      <Picker.Item label="Norfolk Island +672" value="+672" />
                      <Picker.Item label="Nigeria +234" value="+234" />
                      <Picker.Item label="Nicaragua +505" value="+505" />
                      <Picker.Item label="Netherlands +31" value="+31" />
                      <Picker.Item label="Norway +47" value="+47" />
                      <Picker.Item label="Nepal +977" value="+977" />
                      <Picker.Item label="Nauru +674" value="+674" />
                      <Picker.Item label="Niue +683" value="+683" />
                      <Picker.Item label="New Zealand +64" value="+64" />
                      <Picker.Item label="Oman +968" value="+968" />
                      <Picker.Item label="Panama +507" value="+507" />
                      <Picker.Item label="Peru +51" value="+51" />
                      <Picker.Item label="French Polynesia +689" value="+689" />
                      <Picker.Item label="Papua New Guinea +675" value="+675" />
                      <Picker.Item label="Philippines +63" value="+63" />
                      <Picker.Item label="Pakistan +92" value="+92" />
                      <Picker.Item label="Poland +48" value="+48" />
                      <Picker.Item label="Saint Pierre And Miquelon +508" value="+508" />
                      <Picker.Item label="Pitcairn +872" value="+872" />
                      <Picker.Item label="Puerto Rico +1 787" value="+1 787" />
                      <Picker.Item label="Palestinian Territory, Occupied +970" value="+970" />
                      <Picker.Item label="Portugal +351" value="+351" />
                      <Picker.Item label="Palau +680" value="+680" />
                      <Picker.Item label="Paraguay +595" value="+595" />
                      <Picker.Item label="Qatar +974" value="+974" />
                      <Picker.Item label="Reunion +262" value="+262" />
                      <Picker.Item label="Romania +40" value="+40" />
                      <Picker.Item label="Serbia +381" value="+381" />
                      <Picker.Item label="Russian Federation +7" value="+7" />
                      <Picker.Item label="Rwanda +250" value="+250" />
                      <Picker.Item label="Saudi Arabia +966" value="+966" />
                      <Picker.Item label="Solomon Islands +677" value="+677" />
                      <Picker.Item label="Seychelles +248" value="+248" />
                      <Picker.Item label="Sudan +249" value="+249" />
                      <Picker.Item label="Sweden +46" value="+46" />
                      <Picker.Item label="Singapore +65" value="+65" />
                      <Picker.Item label="Saint Helena, Ascension And Tristan Da Cunha +290" value="+290" />
                      <Picker.Item label="Slovenia +386" value="+386" />
                      <Picker.Item label="Svalbard And Jan Mayen +47" value="+47" />
                      <Picker.Item label="Slovakia +421" value="+421" />
                      <Picker.Item label="Sierra Leone +232" value="+232" />
                      <Picker.Item label="San Marino +378" value="+378" />
                      <Picker.Item label="Senegal +221" value="+221" />
                      <Picker.Item label="Somalia +252" value="+252" />
                      <Picker.Item label="Suriname +597" value="+597" />
                      <Picker.Item label="South Sudan +211" value="+211" />
                      <Picker.Item label="Sao Tome and Principe +239" value="+239" />
                      <Picker.Item label="El Salvador +503" value="+503" />
                      <Picker.Item label="Sint Maarten +1 721" value="+1 721" />
                      <Picker.Item label="Syrian Arab Republic +963" value="+963" />
                      <Picker.Item label="Swaziland +268" value="+268" />
                      <Picker.Item label="Tristan de Cunha +290" value="+290" />
                      <Picker.Item label="Turks And Caicos Islands +1 649" value="+1 649" />
                      <Picker.Item label="Chad +235" value="+235" />
                      <Picker.Item label="Togo +228" value="+228" />
                      <Picker.Item label="Thailand +66" value="+66" />
                      <Picker.Item label="Tajikistan +992" value="+992" />
                      <Picker.Item label="Tokelau +690" value="+690" />
                      <Picker.Item label="Timor-Leste, Democratic Republic of +670" value="+670" />
                      <Picker.Item label="Turkmenistan +993" value="+993" />
                      <Picker.Item label="Tunisia +216" value="+216" />
                      <Picker.Item label="Tonga +676" value="+676" />
                      <Picker.Item label="Turkey +90" value="+90" />
                      <Picker.Item label="Trinidad And Tobago +1 868" value="+1 868" />
                      <Picker.Item label="Tuvalu +688" value="+688" />
                      <Picker.Item label="Taiwan +886" value="+886" />
                      <Picker.Item label="Tanzania, United Republic Of +255" value="+255" />
                      <Picker.Item label="Ukraine +380" value="+380" />
                      <Picker.Item label="Uganda +256" value="+256" />
                      <Picker.Item label="United States Minor Outlying Islands +1" value="+1" />
                      <Picker.Item label="United States +1" value="+1" />
                      <Picker.Item label="Uruguay +598" value="+598" />
                      <Picker.Item label="Uzbekistan +998" value="+998" />
                      <Picker.Item label="Vatican City State +379" value="+379" />
                      <Picker.Item label="Saint Vincent And The Grenadines +1 784" value="+1 784" />
                      <Picker.Item label="Venezuela, Bolivarian Republic Of +58" value="+58" />
                      <Picker.Item label="Virgin Islands (British) +1 284" value="+1 284" />
                      <Picker.Item label="Virgin Islands (US) +1 340" value="+1 340" />
                      <Picker.Item label="Viet Nam +84" value="+84" />
                      <Picker.Item label="Vanuatu +678" value="+678" />
                      <Picker.Item label="Wallis And Futuna +681" value="+681" />
                      <Picker.Item label="Samoa +685" value="+685" />
                      <Picker.Item label="Kosovo +383" value="+383" />
                      <Picker.Item label="Yemen +967" value="+967" />
                      <Picker.Item label="Mayotte +262" value="+262" />
                      <Picker.Item label="South Africa +27" value="+27" />
                      <Picker.Item label="Zambia +260" value="+260" />
                      <Picker.Item label="Zimbabwe +263" value="+263" />
                    </Picker>

                      <Text style={{ padding: 10, fontSize: 12, color: 'rgba(255,0,0, 1)'}}>
                        {
                          this._mobileSubmit(this.state.text,this.state.countryCode)
                        }
                      </Text>
                      <Button id="submitButton" title='Submit' onPress={this._saveMobile} disabled={this._toggleButton(this.state.text,this.state.countryCode)} />
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