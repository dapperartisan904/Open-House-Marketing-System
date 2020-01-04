import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import Orientation from 'react-native-orientation'
import * as Actions from '../../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import {
  Button,
  Item,
  Input,
  Label,
} from 'native-base';
import { Images, Fonts, Constants, Colors } from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';
import Layouts from '../../../common/Layoutsd';
// import constants from 'jest-haste-map/build/constants';
// import Constants from '../../../common/Constants';

class BuyerNoActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendeefirstname: '',
      attendeelastname: '',
      attendeeemail: '',
      attendeetelephone: '',
      uniqueid: '',
      spinner: false,
      loadingtxt: '',
    };
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  componentDidMount() {
    UUIDGenerator.getRandomUUID(uuid => {
      this.setState({ uniqueid: uuid });
    });
  }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.loadingtxt !== this.props.dashboard.loadingtxt) {
      this.setState({ loadingtxt: this.props.dashboard.loadingtxt });
    }
    if (this.state.spinner === false && this.props.dashboard.status === 100) {
      this.setState({ spinner: true });
    }
    if (
      this.props.dashboard.status >= 200 &&
      this.state.spinner === true &&
      prevProps.dashboard.status === 100
    ) {
      this.setState({ spinner: false });
      if (this.props.dashboard.status === 200) {
        // this.props.navigation.navigate('CreateAccountfourScreen');
        this.props.navigation.navigate('thankPropertyScreen');
      }
    }
  }
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };

  continue = () => {
    const {
      attendeefirstname,
      attendeelastname,
      attendeeemail,
      attendeetelephone,
    } = this.state;
    if (!attendeefirstname || attendeefirstname.length < 3) {
      Alert.alert('', 'First Name is Required');
    } else if (!attendeelastname || attendeelastname.length < 3) {
      Alert.alert('', 'Last Name is Required');
    } else if (!attendeeemail) {
      Alert.alert('', 'Email is Invalid');
    } else if (attendeeemail && attendeeemail.length < 11) {
      Alert.alert('', 'Email is Required');
    } else if (attendeetelephone.length < 14) {
      Alert.alert('', 'Phone Number is Required');
    } else {
      Constants.attendeefirstname = attendeefirstname;
      Constants.attendeelastname = attendeelastname;
      Constants.attendeeemail = attendeeemail;
      Constants.attendeetelephone = attendeetelephone;

      if (Constants.checkArray[0] == 1) {
        this.props.navigation.navigate('question1Screen');
      } else {
        var flag = 0;
        var position = 0;
        for (let i = 4; i < Constants.checkArray.length; i++) {
          if (Constants.checkArray[i] === 1) {
            flag = 1;
            position = i;
            break;
          }
        }
        if (flag === 0) {
          this.props.navigation.navigate('signFormScreen');
        } else {
          this.props.navigation.navigate(Constants.questionScreens[position]);
        }
      }
      //ThankPropertyScreen
    }
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    if (Constants.device_Pad) {
      return (
        <ImageBackground
          source={Images.siginbackgroundimage}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          resizeMode="cover"
        >
          <Spinner
            visible={this.state.spinner}
            textContent={this.state.loadingtxt}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={{
            position: 'absolute',
            top: 10,
            left: 20,
          }}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Text style={{
                fontFamily: Fonts.bodonitalic,
                fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
              }}>Back</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 6, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: Layouts.MARGIN_LARGE, marginBottom: 10 }}>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_BIG, fontWeight: 'bold', textAlign: 'center' }}>
                  Enter Your Information
            </Text>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: Layouts.MARGIN_LARGE, flexWrap: 'wrap' }}>
                <View style={[styles.imgcontainerpad, { width: '40%', marginRight: Layouts.MARGIN_NORMAL }]}>
                  <TextInput
                    style={styles.txtinputpad}
                    placeholder={'First Name'}
                    onChangeText={text => this.setState({ attendeefirstname: text })}
                    value={this.state.attendeefirstname}
                  />
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginLeft: Layouts.MARGIN_NORMAL }]}>
                  <TextInput
                    style={styles.txtinputpad}
                    placeholder={'Last Name'}
                    onChangeText={text => this.setState({ attendeelastname: text })}
                    value={this.state.attendeelastname}
                  />
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginRight: Layouts.MARGIN_NORMAL }]}>

                  <TextInput
                    style={styles.txtinputpad}
                    placeholder={'Email Address'}
                    onChangeText={text => this.setState({ attendeeemail: text })}
                    value={this.state.attendeeemail}
                  />
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginLeft: Layouts.MARGIN_NORMAL }]}>
                  <TextInput
                    style={styles.txtinputpad}
                    placeholder={'Phone Number'}
                    keyboardType={'numeric'}
                    value={this.state.attendeetelephone}
                    onChangeText={text => {
                      let num1 = text.replace(/\D+/g, '');
                      let num2 = this.state.attendeetelephone.replace(/\D+/g, '');
                      let num = num1.replace('.', '');
                      if (!text) {
                        this.setState({ attendeetelephone: '' });
                      }
                      if (num1 && num1 === num2) {
                        num1 = num1.slice(0, num1.length - 1);
                      }
                      if (isNaN(num) || num.length > 10) {
                        // Its not a number
                      } else {
                        let cleaned = num1;
                        let match = cleaned.replace(
                          /(\d{0,3})(\d{0,3})(\d{0,4})$/,
                          '($1) $2-$3',
                        );
                        if (match) {
                          this.setState({ attendeetelephone: match });
                        }
                        if (!num1) {
                          this.setState({ attendeetelephone: '' });
                        }
                      }
                    }}
                  />
                </View>
              </View>
              <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: -20, marginBottom: 0, }}>
                <Text style={[styles.txtitem, { fontSize: Layouts.TEXT_FONT_SIZE_DISCLAIMER }]}>
                  I understand that by pressing sign-in or continue, I am agreeing with the terms and
                  conditions of Open House Marketing System.  I am also granting full permission to be
                contacted via text, email or phone calls by {this.props.login.account.agent_first_name}{' '}
                  {this.props.login.account.agent_last_name} or any of his/her affiliates.
                     I am also granting permission to be contacted by any of Open House Marketing System
                     partners and affiliates
            </Text>
              </View>

              <View style={styles.imgcontainer3}>
                <Button block style={styles.btnpad} onPress={() => this.continue()}>
                  <Text style={[styles.btntxt, { fontSize: Layouts.TEXT_FONT_SIZE_BIG }]}>Continue</Text>
                </Button>
              </View>
            </View>
          </View>

          <View style={{ flex: 2, width: '100%' }}>
            <View style={{
              position: 'absolute',
              bottom: Layouts.PROFILE_PART_BOTTOM,
              right: 0,
              width: Layouts.PROFIEL_PART_WIDTH,
              height: Layouts.PROFILE_PART_HEIGHT,
              backgroundColor: '#8c8c8c',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: Layouts.PROFILE_PART_HEIGHT,
                height: Layouts.PROFILE_PART_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={{
                  width: Layouts.PROFIEL_PART_AVARTA_SIZE,
                  height: Layouts.PROFIEL_PART_AVARTA_SIZE,
                  borderRadius: Layouts.PROFIEL_PART_AVARTA_SIZE / 2,
                  // resizeMode:'contain'
                  backgroundColor: 'green'
                }}>
                  <Image
                    source={{ uri: this.props.login.account.agent_photo_url }}
                    style={{
                      width: Layouts.PROFIEL_PART_AVARTA_SIZE,
                      height: Layouts.PROFIEL_PART_AVARTA_SIZE,
                      borderRadius: Layouts.PROFIEL_PART_AVARTA_SIZE / 2,
                      // resizeMode:'contain'
                    }}
                  />
                </View>
              </View>
              <View style={[styles.textdetail, { marginLeft: 50 }]}>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_SMALL, color: 'white' }}>
                  {this.props.login.account.agent_first_name}{' '}
                  {this.props.login.account.agent_last_name}
                </Text>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_SMALL, color: 'white' }}>
                  {this.props.login.account.agent_title}
                </Text>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_SMALL, color: 'white' }}>
                  {this.props.login.account.agent_office_name}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={Images.siginbackgroundimage}
          style={styles.container}
          resizeMode="cover"
          onLayout={this._onLayout}>
          <Spinner
            visible={this.state.spinner}
            textContent={this.state.loadingtxt}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Text style={styles.backtxt}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formviewcontainer}>
            <View style={styles.imgcontainer1}>
              <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>
                Enter Your Information
            </Text>
            </View>
            <View style={styles.formitemcontainer}>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>First Name</Label>
                <Input
                  value={this.state.attendeefirstname}
                  style={styles.txtitem2}
                  onChangeText={text => this.setState({ attendeefirstname: text })}
                />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Last Name</Label>
                <Input
                  value={this.state.attendeelastname}
                  style={styles.txtitem2}
                  onChangeText={text => this.setState({ attendeelastname: text })}
                />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Email Address</Label>
                <Input
                  value={this.state.attendeeemail}
                  style={styles.txtitem2}
                  onChangeText={text => this.setState({ attendeeemail: text })}
                />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Phone Number</Label>
                <Input
                  value={this.state.attendeetelephone}
                  style={styles.txtitem2}
                  keyboardType={'numeric'}
                  onChangeText={text => {
                    let num1 = text.replace(/\D+/g, '');
                    let num2 = this.state.attendeetelephone.replace(/\D+/g, '');
                    let num = num1.replace('.', '');
                    if (!text) {
                      this.setState({ attendeetelephone: '' });
                    }
                    if (num1 && num1 === num2) {
                      num1 = num1.slice(0, num1.length - 1);
                    }
                    if (isNaN(num) || num.length > 10) {
                      // Its not a number
                    } else {
                      let cleaned = num1;
                      let match = cleaned.replace(
                        /(\d{0,3})(\d{0,3})(\d{0,4})$/,
                        '($1) $2-$3',
                      );
                      if (match) {
                        this.setState({ attendeetelephone: match });
                      }
                      if (!num1) {
                        this.setState({ attendeetelephone: '' });
                      }
                    }
                  }}
                />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Text style={styles.txtitem}>
                  I understand that by pressing sign-in or continue, I am agreeing with the terms and
                  conditions of Open House Marketing System.  I am also granting full permission to be
                contacted via text, email or phone calls by {this.props.login.account.agent_first_name}{' '}
                  {this.props.login.account.agent_last_name} or any of his/her affiliates.
                     I am also granting permission to be contacted by any of Open House Marketing System
                     partners and affiliates
                </Text>
              </Item>
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={styles.btn} onPress={() => this.continue()}>
                <Text style={styles.btntxt}>Continue</Text>
              </Button>
            </View>
          </View>

          <View style={styles.profileview}>
            <View style={styles.profilelogview}>
              <Image
                source={{ uri: this.props.login.account.agent_photo_url }}
                style={styles.lockimg1}
              />
            </View>
            <View style={styles.textdetail}>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_first_name}{' '}
                {this.props.login.account.agent_last_name}
              </Text>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_title}
              </Text>
              <Text style={styles.textitem}>
                {this.props.login.account.agent_office_name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  lockbtnview: {
    width: 70,
    height: 50,
    marginTop: 35,
    marginRight: 10,
  },
  lockimg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  lockimg1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // resizeMode:'contain'
  },
  formviewcontainer: {
    width: '100%',
    height: 300,
    position: 'absolute',
    top: 150,
    // justifyContent: 'center',
    // marginTop:Dimensions.get('window').height * 0.1,
  },
  formviewcontainer1: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  officelog: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  txtinputpad: {
    height: Layouts.BASE_INPUT_HEIGHT_NORMAL,
    width: '100%',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: 'white',
    marginBottom: Layouts.MARGIN_NORMAL,
    marginLeft: Layouts.MARGIN_NORMAL,
    marginRight: Layouts.MARGIN_NORMAL,
    paddingLeft: Layouts.MARGIN_NORMAL,
    fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
  },
  imgcontainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imgcontainerpad: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '60%',
    marginTop: 10,
    zIndex: 100,
  },
  imgcontainer3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnpad: {
    backgroundColor: Colors.BUTTON_COLOR,
    width: '40%',
    height: Layouts.BIG_BUTTON_HEIGHT,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'flex-end'
  },
  btn: {
    backgroundColor: Colors.BUTTON_COLOR,
    width: '90%',
    marginRight: 20,
    height: 50,
    zIndex: 100,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 19,
  },
  txtitem: {
    paddingTop: 5,
    width: '90%',
    fontSize: 7,
    textAlign: 'center',
  },
  profileview: {
    zIndex: 1,
    position: 'absolute',
    height: 60,
    width: '70%',
    bottom: 30,
    right: 0,
    backgroundColor: '#8c8c8c',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilelogview: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    marginLeft: 10,
  },
  textdetail: {
    flexDirection: 'column',
    // alignItems:'center',
    marginLeft: 10,
  },
  textitem: {
    fontSize: 10,
    color: 'white',
  },
  txtitem2: {
    height: 40,
  },
  backtxt: {
    fontFamily: Fonts.bodonitalic,
    fontSize: 18,
    //
  },
  formitemcontainer: {
    marginTop: 10,
    height: 320,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  txtviewitem: {
    marginRight: 10,
    marginLeft: 10,
    height: 40,
    padding: 0,
  },
  txtviewitemtxt: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  txtlabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'red',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setagentitem: Actions.setagentitem,
      postnewattendeeagent: Actions.postnewattendeeagent,
    },
    dispatch,
  );
}

function mapStateToProps({ login, dashboard }) {
  return {
    login: login,
    dashboard: dashboard,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerNoActivity);
