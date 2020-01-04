import React, { Component } from 'react';

import ImageResizer from 'react-native-image-resizer';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';
import Orientation from 'react-native-orientation'
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
import RNFetchBlob from 'rn-fetch-blob';

// import CacheImage from './CacheImage';

const _keyExtractor = item => item.uniqueid;
const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
// const dirs = RNFetchBlob.fs.dirs;

// var RNFS = require('react-native-fs');
class PropertyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Properties',
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
          onPress={navigation.getParam('addproperty')}>
          {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
          <Image
            source={Images.createicon}
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
      refresh: false,
      dashboard:
      this.props.dashboard && this.props.dashboard.properties
        ? this.props.dashboard.properties.sort(
          (a, b) => a.property_status > b.property_status,
        )
        : [],
    };
    this.downloadImages = this.downloadImages.bind(this);
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.login.downloadpropertiesattendestatus === 200 &&
      prevProps.login.downloadpropertiesattendestatus === 100
    ) {
      Constants.AttendeData = this.props.login.downloadpropertiesattende;
      //   alert(Constants.AttendeData);
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
        this.setState({
          dashboard: this.props.login.downloadproperties.sort(
            (a, b) => a.property_status > b.property_status,
          )
        });
        this.setState({ spinner: false });
      }
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({ addproperty: this._addproperty });
    this.props.authdownloadPropertyAttende();
    this.props.authdownloadPropertyBrokerAttende();
    this.downloadImages();

  }
  componentWillUnmount() { }
  // checkFileExists(item){
  //   var path = RNFS.DocumentDirectoryPath + '/property/' + item.property_record_num + '.jpg';
  //   const options = {
  //     url: item.property_photo_url,
  //     dest: path
  //   }
  //   donwload.image(options).then(({filename, image}) => {
  //     alert('saveed');
  //   }).catch((err) => alert(err))

  //   // //alert(path);
  //   // RNFS.exists(path).then((exists) => {
  //   //     if (exists) {
  //   //       return 'file://' + path;
  //   //     }else {
  //   //       return item.property_photo_url;
  //   //     }
  //   // });
  //   return item.property_photo_url;

  // }
  refresh() {
    this.setState({
      dashboard:
        this.props.dashboard && this.props.dashboard.properties
          ? this.props.dashboard.properties.sort(
            (a, b) => a.property_status > b.property_status,
          )
          : [],
    })
    this.setState({ refresh: !this.state.refresh })
  }
  _addproperty = () => {
    this.props.navigation.navigate('createPropertyScreen', { callHome: this.refresh.bind(this) });
  };
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.itemClick(item)}
        style={styles.itemcontainer}>
        <Image
          style={styles.itemview}
          imageStyle={styles.itemview1}
          source={{ 
            // uri: this.downloadImages(item),
            uri: DocumentDir  + '/' + item.uniqueid + '.jpg',
            cache: 'reload'
           }}
          
          
          // source={{ uri: Constants.IMAGE_BASE_URL + item.uniqueid + ".jpg"}}
          // source={{ uri: `${item.property_photo_url}?${new Date()}` }}
        />
        <View style={styles.itmeimgcontainer} opacity={0.8}>
          <View style={styles.itemtxtview}>
            <Text style={[styles.itemtxt, { alignSelf: 'flex-start' }]}>
              ${item.property_price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>
            {item.property_status === 'A' ? (
              <Text style={{ color: 'white', fontSize: 14, alignSelf: 'flex-end' }}>
                Active
              </Text>
            ) : (
                <Text style={{ color: 'red', fontSize: 14, alignSelf: 'flex-end' }}>
                  Inactive
              </Text>
              )}
          </View>
          <View style={styles.itemtxtview}>
            <Text style={styles.itemtxt2}>
              {item.property_address},{' '}{item.property_city},{' '}
              {item.property_state}{}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  showDialog = status => {
    this.setState({ isDialogVisible: status });
  };
  checkmanagestatus = _item => {
    // alert(_item.property_record_num);
    var item_Attendes = [];
    var item_Brokers = [];
    for (attende in Constants.AttendeData) {
      let each_attende = Constants.AttendeData[attende];
      if (each_attende.property_record_num === _item.property_record_num) {
        item_Attendes.push(each_attende);
      }
      //   if (attende.attendee_email === 'Dfgfd@gmail.com') {
      //     alert('same');
      //   }
    }
    for (broker in Constants.BrokerData) {
      let each_broker = Constants.BrokerData[broker];
      if (each_broker.property_record_num === _item.property_record_num) {
        item_Brokers.push(each_broker);
        // alert('same');
      }
    }

    if (item_Attendes.length > 0 || item_Brokers.length > 0) {
      this.setState({
        checkmanage: true,
        selected_attendeData: item_Attendes,
        selected_brokerData: item_Brokers,
      });
      //   selected_attendeData: null,
      //   selected_brokerData: null,
    } else {
      this.setState({ checkmanage: false });
    }
    // alert(this.state.checkmanage);
  };
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
           
              this.setState({dashboard: dashboard_data});
             // this.setState({spinner: false})
            }
          }else{
            
            if (flag == 0){
              this.setState({dashboard: null});
              
              flag = 1;
            }
           
            RNFetchBlob.fetch('GET', each_image.property_photo_url)
            .then((res) => {
              
              let base64Str = res.data;
              
              RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64').then(() => { 
                console.log("downloaddata" + each_image.uniqueid); 
                new_count = new_count + 1;
                if (new_count == (length_size - 1)){
                 
                  this.setState({dashboard: dashboard_data});
                 // this.setState({spinner: false})
                }
                
              });
               
          })
          }
         
          
        })
        .catch(()=>{})
  
      }
     
      
      
    
    

    // setTimeout(function () {
    //   this.setState({spinner: false});
    //   // this.setState({dashboard : dashboard_data});
    // }, 10000);
    //console.log("download is finished");  

    //  this.state.dashboard.map((img,index)=>{
      
    //  });
     
   
  }
  itemClick = item => {
    this.setState({ selecteditem: item });
    if (item.property_status === 'A') {
      this.refs.modal3.open();
      this.checkmanagestatus(item);
      this.props.setpropertyitem(item);
    } else {
      this.props.setpropertyitem(null);
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
    this.setState({
      dashboard:
        this.props.login && this.props.login.downloadproperties
          ? this.props.login.downloadproperties
          : [],
    })
  };
  changesearch = (searchText) => {
    let properties =
      this.props.dashboard && this.props.dashboard.properties
        ? this.props.dashboard.properties
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
    this.setState({ dashboard: res });
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  
  goproperty = id => {
    this.refs.modal3.close();
    if (id === 1) {
      //start open house
      this.refs.modal2.open();
    } else if (id === 2) {
      //share this property

      // Linking.canOpenURL(Constants.shareurl).then(supported => {
      //   if (supported) {
      //     Linking.openURL(Constants.shareurl);
      //   } else {
      //     console.log("Don't know how to open URI: " + Constants.shareurl);
      //   }
      // });

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
 
        } else if (response.error) { 
        } else if (response.customButton) { 
        } else { 
          console.log("##############");
          console.log(response.uri);
          console.log("##############");

          ImageResizer.createResizedImage(response.uri, 400, 400, 'JPEG', 80).then((res) => {
            console.log("##############");
            console.log(res);
            console.log("##############");
            let saveData = res.data;

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
           // alert(filename);

            fetch(Url, {
              method: 'POST',
              headers: { 'Content-Type': 'multiaprt/form-data' },
              body: body,
            })
              .then((response) => response.json())
              .then((responseData) => {
                console.log('*****************');
                console.log(responseData);
                this.setState({dashboard: null});
                let pdflocation = DocumentDir  + '/' + this.state.selecteditem.uniqueid + '.jpg';
                RNFetchBlob.fs.unlink(pdflocation).then(()=>{
                    console.log('*********removed');
                    RNFetchBlob.fetch('GET', responseData[0].photourl)
                    .then((res123) => {
                      let base64Str = res123.data;
                      RNFetchBlob.fs.writeFile(pdflocation, base64Str, 'base64').then(()=>{
                        console.log('*********created');
                        // this.setState({spinner: false });
                        // this.setState({ refresh: !this.state.refresh })
                        // this.setState({
                        //   dashboard:
                        //     this.props.login && this.props.login.downloadproperties
                        //       ? this.props.login.downloadproperties
                        //       : [],
                        // })
                        Constants.uploadPhotoFlag = 1;
                        this.props.authdownloadProperties();
                        

                    });
                  });
                }) 
              }) 
      
          }) .done();


        }
      });
    } else if (id === 5) {
      //managethis.
      this.props.navigation.navigate('propertyViewAttendeesScreen', {
        propertydata: this.state.selecteditem,
        attendeData: this.state.selected_attendeData,
        brokerData: this.state.selected_brokerData,
      });
    } else if (id === 4) {
      //cancel
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
      this.props.navigation.navigate('startOpenHouseOneScreen');
    } else if (id === 2) {
      let data = { data: getselproperty, type: 'broker' };
      this.props.sethousehandletype(data);
      this.props.navigation.navigate('startOpenHouseOneScreen');
    } else if (id === 3) {
    }
    this.refs.modal2.close();
  };
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
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
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
          extraData={this.state.refresh}
          data={this.state.dashboard}
          numColumns={1}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
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
          {/* <View style={styles.modalview}>
                        <Text style={{fontSize: 15, fontWeight:'bold'}}>Is this a Broker or Public Open House?</Text>
                    </View> */}
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
          style={[
            styles.modal,
            this.state.checkmanage ? styles.modal4 : styles.modal3,
          ]}
          position={'bottom'}
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
    width: Dimensions.get('window').width * 0.96,
    height: Dimensions.get('window').width * 0.6,
    marginLeft: Dimensions.get('window').width * 0.02,
    marginRight: Dimensions.get('window').width * 0.02,
    marginBottom: 5,
    marginTop: 5,
  },
  itemview: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },

  itemimg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    margin: '10%',
  },
  itemimgview: {
    height: Dimensions.get('window').width * 0.1,
    width: Dimensions.get('window').width * 0.1,
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    marginTop: 15,
    backgroundColor: 'white',
  },
  itemtxtview: {
    width: '98%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemtxt: {
    fontSize: 14,
    marginLeft: -2,
    color: 'white',
  },
  itemtxt2: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
    marginLeft: -2,
  },
  itmeimgcontainer: {
    width: '100%',
    backgroundColor: '#808080',
    height: 50,
    position: 'absolute',
    padding: 5,
    bottom: 0,
  },
  searchbar: {
    backgroundColor: '#F4F4F4',
  },
  searchbartxt: {
    backgroundColor: 'white',
  },
  modal: {
    // justifyContent: 'center',
    alignItems: 'center',
  },

  modal2: {
    height: 200,
    width: '70%',
    borderRadius: 5,
    // backgroundColor: "#3B5998"
  },

  modal3: {
    height: 250,
    width: '96%',
    bottom: 10,
    borderRadius: 5,
  },
  modal4: {
    height: 300,
    width: '96%',
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
    width: 40,
    height: 40,
  },
  mdoalimgsty: {
    width: 30,
    height: 30,
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
    width: '80%',
    marginLeft: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#D4D4D4',
  },
  modaltxtviewcancel: {
    width: '80%',
    marginLeft: 20,
    // borderBottomWidth: 0.2,
    // borderBottomColor: '#ffffff',

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
)(PropertyScreen);
