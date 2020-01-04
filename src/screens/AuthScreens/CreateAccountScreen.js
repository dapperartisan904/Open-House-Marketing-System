import React, {Component} from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import {bindActionCreators} from 'redux';
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
import {Button} from 'native-base';
import {Images, Fonts, Constants} from '@commons';

import Spinner from 'react-native-loading-spinner-overlay';

let focusid = 0;
class CreateAccountScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Your Account Information',
      headerTitleStyle: {
        fontSize: 16,
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
    firstname: '',
    lastname: '',
    phone: '',
    phone1: '',
    password: '',
    repassword: '',
    spinner: false,
    loadingtxt: '',
    anim: new Animated.Value(0),
    isKeyboardVisible: false,
    typeid: 0,
    fromrange: 0,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.initauth();
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({android: 'keyboardDidShow', ios: 'keyboardWillShow'}),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({android: 'keyboardDidHide', ios: 'keyboardWillHide'}),
      this._keyboardDidHide.bind(this),
    );
    
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({isKeyboardVisible: true, fromrange: 0});
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({isKeyboardVisible: false, fromrange: 0});
  }
  fadeIn(delay) {
    const {anim, typeid, fromrange} = this.state;
    let from = 1;
    from = fromrange;
    return {
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    // if (this.state.loadingtxt !== this.props.createaccount.loadingtxt) {
    //   this.setState({loadingtxt: this.props.createaccount.loadingtxt});
    // }
    // if (
    //   this.state.spinner === false &&
    //   this.props.createaccount.realtortitlesstatus === 100
    // ) {
    //   this.setState({spinner: true});
    // }
    // if (
    //   this.props.createaccount.realtortitlesstatus >= 200 &&
    //   this.state.spinner === true &&
    //   prevProps.createaccount.realtortitlesstatus === 100
    // ) {
    // //   this.setState({spinner: false});
    //   if (this.props.createaccount.realtortitlesstatus === 200 && prevProps.createaccount.realtortitlesstatus === 100) {
    //     console.log("&&&&&&&&&&&&&&&&&&&&&  1")
    //     this.props.navigation.navigate('creataccounttwo');
    //   }
    // }
  }

  gonext = () => {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      repassword,
    } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!firstname || firstname.length < 2) {
      Alert.alert('Please Enter A Valid First Name', '');
    } else if (!lastname || lastname.length < 2) {
      Alert.alert('Please Enter A Valid Last Name', '');
    } else if (!email || (email && reg.test(email) === false)) {
      Alert.alert('Please Enter A Valid Email', '');
    } else if (!phone) {
      Alert.alert('Please Enter A Valid Telephone Number', '');
    } else if (!password || !repassword) {
      Alert.alert('Password do not match', '');
    } else if (password.length < 6 || repassword.length < 6) {
      Alert.alert('Password is too short', '');
    } else if (password !== repassword) {
      Alert.alert('Password do not match', '');
    } else {
      let data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
      };
      Constants.create_userfirstname = firstname;
      Constants.create_userlastname = lastname;
      Constants.create_useremailaddress = email;
      Constants.create_userephoneNumber = phone;
      Constants.create_userpassword = password;

      this.props.navigation.navigate('creataccounttwo');
      // this.props.getcreateaccountdata();
    }
  };
  checktypeid = (id, e) => {
    // this.forceUpdate();
    // if(id ){
    //     let range = (-50)*id;
    //     this.setState({typeid: id});
    //     this.setState({fromrange: range});
    // }
    // else {
    //     this.setState({typeid: 0});
    //     this.setState({fromrange: 0});
    // }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Spinner
          visible={this.props.lodingstatus}
          textContent={this.props.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <Animated.ScrollView
          style={[styles.container, styles.container, this.fadeIn(700)]}>
          {/*<View style={styles.container}>*/}
          <View style={styles.txtrow}>
            <TextInput
              style={styles.txtinput}
              placeholder={'Enter Your First Name'}
              onBlur={e => this.checktypeid(0, e)}
              onChangeText={text => this.setState({firstname: text})}
              value={this.state.firstname}
            />
            <TextInput
              onBlur={e => this.checktypeid(1, e)}
              style={styles.txtinput}
              placeholder={'Enter Your Last Name'}
              onChangeText={text => this.setState({lastname: text})}
              value={this.state.lastname}
            />
            <TextInput
              onBlur={e => this.checktypeid(2, e)}
              style={styles.txtinput}
              keyboardType="email-address"
              placeholder={'Enter Your Email Address'}
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
            />
            <TextInput
              onBlur={e => this.checktypeid(3, e)}
              style={styles.txtinput}
              placeholder={'Enter Your Cell Phone Number'}
              onChangeText={text => {
                let num1 = text.replace(/\D+/g, '');
                let num2 = this.state.phone.replace(/\D+/g, '');
                let num = num1.replace('.', '');
                if (!text) {
                  this.setState({phone: ''});
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
                    this.setState({phone: match});
                  }
                  if (!num1) {
                    this.setState({phone: ''});
                  }
                }
              }}
              value={this.state.phone}
              keyboardType={'numeric'}
            />
            <TextInput
              onBlur={e => this.checktypeid(4, e)}
              style={styles.txtinput}
              secureTextEntry
              placeholder={'Enter Your Password'}
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
            />
            <TextInput
              onBlur={e => this.checktypeid(5, e)}
              style={styles.txtinput}
              secureTextEntry
              placeholder={'Confirm Password'}
              onChangeText={text => this.setState({repassword: text})}
              value={this.state.repassword}
            />
          </View>

          <View style={styles.txtrow}>
            <Button block style={styles.btn} onPress={() => this.gonext()}>
              <Text style={styles.btntxt}>Next</Text>
            </Button>
          </View>
          {/*</View>*/}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  txtinput: {
    height: 50,
    borderColor: '#CDCECD',
    borderRadius: 5,
    borderWidth: 0.2,
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
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
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getcreateaccountdata: Actions.getcreateaccountdata,
      initauth: Actions.initauth,
    },
    dispatch,
  );
}

function mapStateToProps({login, createaccount}) {
  return {
    login: login,
    createaccount: createaccount,
    lodingstatus:createaccount.lodingstatus,
    loadingtxt:createaccount.loadingtxt,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountScreen);
