import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import { Button, Icon } from 'native-base';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Moment from 'moment';
import { View, Text, Platform, TouchableOpacity, FlatList } from 'react-native';
import { Images, Fonts, Constants } from '@commons';
import Image from 'react-native-image-progress';
import { SearchBar } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import Mailer from 'react-native-mail';
import email from 'react-native-email';
// var Mailer = require('NativeModules').RNMail;
const _keyExtractor = item => item.name;
import Share from 'react-native-share';
import Orientation from 'react-native-orientation'
class LeadManagement extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Lead Management',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
      },
      headerRight: (
        <TouchableOpacity
          style={{
            marginRight: 20,
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={navigation.getParam('export')}>
          {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
          <Image
            source={Images.export}
            imageStyle={{ width: 28, height: 28 }}
            style={{ width: 28, height: 28 }}
          />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data_list: [
        { name: 'Adrienne', date: 'friday, october 12 2018' },
        { name: 'Adrienne', date: 'friday, october 12 2018' },
        { name: 'Adrienne', date: 'friday, october 12 2018' },
        { name: 'Adrienne', date: 'friday, october 12 2018' },
        { name: 'Adrienne', date: 'friday, october 12 2018' },
        { name: 'Adrienne', date: 'friday, october 12 2018' },
        { name: 'Adrienne', date: 'friday, october 12 2018' },
        { name: 'Adrienne', date: 'friday, october 12 2018' },
      ],
      spinner: false,
      loadingtxt: '',
      isDisabled: false,
      isOpen: false,
      newtitle: '',
      searchText: '',
      data_source: [],
      flag_attend: false,
      flag_broker: true,
      attendeurl: null,
      dashboard:
        this.props.dashboard && this.props.dashboard.leads
          ? this.props.dashboard.leads
          : [],
    };
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }

    this.attendees = this.attendees.bind(this);
    this.broker = this.broker.bind(this);
    this.ShowName = this.ShowName.bind(this);
    this.creatCSVFile = this.creatCSVFile.bind(this);
    // this.exportCSVFile = this.exportCSVFile.bind(this);
  }

  componentDidMount() {
    this.splitdata();
    this.props.navigation.setParams({ export: this.exportCSVFile });
    this.creatCSVFile();
  }
  splitdata() {
    if (this.state.flag_attend) {
      this.setState({ data_source: [] });
      this.setState({ data_source: this.state.dashboard.broker });
    } else {
      this.setState({ data_source: [] });
      this.setState({ data_source: this.state.dashboard.attendees });
    }

  }
  creatCSVFile() {
    const values = this.state.dashboard.attendees;
    const headerString =
      'First Name,Last Name,Agent Name,Agent PhoneNumber,PDF URL,Property Record Number\n';
    var rowstring = '';
    for (let i = 0; i < values.length; i++) {
      let data = values[i];
      let each_row =
        data.attendee_first_name +
        ',' +
        data.attendee_last_name +
        ',' +
        data.attendee_agent_fullname +
        ',' +
        data.attendee_telephone +
        ',' +
        data.attendee_pdf_url +
        ',' +
        data.property_record_num +
        '\n';
      rowstring = rowstring + each_row;
    }
    const csvString = `${headerString}${rowstring}`;
    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/lead.csv`;
    console.log('pathToWrite', pathToWrite);
    // pathToWrite /storage/emulated/0/Download/data.csv
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        this.setState({ attendeurl: pathToWrite });

      })
      .catch(error => console.error(error));
  }
  exportCSVFile = () => {
    let options = {
      type: 'text/csv',
      url: this.state.attendeurl,
      social: Share.Social.EMAIL
    }
    Share.open(options);
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemcontainer}
        onPress={() => {
          if (!this.state.flag_attend) {
            this.props.navigation.navigate('detailattendee', {
              buyer_data: item,
            });
          } else {
            this.props.navigation.navigate('detailbroker', {
              buyer_data: item,
            });
          }
        }}>
        <View style={styles.itemview}>
          <View style={styles.itmeimgcontainer}>
            {/* <View style={styles.itemimgview}> */}
            <View>
            <Avatar
                rounded
                source={Images.avataricon}
                size="medium"
                overlayContainerStyle={{ backgroundColor: '#ffffff' }}
                activeOpacity={0.7}
              />
            </View>
            <View style={styles.itemtxtview}>
              <Text style={styles.itemtxt}>{this.ShowName(item)}</Text>
              <Text style={styles.itemtxt2}>
                {this.convertStringtoDate(item.created_at)}
              </Text>
            </View>
            <View style={styles.details_show}>
              <Image
                style={styles.item_style}
                imageStyle={styles.img_style}
                source={Images.itemshowicon}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  attendees() {
    this.setState({ flag_attend: false, flag_broker: true });

    this.setState({ data_source: [] });
    this.setState({ data_source: this.state.dashboard.attendees });
  }

  broker() {
    this.setState({ flag_broker: false, flag_attend: true });

    this.setState({ data_source: this.state.dashboard.broker });

  }

  ShowName(item) {
    if (!this.state.flag_attend) {
      return item.attendee_first_name + ' ' + item.attendee_last_name;
    } else {
      return item.agent_fullname;
    }
  }
  convertStringtoDate(event_datestr) {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var std_date = Moment(event_datestr).format('YYYY-MM-DD');
    var d = new Date(std_date);
    var dayName = days[d.getDay()];
    var event_date = Moment(event_datestr).format('MMMM DD, YYYY');
    return dayName + ', ' + event_date;
  }
  SortData() {
    if (!this.state.flag_attend) {
      return this.state.data_source.sort(
        (a, b) => a.attendee_first_name > b.attendee_first_name,
      );
    } else {
      return this.state.data_source.sort(
        (a, b) => a.agent_fullname > b.agent_fullname,
      );
    }
  }
  Change_BtnStyle = flag_style => {
    if (!flag_style) {
      //   alert('styletest');
      return {
        width: '50%',
        height: 30,
        backgroundColor: '#39A2C1',
        borderRadius: 0,
        TouchableOpacity: 0,
        justifyContent: 'center',
      };
    } else {
      return {
        width: '50%',
        height: 30,
        backgroundColor: '#ffffff',
        borderRadius: 0,
        justifyContent: 'center',
      };
    }
  };
  Change_TextStyle = flag_style => {
    if (!flag_style) {
      return styles.attendee_text;
    } else {
      return styles.broker_text;
    }
  };
  //search
  search = searchText => {
    this.setState({ searchText: searchText });
    this.changesearch(searchText);
  };
  clearsearch = () => {
    this.setState({ searchText: '' });
    let leadattendees;
    if (this.state.flag_attend) {
      leadattendees = this.state.dashboard.broker;
    }
    else {
      leadattendees = this.state.dashboard.attendees;
    }
    this.setState({ data_source: leadattendees });
  };

  // dashboard:
  //         this.props.dashboard && this.props.dashboard.leads
  //           ? this.props.dashboard.leads
  //           : [],

  changesearch = (searchText) => {
    let leadattendees = [];
    let res = [];
    if (this.state.flag_attend) {
      leadattendees = this.state.dashboard.broker;

      if (!searchText || searchText === '') {
        res = leadattendees;
      } else if (leadattendees && leadattendees.length) {
        res = leadattendees.filter(
          item =>
            item.agent_fullname
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1,
        );
      }
    } else {
      leadattendees = this.state.dashboard.attendees;
      if (!searchText || searchText === '') {
        res = leadattendees;
      } else if (leadattendees && leadattendees.length) {
        res = leadattendees.filter(
          item =>
            item.attendee_first_name
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1 ||
            item.attendee_last_name
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1,
        );
      }
    }

    this.setState({ data_source: res });
  };
  //
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        {/* <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.loadingtxt}
                    textStyle={styles.spinnerTextStyle}
                /> */}
        <SearchBar
          // round={true}
          lightTheme={true}
          placeholder="Search..."
          platform={Platform.OS}
          containerStyle={styles.searchbar}
          inputContainerStyle={styles.searchbartxt}
          // showLoading={true}
          onCancel={this.clearsearch}
          onClear={this.clearsearch}
          autoCorrect={false}
          onChangeText={this.search}
          value={this.state.searchText}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 4,
            marginBottom: 4,
            borderColor: '#39A2C1',
            borderWidth: 0.2,
          }}>
          <Button
            style={this.Change_BtnStyle(this.state.flag_attend)}
            onPress={this.attendees}>
            <Text style={this.Change_TextStyle(this.state.flag_attend)}>
              Attendees
            </Text>
          </Button>
          <Button
            style={this.Change_BtnStyle(this.state.flag_broker)}
            onPress={this.broker}>
            <Text style={this.Change_TextStyle(this.state.flag_broker)}>
              Broker Open House
            </Text>
          </Button>
        </View>
        <FlatList
          data={this.SortData()}
          numColumns={1}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  item_style: {
    width: 20,
    height: 20,
  },
  img_style: {
    width: 20,
    height: 20,
  },
  details_show: {
    position: 'absolute',
    right: 15,
    top: 20,
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
  itemcontainer: {
    width: '100%',
  },
  searchbar: {
    backgroundColor: '#F4F4F4',
  },
  searchbartxt: {
    backgroundColor: 'white',
  },
  itemview: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    backgroundColor: '#ffffff',
  },
  itemimg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemimgview: {
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    // marginTop: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  itemtxtview: {
    width: '80%',
    // marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemtxt: {
    // textAlign:'center',
    // fontWeight: 'bold',
    fontSize: 14,
  },
  itemtxt2: {
    fontSize: 14,
    marginTop: 4,
  },
  itmeimgcontainer: {
    // marginBottom: 10,
    // alignItems:'center',
    width: '90%',
    flexDirection: 'row',
  },
  attendee_btn: {
    width: '50%',
    height: 30,
    backgroundColor: '#39A2C1',
    borderRadius: 0,
    justifyContent: 'center',
  },
  attendee_text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  broker_btn: {
    width: '50%',
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 0,
    justifyContent: 'center',
  },
  broker_text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#39A2C1',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // logout : Actions.logout,
      // setpropertyitem : Actions.setpropertyitem,
      // sethousehandletype : Actions.sethousehandletype,
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
)(LeadManagement);
