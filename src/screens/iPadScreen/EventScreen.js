import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import ImageResizer from 'react-native-image-resizer';
import { DashboardService, AuthService } from '@services';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Moment from 'moment';
import FastImage from 'react-native-fast-image'
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
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
import { SearchBar } from 'react-native-elements';
import { ProgressCircle, CircleSnail } from '@components';
import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-picker';
import { Layouts } from '../../common';
import RNFetchBlob from 'rn-fetch-blob';
const _keyExtractor = item => item.uniqueid;
const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
class EventScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      spinner: false,
      loadingtxt: '',
      isDisabled: false,
      isOpen: false,
      newtitle: '',
      searchText: '',
      checkmanage: false,
      checkActive: false,
      selecteditem: null,
      selectedAttendeData: null,
      dashboard:
        this.props.dashboard && this.props.dashboard.events
          ? this.props.dashboard.events.sort(
            (a, b) => a.event_date < b.event_date,
          )
          : [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.login.downloadeventattendstatus === 200 &&
      prevProps.login.downloadeventattendstatus === 100
    ) {
      Constants.eventData = this.props.login.downloadeventattend;
    }

    if (
      this.props.login.downloadeventstatus === 200 &&
      prevProps.login.downloadeventstatus === 100
    ) {
      if (Constants.uploadPhotoFlag === 1) {
        Constants.uploadPhotoFlag = 0;
        this.setState({
          dashboard: this.props.login.downloadevent.sort(
            (a, b) => a.event_date < b.event_date,
          )
        });
        this.setState({ spinner: false });
      }
    }
    if (this.props.ipad.dashboardstatus === 732 && prevProps.ipad.dashboardstatus === 70) {
      this.LoadEvent();
    }
  }
  async LoadEvent() {
    let res = await AuthService.authlogin(Constants.user_mail, Constants.user_password);
    var account_num = res[0].account_num;
    var info = await DashboardService.getevent(account_num);
    this.setState({
      dashboard: info.data.sort(
        (a, b) => a.event_date < b.event_date,
      )
    });
    this.setState({ refresh: !this.state.refresh });
    this.setState({ spinner: false });
    this.props.dashboardstatuschange(31);
  }
  downloadImages(){
    let dashboard_data = this.state.dashboard;
    let length_size = dashboard_data.length;
    var flag = 0;
    var new_count = 0;
    var flag_look = 0;
     //this.setState({spinner: true})
      for (let i=0;i<length_size;i++){
        let each_image = dashboard_data[i];
        let pdflocation = DocumentDir  + '/' + each_image.event_id + '.jpg';
        RNFetchBlob.fs.exists(pdflocation)
        .then((exists)=>{
          if(exists){ 
            new_count = new_count + 1;
            if (new_count == (length_size - 1)){
              Constants.uploadPhotoFlag = 1;
              this.props.authdownloadEvent();
             // this.setState({dashboard: dashboard_data});
             // this.setState({spinner: false})
            }
          }else{
            
            // if (flag == 0){
            //   this.setState({dashboard: null});
              
            //   flag = 1;
            // }
           
            RNFetchBlob.fetch('GET', each_image.event_photo_url)
            .then((res) => {
              
              let base64Str = res.data;
              
              RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64').then(() => { 
                console.log("downloaddata" + each_image.uniqueid); 
                new_count = new_count + 1;
                if (new_count == (length_size - 1)){
                  Constants.uploadPhotoFlag = 1;
                  this.props.authdownloadEvent();
                 // this.setState({dashboard: dashboard_data});
                 // this.setState({spinner: false})
                }
                
              });
               
          })
          }
         
          
        })
        .catch(()=>{})
  
      }
    }

  componentDidMount() {
    this.props.authdownloadEventAttend();
    this.downloadImages();
  }
  componentWillUnmount() { }


  addproperty = () => {
    this.props.dashboardstatuschange(14);
  };
  checkActive(event_datestr) {
    var now_date = new Date();
    var event_date = Moment(event_datestr).format('YYYY-MM-DD');
    var new_event = new Date(event_date);
    // alert(now_date);
    if (now_date < new_event) {
      return 'A';
    } else {
      return 'I';
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
    var dayName = days[d.getDay() + 1];
    var event_date = Moment(event_datestr).format('MMMM DD, YYYY');
    return dayName + ', ' + event_date;
  }
  _renderItem = ({ item }) => {


    if (item === 0) {
      return (
        <View style={styles.eventcell}>
          <View style={[styles.containerView, { backgroundColor: '#aaaaaa', }]}>
            <View style={[styles.headerSection, styles.vcenter_wrapper]} opacity={0.95}>
              <Text style={styles.headerLbl}>
                Add Event
                </Text>
            </View>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => this.addproperty()}>
              <Image
                style={styles.plusImage}
                resizeMode={'contain'}
                imageStyle={{ height: '100%', width: '100%' }}
                source={Images.add_data}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (item.error == null) {
      return (
        <View style={styles.eventcell}>
          <View style={styles.containerView}>
            <View style={styles.headerLayer}>
              <View style={styles.vcenter_wrapper}>
                <Text style={styles.mlsIdLbl}>
                  {item.event_name}
                </Text>
              </View>
              <TouchableOpacity style={[styles.menuwrapper, styles.vcenter_wrapper]} onPress={() => this.itemClick(item)}>
                <Image
                  style={styles.menu}
                  source={Images.more_menue}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.itemClick(item)}>
            <Image
                    style={styles.propertyImage}
                    imageStyle={styles.itemview}
                    source={{ 
                      uri: DocumentDir  + '/event/' + item.event_id + '.jpg',
                      cache: 'reload'
                }}
              
              // <FastImage
              //   style={styles.propertyImage}
              //   imageStyle={styles.itemview}
              //   // source={{ uri: item.property_photo_url }}
              //   source={{ uri: `${item.property_photo_url}?${new Date()}` }}
              />
              
              {/* <FastImage
                style={styles.propertyImage}
                imageStyle={styles.itemview}
                // source={{ uri: item.property_photo_url }}
                source={{ uri: `${item.event_photo_url}?${new Date()}` }}
              /> */}
            </TouchableOpacity>
            <View style={[styles.footerLayer,]} opacity={1}>
              <View style={{
                width: '75%',
                height: '100%',
                justifyContent: 'center'
              }}>
                <Text style={styles.address}>
                  {this.convertStringtoDate(item.event_date)}
                </Text>
              </View>

              <View style={{
                height: '100%',
                justifyContent: 'center'
              }}>
                {this.checkActive(item.event_date) === 'A' ? (
                  <Text style={styles.rentalLbl}>
                    Active
                  </Text>
                ) : (
                    <Text style={[styles.rentalLbl, styles.saleLbl]}>
                      Inactive
                </Text>
                  )}
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      <View></View>
    }
  };

  showDialog = status => {
    this.setState({ isDialogVisible: status });
  };

  itemClick = item => {
    this.setState({ selecteditem: item });
    this.refs.modal3.open();
    if (this.checkActive(item.event_date) === 'A') {
      this.setState({ checkActive: true });
      var eventAttendeData = [];
      for (data in Constants.eventData) {
        let each_Data = Constants.eventData[data];
        if (each_Data.event_id === item.event_id) {
          eventAttendeData.push(each_Data);
        }
      }
      if (eventAttendeData.length > 0) {
        this.setState({ checkmanage: true });
        this.setState({ selectedAttendeData: eventAttendeData });
      } else {
        this.setState({ checkmanage: false });
      }
    } else {
      this.setState({ checkActive: false });
    }
  };
  chooseFile = () => {
    this.refs.modal3.close();
    var options = {
      title: 'Select Image',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // alert('User cancelled image picker');
      } else if (response.error) {
        //  alert('error1');
      } else if (response.customButton) {
        ///  alert('error2');
      } else {

        ImageResizer.createResizedImage(response.uri, 400, 400, 'JPEG', 80).then((res) => {
          this.setState({ spinner: true });
          let source = { uri: res.uri };
          this.setState({
            filePath: source,
          });
          // alert(source.uri);
          let filename = this.state.selecteditem.event_id + '.jpg';
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
          body.append('objectid', this.state.selecteditem.event_id);
          body.append('phototype', 'e');

          fetch(Url, {
            method: 'POST',
            headers: { 'Content-Type': 'multiaprt/form-data' },
            body: body,
          })
          .then((response) => response.json())
          .then((responseData) => {
            console.log('*****************');
            console.log(responseData);
           // this.setState({dashboard: null});
            let pdflocation = DocumentDir  + '/' + this.state.selecteditem.event_id + '.jpg';
            RNFetchBlob.fs.unlink(pdflocation).then(()=>{
                console.log('*********removed');
                RNFetchBlob.fetch('GET', responseData[0].photourl)
                .then((res123) => {
                  let base64Str = res123.data;
                  RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64').then(()=>{
                    console.log('*********created');
                    Constants.uploadPhotoFlag = 1;
                    this.props.authdownloadEvent();
                    // this.setState({dashboard: this.props.dashboard && this.props.dashboard.properties
                    //   ? this.props.dashboard.properties.sort(
                    //     (a, b) => a.property_status > b.property_status,
                    //   )
                    //   : []});

                });
              });
            }) 
          })
            .done();
        })
      }
    });
  };
  gonext = txt => {
    if (txt) {
      this.props.getbrokersname(txt);
    } else {
      Alert.alert('You must enter/select a title to continue', '');
    }
  };
  Change_ModalStyle = flag_style => {
    if (flag_style) {
      //   alert('styletest');
      return styles.modal4;
    } else {
      return styles.modal2;
    }
  };
  search = searchText => {
    this.setState({ searchText: searchText });
    if (this.state.dashboard[0].error == null) {
      this.changesearch(searchText);
    }
  };
  clearsearch = () => {
    this.setState({ searchText: '' });
    let events =
      this.props.dashboard && this.props.dashboard.events
        ? this.props.dashboard.events
        : [];
    this.setState({ dashboard: events });
  };
  changesearch = (searchText) => {
    let events =
      this.props.dashboard && this.props.dashboard.events
        ? this.props.dashboard.events
        : [];
    let res = [];

    if (!searchText || searchText === '') {
      res = events;
    } else if (events && events.length) {
      res = events.filter(
        item =>
          item.event_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
      );
    }
    this.setState({ dashboard: res });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  viewevent = () => {
    this.props.dashboardstatuschange(22, {
      eventdata: this.state.selecteditem,
      attendeData: this.state.selectedAttendeData
    });
  };
  cancelmodal = () => {
    this.refs.modal3.close();
  };
  starEvent = () => {
    this.refs.modal3.close();
    this.props.dashboardstatuschange(18, { logo: this.state.selecteditem, });
  };
  uploadphoto = () => {
    this.refs.modal3.close();
    this.refs.modal2.open();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Updating Photo'}
          textStyle={styles.spinnerTextStyle}
        />
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
        <FlatList
          data={[0, ...this.state.dashboard]}
          numColumns={3}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
          extraData={this.state.refresh}
          style={styles.propertyCollections}
        />
        <Modal
          style={[styles.modal, styles.modal2]}
          position={'center'}
          backdropPressToClose={false}
          ref={'modal2'}>
          <View style={styles.modalview_head}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Select Image</Text>
          </View>
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.handlehousetype(1)}>
            <Text>Choose image from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.handlehousetype(2)}>
            <Text>Take new photo from camera</Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          style={this.Change_ModalStyle(this.state.checkActive)}
          position={'center'}
          backdropPressToClose={false}
          ref={'modal3'}>
          {this.state.checkActive && (
            <TouchableOpacity
              style={styles.modalview}
              onPress={() => this.starEvent()}>
              <View style={styles.modalimgviewcontainer}>
                <Image
                  style={styles.modalimg}
                  imageStyle={styles.mdoalimgsty}
                  source={Images.start_openhouse}
                />
              </View>
              <View style={styles.modaltxtview}>
                <Text style={styles.modaltxt}>Start Event</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.viewevent()}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.share_property}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>View Event Attendees</Text>
            </View>
          </TouchableOpacity>
          {this.state.checkActive && (
            <TouchableOpacity
              style={styles.modalview}
              onPress={() => this.chooseFile()}>
              <View style={styles.modalimgviewcontainer}>
                <Image
                  style={styles.modalimg}
                  imageStyle={styles.mdoalimgsty}
                  source={Images.add_photo}
                />
              </View>
              <View style={styles.modaltxtview}>
                <Text style={styles.modaltxt}>Upload New Photo</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.cancelmodal()}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.cancel}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>Close</Text>
            </View>
          </TouchableOpacity>
        </Modal>
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
  // itemcontainer: {
  //   backgroundColor: '#808080',
  //   width: (Dimensions.get('window').height > Dimensions.get('window').width?Dimensions.get('window').height:Dimensions.get('window').width)/ 4.5 * 0.96,
  //   height: (Dimensions.get('window').height > Dimensions.get('window').width?Dimensions.get('window').height:Dimensions.get('window').width)/ 4.5 * 0.6 + 130,
  //   marginLeft: (Dimensions.get('window').height > Dimensions.get('window').width?Dimensions.get('window').height:Dimensions.get('window').width)/ 4.5 * 0.02,
  //   marginRight: (Dimensions.get('window').height > Dimensions.get('window').width?Dimensions.get('window').height:Dimensions.get('window').width)/ 4.5 * 0.02,
  //   margin: 5,
  // },
  itemview: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  itemtxtview: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemtxt: {
    fontSize: 12,
    color: 'black',
  },
  itemtxt2: {
    fontSize: 12,
    color: 'black',
    marginTop: 0,
  },
  itmeimgcontainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'relative',
    padding: 5,
    borderWidth: 0.5,
    height: 50,
  },
  searchbar: {
    backgroundColor: '#F4F4F4',
  },
  searchbartxt: {
    fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
    backgroundColor: 'white',
  },
  modal: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 60,
    width: '50%',
    borderRadius: 5,
  },
  modal2: {
    height: 120,
    width: '50%',
    borderRadius: 5,
    // backgroundColor: "#3B5998"
  },

  modal3: {
    height: 180,
    width: '50%',
    bottom: 10,
    borderRadius: 5,
  },
  modal4: {
    height: 240,
    width: '50%',
    bottom: 10,
    borderRadius: 5,
  },
  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },
  modalview: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalview_head: {
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalimg: {
    width: 40,
    height: 40,
  },
  mdoalimgsty: {
    width: 30,
    height: 30,
    marginLeft: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  modaltxt: {
    paddingTop: 5,
    fontSize: 16,
    // textAlign:'center',
    justifyContent: 'center',
  },
  modalimgviewcontainer: {
    width: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modaltxtview: {
    marginLeft: 20,
    width: '80%',
    borderBottomWidth: 0.2,
    borderBottomColor: '#D4D4D4',
  },

  headerSection: {
    backgroundColor: 'white',
    borderTopLeftRadius: Layouts.MARGIN_NORMAL / 2,
    borderTopRightRadius: Layouts.MARGIN_NORMAL / 2,

    width: '100%',
    height: Layouts.PROPERTY_ITEM_TOP_HEIGHT + Layouts.MARGIN_NORMAL,
  },

  headerLbl: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },

  plusImage: {
    width: Layouts.ADD_IMAGE_SIZE,
    height: Layouts.ADD_IMAGE_SIZE,
  },

  eventcell: {
    width: Layouts.ITEM_SIZE,
    height: Layouts.ITEM_SIZE,

  },
  propertyCollections: {
    // backgroundColor: '#555',
    marginLeft: Layouts.MARGIN_NORMAL / 2,
    marginTop: Layouts.MARGIN_NORMAL / 2,
    marginBottom: Layouts.MARGIN_NORMAL / 2,
    marginRight: Layouts.MARGIN_NORMAL / 2,
  },
  containerView: {

    borderColor: '#808080',
    borderWidth: 0.5,
    borderRadius: 5,

    flex: 1,
    margin: Layouts.ITEM_MARGIN,
    backgroundColor: 'white',
  },

  headerLayer: {
    margin: 4,
    height: Layouts.PROPERTY_ITEM_TOP_HEIGHT,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  vcenter_wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  mlsIdLbl: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    color: 'black',
    backgroundColor: 'white',
    marginLeft: Layouts.MARGIN_NORMAL,
    fontWeight: 'bold'
  },

  menuwrapper: {
    marginRight: Layouts.MARGIN_NORMAL / 2,
    width: Layouts.MARGIN_LARGE,
    height: Layouts.EVENT_ITEM_TOP_HEIGHT,
  },

  menu: {
    width: 25,
    height: 25,
  },

  propertyImage: {
    flex: 1,
    height: Layouts.EVENT_ITEM_MIDDLE_HEIGHT,
  },

  footerLayer: {
    margin: Layouts.MARGIN_NORMAL / 2,
    marginLeft: Layouts.MARGIN_NORMAL,
    height: Layouts.EVENT_ITEM_BOTTOM_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    backgroundColor: 'white',
    color: 'black',
  },

  address: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    backgroundColor: 'white',
    color: 'black',
  },

  cityTownLbl: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    backgroundColor: 'white',
    color: 'black',
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
  },

  rentalLbl: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'right',
  },

  saleLbl: {
    color: 'red',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange: Actions.dashboardstatuschange,
      logout: Actions.logout,
      setpropertyitem: Actions.setpropertyitem,
      sethousehandletype: Actions.sethousehandletype,
      authdownloadEventAttend: Actions.authdownloadEventAttend,
      authdownloadEvent: Actions.authdownloadEvent,
    },
    dispatch,
  );
}

function mapStateToProps({ login, dashboard, ipad }) {
  return {
    login: login,
    dashboard: dashboard,
    ipad: ipad,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventScreen);
