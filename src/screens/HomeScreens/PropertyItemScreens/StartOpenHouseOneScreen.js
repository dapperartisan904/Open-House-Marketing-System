import React, { Component } from 'react';

import * as Actions from '../../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import Orientation from 'react-native-orientation'
import {
  Button,
} from 'native-base';
import { Images, Fonts } from '@commons';
import Constants from '../../../common/Constants';
import Layouts from '../../../common/Layoutsd';
import { Avatar } from 'react-native-elements';
// import Image from 'react-native-image-progress';

class StartOpenHouseOneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  componentDidMount() { }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) { }

  signin = () => {
    // this.props.navigation.navigate('question12Screen');
    if (
      this.props.dashboard &&
      this.props.dashboard.makehousedata &&
      this.props.dashboard.makehousedata.type === 'public'
    ) {
      // go startopenhouse two
      let downloadmortgage;
      if (this.props.dashboard.motgages) {
        downloadmortgage = this.props.dashboard.motgages.filter(
          item => item.is_selected === '1',
        );
      } else {
        downloadmortgage = this.props.login.downloadmortgage.filter(
          item => item.is_selected === '1',
        );
      }
      if (downloadmortgage && downloadmortgage.length) {
        console.log('##############');
        console.log(downloadmortgage[0])
        this.props.setmortgageitem(downloadmortgage[0]);
        this.props.navigation.navigate('startOpenHouseTwoScreen');
      }
    } else {
      this.props.navigation.navigate('brokerOneScreen');
    }
  };
  gobackdashboard = () => {
    Alert.alert('', 'Do you want to end the Open House?', [
      { text: 'YES', onPress: this.godashboard },
      { text: 'NO' },
    ]);
  };
  godashboard = () => {
    if (Constants.device_Pad) {
      this.props.navigation.navigate('containerdScreen');
    } else {
      this.props.navigation.navigate('dashboard');
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
          <View style={styles.header}>
            <TouchableOpacity
              style={{
                width: Layouts.OPEN_HOUSE_EXIT_AVARTA_SIZE,
                height: Layouts.OPEN_HOUSE_EXIT_AVARTA_SIZE,
                margin: Layouts.OPEN_HOUSE_EXIT_AVARTA_MARGIN,
              }}
              onPress={this.gobackdashboard}>
              <Image source={Images.lock} style={{
                width: Layouts.OPEN_HOUSE_EXIT_AVARTA_SIZE,
                height: Layouts.OPEN_HOUSE_EXIT_AVARTA_SIZE,
                resizeMode: 'contain'
              }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 3, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ width: '80%', backgroundColor: 'white', borderRadius: Layouts.MARGIN_NORMAL, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{
                width: '100%', marginTop: Layouts.MARGIN_NORMAL, alignItems: 'center', justifyContent: 'center'

              }}>
                <Image
                  imageStyle={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                  source={{ uri: this.props.login.account.agent_office_logo_url }}
                  style={{
                    width: Layouts.START_OPEN_ONE_LOGO_WIDTH,
                    height: Layouts.START_OPEN_ONE_LOGO_HEIGHT
                  }}
                  resizeMode={'contain'}
                />
              </View>
              <View style={{
                width: '100%', justifyContent: 'center', alignItems: 'center'

              }}>
                <Button block style={[styles.btn, {
                  width: '80%', height: Layouts.BIG_BUTTON_HEIGHT, margin: 0,
                  marginTop: Layouts.MARGIN_LARGE
                }]} onPress={() => this.signin()}>
                  <Text style={[styles.btntxtpad, { fontSize: Layouts.TEXT_FONT_SIZE_BIG, textAlign: 'center' }]}>PLEASE SIGN IN</Text>
                </Button>
              </View>
              <View style={{
                width: '100%', justifyContent: 'center', alignItems: 'center',
                margin: Layouts.MARGIN_LARGE,
              }}>
                <View style={{ width: '90%', flexDirection: 'row' }}>
                  <Text style={[styles.txtitem, { fontSize: Layouts.TEXT_FONT_SIZE_DETAIL, }]}>
                    I understand that by pressing sign-in or continue, I am agreeing with the terms and
                    conditions of Open House Marketing System.  I am also granting full permission to be
                  contacted via text, email or phone calls by {this.props.login.account.agent_first_name}{' '}
                    {this.props.login.account.agent_last_name} or any of his/her affiliates.
                       I am also granting permission to be contacted by any of Open House Marketing System
                       partners and affiliates
              </Text>
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
              <View style={[styles.textdetail, { marginLeft: Layouts.MARGIN_NORMAL }]}>
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
        </ImageBackground >
      );
    } else {
      return (
        <ImageBackground
          source={Images.siginbackgroundimage}
          style={styles.container}
          resizeMode="cover"
          onLayout={this._onLayout}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Image source={Images.lock} style={styles.lockimg} />
            </TouchableOpacity>
          </View>
          <View style={styles.formviewcontainer}>
            <View style={[styles.imgcontainer, { marginTop: 10 }]}>
              <Image
                source={{ uri: this.props.login.account.agent_office_logo_url }}
                style={styles.officelog}
              />
            </View>
            <View style={styles.imgcontainer}>
              <Button block style={styles.btn} onPress={() => this.signin()}>
                <Text style={styles.btntxt}>PLEASE SIGN IN</Text>
              </Button>
            </View>
            <View style={styles.imgcontainer}>
              <Text style={[styles.txtitem, { width: '90%' }]}>
                I understand that by pressing sign-in or continue, I am agreeing with the terms and
                    conditions of Open House Marketing System.  I am also granting full permission to be
                  contacted via text, email or phone calls by {this.props.login.account.agent_first_name}{' '}
                {this.props.login.account.agent_last_name} or any of his/her affiliates.
                   I am also granting permission to be contacted by any of Open House Marketing System
                   partners and affiliates
              </Text>
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
        </ImageBackground >
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
    right: 10,
  },
  lockbtnview: {
    width: 50,
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
    width: '80%',
    height: 250,
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    borderRadius: 5,
  },
  officelog: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#38a2c2',
    width: '90%',
    height: 60,
    margin: 10,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  btntxtpad: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  txtitem: {
    width: '100%',
    fontSize: 7,
    textAlign: 'center'
  },
  profileview: {
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
    marginLeft: 10,
  },
  textitem: {
    fontSize: 10,
    color: 'white',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setmortgageitem: Actions.setmortgageitem,
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
)(StartOpenHouseOneScreen);
