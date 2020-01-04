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

class BrokerFinalScreen extends Component {
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
    // alert(Constants.bestsellingfeatures[0]);
    UUIDGenerator.getRandomUUID(uuid => {
      this.setState({ uniqueid: uuid });
    });
  }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 259) {
      if (Constants.postbrokerFlag === 1) {
        Constants.postbrokerFlag = 0;
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
    } = this.state;
    if (!attendeefirstname || attendeefirstname.length < 3) {
      Alert.alert('', 'Full Name is Required');
    } else if (!attendeeemail || attendeeemail.length < 3) {
      Alert.alert('', 'Brokers Name is Required');
    } else if (!attendeelastname) {
      Alert.alert('', 'Email is Invalid');
    } else if (attendeelastname && attendeelastname.length < 11) {
      Alert.alert('', 'Email is Required');
    } else if (attendeetelephone.length < 14) {
      Alert.alert('', 'Phone Number is Required');
    } else {
      let data = {
        propertyrecordnum: this.props.dashboard.selectedproperty
          .property_record_num,
        agentfullname: attendeefirstname,
        agenttelephone: attendeetelephone,
        agentemail: attendeelastname,
        accountnum: this.props.login.account.account_num,
        agentbrokername: attendeeemail,
        bestsellingfeatures: Constants.bestsellingfeatures[0],
        whatdoyouthinkaboutthelistingprice: Constants.bestsellingfeatures[1],
        anysuggestions: Constants.bestsellingfeatures[3],
        willreferproperty: Constants.bestsellingfeatures[2],
        keepinform: Constants.bestsellingfeatures[4],
        uniqueid: this.state.uniqueid,
      };
      Constants.postbrokerFlag = 1;
      this.setState({ spinner: true });
      this.props.postBroker(data);
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
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Text style={styles.backtxt}>Back</Text>
            </TouchableOpacity>
          </View>


          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 6, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_BIG, fontWeight: 'bold', textAlign: 'center' }}>
                  Enter Your Information
              </Text>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
                <View style={[styles.imgcontainerpad, { width: '40%', marginRight: 10 }]}>
                  <TextInput
                    style={styles.txtinput}
                    placeholder={'Full Name'}
                    onChangeText={text => this.setState({ attendeefirstname: text })}
                    value={this.state.attendeefirstname}
                  />
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginLeft: 10 }]}>
                  <TextInput
                    style={styles.txtinput}
                    placeholder={'Email Address'}
                    onChangeText={text => this.setState({ attendeelastname: text })}
                    value={this.state.attendeelastname}
                  />
                </View>
                <View style={[styles.imgcontainerpad, { width: '40%', marginRight: 10 }]}>
                  <TextInput
                    value={this.state.attendeetelephone}
                    style={styles.txtinput}
                    placeholder={'Telephone'}
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
                <View style={[styles.imgcontainerpad, { width: '40%', marginLeft: 10 }]}>

                  <TextInput
                    style={styles.txtinput}
                    placeholder={'Brokers Name'}
                    onChangeText={text => this.setState({ attendeeemail: text })}
                    value={this.state.attendeeemail}
                  />
                </View>
              </View>
              <View style={styles.imgcontainerpad}>
                <Button block style={styles.btnpad} onPress={() => this.continue()}>
                  <Text style={styles.btntxt}>Continue</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={{ flex: 2, width: '100%', }}>

            {this.state.keyflag && (
              <View style={{
                position: 'absolute',
                bottom: 30,
                right: 0,
                width: '50%',
                height: 80,
                backgroundColor: '#8c8c8c',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={styles.profilelogview}>
                  <Image
                    source={{ uri: this.props.login.account.agent_photo_url }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                    }}
                  />
                </View>
                <View style={[styles.textdetail, { marginLeft: 50 }]}>
                  <Text style={{ fontSize: 14, color: 'white' }}>
                    {this.props.login.account.agent_first_name}{' '}
                    {this.props.login.account.agent_last_name}
                  </Text>
                  <Text style={{ fontSize: 14, color: 'white' }}>
                    {this.props.login.account.agent_title}
                  </Text>
                  <Text style={{ fontSize: 14, color: 'white' }}>
                    {this.props.login.account.agent_office_name}
                  </Text>
                </View>
              </View>
            )
            }

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
              <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>
                Enter Your Information
            </Text>
            </View>
            <View style={styles.formitemcontainer}>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Full Name</Label>
                <Input
                  value={this.state.attendeefirstname}
                  style={styles.txtitem2}
                  onChangeText={text => this.setState({ attendeefirstname: text })}
                />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Email Address</Label>
                <Input
                  value={this.state.attendeelastname}
                  style={styles.txtitem2}
                  onChangeText={text => this.setState({ attendeelastname: text })}
                />
              </Item>
              <Item stackedLabel style={styles.txtviewitem}>
                <Label style={styles.txtlabel}>Telephone</Label>
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
                <Label style={styles.txtlabel}>Brokers Name</Label>
                <Input
                  value={this.state.attendeeemail}
                  style={styles.txtitem2}
                  onChangeText={text => this.setState({ attendeeemail: text })}
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
    top: 20,
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
    height: 350,
    position: 'absolute',
    top: 160,
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
  imgcontainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '60%',
    marginRight: '5%',
    marginTop: 20,
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
    width: '45%',
    height: Layouts.BIG_BUTTON_HEIGHT,
    marginBottom: Layouts.MARGIN_LARGE,
    alignSelf: 'flex-end'
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: Layouts.TEXT_FONT_SIZE_BIG,
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
    height: 280,
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
      postBroker: Actions.postBroker,
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
)(BrokerFinalScreen);
