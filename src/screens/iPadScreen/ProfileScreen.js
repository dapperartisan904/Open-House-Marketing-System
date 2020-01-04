import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import ImageResizer from 'react-native-image-resizer';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import { Button, Icon } from 'native-base';
import { Images, Fonts, Constants } from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import { SearchBar, Input, Avatar } from 'react-native-elements';
import { ProgressCircle, CircleSnail } from '@components';
import Modal from 'react-native-modalbox';
import { white, red } from 'ansi-colors';
import { AuthService } from '@services';
import ImagePicker from 'react-native-image-picker';
import Colors from '../../common/Colors';
const _keyExtractor = item => item.uniqueid;

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_info: {},
      flag: false,
      set_flag: false,
      key_flag: false,
      photo_url: '',
      first_name: '',
      last_name: '',
      agent_title: '',
      email_adress: '',
      cell_number: '',
      broker_name: '',
      spinner: false,
    };
    this.saveprofile = this.saveprofile.bind(this);
    this.LoadProfile = this.LoadProfile.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 255 && prevProps.dashboard.status === 100) {
      this.setState({ spinner: false });
      this.props.dashboardstatuschange(9);
    }
  }
  async LoadProfile() {
    var info = await AuthService.profile_login(
      Constants.user_mail,
      Constants.user_password,
    );
    var data = info[0];
    if (info[0].agent_photo_url === null) {
      this.setState({ flag: true });
    }
    this.setState({ photo_url: null });
    if (this.state.set_flag == false) {
      this.setState({
        profile_info: data,
        photo_url: data.agent_photo_url,
        first_name: data.agent_first_name,
        last_name: data.agent_last_name,
        agent_title: data.agent_title,
        email_adress: data.agent_email,
        cell_number: data.agent_cellphone,
        broker_name: data.agent_office_name,
      });
      Constants.first_name = data.agent_first_name;
      Constants.last_name = data.agent_last_name;
      Constants.agent_title = data.agent_title;
      Constants.email_adress = data.agent_email;
      Constants.cell_number = data.agent_cellphone;
      Constants.broker_name = data.agent_office_name;
    }
  }
  async componentDidMount() {
    this.LoadProfile();
    if (this.state.photo_url == null) {
      this.setState({ photo_url: Images.avataricon })
    }
  }

  componentWillUnmount() { }

  saveprofile() {
    this.setState({ set_flag: true });
    this.setState({ spinner: true });
    Constants.updateFlag = 1;
    this.props.update_profile(
      Constants.first_name,
      Constants.last_name,
      Constants.cell_number,
      Constants.broker_name,
      Constants.agent_title,
    );
    this.setState({ spinner: true })
  }
  changePhoto = () => {
    var options = {
      title: 'Select Image',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
      // alert(response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
        // alert('User cancelled image picker');
      } else if (response.error) {
        // alert('error1');
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
        // alert('error2');
      } else {
        ImageResizer.createResizedImage(response.uri, 50, 50, 'JPEG', 80).then((res) => {
          this.setState({ spinner: true });
          // this.setState({dashboard: null});
          // alert('error3');
          // let source = response;
          // You can also display the image using data:
          var source = { uri: response.uri };
          // alert(source.uri);
          this.setState({
            filePath: source,
          });
          // alert(source.uri);
          let filename = this.state.profile_info.account_num + '.jpg';
          let body = new FormData();
          body.append('filetoupload', {
            uri:
              Platform.OS === 'android'
                ? source.uri
                : source.uri.replace('file://', ''),
            name: filename,
            type: 'image/jpg',
          });
          let Url = `${Constants.accounturl}/imageupload.php`;
          body.append('objectid', this.state.profile_info.account_num);
          body.append('phototype', 'a');

          fetch(Url, {
            method: 'POST',
            headers: { 'Content-Type': 'multiaprt/form-data' },
            body: body,
          })
            .then(res => {
              // alert(res);
              this.setState({ spinner: false });
              this.LoadProfile();
              // this.setState({photo_url: null});
              // this.props.profile_login();
            })
            .done();
        })
      }
    });
  };
  render() {

    return (
      <View style={styles.profileInfoContainer}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Updating Profile Information'}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={styles.title}>Update Your Account</Text>
        <View style={styles.contentblock}>
          <View>
            <TouchableOpacity
              onPress={() => this.changePhoto()}>
              <Avatar
                size={75}
                containerStyle={{ borderColor: '#808080', borderWidth: 0.2 }}
                rounded source={{ uri: `${this.state.photo_url}?${new Date()}` }} />

            </TouchableOpacity>
          </View>
          <View style={styles.rightblock}>
            <Text style={styles.field_txt}>First Name</Text>
            <TextInput style={styles.inputText}
              value={this.state.first_name}
              onChangeText={first_name => {
                this.setState({ first_name });
                Constants.first_name = first_name;
              }}></TextInput>
            <Text style={styles.field_txt}>Last Name</Text>
            <TextInput style={styles.inputText}
              value={this.state.last_name}
              onChangeText={last_name => {
                this.setState({ last_name });
                Constants.last_name = last_name;
              }}></TextInput>
            <Text style={styles.field_txt}>Title</Text>
            <TextInput style={styles.inputText}
              value={this.state.agent_title}
              onChangeText={agent_title => {
                this.setState({ agent_title });
                Constants.agent_title = agent_title;
              }}></TextInput>
            <Text style={styles.field_txt}>Email Address</Text>
            <TextInput style={styles.inputText}
              value={this.state.email_adress}
              onChangeText={email_adress => {
                this.setState({ email_adress });
                Constants.email_adress = email_adress;
              }}></TextInput>
            <Text style={styles.field_txt}>Cellphone Number</Text>
            <TextInput style={styles.inputText}
              value={this.state.cell_number}
              onChangeText={cell_number => {
                this.setState({ cell_number });
                Constants.cell_number = cell_number;
              }}></TextInput>
            <Text style={styles.field_txt}>Office or Brokers Name</Text>
            <TextInput style={styles.inputText}
              value={this.state.broker_name}
              onChangeText={broker_name => {
                this.setState({ broker_name });
                Constants.broker_name = broker_name;
              }}></TextInput>
            <View style={[styles.txtrow]}>
              <Button block style={styles.txtviewitem} onPress={() => this.saveprofile()}>
                <Text style={[styles.btntxt]}>SAVE</Text>
              </Button>
              <Button block style={styles.txtviewitem} onPress={() => { this.props.dashboardstatuschange(9); }}>
                <Text style={[styles.btntxt]}>CANCEL</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  btn: {
    backgroundColor: '#38a2c2',
    height: 60,
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15,
    width: 150,
  },
  field_txt: {
    marginTop: 5,
    fontSize: Constants.TEXT_FONT_SIZE_SMALL,
    fontWeight: 'normal',
    marginLeft: 8,
    color: 'red',
  },
  Img_position: {
    marginTop: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  inputText: {
    borderWidth: 0.5,
    borderColor: 'white',
    fontSize: Constants.TEXT_FONT_SIZE_NORMAL,
    borderBottomColor: '#808080',
    height: Constants.INPUTTEXT_HEIGHT_BIG,
    width: '95%',
    alignSelf: 'center'
  },

  profileInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d8d8d8',
    borderWidth: 0.5,
    borderRadius: 5,
    margin: 16,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  title: {
    fontSize: Constants.TEXT_FONT_SIZE_TITLE,
    marginBottom: 10,
  },
  contentblock: {
    marginTop: 10,
    flexDirection: 'row',
  },
  profileImageView: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  rightblock: {
    flex: 1,
    marginLeft: 15,
  },
  txtrow: {
    marginTop: 10,
    marginLeft: -10,
    marginRight: -10,
    flexDirection: 'row',
  },
  txtviewitem: {
    backgroundColor: Colors.BUTTON_COLOR,
    width: Constants.SMALL_BUTTON_WIDTH,
    height: Constants.SMALL_BUTTON_HEIGHT,
    marginLeft: 10,
    marginRight: 10,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: Constants.BUTTON_FONT_SIZE_SMALL,
  },
  spaceRight: {
    marginRight: 10,
  },
  mlsOrgNameInput: {
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logout,
      setpropertyitem: Actions.setpropertyitem,
      sethousehandletype: Actions.sethousehandletype,
      update_profile: Actions.updateprofile,
      profile_login: Actions.profile_login,
      dashboardstatuschange: Actions.dashboardstatuschange,
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
)(ProfileScreen);
