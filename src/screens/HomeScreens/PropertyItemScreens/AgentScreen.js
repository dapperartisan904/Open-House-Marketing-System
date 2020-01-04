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
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';

import {
  Button,
  Item,
  Input,
  Label,
} from 'native-base';
import { Images, Fonts, Constants } from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';
import Layouts from '../../../common/Layoutsd';

class AgentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendeefirstname: '',
      attendeelastname: '',
      attendeeemail: '',
      attendeetelephone: '',
      brokername: '',
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
    if (this.props.dashboard.status === 263) {
      if (Constants.postpublicbrokerFlag === 1) {
        Constants.postpublicbrokerFlag = 0;
        this.setState({ spinner: false });
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
      brokername,
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
    } else if (!brokername || brokername.length < 3) {
      Alert.alert('', 'Company/Broker Name is Required');
    } else {
      let data = {
        firstname: attendeefirstname,
        lastname: attendeelastname,
        email: attendeeemail,
        telephone: attendeetelephone,
        brokername: brokername,
        accountnum: this.props.login.account.account_num,
        propertyrecordnum: this.props.dashboard.selectedproperty
          .property_record_num,
        advertisingid: this.props.login.account.advertising_id,
        uniqueid: this.state.uniqueid,
        attendeetype: 'A',
      };
      this.setState({ spinner: true });
      Constants.postpublicbrokerFlag = 1;
      this.props.postPublicBroker(data);
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
            textContent={'Synchronizing Data...'}
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
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: Layouts.MARGIN_LARGE, marginBottom: Layouts.MARGIN_NORMAL }}>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_BIG, fontWeight: 'bold', textAlign: 'center' }}>
                  Enter Your Information
              </Text>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: Layouts.MARGIN_LARGE, flexWrap: 'wrap' }}>
                <View style={[styles.imgcontainerpad, { width: '40%', marginRight: Layouts.MARGIN_NORMAL }]}>
                  <TextInput
                    style={styles.txtinput}
                    placeholder={'First Name'}
                    onChangeText={text => this.setState({ attendeefirstname: text })}
                    value={this.state.attendeefirstname}
                  />
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginLeft: Layouts.MARGIN_NORMAL }]}>
                  <TextInput
                    style={styles.txtinput}
                    placeholder={'Last Name'}
                    onChangeText={text => this.setState({ attendeelastname: text })}
                    value={this.state.attendeelastname}
                  />
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginRight: Layouts.MARGIN_NORMAL }]}>
                  <TextInput
                    style={styles.txtinput}
                    placeholder={'Email Address'}
                    onChangeText={text => this.setState({ attendeeemail: text })}
                    value={this.state.attendeeemail}
                  />
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginLeft: Layouts.MARGIN_NORMAL }]}>
                  <TextInput
                    value={this.state.attendeetelephone}
                    style={styles.txtinput}
                    placeholder={'Phone Number'}
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
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginRight: Layouts.MARGIN_NORMAL }]}>

                  <TextInput
                    style={styles.txtinput}
                    placeholder={'Company/Broker Name'}
                    onChangeText={text => this.setState({ brokername: text })}
                    value={this.state.brokername}
                  />
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginLeft: Layouts.MARGIN_NORMAL }]}>
                </View>
              </View>
              <View style={styles.imgcontainer3}>
                <Button block style={styles.btnpad} onPress={() => this.continue()}>
                  <Text style={styles.btntxtpad}>Continue</Text>
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
          onLayout={this._onLayout()}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Synchronizing Data...'}
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
              <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_BIG, marginTop: 5, marginBottom: 5 }}>
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
                <Label style={styles.txtlabel}>Company/Broker Name</Label>
                <Input
                  value={this.state.brokername}
                  style={styles.txtitem2}
                  onChangeText={text => this.setState({ brokername: text })}
                />
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
    marginTop: 25,
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
    height: 400,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  formviewcontainer1: {
    width: '90%',
    height: 300,
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
  imgcontainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imgcontainer3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '60%',
    marginRight: '5%',
    marginTop: 10,
    zIndex: 100,
  },

  imgcontainerpad: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#38a2c2',
    width: '100%',
    height: 60,
    zIndex: 100,
  },
  btnpad: {
    backgroundColor: '#38a2c2',
    width: '40%',
    height: Layouts.BIG_BUTTON_HEIGHT,
    marginBottom: Layouts.MARGIN_LARGE,
    alignSelf: 'flex-end'
  },
  btntxtpad: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: Layouts.TEXT_FONT_SIZE_BIG,
  },
  txtinput: {
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
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  txtitem: {
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
  backtxt: {
    fontFamily: Fonts.bodonitalic,
    fontSize: 18,
    //
  },
  formitemcontainer: {
    marginTop: 10,
    height: 350,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  txtviewitem: {
    marginRight: 10,
    marginLeft: 10,
    padding: 0,
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
      // postPublicBroker
      postPublicBroker: Actions.postPublicBroker,
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
)(AgentScreen);
