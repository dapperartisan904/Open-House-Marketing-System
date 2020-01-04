import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
// import { RNCamera } from 'react-native-camera'
import * as Actions from '../store/actions';
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
} from 'react-native';
import { Button } from 'native-base';
import { Images, Fonts } from '@commons';
import Orientation from 'react-native-orientation'

import { check, PERMISSIONS, RESULTS, request, openSettings } from 'react-native-permissions';
class SigninScreen extends Component {
  static navigationOptions = {
    title: 'Back',
    header: null,
  };
  state = {
    username: '',
    email: '',
    // password: 'developer@123',
    password: '',
  };
  constructor(props) {
    super(props);
    Orientation.lockToPortrait();
  }
  onLogin = () => {
    this.props.navigation.navigate('login');
  };
  onCreateAccount = () => {
    this.props.navigation.navigate('creataccount');
  };
  _onLayout = event => {
    Orientation.lockToPortrait();
  }
  async componentDidMount() {
    const cameraStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    const photoStaturs = await request(PERMISSIONS.IOS.CAMERA);


    check(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('***********');
          console.log('UNAVAILABLE');
          console.log('***********');
          break;
        case RESULTS.DENIED:
          console.log('***********');
          console.log('DENIED');
          console.log('***********');
          openSettings().catch(() => console.warn('can not open settings'));
          break;
        case RESULTS.GRANTED:
          console.log('***********');
          console.log('GRANTED');
          console.log('***********');
          break;
        case RESULTS.BLOCKED:
          console.log('***********');
          console.log('BLOCKED');
          console.log('***********');
          openSettings().catch(() => console.warn('can not open settings'));
          break;

      }
    }).catch(error => {
      console.log(error);
    })

    check(PERMISSIONS.IOS.CAMERA).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('***********');
          console.log('UNAVAILABLE');
          console.log('***********');
          break;
        case RESULTS.DENIED:
          console.log('***********');
          console.log('DENIED');
          console.log('***********');
          openSettings().catch(() => console.warn('can not open settings'));
          break;
        case RESULTS.GRANTED:
          console.log('***********');
          console.log('GRANTED');
          console.log('***********');
          break;
        case RESULTS.BLOCKED:
          console.log('***********');
          console.log('BLOCKED');
          console.log('***********');
          openSettings().catch(() => console.warn('can not open settings'));
          break;

      }
    }).catch(error => {
      console.log(error);
    })

  }
  render() {
    return (
      <ImageBackground
        source={Images.siginbackgroundimage}
        style={{ flex: 1 }}
        resizeMode="cover"
        onLayout={this._onLayout}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={Images.openhouse} style={styles.openhouselogo} />
          </View>
          <View style={styles.titlename}>
            <Text style={styles.titletxt}>Open House</Text>
            <Text style={styles.titletxt}>Marketing System</Text>
          </View>
          <View style={styles.btnview}>
            <View style={styles.btnrow}>
              <Button block style={styles.btn} onPress={() => this.onLogin()}>
                <Text style={styles.btntxt}>LOGIN</Text>
              </Button>
            </View>
            <View style={styles.btnrow}>
              <Button
                block
                style={styles.btn}
                onPress={() => this.onCreateAccount()}>
                <Text style={styles.btntxt}>CREATE NEW ACCOUNT</Text>
              </Button>
            </View>
            <View style={styles.btnrow}>
              <View style={styles.textitem}>
                <View style={styles.text1}>
                  <Text style={styles.text2}>
                    By Signing in, you are agreeing to our
                  </Text>
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('termsScreen') }}>
                    <Text style={styles.text3}>{' '}terms and conditions</Text>
                  </TouchableOpacity>
                  <Text style={styles.text2}>{' '}of our services</Text>
                </View>
              </View>
            </View>
          </View>
          {/* <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            defaultTouchToFocus
            mirrorImage={false}
            style={{ width: 0, height: 0 }}
          /> */}
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  logo: {
    flexDirection: 'row',
    height: 140,
    width: 140,
    marginTop: 25,
    borderRadius: 70,
    top: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 0.2,
    borderStyle: 'solid',
    borderColor: '#f6f6f6'
  },
  openhouselogo: {
    width: 110,
    height: 110,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titlename: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 40,
  },
  titletxt: {
    width: '70%',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Fonts.billabong,
    fontSize: 45,
    marginTop: -7,
  },
  btnview: {
    width: '100%',
    position: 'absolute',
    bottom: 5,
  },
  btnrow: {},
  btn: {
    backgroundColor: '#38a2c2',
    height: 55,
    margin: 5,
  },
  btntxt: {
    fontWeight: 'normal',
    color: 'white',
    fontSize: 16,
  },
  text1: {
    fontSize: 8,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text2: {
    fontSize: 8,
    textAlign: 'center',
  },
  text3: {
    fontSize: 8,
    textAlign: 'center',
    color: 'blue',
  },
  textitem: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ login }) {
  return {
    login: login,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninScreen);
