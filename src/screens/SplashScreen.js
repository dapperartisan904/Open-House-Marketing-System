import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import { Button } from 'native-base';
import { Images, Fonts, Constants } from '@commons';
// import {AsnycStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';

class SplashScreen extends Component {
  static navigationOptions = {
    title: 'SignIn',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      // password: 'developer@123',
      password: '',
      spinner: false,
      loadingtxt: '',
    };
  }
  onLogin = () => {
    this.props.navigation.navigate('login');
  };
  storeData = async () => {
    try {
      for (let i = 0; i < 12; i++) {
        if (i === 7 || i === 11) {
          Constants.checkArray.push(1);
        } else {
          Constants.checkArray.push(0);
        }
      }

      await AsyncStorage.setItem(
        'checkarray',
        JSON.stringify(Constants.checkArray),
      );
    } catch (e) {
      // saving error
    }
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('checkarray');
      if (value !== null) {
        Constants.checkArray = JSON.parse(value);
        // value previously stored
      } else {
        this.storeData();
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount() {
    this.getData();

    const { height, width } = Dimensions.get('window');
    Constants.WINDOW_WIDTH = height > width ? width : height;
    Constants.WINDOW_HEIGHT = height > width ? height : width;
    const aspectRatio = Constants.WINDOW_HEIGHT / Constants.WINDOW_WIDTH;
    if (aspectRatio > 1.6) {
      Constants.device_Pad = false;
    } else {
      Constants.device_Pad = true;
    }

    if (
      this.props.login.account &&
      this.props.login.account !== null &&
      this.props.login.account.account_password &&
      this.props.login.account.agent_email
    ) {
      Constants.user_mail = this.props.login.account.agent_email;
      Constants.user_password = this.props.login.account.account_password;
      this.props.loginaction(
        this.props.login.account.agent_email,
        this.props.login.account.account_password,
      );
    } else {
      if (Constants.device_Pad) {
        this.props.navigation.navigate('signinScreenPad');
      }
      else {
        this.props.navigation.navigate('signinScreen');
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.loadingtxt !== this.props.login.loadingtxt &&
      this.props.login.loadingtxt !== ''
    ) {
      this.setState({ loadingtxt: this.props.login.loadingtxt });
    }
    if (this.state.spinner === false && this.props.login.status === 100) {
      this.setState({ spinner: true });
    }
    if (this.props.login.status === 200 && prevProps.login.status === 100) {
      this.props.authupdate();
    }
    if (
      this.props.login.updatedatastatus === 200 &&
      prevProps.login.updatedatastatus === 100
    ) {
      this.props.authdownloadstationlist();
    }
    if (
      this.props.login.downloadstatus === 200 &&
      prevProps.login.downloadstatus === 100
    ) {
      this.props.authdownloadmortgage();
    }
    if (
      this.props.login.downloadmortgagestatus === 200 &&
      prevProps.login.downloadmortgagestatus === 100
    ) {
      this.props.authdownloaddisclosure();
    }
    if (
      this.props.login.downloaddisclosurestatus === 200 &&
      prevProps.login.downloaddisclosurestatus === 100
    ) {
      // alert('dd');
      Constants.disclosureArray = this.props.login.downloaddisclosure;
      this.props.authdownloadProperties();
    }
    if (
      this.props.login.downloadpropertiesstatus === 200 &&
      prevProps.login.downloadpropertiesstatus === 100
    ) {
      this.props.authdownloadPropertyAttende();
    }
    if (
      this.props.login.downloadpropertiesattendestatus === 200 &&
      prevProps.login.downloadpropertiesattendestatus === 100
    ) {
      Constants.AttendeData = this.props.login.downloadpropertiesattende;
      this.props.authdownloadPropertyBrokerAttende();
    }
    if (
      this.props.login.downloadpropertiesbrokerattendestatus === 200 &&
      prevProps.login.downloadpropertiesbrokerattendestatus === 100
    ) {
      Constants.BrokerData = this.props.login.downloadpropertiesbrokerattende;
      this.props.authdownloadEvent();
    }
    if (
      this.props.login.downloadeventstatus === 200 &&
      prevProps.login.downloadeventstatus === 100
    ) {
      this.props.authdownloadEventAttend();
    }
    if (
      this.props.login.downloadeventattendstatus === 200 &&
      prevProps.login.downloadeventattendstatus === 100
    ) {
      this.props.authdownloadMLSLinkAccount();
    }
    if (
      (this.props.login.updatedatastatus === 200 ||
        this.props.login.updatedatastatus === 400) &&
      (this.props.login.status === 200 || this.props.login.status === 400) &&
      (this.props.login.downloadstatus === 200 ||
        this.props.login.downloadstatus === 400) &&
      (this.props.login.downloadmortgagestatus === 200 ||
        this.props.login.downloadmortgagestatus === 400) &&
      (this.props.login.downloaddisclosurestatus === 200 ||
        this.props.login.downloaddisclosurestatus === 400) &&
      (this.props.login.downloadpropertiesstatus === 200 ||
        this.props.login.downloadpropertiesstatus === 400) &&
      (this.props.login.downloadpropertiesattendestatus === 200 ||
        this.props.login.downloadpropertiesattendestatus === 400) &&
      (this.props.login.downloadpropertiesbrokerattendestatus === 200 ||
        this.props.login.downloadpropertiesbrokerattendestatus === 400) &&
      (this.props.login.downloadeventstatus === 200 ||
        this.props.login.downloadeventstatus === 400) &&
      (this.props.login.downloadeventattendstatus === 200 ||
        this.props.login.downloadeventattendstatus === 400) &&
      (this.props.login.downloadMLSLinkAccountstatus === 200 ||
        this.props.login.downloadMLSLinkAccountstatus === 400) &&
      this.state.spinner === true
    ) {
      this.setState({ spinner: false });
      if (Constants.device_Pad) {
        this.props.navigation.navigate('containerdScreen');
      }
      else {
        this.props.navigation.navigate('dashboard');
      }
    }
    if (
      (this.props.login.updatedatastatus > 200 ||
        this.props.login.status > 200 ||
        this.props.login.downloadstatus > 200 ||
        this.props.login.downloadmortgagestatus > 200 ||
        this.props.login.downloaddisclosurestatus > 200 ||
        this.props.login.downloadpropertiesstatus > 200 ||
        this.props.login.downloadpropertiesattendestatus > 200 ||
        this.props.login.downloadpropertiesbrokerattendestatus > 200 ||
        this.props.login.downloadeventstatus > 200 ||
        this.props.login.downloadeventattendstatus > 200 ||
        this.props.login.downloadMLSLinkAccountstatus > 200) &&
      this.state.spinner === true
    ) {
      this.setState({ spinner: false });
      Alert.alert('Login Faild', 'Please Check Login Info');
    }
  }
  render() {
    return (
      <ImageBackground
        source={Images.siginbackgroundimage}
        style={{ flex: 1 }}
        resizeMode="cover">
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={Images.openhouse} style={styles.openhouselogo} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // flexDirection: 'row',
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openhouselogo: {
    width: 120,
    height: 120,
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
  },
  btnview: {
    width: '100%',
    position: 'absolute',
    bottom: 5,
  },
  btnrow: {},
  btn: {
    backgroundColor: '#38a2c2',
    height: 60,
    margin: 10,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  text1: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text2: {
    fontSize: 10,
    textAlign: 'center',
  },
  text3: {
    fontSize: 10,
    textAlign: 'center',
    color: 'blue',
    paddingLeft: 5,
    paddingRight: 5,
  },
  textitem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginaction: Actions.login,
      authupdate: Actions.authupdate,
      initauth: Actions.initauth,
      authdownloadstationlist: Actions.authdownloadstationlist,
      authdownloadmortgage: Actions.authdownloadmortgage,
      authdownloaddisclosure: Actions.authdownloaddisclosure,
      authdownloadProperties: Actions.authdownloadProperties,
      authdownloadPropertyAttende: Actions.authdownloadPropertyAttende,
      authdownloadPropertyBrokerAttende:
        Actions.authdownloadPropertyBrokerAttende,
      authdownloadEvent: Actions.authdownloadEvent,
      authdownloadEventAttend: Actions.authdownloadEventAttend,
      authdownloadMLSLinkAccount: Actions.authdownloadMLSLinkAccount,
    },
    dispatch,
  );
}

function mapStateToProps({ login }) {
  return {
    login: login,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
