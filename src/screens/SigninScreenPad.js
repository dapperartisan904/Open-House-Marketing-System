import React, { Component } from 'react';
import * as Actions from '../store/actions';
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
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import { Button, Item, Label } from 'native-base';
import { Images, Fonts, Constants, Colors } from '@commons';
import Modal from 'react-native-modalbox';
import FastImage from 'react-native-fast-image';
import UUIDGenerator from 'react-native-uuid-generator';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';
import Layouts from '../common/Layoutsd';
import DialogInput from 'react-native-dialog-input';

import { check, PERMISSIONS, RESULTS, request, openSettings } from 'react-native-permissions';

import axios from 'axios';

const axios_instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: false,
  });

  const _keyExtractor = item => item.realtor_title;
const _keyExtractor3 = item => item.company_name;



class SigninScreen extends Component {
  static navigationOptions = {
    title: 'Back',
    header: null,
  };
  state = {
    newemail: '',
    newpassword: '',
    resetpassword: '',
    email: '',
    password: '',
    spinner: false,
    loadingtxt: '',
    navbarTitle: ['Your Account Information',
      'What Is Your Title?',
      'Who Is Your Broker?',
      'Review Your Information',],
    modalStatus: 1,
    firstname: '',
    lastname: '',
    phone: '',
    repassword: '',
    title: '',
    officename: '',
    uniqueid: '',
    officetelephone: '',
    device: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
    appid: 'com.ecaptureinc.open',
    company_logo_url: '',
    loadingtxt: 'Log In...',
    rightIcon: false,
    newtitle: '',
    newbroker: '',
    isTitleNewDialogVisible: false,
    isBrokerNewDialogVisible: false,
    createaccount: null,
    brokers: null,
  };
  constructor(props) {
    super(props);
    Orientation.lockToLandscape();
    this.Navigation = this.Navigation.bind(this);
    this.next = this.next.bind(this);
    this._addnewtitle = this._addnewtitle.bind(this);
    this.showDialog = this.showDialog.bind(this)
  }
  componentWillUnmount() {
  }
  componentWillmount() {

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

  componentDidUpdate(prevProps, prevState) {

    if (this.props.login.resetpasswordstatus === 200 && prevProps.login.resetpasswordstatus == 100) {
      this.setState({ spinner: false })
      this.showAlert();
    }
    if (this.props.login.status === 200 && prevProps.login.status === 100) {
      this.props.authupdate();
      this.setState({ spinner: true });
    }
    else if (
      this.props.login.updatedatastatus === 200 &&
      prevProps.login.updatedatastatus === 100
    ) {
      this.props.authdownloadstationlist();
    }
    else if (
      this.props.login.downloadstatus === 200 &&
      prevProps.login.downloadstatus === 100
    ) {
      this.props.authdownloadmortgage();
    }
    else if (
      this.props.login.downloadmortgagestatus === 200 &&
      prevProps.login.downloadmortgagestatus === 100
    ) {
      this.props.authdownloaddisclosure();
    }
    else if (
      this.props.login.downloaddisclosurestatus === 200 &&
      prevProps.login.downloaddisclosurestatus === 100
    ) {
      Constants.disclosureArray = this.props.login.downloaddisclosure;
      this.props.authdownloadProperties();
    }
    else if (
      this.props.login.downloadpropertiesstatus === 200 &&
      prevProps.login.downloadpropertiesstatus === 100
    ) {
      this.props.authdownloadPropertyAttende();
    }
    else if (
      this.props.login.downloadpropertiesattendestatus === 200 &&
      prevProps.login.downloadpropertiesattendestatus === 100
    ) {
      Constants.AttendeData = this.props.login.downloadpropertiesattende;
      this.props.authdownloadPropertyBrokerAttende();
    }
    else if (
      this.props.login.downloadpropertiesbrokerattendestatus === 200 &&
      prevProps.login.downloadpropertiesbrokerattendestatus === 100
    ) {
      Constants.BrokerData = this.props.login.downloadpropertiesbrokerattende;
      this.props.authdownloadEvent();
    }
    else if (
      this.props.login.downloadeventstatus === 200 &&
      prevProps.login.downloadeventstatus === 100
    ) {
      this.props.authdownloadEventAttend();
    }
    else if (
      this.props.login.downloadeventattendstatus === 200 &&
      prevProps.login.downloadeventattendstatus === 100
    ) {
      this.props.authdownloadMLSLinkAccount();
    }
    else if (
      this.props.login.downloadMLSLinkAccountstatus === 200 &&
      prevProps.login.downloadMLSLinkAccountstatus === 100
    ) {
      this.props.getproperties();
    }

    else if (
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
      (this.props.dashboard.status === 200 ||
        this.props.dashboard.status === 400) &&
      this.state.spinner === true
    ) {
      this.setState({ spinner: false });
      this.props.navigation.navigate('containerdScreen');
    }
    else if (this.props.createaccount.newaccountstatus >= 200 && prevProps.createaccount.newaccountstatus === 100 && this.state.spinner === true) {
      this.setState({ spinner: false });
      if (this.props.createaccount.newaccountstatus === 200) {
        this.setState({ spinner: false });
        setTimeout(() => {
          Alert.alert(
            'Please Login',
            'Welcome to the Open House Marketing System',
            [
              { text: 'OK', onPress: this.gosiginscreen() },
            ],
          );
        }, 100)
      }
      else if (this.props.createaccount.newaccountstatus === 500) {
        Alert.alert(
          'An account with this email address is already in our system.',
          'Error Creating Account',
        )
      }
      else {
        Alert.alert(
          'Unable to create an account at this time.',
          'Application Error',
        )
      }
    }
    if (this.props.login.status == 400 && prevProps.login.status == 100 &&
      this.state.spinner === true) {
      this.setState({ spinner: false })
    }
    if (this.props.login.status == 400 && this.state.spinner === false) {
      this.props.login.status = 10;
      // Alert.alert('Login Faild', 'Please Check Login Info');
      setTimeout(() => { Alert.alert('Error', this.props.login.errorMsg); }, 100);
    }
  }
  gosiginscreen = () => {
    this.setState({ spinner: false });
    this.refs.modalCreatAccount.close();
  }
  _orientationDidChange(orientation) {
    Orientation.lockToLandscapeLeft();
  }
  async componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
    UUIDGenerator.getRandomUUID((uuid) => {
      this.setState({ uniqueid: uuid });
    });
    let self=this;
    axios_instance
        .get(`${Constants.BASE_API_URL}/get_realtor_titles.php`)
        .then(res => {
          if (res.status === 200) {
            self.setState({createaccount : res.data});
           // self.setState({spinner: false});
          } else if (res.status !== 200) {
            self.setState({createaccount : null});
          }
        })
        .catch(error => {
            self.setState({createaccount : null});
        });
      axios_instance
        .get(`${Constants.BASE_API_URL}/get_brokers_name.php`)
        .then(res => {
          if (res.status === 200) {
            self.setState({brokers : res.data});
            self.setState({spinner: false});
          } else if (res.status !== 200) {
            self.setState({brokers : null});
          }
        })
        .catch(error => {
            self.setState({brokers : null});
        });
  }
  onLogin = () => {
    const { email, password } = this.state;
    if (email && password) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email || (email && reg.test(email) === false)) {
        Alert.alert('Please Enter A Valid Email', '');
      } else {
        this.props.loginaction(email, password);
        Constants.user_mail = email;
        Constants.user_password = password;
        // this.setState({ spinner: true });
      }
    }
    if (!email) {
      Alert.alert('', 'Please Input Email');
    } else if (!password) {
      Alert.alert('', 'Please Input Password');
    }
  };
  onCreateAccount = () => {
    this.refs.modalCreatAccount.open();
  };
  Navigation = () => {
    if (this.state.modalStatus > 1) {
      if (this.state.modalStatus == 3 || this.state.modalStatus == 4) {
        this.setState({ rightIcon: true })
      }
      else {
        this.setState({ rightIcon: false })
      }
      this.setState({ modalStatus: this.state.modalStatus - 1 })
    }
    else {
      this.refs.modalCreatAccount.close();
    }
  };
  next = () => {
    const {
      firstname,
      lastname,
      newemail,
      phone,
      newpassword,
      repassword,
    } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!firstname || firstname.length < 2) {
      Alert.alert('Please Enter A Valid First Name', '');
    } else if (!lastname || lastname.length < 2) {
      Alert.alert('Please Enter A Valid Last Name', '');
    } else if (!newemail || (newemail && reg.test(newemail) === false)) {
      Alert.alert('Please Enter A Valid Email', '');
    } else if (!phone) {
      Alert.alert('Please Enter A Valid Telephone Number', '');
    } else if (!newpassword || !repassword) {
      Alert.alert('Password do not match', '');
    } else if (newpassword.length < 6 || repassword.length < 6) {
      Alert.alert('Password is too short', '');
    } else if (newpassword !== repassword) {
      Alert.alert('Password do not match', '');
    } else {
      Constants.create_userfirstname = firstname;
      Constants.create_userlastname = lastname;
      Constants.create_useremailaddress = newemail;
      Constants.create_userephoneNumber = phone;
      Constants.create_userpassword = newpassword;
      this.props.getcreateaccountdata();
      this.setState({ modalStatus: 2 })
      this.setState({ rightIcon: true })
    }
  }
  itemClick = (item) => {
    if (item && item.realtor_title) {
      this.props.getbrokersname(item.realtor_title);
      this.setState({ title: item.realtor_title })
      this.setState({ modalStatus: 3 })
      this.setState({ rightIcon: true })
    }
    else {
      Alert.alert(
        'You must enter/select a title to continue',
        '',
      )
    }
  }
  itemClick3 = (item1) => {
    this.setState({ rightIcon: false })
    if (item1 && item1.company_name) {
      this.props.getoriginationlist(item1);
      this.setState({ officename: item1.company_name });
      this.setState({ company_logo_url: item1.company_logo_url });
      this.setState({ modalStatus: 4 })
    }
    else {
      Alert.alert(
        'You must enter a name for your company',
        '',
      )
    }
  }
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.itemClick(item)} style={styles.itemcontainer}>
        <View style={styles.itemview}>
          <View style={styles.itmeimgcontainer}>
            <View style={[styles.itemimgview]}>
              <FastImage
                style={{ width: Layouts.CRA_AVT_S * 0.7, height: Layouts.CRA_AVT_S * 0.7 }}
                source={{
                  uri: item.realtor_image_url,
                }}
                fallback
                defaultSource={Images.main_menu_technical_support}
              />
            </View>
          </View>

          <View style={styles.itemtxtview}>
            <Text style={styles.itemtxt}>{item.realtor_title}</Text>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
  _renderItem3 = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.itemClick3(item)} style={styles.itemcontainer}>
        <View style={styles.itemview}>
          <View style={styles.itmeimgcontainer}>
            <View style={{
              height: Layouts.CREATE_ACCOUNT_ITEM_SIZE * 0.7,
              width: Layouts.CREATE_ACCOUNT_ITEM_SIZE,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FastImage
                style={{ width: '100%', height: '100%', }}
                imageStyle={{ height: '100%', width: '100%' }}
                resizeMode={'contain'}
                source={{ uri: item.company_logo_url }}
                fallback
                defaultSource={Images.openhouse}
              />
            </View>
          </View>

          <View style={styles.itemtxtview}>
            <Text style={styles.itemtxt}>{item.company_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  checktypeid = (id, e) => {
  };
  _addnewtitle = () => {
    if (this.state.modalStatus == 2) {
      this.setState({ isTitleNewDialogVisible: true });
    } else {
      this.setState({ isBrokerNewDialogVisible: true });
    }

  }
  modalView = () => {
    switch (this.state.modalStatus) {
      case 1:
        return (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, margin: Layouts.MARGIN_NORMAL, backgroundColor: 'white' }}>
              <TextInput
                style={styles.txtinput}
                placeholder={'Enter Your First Name'}
                onBlur={e => this.checktypeid(0, e)}
                onChangeText={text => this.setState({ firstname: text })}
                value={this.state.firstname}
              />
              <TextInput
                onBlur={e => this.checktypeid(1, e)}
                style={styles.txtinput}
                placeholder={'Enter Your Last Name'}
                onChangeText={text => this.setState({ lastname: text })}
                value={this.state.lastname}
              />
              <TextInput
                onBlur={e => this.checktypeid(2, e)}
                style={styles.txtinput}
                keyboardType="email-address"
                placeholder={'Enter Your Email Address'}
                onChangeText={text => this.setState({ newemail: text })}
                value={this.state.newemail}
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
                    this.setState({ phone: '' });
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
                      this.setState({ phone: match });
                    }
                    if (!num1) {
                      this.setState({ phone: '' });
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
                onChangeText={text => this.setState({ newpassword: text })}
                value={this.state.newpassword}
              />
              <TextInput
                onBlur={e => this.checktypeid(5, e)}
                style={styles.txtinput}
                secureTextEntry
                placeholder={'Confirm Password'}
                onChangeText={text => this.setState({ repassword: text })}
                value={this.state.repassword}
              />
              <View style={[styles.txtrow, { marginTop: Layouts.MARGIN_LARGE, width: '100%' }]}>
                <Button block style={styles.btn} onPress={() => this.next()}>
                  <Text style={[styles.btntxt]}>Next</Text>
                </Button>
              </View>
            </View>
          </View>
        )
        break;
      case 2:
        return (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
              data={(this.state.createaccount)}
              numColumns={2}
              keyExtractor={_keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
        )
        break;
      case 3:
        return (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
              data={(this.state.brokers)}
              numColumns={2}
              keyExtractor={_keyExtractor3}
              renderItem={this._renderItem3}
            />
          </View>
        )
        break;
      case 4:
        return (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, margin: Layouts.MARGIN_NORMAL }}>
              <View style={[styles.txtrow, { width: '100%' }]}>
                <Item stackedLabel style={styles.txtviewitem}>
                  <Label style={styles.txtlabel}>First Name</Label>
                  <TextInput disabled value={Constants.create_userfirstname} style={styles.txtitem} />
                </Item>
                <Item stackedLabel style={styles.txtviewitem}>
                  <Label style={styles.txtlabel}>Last Name</Label>
                  <TextInput disabled value={Constants.create_userlastname} style={styles.txtitem} />
                </Item>
                <Item stackedLabel style={styles.txtviewitem}>
                  <Label style={styles.txtlabel}>Title</Label>
                  <TextInput disabled value={this.state.title} style={styles.txtitem} />
                </Item>
                <Item stackedLabel style={styles.txtviewitem}>
                  <Label style={styles.txtlabel}>Email</Label>
                  <TextInput disabled value={Constants.create_useremailaddress} style={styles.txtitem} />
                </Item>
                <Item stackedLabel style={styles.txtviewitem}>
                  <Label style={styles.txtlabel}>Phone Number</Label>
                  <TextInput disabled value={Constants.create_userephoneNumber} style={styles.txtitem} />
                </Item>
                <Item stackedLabel style={styles.txtviewitem}>
                  <Label style={styles.txtlabel}>Broker Name</Label>
                  <TextInput disabled value={this.state.officename} style={styles.txtitem} />
                </Item>
              </View>
              <View style={[styles.txtrow, { marginTop: Layouts.MARGIN_LARGE, width: '100%' }]}>
                <Button
                  block
                  style={[styles.btn]}
                  onPress={() => this.confirm()} >
                  <Text style={styles.btntxt}>Confirm</Text>
                </Button>
              </View>
            </View>
          </View>
        )
        break;
      default:
        break;
    }
  }
  confirm = () => {
    const { firstname, lastname, phone, officetelephone, title, email, uniqueid, officename, password, company_logo_url, device, appid } = this.state;
    this.props.createnewaccount(
      Constants.create_userfirstname,
      Constants.create_userlastname,
      Constants.create_userephoneNumber,
      officetelephone,
      title,
      Constants.create_useremailaddress,
      uniqueid,
      officename,
      '0',
      Constants.create_userpassword,
      company_logo_url,
      'IOS',
      'com.ecaptureinc.open'
    );
    this.setState({ spinner: true });
  }
  forgotpassword = () => {
    this.refs.modalForgotPassword.open();
  };
  sendInput(txt) {
    this.showDialog(false);
    if (txt) {
      if (this.state.modalStatus == 2) {
        this.setState({ title: txt })
        this.setState({ modalStatus: 3 })
        this.setState({ rightIcon: true })
      }
      else {
        this.setState({ officename: txt });
        this.setState({ modalStatus: 4 })
        this.setState({ rightIcon: false })
      }
    }
    else {
      Alert.alert(
        'You must enter/select a title to continue',
        '',
      )
    }
  }

  resetpass = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.newemail || (this.state.newemail && reg.test(this.state.newemail) === false)) {
      Alert.alert('Please Enter A Valid Email', '');
    } else {
      this.props.resetpassword(this.state.newemail);
    }
  };

  _onLayout() {
    Orientation.lockToLandscape();
  }
  showDialog = (status) => {
    this.setState({ isTitleNewDialogVisible: status });
    this.setState({ isBrokerNewDialogVisible: status });
  }
  render() {
    return (
      <ImageBackground
        source={Images.siginbackgroundimage}
        style={styles.entirePage}
        resizeMode="cover"
        onLayout={this._onLayout}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.hbox}>
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image source={Images.openhouse} style={styles.openhouselogo} imageStyle={{ resizeMode: 'center' }} />
            </View>
            <View style={styles.titlename}>
              <Text style={styles.titletxt}>Open House</Text>
              <Text style={styles.titletxt}>Marketing System</Text>
            </View>
          </View>
        </View>
        <View style={[styles.hbox]}>
          <View style={[styles.loginContainer]}>
            <Text style={styles.loginTitle}>Login</Text>
            <View style={styles.txtrow}>
              <TextInput
                style={styles.txtinput}
                placeholder={'Email'}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </View>
            <View style={styles.txtrow}>
              <TextInput
                style={styles.txtinput}
                secureTextEntry
                placeholder={'Password'}
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </View>
            <View style={[styles.txtrow, { marginBottom: Layouts.MARGIN_NORMAL }]}>
              <TouchableOpacity
                onPress={this.forgotpassword}>
                <Text style={styles.txtbtn}>FORGOT PASSWORD?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.txtrow}>
              <Button block style={styles.btn} onPress={() => this.onLogin()}>
                <Text style={styles.btntxt}>LOGIN</Text>
              </Button>
            </View>
            <View style={styles.txtrow}>
              <Button
                block
                style={styles.btn}
                onPress={() => this.onCreateAccount()}>
                <Text style={styles.btntxt}>CREATE NEW ACCOUNT</Text>
              </Button>
            </View>
            <View style={styles.textitem}>
              <Text style={styles.text2}>
                By Login to this application, you are agreeing to our
                    </Text>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('termsScreen') }}>
                <Text style={styles.text3}>{' '}terms and conditions</Text>
              </TouchableOpacity>
              <Text style={styles.text2}>{' '}of services</Text>
            </View>
          </View>
        </View>
        <DialogInput isDialogVisible={this.state.isTitleNewDialogVisible}
          title={"Please Enter Your Title"}
          // message={"Message for DialogInput #1"}
          hintInput={"Title"}
          initValueTextInput={this.state.newtitle}
          submitText={'Set Title'}
          submitInput={(inputText) => { this.sendInput(inputText) }}
          closeDialog={() => { this.showDialog(false) }}>
        </DialogInput>

        <DialogInput isDialogVisible={this.state.isBrokerNewDialogVisible}
          title={"Please Enter Company Information"}
          hintInput={"Name"}
          initValueTextInput={this.state.newbroker}
          submitText={'Set Information'}
          submitInput={(inputText) => { this.sendInput(inputText) }}
          closeDialog={() => { this.showDialog(false) }}>
        </DialogInput>
        <Modal
          style={styles.modal}
          position={'center'}
          backdropPressToClose={false}
          ref={'modalCreatAccount'}>
          <View style={styles.modalNavBar}>
            <TouchableOpacity
              style={{
                position: 'absolute', margin: Layouts.MARGIN_NORMAL,
              }}
              onPress={() => this.Navigation()}>
              <Image
                source={Images.backicon}
                imageStyle={{ width: Layouts.CRA_TTB_BI_H, height: Layouts.CRA_TTB_BI_H }}
                style={{ width: Layouts.CRA_TTB_BI_H, height: Layouts.CRA_TTB_BI_H, }}
              />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', }}>
              <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_NORMAL, padding: Layouts.MARGIN_NORMAL }}>{this.state.navbarTitle[this.state.modalStatus - 1]}</Text>
            </View>
            {this.state.rightIcon && <TouchableOpacity
              style={{
                position: 'absolute', margin: Layouts.MARGIN_NORMAL, right: 0,
              }}
              onPress={() => this._addnewtitle()}>
              <Image
                source={Images.createicon}
                imageStyle={{ width: Layouts.CRA_TTB_BI_H, height: Layouts.CRA_TTB_BI_H }}
                style={{ width: Layouts.CRA_TTB_BI_H, height: Layouts.CRA_TTB_BI_H, }}
              />
            </TouchableOpacity>}
          </View>
          {this.modalView()}

        </Modal>

        <Modal
          style={{
            height: Layouts.FORGOTPASSWORD_MODAL_HEIGHT,
            width: Layouts.FORGOTPASSWORD_MODAL_WIDTH,
            borderRadius: Layouts.MARGIN_NORMAL,
            backgroundColor: '#f6f6f6f6',
          }}
          position={'center'}
          // backdrop={false}
          backdropPressToClose={false}
          ref={'modalForgotPassword'}>
          <View style={{
            flex: 2,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_NORMAL }}>Forgot Password</Text>
          </View>
          <View style={{
            flex: 3,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TextInput
              style={[styles.txtinput, { width: '90%' }]}
              placeholder={'Email'}
              onChangeText={text => this.setState({ newemail: text })}
              value={this.state.newemail}
            />
          </View>
          <View style={{
            flex: 3,
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <Button block style={{
              width: '40%',
              height: Layouts.SMALL_BUTTON_HEIGHT,
              backgroundColor: Colors.BUTTON_COLOR,
            }} onPress={() => { this.refs.modalForgotPassword.close() }}>
              <Text style={[styles.btntxt]}>Cancel</Text>
            </Button>
            <Button block style={{
              width: '40%',
              height: Layouts.SMALL_BUTTON_HEIGHT,
              backgroundColor: Colors.BUTTON_COLOR,
            }} onPress={() => this.resetpass()}>
              <Text style={[styles.btntxt]}>Submit</Text>
            </Button>
          </View>
        </Modal>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  itemcontainer: {
    width: '50%',
  },
  itemview: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#808080',
  },
  itmeimgcontainer: {
    marginTop: Layouts.MARGIN_NORMAL * 3,
    alignItems: 'center',
    width: '100%',
  },
  itemimgview: {
    height: Layouts.CRA_AVT_S,
    width: Layouts.CRA_AVT_S,
    borderRadius: Layouts.CRA_AVT_S,
    borderWidth: 0.5,
    borderColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',

  },
  itemtxt: {
    fontSize: Layouts.TEXT_FONT_SIZE_SMALL,
    textAlign: 'center',
  },
  itemtxtview: {
    marginTop: Layouts.MARGIN_NORMAL,
    width: '90%',
    alignItems: 'center',
    marginBottom: Layouts.MARGIN_NORMAL * 3,
  },
  itemimg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  modalNavBar: {
    height: Layouts.CRA_TTB_H,
    borderRadius: Layouts.MARGIN_NORMAL,
  },

  txtlabel: {
    fontSize: Layouts.TEXT_FONT_SIZE_SMALL,
    fontWeight: 'bold',
    color: 'red',

  },
  btnview: {
    width: '100%',
    position: 'absolute',
    bottom: 5,
  },
  btntxt: {
    color: 'white',
    fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
  },
  modal: {
    width: '50%',
    height: '80%',
    backgroundColor: '#f6f6f6f6',
    borderRadius: Layouts.MARGIN_NORMAL,
  },
  txtitem: {
    width: '100%',
    fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
    height: Layouts.BASE_INPUT_HEIGHT_NORMAL * 0.8,
  },

  entirePage: {
    flex: 1,
    flexDirection: 'row',
  },
  hbox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  container: {
    marginTop: Layouts.MARGIN_LARGE * 5,
    marginRight: Layouts.MARGIN_LARGE * 3,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Layouts.CREAT_ACCOUNT_LOGO_CONTAINER_VIEW_SIZE,
  },
  logo: {
    height: Layouts.CREAT_ACCOUNT_LOGO_CONTAINER_VIEW_SIZE,
    width: Layouts.CREAT_ACCOUNT_LOGO_CONTAINER_VIEW_SIZE,
    borderRadius: Layouts.CREAT_ACCOUNT_LOGO_CONTAINER_VIEW_SIZE / 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#808080',
    overflow: 'hidden',
  },
  openhouselogo: {
    width: Layouts.CRA_LOGO_S,
    height: Layouts.CRA_LOGO_S,
  },
  titlename: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 7,
  },
  titletxt: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Fonts.billabong,
    fontSize: 50,
    marginTop: -10,
    marginLeft: -200,
    marginRight: -200,
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    borderColor: Constants.UIColor.lightGray,
    borderWidth: 0.25,

    marginTop: Layouts.MARGIN_LARGE * 5,
    marginRight: Layouts.MARGIN_LARGE * 2,
    padding: Layouts.MARGIN_LARGE,
    flexDirection: 'column',
    // flex: 1,
    width: '75%',
  },
  loginTitle: {
    marginRight: 50,
    fontSize: Layouts.TEXT_FONT_SIZE_TITLE,
    fontWeight: 'bold',
  },
  txtrow: {
    marginTop: Layouts.MARGIN_NORMAL,
  },
  txtinput: {
    marginBottom: Layouts.MARGIN_NORMAL,
    height: Layouts.BASE_INPUT_HEIGHT_NORMAL,
    borderColor: '#808080',
    borderRadius: Layouts.MARGIN_NORMAL / 2,
    borderWidth: 0.5,
    backgroundColor: 'white',
    paddingLeft: 15,
    fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
  },
  txtbtn: {
    fontSize: Layouts.TEXT_FONT_SIZE_SMALL,
    color: '#345f9f',
    alignSelf: 'flex-end',
  },
  btn: {
    width: '100%',
    backgroundColor: '#38a2c2',
    borderRadius: 3,
    height: Layouts.NORMAL_BUTTON_HEIGHT * 0.9,
  },
  textitem: {
    marginTop: Layouts.MARGIN_LARGE,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text1: {
  },
  text2: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL * 0.7,
  },
  text3: {
    fontSize: Layouts.TEXT_FONT_SIZE_SMALL * 0.7,
    color: 'blue',
  },
  spinnerTextStyle: {
    color: 'white',
    fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
  }
});

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


      getcreateaccountdata: Actions.getcreateaccountdata,
      initauth: Actions.initauth,
      getbrokersname: Actions.getbrokersname,
      getoriginationlist: Actions.getoriginationlist,
      createnewaccount: Actions.createnewaccount,


      getproperties: Actions.getproperties,
      getevent: Actions.getevent,
      resetpassword: Actions.resetpassword,
    },
    dispatch,
  );
}

function mapStateToProps({ login, createaccount, dashboard }) {
  return {
    dashboard: dashboard,
    login: login,
    createaccount: createaccount,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SigninScreen);
