import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
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
} from 'react-native';
import { Button } from 'native-base';
import { Images, Fonts, Constants } from '@commons';

import Spinner from 'react-native-loading-spinner-overlay';

class ForgotPassScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Forgot Password',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
      },
      headerRight: <View />,
    };
  };
  state = {
    email: '',
    spinner: false,
    loadingtxt: '',
  };
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.login.resetpasswordstatus === 200 && prevProps.login.resetpasswordstatus == 100) {
      this.setState({ spinner: false })
      this.showAlert();
    }
  }
  componentDidMount() { }
  showAlert = () => {
    var msg = '';
    if (this.props.login.resetpassword.email_sent === false) {
      msg = 'There was an error sending the email';
    } else {
      msg =
        'Your Activation Code will be send to ' +
        this.state.email +
        ".\nPlease allow 3-5 minutes while we process your request. Don't forget to check your spam folder.";
    }
    alert(msg);
  };
  resetpass = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email || (this.state.email && reg.test(this.state.email) === false)) {
      Alert.alert('Please Enter A Valid Email', '');
    } else {
      Constants.resetflag = 1;
      this.props.resetpassword(this.state.email);
      // this.setState({ spinner: true })
    }
  };
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
          <View style={styles.txtrow}>
            <TextInput
              style={styles.txtinput}
              placeholder={'Email'}
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
          </View>

          <View style={styles.txtrow}>
            <Button block style={styles.btn} onPress={() => this.resetpass()}>
              <Text style={styles.btntxt}>Request Password</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  txtinput: {
    height: 50,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 0.2,
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 18,
  },
  txtrow: {
    marginTop: 20,
  },
  txtbtn: {
    color: '#0520F1',
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 10,
  },
  txtbtnview: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  btn: {
    backgroundColor: '#38a2c2',
    height: 60,
    marginLeft: 10,
    marginRight: 10,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetpassword: Actions.resetpassword,
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
)(ForgotPassScreen);
