import React, { Component } from 'react';
import { DashboardService, AuthService } from '@services';
import * as Actions from '../../store/actions';
import ImageResizer from 'react-native-image-resizer';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import ImagePicker from 'react-native-image-picker';

// import RNFetchBlob from 'rn-fetch-blob';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image'
// import {Button, Icon} from 'native-base';
import { Images, Fonts, Constants } from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
// import DialogInput from 'react-native-dialog-input';
import { SearchBar } from 'react-native-elements';
// import {ProgressCircle, CircleSnail} from '@components';
import Modal from 'react-native-modalbox';
import Share from 'react-native-share';
import Layouts from '../../common/Layoutsd';
import RNFetchBlob from 'rn-fetch-blob';
// import CacheImage from './CacheImage';

const _keyExtractor = item => item.uniqueid;
// const dirs = RNFetchBlob.fs.dirs;
const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
// var RNFS = require('react-native-fs');
class PropertyScreenPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      loadingtxt: '',
      isDisabled: false,
      isOpen: false,
      newtitle: '',
      searchText: '',
      checkmanage: false,
      selecteditem: null,
      selected_attendeData: null,
      selected_brokerData: null,
      dashboard:
        this.props.dashboard && this.props.dashboard.properties
          ? this.props.dashboard.properties.sort(
            (a, b) => a.property_status > b.property_status,
          )
          : [],
    };
    this.goproperty = this.goproperty.bind(this);
    this.downloadImages = this.downloadImages.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.login.downloadpropertiesattendestatus === 200 &&
      prevProps.login.downloadpropertiesattendestatus === 100
    ) {
      Constants.AttendeData = this.props.login.downloadpropertiesattende;
    }
    if (
      this.props.login.downloadpropertiesbrokerattendestatus === 200 &&
      prevProps.login.downloadpropertiesbrokerattendestatus === 100
    ) {
      Constants.BrokerData = this.props.login.downloadpropertiesbrokerattende;
    }

    if (
      this.props.login.downloadpropertiesstatus === 200 &&
      prevProps.login.downloadpropertiesstatus === 100
    ) {
      if (Constants.uploadPhotoFlag === 1) {
        Constants.uploadPhotoFlag = 0;
        this.setState({ dashboard: this.props.login.downloadproperties.sort(
          (a, b) => a.property_status > b.property_status,
        )});
        this.setState({ spinner: false });
      }
    }
    if (this.props.ipad.dashboardstatus === 735 && prevProps.ipad.dashboardstatus === 70) {
      this.LoadProperty();
    }
  }
  async LoadProperty() {
    let res = await AuthService.authlogin(Constants.user_mail, Constants.user_password);
    var account_num = res[0].account_num;
    var info = await DashboardService.getproperties(account_num);
    this.setState({
      dashboard: info.data.sort(
        (a, b) => a.property_status > b.property_status,
      )
    });
    this.setState({ refresh: !this.state.refresh });
    this.setState({ spinner: false });
    this.props.dashboardstatuschange(36);
  }
  componentDidMount() {
    this.props.authdownloadPropertyAttende();
    this.props.authdownloadPropertyBrokerAttende();
    this.downloadImages();
  }
  componentWillUnmount() { }
  addproperty() {
    this.props.dashboardstatuschange(11);
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
        let pdflocation = DocumentDir  + '/' + each_image.uniqueid + '.jpg';
        RNFetchBlob.fs.exists(pdflocation)
        .then((exists)=>{
          if(exists){ 
            new_count = new_count + 1;
            if (new_count == (length_size - 1)){
              Constants.uploadPhotoFlag = 1;
              this.props.authdownloadProperties();
             // this.setState({dashboard: dashboard_data});
             // this.setState({spinner: false})
            }
          }else{
            
            // if (flag == 0){
            //   this.setState({dashboard: null});
              
            //   flag = 1;
            // }
           
            RNFetchBlob.fetch('GET', each_image.property_photo_url)
            .then((res) => {
              
              let base64Str = res.data;
              
              RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64').then(() => { 
                console.log("downloaddata" + each_image.uniqueid); 
                new_count = new_count + 1;
                if (new_count == (length_size - 1)){
                  Constants.uploadPhotoFlag = 1;
                  this.props.authdownloadProperties();
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
  _renderItem = ({ item }) => {
    if (item === 0) {
      return (
        <View style={styles.collectioncell}>
          <View style={[styles.containerView, styles.addcellcontainer,]}>

            <View style={[styles.headerSection, styles.vcenter_wrapper]} >
              <Text style={styles.headerLbl}>
                Add Property
              </Text>
            </View>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => this.addproperty()}>
              <FastImage
                style={styles.plusImage}
                imageStyle={{ height: '100%', width: '100%' }}
                resizeMode={'contain'}
                source={Images.add_data}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.collectioncell}>
          <View style={styles.containerView}>
            <View style={styles.headerLayer}>
              <View style={styles.vcenter_wrapper}>
                <Text style={styles.mlsIdLbl}>
                  {item.property_mls_num}
                </Text>
              </View>
              <TouchableOpacity style={[styles.menuwrapper, styles.vcenter_wrapper]} onPress={() => this.itemClick(item)}>
                <Image
                  style={styles.menu}
                  source={Images.more_menue}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.propertyImage} onPress={() => this.itemClick(item)}>
                  <Image
                    style={styles.propertyImage}
                    imageStyle={styles.itemview}
                    source={{ 
                      uri: DocumentDir  + '/' + item.uniqueid + '.jpg',
                      cache: 'reload'
                }}
              
              // <FastImage
              //   style={styles.propertyImage}
              //   imageStyle={styles.itemview}
              //   // source={{ uri: item.property_photo_url }}
              //   source={{ uri: `${item.property_photo_url}?${new Date()}` }}
              />
            </TouchableOpacity>
            <View style={[styles.footerLayer]} opacity={1}>
              <View style={{ flex: 1, margin: 2, justifyContent: 'center', marginLeft: Layouts.MARGIN_NORMAL }}>
                <View style={{
                  width: '100%', flexDirection: 'row', justifyContent: 'space-between',
                }}>
                  <Text style={styles.price}>
                    ${item.property_price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
                  <View style={{ marginRight: Layouts.MARGIN_NORMAL }}>
                    {item.property_status === 'A' ? (
                      item.property_type === 'R' ? (<Text style={styles.rentalLbl}>
                        Rental
                    </Text>) : (<Text style={styles.rentalLbl}>
                          For Sale
                    </Text>)
                    ) : (
                        <Text style={[styles.rentalLbl, styles.saleLbl]}>
                          Inactive
                    </Text>
                      )}
                  </View>
                </View>
                <Text style={styles.address}>
                  {item.property_address}
                </Text>
                <Text style={styles.cityTownLbl}>
                  {item.property_city},{' '}
                  {item.property_state}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }

  };

  showDialog = status => {
    this.setState({ isDialogVisible: status });
  };
  checkmanagestatus = _item => {
    var item_Attendes = [];
    var item_Brokers = [];
    for (attende in Constants.AttendeData) {
      let each_attende = Constants.AttendeData[attende];
      if (each_attende.property_record_num === _item.property_record_num) {
        item_Attendes.push(each_attende);
      }
    }
    for (broker in Constants.BrokerData) {
      let each_broker = Constants.BrokerData[broker];
      if (each_broker.property_record_num === _item.property_record_num) {
        item_Brokers.push(each_broker);
      }
    }

    if (item_Attendes.length > 0 || item_Brokers.length > 0) {
      this.setState({
        checkmanage: true,
        selected_attendeData: item_Attendes,
        selected_brokerData: item_Brokers,
      });
      Constants.attendeedata = item_Attendes;
      Constants.brokerdata = item_Brokers;
    } else {
      this.setState({ checkmanage: false });
    }
  };
  itemClick = item => {
    Constants.selecteditem = item,
      this.setState({ selecteditem: item });
    if (item.property_status === 'A') {
      this.refs.modal3.open();
      this.checkmanagestatus(item);
      this.props.setpropertyitem(item);
    } else {
      // this.props.setpropertyitem(null);
    }
  };
  gonext = txt => {
    if (txt) {
      this.props.getbrokersname(txt);
    } else {
      Alert.alert('You must enter/select a title to continue', '');
    }
  };

  search = searchText => {
    this.setState({ searchText: searchText });
    this.changesearch(searchText);
  };
  clearsearch = () => {
    this.setState({ searchText: '' });
    let properties =
      this.props.dashboard && this.props.dashboard.properties;
    this.setState({ dashboard: properties.sort(
      (a, b) => a.property_status > b.property_status,
    ) });
  };
  changesearch = (searchText) => {
    let properties =
      this.props.dashboard && this.props.dashboard.properties
        ? this.props.dashboard.properties.sort(
            (a, b) => a.property_status > b.property_status,
          )
        : [];
    let res = [];

    if (!searchText || searchText === '') {
      res = [...properties];
    } else if (properties && properties.length) {
      res = properties.filter(
        item =>
          item.property_address
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1 ||
          item.property_city.toLowerCase().indexOf(searchText.toLowerCase()) >
          -1 ||
          item.property_state.toLowerCase().indexOf(searchText.toLowerCase()) >
          -1 ||
          item.property_zipcode
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1 ||
          item.property_price.toLowerCase().indexOf(searchText.toLowerCase()) >
          -1 ||
          item.property_mls_num
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1,
      );
    }
    this.setState({ dashboard: res.sort(
      (a, b) => a.property_status > b.property_status,
    ) });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  goproperty = id => {
    this.refs.modal3.close();
    if (id === 1) {
      this.refs.modal2.open();
    } else if (id === 2) {

      const shareoptions = {

        url: this.state.selecteditem.property_share_url,

      }
      Share.open(shareoptions);

    } else if (id === 3) {
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
          //  alert('User cancelled image picker');
        } else if (response.error) {
          // alert('error1');
        } else if (response.customButton) {
          //alert('error2');
        } else {

          ImageResizer.createResizedImage(response.uri, 400, 400, 'JPEG', 80).then((res) => {
            this.setState({ spinner: true });
            let source = { uri: res.uri };
            this.setState({
              filePath: source,
            });
            let filename = this.state.selecteditem.uniqueid + '.jpg';
            let body = new FormData();
            body.append('filetoupload', {
              uri:
                Platform.OS === 'android'
                  ? source.uri
                  : source.uri.replace('file://', ''),
              name: filename,
              type: 'image/jpg',
            });
            let Url = `${Constants.BASE_API_URL}/imageupload.php`;
            body.append('objectid', this.state.selecteditem.uniqueid);
            body.append('phototype', 'p');

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
              let pdflocation = DocumentDir  + '/' + this.state.selecteditem.uniqueid + '.jpg';
              RNFetchBlob.fs.unlink(pdflocation).then(()=>{
                  console.log('*********removed');
                  RNFetchBlob.fetch('GET', responseData[0].photourl)
                  .then((res123) => {
                    let base64Str = res123.data;
                    RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64').then(()=>{
                      console.log('*********created');
                      Constants.uploadPhotoFlag = 1;
                      this.props.authdownloadProperties();
                      // this.setState({dashboard: this.props.dashboard && this.props.dashboard.properties
                      //   ? this.props.dashboard.properties.sort(
                      //     (a, b) => a.property_status > b.property_status,
                      //   )
                      //   : []});

                  });
                });
              }) 
            }) 
    
        }) .done();
              
  
        }
      });
    } else if (id === 5) {
      Constants.selecteditem = this.state.selecteditem;
      Constants.attendeedata = this.state.selected_attendeData;
      Constants.brokerdata = this.state.selected_brokerData;
      this.props.dashboardstatuschange(13, {
        propertydata: this.state.selecteditem,
        attendeData: this.state.selected_attendeData,
        brokerData: this.state.selected_brokerData
      })
    } else if (id === 4) {
    }
  };
  handlehousetype = id => {
    let downloaddisclosure =
      this.props.login && this.props.login.downloaddisclosure.length
        ? this.props.login.downloaddisclosure
        : [];
    let getselproperty =
      this.props.dashboard && this.props.dashboard.selectedproperty
        ? this.props.dashboard.selectedproperty
        : null;
    if (id === 1) {
      if (
        getselproperty &&
        getselproperty !== null &&
        getselproperty.disclosure_form_required === 1
      ) {
        let flag = 0;
        if (downloaddisclosure.length > 0) {
          let disclosure = downloaddisclosure.filter(
            item =>
              item.property_type === getselproperty.property_type &&
              item.state === getselproperty.property_state,
          );
          if (disclosure.length > 0) {
            flag = 1;
          }
        }
        if (flag === 0) {
          Alert.alert(
            'Agency disclosure form has not been downloaded for this property',
            '',
          );
          return;
        }
      }
      let data = { data: getselproperty, type: 'public' };
      this.props.sethousehandletype(data);
      this.props.dashboardstatuschange(7);
    }
    else if (id === 2) {
      let data = { data: getselproperty, type: 'broker' };
      this.props.sethousehandletype(data);
      this.props.dashboardstatuschange(17);
    } else if (id === 3) {
    }
    this.refs.modal2.close();
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <SearchBar
          lightTheme={true}
          placeholder="Search..."
          platform={Platform.OS}
          containerStyle={styles.searchbar}
          inputContainerStyle={styles.searchbartxt}
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
          style={styles.propertyCollections}
        />
        <Modal
          style={[styles.modal, styles.modal2]}
          position={'center'}
          backdropPressToClose={false}
          ref={'modal2'}>
          <View style={styles.modalview_head}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', alignSelf: 'center' }}>
              Choose Open House Type
            </Text>
            <Text style={{ fontSize: 12, alignSelf: 'center' }}>
              Is this a Broker or Public Open House?
            </Text>
          </View>
          <TouchableOpacity
            style={styles.modalview5}
            onPress={() => this.handlehousetype(1)}>
            <Text style={{ textAlign: 'center', color: '#0000ff', width: '100%', fontSize: 16, height: 50, borderColor: '#808080', borderTopColor: 'white', paddingTop: 14, borderWidth: 0.2, paddingBottom: 7, }}>Public</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalview5}
            onPress={() => this.handlehousetype(2)}>
            <Text style={{ textAlign: 'center', color: '#0000ff', width: '100%', fontSize: 16, height: 50, borderColor: '#808080', borderTopColor: 'white', paddingTop: 14, borderWidth: 0.2, paddingBottom: 7 }}>Broker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalview5}
            onPress={() => this.handlehousetype(3)}>
            <Text style={{ textAlign: 'center', color: '#0000ff', width: '100%', fontSize: 16, height: 50, borderColor: 'white', borderTopColor: 'white', paddingTop: 14, borderWidth: 0.2, paddingBottom: 7 }}>Cancel</Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          style={this.state.checkmanage ? styles.modal4 : styles.modal3}
          position={'center'}
          backdropPressToClose={false}
          ref={'modal3'}>
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.goproperty(1)}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.start_openhouse}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>Start Open House</Text>
            </View>
          </TouchableOpacity>
          {this.state.checkmanage && (
            <TouchableOpacity
              style={styles.modalview}
              onPress={() => this.goproperty(5)}>
              <View style={styles.modalimgviewcontainer}>
                <Image
                  style={styles.modalimg}
                  imageStyle={styles.mdoalimgsty}
                  source={Images.manage_attendees}
                />
              </View>
              <View style={styles.modaltxtview}>
                <Text style={styles.modaltxt}>View Property Attendees</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.goproperty(2)}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.share_property}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>Share This Property</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.goproperty(3)}>
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
          <TouchableOpacity
            style={styles.modalview}
            onPress={() => this.goproperty(4)}>
            <View style={styles.modalimgviewcontainer}>
              <Image
                style={styles.modalimg}
                imageStyle={styles.mdoalimgsty}
                source={Images.cancel}
              />
            </View>
            <View style={styles.modaltxtview}>
              <Text style={styles.modaltxt}>Cancel</Text>
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

  itemcontainer: {
    backgroundColor: '#808080',

    width: '30%',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  itemview: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },


  itemtxtview: {
    width: '98%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemtxt: {
    fontSize: 16,
    marginLeft: -2,
    marginTop: 0,
    color: 'black',
  },
  itemtxt2: {
    fontSize: 16,
    color: 'black',
    marginTop: 4,
    marginLeft: -2,
  },
  itmeimgcontainer: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#808080',
    borderWidth: 0.5,
    height: 70,
    position: 'relative',
    padding: 5,
  },
  itmeimgcontainertop: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#808080',
    borderWidth: 0.5,
    height: 30,
    position: 'relative',
    padding: 5,
  },
  searchbar: {
    backgroundColor: '#F4F4F4',
  },
  searchbartxt: {
    backgroundColor: 'white',
  },
  modal: {
    height: Layouts.PROPERTY_MORDAL_ONE_HEHGIT,
    width: Layouts.PROPERTY_MORDAL_ONE_WIDTH,
    alignItems: 'center',
    borderRadius: Layouts.MARGIN_NORMAL,
  },

  modal2: {
    height: 200,
    width: '70%',
    borderRadius: 5,
    // backgroundColor: "#3B5998"
  },

  modal3: {
    height: Layouts.PROPERTY_MORDAL_ONE_HEHGIT2,
    width: Layouts.PROPERTY_MORDAL_ONE_WIDTH,
    alignItems: 'center',
    borderRadius: Layouts.MARGIN_NORMAL,
  },
  modal4: {
    height: Layouts.PROPERTY_MORDAL_ONE_HEHGIT,
    width: Layouts.PROPERTY_MORDAL_ONE_WIDTH,
    alignItems: 'center',
    borderRadius: Layouts.MARGIN_NORMAL,
  },
  btn: {
    margin: 10,
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },
  modalview: {
    height: Layouts.PROPERTY_MODAL_ONE_ITEM_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalview5: {
    width: '100%',
    flexDirection: 'row',
  },
  modalview_head: {
    width: '90%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalimg: {
    marginLeft: 20,
    width: Layouts.PROPERTY_MODAL_ONE_ICON_SIZE,
    height: Layouts.PROPERTY_MODAL_ONE_ICON_SIZE,
  },
  mdoalimgsty: {
    width: Layouts.PROPERTY_MODAL_ONE_ICON_SIZE,
    height: Layouts.PROPERTY_MODAL_ONE_ICON_SIZE,
    alignSelf: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  modaltxt: {
    fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
    justifyContent: 'center',
  },
  modalimgviewcontainer: {
    width: Layouts.PROPERTY_MODAL_ONE_ITEM_HEIGHT,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modaltxtview: {
    width: '80%',
    marginLeft: Layouts.MARGIN_LARGE,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D4D4D4',
    justifyContent: 'center',
  },
  modaltxtviewcancel: {
    width: '80%',
    marginLeft: Layouts.MARGIN_LARGE,

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

  propertyCollections: {
    // backgroundColor: '#555',
    marginLeft: Layouts.MARGIN_NORMAL / 2,
    marginTop: Layouts.MARGIN_NORMAL / 2,
    marginBottom: Layouts.MARGIN_NORMAL / 2,
    marginRight: Layouts.MARGIN_NORMAL / 2,
  },

  collectioncell: {
    width: Layouts.ITEM_SIZE,
    height: Layouts.ITEM_SIZE,
  },

  containerView: {
    borderColor: '#808080',
    borderWidth: 0.5,
    borderRadius: Layouts.MARGIN_NORMAL / 2,
    flex: 1,
    backgroundColor: 'white',
    margin: Layouts.ITEM_MARGIN,
  },

  addcellcontainer: {
    backgroundColor: Constants.UIColor.lightGray,
  },

  headerLayer: {
    margin: Layouts.MARGIN_NORMAL / 2,
    height: Layouts.PROPERTY_ITEM_TOP_HEIGHT,
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
    marginLeft: 10,
    fontWeight: 'bold',
  },

  menuwrapper: {
    marginRight: Layouts.MARGIN_NORMAL / 2,
    width: Layouts.MARGIN_LARGE,
    height: Layouts.PROPERTY_ITEM_TOP_HEIGHT,
  },

  menu: {
    width: 25,
    height: 25,
  },

  propertyImage: {
    flex: 1,
    height: Layouts.ITEM_MIDDLE_HEIGHT,
  },

  footerLayer: {
    height: Layouts.PROPERTY_ITEM_BOTTOM_HEIGHT,
    justifyContent: 'center',
    margin: 1,
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
    marginTop: Constants.MARGIN_TEXT_LINE,
    marginLeft: Constants.MARGIN_TEXT_LINE,
  },

  cityTownLbl: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    backgroundColor: 'white',
    color: 'black',
    marginTop: Constants.MARGIN_TEXT_LINE,
    marginLeft: Constants.MARGIN_TEXT_LINE,
  },

  rentalLbl: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'right',
    alignSelf: 'flex-end',
  },

  saleLbl: {
    color: 'red',
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logout,
      setpropertyitem: Actions.setpropertyitem,
      sethousehandletype: Actions.sethousehandletype,
      authdownloadPropertyAttende: Actions.authdownloadPropertyAttende,
      authdownloadPropertyBrokerAttende:
        Actions.authdownloadPropertyBrokerAttende,
      authdownloadProperties: Actions.authdownloadProperties,
      dashboardstatuschange: Actions.dashboardstatuschange,
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
)(PropertyScreenPad);
