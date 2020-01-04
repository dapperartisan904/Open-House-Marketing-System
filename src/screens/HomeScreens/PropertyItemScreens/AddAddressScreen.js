import React, { Component } from 'react';
import Orientation from 'react-native-orientation'
import * as Actions from '../../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
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
  Label,
} from 'native-base';
import { Images, Fonts, Constants, Layouts } from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';

class AddAdrressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendeeaddressname: '',
      attendeezipcode: '',
      attendeecity: '',
      attendeestate: '',
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
      attendeeaddressname,
      attendeecity,
      attendeezipcode,
      attendeestate,
    } = this.state;
    if (!attendeeaddressname || attendeeaddressname.length < 3) {
      Alert.alert('', 'Address Name is Required');
    } else if (!attendeecity || attendeecity.length < 3) {
      Alert.alert('', 'City is Required');
    } else if (!attendeezipcode) {
      Alert.alert('', 'Zip Code is required');
    } else if (!attendeestate) {
      Alert.alert('', 'State is Required');
    } else {
      Constants.attendeeaddress = attendeeaddressname;
      Constants.attendeecity = attendeecity;
      Constants.attendeestate = attendeestate;
      Constants.attendeezipcode = attendeezipcode;
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
        // this.props.navigation.navigate('signFormScreen');
      } else {
        if (this.props.dashboard.selectedproperty.property_state === 'NY') {
          this.props.navigation.navigate(Constants.questionScreens[position]);
        } else {
          if (position === 11) {
            // / this.props.navigation.navigate('signFormScreen');
          } else {
            this.props.navigation.navigate(Constants.questionScreens[position]);
          }
        }
      }
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
          resizeMode="cover">
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
            <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: Layouts.MARGIN_LARGE, marginBottom: Layouts.MARGIN_LARGE }}>
                <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_BIG, fontWeight: 'bold', textAlign: 'center' }}>
                  What is your current address
              </Text>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: Layouts.MARGIN_LARGE, flexWrap: 'wrap' }}>
                <View style={[styles.imgcontainer, { width: '40%' }]}>
                  <Item stackedLabel style={styles.txtviewitem}>
                    <Label style={[styles.txtlabel, { fontSize: Layouts.TEXT_FONT_SIZE_SMALL }]}>Address</Label>
                    <TextInput
                      value={this.state.attendeeaddressname}
                      style={[styles.txtitem2, { fontSize: Layouts.TEXT_FONT_SIZE_NORMAL }]}
                      onChangeText={text => this.setState({ attendeeaddressname: text })}
                    />
                  </Item>
                </View>
                <View style={[styles.imgcontainer, { width: '40%' }]}>
                  <Item stackedLabel style={styles.txtviewitem}>
                    <Label style={[styles.txtlabel, { fontSize: Layouts.TEXT_FONT_SIZE_SMALL }]}>City</Label>
                    <TextInput
                      value={this.state.attendeecity}
                      style={[styles.txtitem2, { fontSize: Layouts.TEXT_FONT_SIZE_NORMAL }]}
                      onChangeText={text => this.setState({ attendeecity: text })}
                    />
                  </Item>
                </View>
                <View style={[styles.imgcontainer, { width: '40%' }]}>
                  <Item stackedLabel style={styles.txtviewitem}>
                    <Label style={[styles.txtlabel, {
                      fontSize: Layouts.TEXT_FONT_SIZE_SMALL
                    }]}>State</Label>
                    <TextInput
                      value={this.state.attendeestate}
                      style={[styles.txtitem2, { fontSize: Layouts.TEXT_FONT_SIZE_NORMAL }]}
                      onChangeText={text => this.setState({ attendeestate: text })}
                    />
                  </Item>
                </View>
                <View style={[styles.imgcontainer, { width: '40%' }]}>
                  <Item stackedLabel style={styles.txtviewitem}>
                    <Label style={[styles.txtlabel, { fontSize: Layouts.TEXT_FONT_SIZE_SMALL }]}>Zip Code</Label>
                    <TextInput
                      value={this.state.attendeezipcode}
                      style={[styles.txtitem2, { fontSize: Layouts.TEXT_FONT_SIZE_NORMAL }]}
                      onChangeText={text => this.setState({ attendeezipcode: text })}
                    />
                  </Item>
                </View>
                <View style={[styles.imgcontainer, { marginTop: Layouts.MARGIN_LARGE }]} >
                  <Button block style={[styles.btn, { height: Layouts.BIG_BUTTON_HEIGHT }]} onPress={() => this.continue()}>
                    <Text style={[styles.btntxt, { fontSize: Layouts.TEXT_FONT_SIZE_BIG }]}>Continue</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>


          <View style={{ flex: 1, width: '100%' }}>
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
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          resizeMode="cover">
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
            <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
                  What is your current address
              </Text>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
                <View style={[styles.imgcontainer, { width: '40%' }]}>
                  <Item stackedLabel style={styles.txtviewitem}>
                    <Label style={styles.txtlabel}>Address</Label>
                    <TextInput
                      value={this.state.attendeeaddressname}
                      style={styles.txtitem2}
                      onChangeText={text => this.setState({ attendeeaddressname: text })}
                    />
                  </Item>
                </View>
                <View style={[styles.imgcontainer, { width: '40%' }]}>
                  <Item stackedLabel style={styles.txtviewitem}>
                    <Label style={styles.txtlabel}>City</Label>
                    <TextInput
                      value={this.state.attendeecity}
                      style={styles.txtitem2}
                      onChangeText={text => this.setState({ attendeecity: text })}
                    />
                  </Item>
                </View>
                <View style={[styles.imgcontainer, { width: '40%' }]}>
                  <Item stackedLabel style={styles.txtviewitem}>
                    <Label style={styles.txtlabel}>State</Label>
                    <TextInput
                      value={this.state.attendeestate}
                      style={styles.txtitem2}
                      onChangeText={text => this.setState({ attendeestate: text })}
                    />
                  </Item>
                </View>
                <View style={[styles.imgcontainer, { width: '40%' }]}>
                  <Item stackedLabel style={styles.txtviewitem}>
                    <Label style={styles.txtlabel}>Zip Code</Label>
                    <TextInput
                      value={this.state.attendeezipcode}
                      style={styles.txtitem2}
                      onChangeText={text => this.setState({ attendeezipcode: text })}
                    />
                  </Item>
                </View>
                <View style={styles.imgcontainer}>
                  <Button block style={styles.btn} onPress={() => this.continue()}>
                    <Text style={styles.btntxt}>Continue</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 2, width: '100%' }}>
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
                    // resizeMode:'contain'
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
  imgcontainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtitem2: {
    height: 50,
    fontSize: 18,
    width: '100%',
  },
  btn: {
    backgroundColor: '#38a2c2',
    width: '70%',
    height: 50,
    zIndex: 100,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 19,
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
    width: '100%'
  },
  lockbtnview: {
    width: 70,
    height: 50,
    marginTop: 25,
    marginRight: 10,
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
)(AddAdrressScreen);
