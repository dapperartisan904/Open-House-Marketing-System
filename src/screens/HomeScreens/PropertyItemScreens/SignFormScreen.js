import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import * as Actions from '../../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import RNFetchBlob from 'rn-fetch-blob';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Orientation from 'react-native-orientation'
import {
  Button,
} from 'native-base';
import { Images, Fonts, Constants, Layouts } from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';
import SignatureCapture from 'react-native-signature-capture';
class SignFormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueid: '',
      spinner: false,
      dragflag: false,
      filepath: null,
    };
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    this._onDragEvent = this._onDragEvent.bind(this);
    this._onSaveEvent = this._onSaveEvent.bind(this);
    this.post = this.post.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }
  componentDidMount() {

    UUIDGenerator.getRandomUUID(uuid => {
      this.setState({ uniqueid: uuid });
    });
  }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 264) {
      if (this.state.dragflag === true) {
        let testdata = this.props.dashboard.resultData
        if (Constants.postflag === 1) {
          // this.setState({ spinner: false });
          // this.props.navigation.navigate('thankPropertyScreen');
          // Constants.postflag = 0;
          this.uploadPhoto(testdata);
          // Constants.postflag = 0;
        }
        // this.uploadPhoto(testdata);
      } else {
        if (Constants.postflag === 1) {
          this.setState({ spinner: false });
          this.props.navigation.navigate('thankPropertyScreen');
          Constants.postflag = 0;
        }
      }
      // if (this.state.dragflag === false) {
      //   this.props.navigation.navigate('thankPropertyScreen');
      // } else {
      //   let data = this.props.dashboard.resultData;
      //   this.requestCameraPermission(data);
      // }
    }
  }
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };
  goskip = () => {
    this.post();
  };
  clearbtn = () => { };
  okbtn = () => { };
  saveSign() {
    this.refs['sign'].saveImage();
  }

  resetSign() {
    this.refs['sign'].resetImage();
  }
  uploadPhoto(result) {
    // this.setState({ spinner: false });
    let filename = result[0].attendee_rec_num + '.png';
    let data = new FormData();
    // Constants.postflag = 0

    // alert(filename);
    // this.setState({ spinner: false });
    data.append('filetoupload', {
      uri: Constants.signfilePath,
      name: filename,
      type: 'image/png',
    });
    let Url = `${Constants.BASE_API_URL}/imageupload.php`;
    data.append('objectid', result[0].attendee_rec_num);
    data.append('phototype', 's');
    //alert(Url);
    fetch(Url, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: data,
    })
      .then(res => res.json())
      .then(res => {
        if (Constants.postflag === 1) {
          Constants.postflag = 0
          this.setState({ spinner: false });
          console.log('##########################')
          console.log(res[0].photourl);
          console.log('#################################')
          this.props.navigation.navigate('thankPropertyScreen');
          //   alert(res[0].uploaded);
        }

      })
      .done();
  }

  _onSaveEvent(result) {
    // alert('saved');
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    // console.log(result);
    this.requestCameraPermission(result.encoded);
  }
  async  requestCameraPermission(csvString) {
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    //   );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/sign.png`;
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'base64')
      .then(() => {
        // this.setState({ attendeurl: ('file://'+pathToWrite) });
        // alert('success');
        // let options = {
        //     type: 'image/png',
        //     url: 'file://' + pathToWrite ,
        //     social: Share.Social.EMAIL,
        //     email: Constants.user_mail,
        //   }
        //   Share.open(options);
        Constants.signfilePath = pathToWrite;
        // Alert.alert(pathToWrite);
        this.post();
      })
      .catch(error => console.error(error));
    //   } else {
    //   }
    // } catch (err) {
    //   console.warn(err);
    // }
  }
  post() {
    let data = {
      propertyrecordnum: this.props.dashboard.selectedproperty
        .property_record_num,
      accountnum: this.props.login.account.account_num,
      advertisingid: this.props.login.account.advertising_id,
      uniqueid: this.state.uniqueid,
    };
    Constants.postflag = 1;
    this.setState({ spinner: true });
    this.props.postData(data);
  }

  _onDragEvent() {
    this.setState({ dragflag: true });
    // This callback will be called when the user enters signature
    // console.log('dragged');
  }
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
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Synchronizing Data...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.header}>
            <TouchableOpacity
              onPress={this.gobackdashboard}
              style={{ width: '50%' }}>
              <Text
                style={[styles.backtxt, { fontSize: Layouts.TEXT_FONT_SIZE_NORMAL, textAlign: 'left', marginLeft: '5%' }]}>
                Back
          </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goskip} style={{ width: '50%' }}>
              <Text
                style={[styles.backtxt, { fontSize: Layouts.TEXT_FONT_SIZE_NORMAL, textAlign: 'right', marginRight: '5%' }]}>
                Skip
          </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: Layouts.MARGIN_NORMAL * 4, alignSelf: 'center' }}>
            <Text style={[styles.backtxt, { fontSize: Layouts.TEXT_FONT_SIZE_BIG }]}>Signature Required</Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              flex: 6,
              marginTop: Layouts.MARGIN_NORMAL,
              width: '90%',
              borderColor: '#808080',
              borderWidth: 1,
              borderStyle: 'solid',
            }}>
            <SignatureCapture
              style={{
                marginBottom: Layouts.MARGIN_NORMAL,
                flex: 1,
                borderColor: '#808080',
                borderWidth: 1,
                borderStyle: 'solid',
              }}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={'landscape'}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: '5%',
              justifyContent: 'space-between',
            }}>
            <Button
              style={[styles.buttonStyle, { marginRight: Layouts.MARGIN_NORMAL, height: Layouts.BIG_BUTTON_HEIGHT, marginBottom: Layouts.MARGIN_NORMAL, }]}
              onPress={() => {
                this.resetSign();
              }}>
              <Text style={{ color: '#ffffff', fontSize: Layouts.TEXT_FONT_SIZE_BIG, textAlign: 'center' }}>
                CLEAR
          </Text>
            </Button>
            <Button
              style={[styles.buttonStyle, { marginLeft: Layouts.MARGIN_NORMAL, height: Layouts.BIG_BUTTON_HEIGHT, marginBottom: Layouts.MARGIN_NORMAL, }]}
              onPress={() => {
                this.saveSign();
              }}>
              <Text style={{ color: '#ffffff', fontSize: Layouts.TEXT_FONT_SIZE_BIG, textAlign: 'center' }}>
                OK
          </Text>
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Synchronizing Data...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.header}>
            <TouchableOpacity
              onPress={this.gobackdashboard}
              style={{ width: '50%' }}>
              <Text
                style={[styles.backtxt, { textAlign: 'left', marginLeft: '5%' }]}>
                Back
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goskip} style={{ width: '50%' }}>
              <Text
                style={[styles.backtxt, { textAlign: 'right', marginRight: '5%' }]}>
                Skip
            </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 30, alignSelf: 'center' }}>
            <Text style={styles.backtxt}>Signature Required</Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              flex: 6,
              marginTop: 10,
              width: '90%',
            }}>
            <SignatureCapture
              style={{
                flex: 1,
                borderColor: '#ffffff',
                borderWidth: 0.5,
                borderStyle: 'solid',
              }}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={'portrait'}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: '5%',
              justifyContent: 'space-between',
            }}>
            <Button
              style={[styles.buttonStyle, { marginRight: 10 }]}
              onPress={() => {
                this.resetSign();
              }}>
              <Text style={{ color: '#ffffff', fontSize: 19, textAlign: 'center' }}>
                CLEAR
            </Text>
            </Button>
            <Button
              style={[styles.buttonStyle, { marginLeft: 10 }]}
              onPress={() => {
                this.saveSign();
              }}>
              <Text style={{ color: '#ffffff', fontSize: 19, textAlign: 'center' }}>
                OK
            </Text>
            </Button>
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
  },
  bottombtn: {
    width: '36%',
    backgroundColor: '#',
    color: '#ffffff',
    fontSize: 19,
    borderRadius: 5,
    height: 40,
  },
  skipbtnview: {
    width: 70,
    height: 50,
    marginTop: 25,
    marginRight: 10,
  },
  backtxt: {
    fontFamily: Fonts.bodonitalic,
    fontSize: 18,

    //
  },
  buttonStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#39A2C1',
    width: '35%',
    justifyContent: 'center',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      postData: Actions.postData,

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
)(SignFormScreen);
