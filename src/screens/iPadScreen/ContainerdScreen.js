import React, { Component } from 'react';
import {
  View, Dimensions, StyleSheet, TouchableOpacity, Image, Text, Alert, Linking,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { Images, Fonts, Constants } from '@commons';
import {
  PropertyScreenPad,
  DashboardScreenPad,
  EventScreenPad, LeadManagementPad,
  OpenHouseScreenPad,
  MyBoardScreenPad,
  ProfileScreenPad,
  MortgageScreenPad,
  Detail_AttendeeScreenPad,
  Detail_BrokerScreenPad,
  PDFViewScreenPad,
  CreatePropertyScreenPad,
  PropertyViewAttendeesScreenPad,
  CreateEventScreenPad,
  EventViewAttendeesScreenPad,
  SelectMLSScreenPad,
} from '../../screens';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../../store/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import { FlatList } from 'react-native-gesture-handler';
import Orientation from "react-native-orientation"
import { constants } from 'buffer';
import { Layouts } from '../../common';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import Colors from '../../common/Colors';
class ContainerScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spinner: false,
      title: 'Properties',
      status: 0,
      viewsplitstatus: false,
      loadingtxt: '',
      leftheader: false,
      rightheader: false,
      dashboardstatus: 0,
      propertydat: '',
      attendeData: '',
      brokerData: '',
      attendeurl: '',
      imagescr: Images.ic_upload,
    }
    Orientation.lockToLandscape();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.loadingtxt !== this.props.dashboard.loadingtxt &&
      this.props.dashboard.loadingtxt !== ''
    ) {
      this.setState({ loadingtxt: this.props.dashboard.loadingtxt });
    }
    if (this.props.dashboard.status === 100 && !this.state.spinner) {
      this.setState({ spinner: true });
    }
    if (this.props.dashboard.status === 210 &&
      prevProps.dashboard.status === 100) {
      this.setState({ title: 'Lead Management' })
      this.setState({ spinner: false });

    }
    if (this.props.dashboard.status === 220 &&
      prevProps.dashboard.status !== 220) {
      this.setState({ title: 'Manage Question' })
      this.setState({ spinner: false });
    }
    if (this.props.dashboard.status === 230 &&
      prevProps.dashboard.status === 100) {
      this.setState({ spinner: false });
      Constants.loadLMSflag = 1;
      this.setState({ title: 'Linked MLS Accounts' })
    }
    if (this.props.dashboard.status === 240 &&
      prevProps.dashboard.status === 100) {
      this.setState({ title: 'Events' })
      this.setState({ spinner: false });
    }
    if (this.props.dashboard.status === 260 &&
      prevProps.dashboard.status === 100) {
      this.setState({ title: 'Select Partner' })
      this.setState({ spinner: false });
    }
    if (this.props.ipad.dashboardstatus === 790 && prevProps.ipad.dashboardstatus === 70) {
      this.refs.modalProfile.open();
    }
    if (
      this.state.loadingtxt !== this.props.dashboard.loadingtxt &&
      this.props.dashboard.loadingtxt !== ''
    ) {
      this.setState({ loadingtxt: this.props.dashboard.loadingtxt });
    }
    if (this.props.dashboard.status === 200 &&
      prevProps.dashboard.status === 100) {
      this.setState({ title: 'Properties' })
    }
    if (
      this.props.dashboard.status >= 200 &&
      prevProps.dashboard.status === 100 &&
      this.state.spinner
    ) {
      this.setState({ spinner: false });
    }
    if (this.props.ipad.dashboardstatus === 707 && prevProps.ipad.dashboardstatus === 70) {
      this.props.navigation.navigate('startOpenHouseOneScreen');
    }
    if (this.props.ipad.dashboardstatus === 735 && prevProps.ipad.dashboardstatus === 70) {
      this.refs.addProperty.close();
    }
    if (this.props.ipad.dashboardstatus === 732 && prevProps.ipad.dashboardstatus === 70) {
      this.refs.addEvent.close();
    }
    if (this.props.ipad.dashboardstatus === 708 && prevProps.ipad.dashboardstatus === 70) {
      this.setState({ viewsplitstatus: true })
      this.setState({ title: 'Buyer' })
      this.setState({ leftheader: true })
      if (Constants.selecteditem.attendee_pdf_url != null || Constants.selectedpropertyitem.attendee_pdf_url !== null) {
        this.setState({ rightheader: true });
        this.setState({ imagescr: Images.ic_upload });
      }
      else this.setState({ rightheader: false });
    }
    if (this.props.ipad.dashboardstatus === 709 && prevProps.ipad.dashboardstatus === 70) {
      this.refs.modalProfile.close();
    }

    if (this.props.ipad.dashboardstatus === 710 && prevProps.ipad.dashboardstatus === 70) {
      this.setState({ viewsplitstatus: true })
      this.setState({ title: this.props.ipad.data.agent_fullname })
      this.setState({ leftheader: true })
      if (Constants.selecteditem.attendee_pdf_url != null) {
        this.setState({ rightheader: true });
        this.setState({ imagescr: Images.ic_upload });
      }
      else this.setState({ rightheader: false });
    }
    if (this.props.ipad.dashboardstatus === 711 && prevProps.ipad.dashboardstatus === 70) {
      this.refs.addProperty.open();
    }
    if (this.props.ipad.dashboardstatus === 712 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 200) {
      this.refs.addProperty.close();
    }
    if (this.props.ipad.dashboardstatus === 713 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 200) {
      this.setState({ dashboardstatus: 6 });
      this.setState({ leftheader: true });
      this.setState({ rightheader: true });
      this.setState({ imagescr: Images.ic_upload });
      this.setState({ title: "Open House Marketing System" })
    }
    if (this.props.ipad.dashboardstatus === 714 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 240) {
      this.refs.addEvent.open();
    }
    if (this.props.ipad.dashboardstatus === 731 && prevProps.ipad.dashboardstatus === 70) {
      this.refs.addEvent.close();
    }
    if (this.props.ipad.dashboardstatus === 736 && prevProps.ipad.dashboardstatus === 70) {
      this.refs.addProperty.close();
    }
    if (this.props.ipad.dashboardstatus === 722 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 240) {
      this.setState({ dashboardstatus: 7 });
      this.setState({ title: this.props.ipad.data.eventdata.event_name })
      this.setState({ leftheader: true })
      if (Constants.selecteditem.attendee_pdf_url != null) {
        this.setState({ rightheader: true });
        this.setState({ imagescr: Images.ic_upload });
      }
      else this.setState({ rightheader: false });
    }
    if (this.props.ipad.dashboardstatus === 715 && prevProps.ipad.dashboardstatus === 70) {
      this.refs.addEvent.close();

    }
    if (this.props.ipad.dashboardstatus === 716 && prevProps.ipad.dashboardstatus === 70 &&
      this.props.dashboard.status === 230) {
      this.setState({ dashboardstatus: 8 });
      this.setState({ leftheader: true });
    }
    if (this.props.ipad.dashboardstatus === 717 && prevProps.ipad.dashboardstatus === 70) {
      this.props.navigation.navigate('startOpenHouseOneScreen');
    }
    if (this.props.ipad.dashboardstatus === 718 && prevProps.ipad.dashboardstatus === 70) {
      this.props.navigation.navigate('startEventScreen');
    }
    if (this.props.ipad.dashboardstatus === 719 && prevProps.ipad.dashboardstatus === 70) {
      this.setState({ spinner: false });
      this.props.myboard();
      this.setState({ title: 'Linked MLS Accounts' })
      this.setState({ dashboardstatus: 4 });
      Constants.mlsflag = 1;
    }
    if (this.props.ipad.dashboardstatus >= 700 && this.props.ipad.dashboardstatus <= 705 && prevProps.ipad.dashboardstatus === 70) {
      if (this.props.ipad.dashboardstatus === 702) {
        this.setState({ rightheader: true });
        this.setState({ leftheader: false })
        this.setState({ imagescr: Images.ic_upload });
      }
      else { this.setState({ rightheader: false }); this.setState({ leftheader: false }) }
      this.setState({ dashboardstatus: this.props.ipad.dashboardstatus - 700 });
      if (this.props.ipad.dashboardstatus === 705) {
        this.setState({ imagescr: Images.createicon });
        this.setState({ rightheader: true });
      }
    }
  }
  componentDidMount() {
    this.setState({ title: 'Properties' })
    this.setState({ dashboardstatus: 0 });
    this.props.dashboard.status = 200;
    // switch (this.props.dashboard.status) {
    //   case 200:
    //     this.setState({ title: 'Properties' })
    //     this.setState({ dashboardstatus: 0 });
    //     break;
    //   case 210:
    //     this.setState({ title: 'Lead Management' })
    //     this.setState({ dashboardstatus: 2 });
    //     this.setState({ rightheader: true });
    //     this.setState({ imagescr: Images.ic_upload });
    //     break;
    //   case 220:
    //     this.setState({ title: 'Manage Question' })
    //     this.setState({ dashboardstatus: 3 });
    //     break;
    //   case 230:
    //     this.setState({ title: 'Linked MLS Accounts' })
    //     this.setState({ dashboardstatus: 4 });
    //     break;
    //   case 240:
    //     this.setState({ title: 'Events' })
    //     this.setState({ dashboardstatus: 1 });
    //     break;
    //   case 250:
    //     this.setState({ title: 'Properties' })
    //     this.setState({ dashboardstatus: 0 });
    //     break;
    //   case 260:
    //     this.setState({ title: 'Select Partner' })
    //     this.setState({ dashboardstatus: 5 });
    //     this.setState({ rightheader: true });
    //     this.setState({ imagescr: Images.createicon });
    //     break;

    //   default:
    //     break;
    // }
  }
  detailView = () => {
    switch (this.state.dashboardstatus) {
      case 0:
        return (
          <PropertyScreenPad></PropertyScreenPad>
        )
        break;
      case 1:
        return (
          <EventScreenPad></EventScreenPad>
        )
        break;
      case 2:
        return (
          <LeadManagementPad></LeadManagementPad>
        )
        break;
      case 3:
        return (
          <OpenHouseScreenPad></OpenHouseScreenPad>
        )
        break;
      case 4:
        return (
          <MyBoardScreenPad></MyBoardScreenPad>
        )
        break;
      case 5:
        return (
          <MortgageScreenPad></MortgageScreenPad>
        )
        break;
      case 6:
        return (
          <PropertyViewAttendeesScreenPad></PropertyViewAttendeesScreenPad>
        )
        break;
      case 7:
        return (
          <EventViewAttendeesScreenPad></EventViewAttendeesScreenPad>
        )
        break;
      case 8:
        return (
          <SelectMLSScreenPad></SelectMLSScreenPad>
        )
        break;
      default:
        return (
          <PropertyScreenPad></PropertyScreenPad>
        )
        break;
    }
  }
  part2 = () => {
    if (!this.state.viewsplitstatus) {
      return (
        <View style={{ flex: 3 }}>
          {this.detailView()}
        </View>
      )
    } else {
      if (this.props.ipad.dashboardstatus === 710) {
        return (
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <Detail_BrokerScreenPad></Detail_BrokerScreenPad>
          </View>
        )
      } else if (this.props.ipad.dashboardstatus === 708) {
        return (
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Detail_AttendeeScreenPad></Detail_AttendeeScreenPad>
            </View>
            {(Constants.selecteditem.attendee_pdf_url != null) && <View style={{ flex: 1 }}>
              <PDFViewScreenPad></PDFViewScreenPad>
            </View>}
          </View>
        )
      } else {
        return (
          <View style={{ flex: 2 }}>
            {this.detailView()}
          </View>
        )
      }
    }
  }
  Export = () => {
    if (this.props.dashboard.status === 200 && this.props.ipad.dashboardstatus === 713) {
      this.exportCSVFile2();
    }
    if (this.props.dashboard.status === 200 && this.props.ipad.dashboardstatus === 708) {
      this.exportPDF();
    }
    if (this.props.dashboard.status === 210 && this.props.ipad.dashboardstatus === 702) {
      this.exportCSVFile();
    }
    if (this.props.dashboard.status === 210 && this.props.ipad.dashboardstatus === 708) {
      this.exportPDF2();
    }
    if (this.props.dashboard.status === 260 && this.props.ipad.dashboardstatus === 705) {
      Linking.openURL(Constants.shareurl);
    }
  }

  exportPDF = () => {
    const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${RNFetchBlob.fs.dirs.DocumentDir}/attendee.pdf`,
        mime: 'application/pdf',
        mediaScannable: true,
        description: 'Downloading PDF'
      }
    }).fetch('GET', Constants.selectedpropertyitem.attendee_pdf_url)
      .then((res) => {

        let base64Str = res.data;
        let pdflocation = DocumentDir + '/attendee.pdf';
        RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64');
        let options = {
          type: 'application/pdf',
          url: pdflocation,
          social: Share.Social.EMAIL,
          email: Constants.user_mail,
        }
        Share.open(options);
      })
  };
  exportPDF2 = () => {
    const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${RNFetchBlob.fs.dirs.DocumentDir}/attendee.pdf`,
        mime: 'application/pdf',
        mediaScannable: true,
        description: 'Downloading PDF'
      }
    }).fetch('GET', Constants.selecteditem.attendee_pdf_url)
      .then((res) => {

        let base64Str = res.data;
        let pdflocation = DocumentDir + '/attendee.pdf';
        RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64');
        let options = {
          type: 'application/pdf',
          url: pdflocation,
          social: Share.Social.EMAIL,
          email: Constants.user_mail,
        }
        Share.open(options);
      })
  };
  exportCSVFile = () => {
    const values = this.props.dashboard.leads.attendees;
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
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        let options = {
          type: 'text/csv',
          url: pathToWrite,
          social: Share.Social.EMAIL
        }
        Share.open(options);
      })
      .catch(error => console.error(error));
  };
  exportCSVFile2 = () => {
    const values = Constants.attendeedata;
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
    const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/property.csv`;
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        let options = {
          type: 'text/csv',
          url: pathToWrite,
          social: Share.Social.EMAIL
        }
        Share.open(options);
      })
      .catch(error => console.error(error));
  };
  Back = () => {
    // alert(this.props.dashboard.status + ',' + this.props.ipad.dashboardstatus)
    if (this.props.dashboard.status === 240 && this.props.ipad.dashboardstatus === 722) {
      this.setState({ dashboardstatus: 1 })
      this.setState({ leftheader: false })
      this.setState({ rightheader: false })
      this.setState({ title: 'Events' })
    }
    if (this.props.dashboard.status === 200 && (this.props.ipad.dashboardstatus === 708 || this.props.ipad.dashboardstatus === 710)) {
      this.setState({ leftheader: false })
      this.setState({ rightheader: false })
      this.props.dashboardstatuschange(13);
    }
    if (this.props.dashboard.status === 200 && this.props.ipad.dashboardstatus === 713) {
      this.setState({ dashboardstatus: 0 })
      this.setState({ leftheader: false })
      this.setState({ rightheader: false })
    }
    if (this.props.dashboard.status === 210 && (this.props.ipad.dashboardstatus === 708 || this.props.ipad.dashboardstatus === 710)) {
      this.props.dashboardstatuschange(2);
    }
    if (this.props.ipad.dashboardstatus === 716) {
      this.props.dashboardstatuschange(19);
    }
  }
  _onLayout = event => {
    Orientation.lockToLandscapeLeft();
  }
  logout = () => {
    Alert.alert('', 'Are you sure you want to logout?', [
      { text: 'NO' },
      { text: 'YES', onPress: this.logouthandle },
    ]);
  };
  logouthandle = () => {
    this.props.navigation.navigate('signinScreenPad');
    this.props.logout();

  };
  render() {
    return (
      <View style={{ flex: 1, }} onLayout={this._onLayout}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={[styles.NavBar,]}>
          <View style={styles.navleftsection}>
            <TouchableOpacity
              style={{
                height: Layouts.NAVBAR_HEIGHT,
                width: Layouts.NAVBAR_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.logout()}
            >
              <Image
                source={Images.logout}
                imageStyle={{ width: Layouts.NAV_ICON_SIZE, height: Layouts.NAV_ICON_SIZE }}
                style={{ width: Layouts.NAV_ICON_SIZE, height: Layouts.NAV_ICON_SIZE, }}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: Constants.TEXT_FONT_SIZE_SMALL * 1.2,
                  fontWeight: 'bold',
                }}>
                Open
                </Text>
              <Text
                style={{
                  fontSize: Constants.TEXT_FONT_SIZE_SMALL * 1.2 / 2,
                }}>
                TM
                </Text>
            </View>
            <View></View>
          </View>
          <View style={styles.navrightsection}>
            <View
              style={{
                width: 50,
                marginLeft: 15,
                justifyContent: 'center',
              }}>
              {this.state.leftheader && <TouchableOpacity onPress={() => this.Back()}>
                <Image
                  source={Images.backicon}
                  imageStyle={{ width: Layouts.NAV_ICON_SIZE, height: Layouts.NAV_ICON_SIZE }}
                  style={{ width: Layouts.NAV_ICON_SIZE, height: Layouts.NAV_ICON_SIZE }}
                />
              </TouchableOpacity>}
            </View>
            <Text style={{ fontSize: Constants.TEXT_FONT_SIZE_SMALL * 1.2, padding: Layouts.MARGIN_TOP_NORMAL, fontWeight: 'bold', }}>{this.state.title}</Text>
            <View style={{
              width: 50,
              marginRight: 20,
              justifyContent: 'center',
            }}>
              <TouchableOpacity
                onPress={() => this.Export()}>
                {this.state.rightheader && <Image
                  source={this.state.imagescr}
                  imageStyle={{ width: Layouts.NAV_ICON_SIZE, height: Layouts.NAV_ICON_SIZE }}
                  style={{ width: Layouts.NAV_ICON_SIZE, height: Layouts.NAV_ICON_SIZE }}
                />}
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <DashboardScreenPad></DashboardScreenPad>
          </View>
          <View style={{ flex: 2 }}>
            {this.part2()}
          </View>
        </View>
        <Modal
          style={{ height: Constants.PROFILE_MODAL_HEIGTHT, width: Constants.PROFILE_MODAL_WIDTH }}
          position={'center'}
          backdropPressToClose={false}
          ref={'modalProfile'}>
          <ProfileScreenPad></ProfileScreenPad>
        </Modal>
        <Modal
          style={{
            width: Layouts.CREATE_PROPERTY_MODAL_WIDTH, height: Layouts.CREATE_PROPERTY_MODAL_HEIGHT,
            backgroundColor: 'white',
          }}
          position={'center'}
          backdropPressToClose={false}
          ref={'addProperty'}>
          <CreatePropertyScreenPad></CreatePropertyScreenPad>
        </Modal>
        <Modal
          style={{ height: Constants.CREAT_EVENT_MODAL_HEIGTHT, width: Constants.CREAT_EVENT_MODAL_WIDTH }}
          position={'center'}
          backdropPressToClose={false}
          ref={'addEvent'}>
          <CreateEventScreenPad></CreateEventScreenPad>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  NavBar: {
    flexDirection: 'row',
    height: Layouts.NAVBAR_HEIGHT,
    borderColor: Colors.BORDER_COLOR,
    borderBottomWidth: 0.5,
    backgroundColor: Constants.UIColor.OHColors.navBarBGcolor,
  },
  navleftsection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navrightsection: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spinnerTextStyle: {
    color: 'white',
    fontSize: 36,
  },
  txtrow: {
    marginTop: 10,
  },
  profilecontainer: {
    width: Constants.LAYOUT.PROFILE.WIDTH,
    height: Constants.LAYOUT.PROFILE.HEIGHT,
    backgroundColor: 'white', //'rgba(255, 255, 255, 0.8)',
    borderColor: Constants.UIColor.OHColors.lightSeaGreen,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
})
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logout,
      dashboardstatuschange: Actions.dashboardstatuschange,
      myboard: Actions.getMyboard,
      getevent: Actions.getevent,
    },
    dispatch,
  );
}
function mapStateToProps({ dashboard, ipad }) {
  return {
    ipad: ipad,
    dashboard: dashboard,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContainerScreen);


