import React, {Component} from 'react';
import {Avatar, Text, Button, Image} from 'react-native-elements';
import {Linking, Dimensions, FlatList, View} from 'react-native';
import {Images, Constants} from '@commons';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Moment from 'moment';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Orientation from 'react-native-orientation'
class EventViewAttendeesScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      title: params.eventdata.event_name,
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
          onPress={navigation.getParam('exportCSVFile')}>
          {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
          <Image
            source={Images.ic_upload}
            imageStyle={{width: 28, height: 28}}
            style={{width: 28, height: 28}}
          />
        </TouchableOpacity>
      ),
      // headerLeft: (
      //   <TouchableOpacity
      //     style={{
      //       marginLeft: 15,
      //       flex: 1,
      //       alignSelf: 'center',
      //       justifyContent: 'center',
      //     }}
      //     onPress={() => navigation.goBack()}>
      //     <Image
      //       source={Images.backicon}
      //       imageStyle={{width: 25, height: 25}}
      //       style={{width: 25, height: 25}}
      //     />
      //   </TouchableOpacity>
      // ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      datasource: this.props.navigation.state.params.attendeData,
    };
      if (Constants.device_Pad) {
        Orientation.lockToLandscape();
      } else {
        Orientation.lockToPortrait();
      }
  }
  componentDidMount() {
    this.props.navigation.setParams({exportCSVFile: this.exportCSVFile});
  }
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
  exportCSVFile = () => {
    const values = this.state.datasource;
    const headerString =
      'First Name,Last Name,Email,Event Record Number,Event Name,Event Date\n';
    var rowstring = '';
    for (let i = 0; i < values.length; i++) {
      let data = values[i];
      let each_row =
        data.event_attendee_first_name +
        ',' +
        data.event_attendee_last_name +
        ',' +
        data.event_attendee_email +
        ',' +
        data.event_attendee_rec_num +
        ',' +
        data.event_id +
        ',' +
        data.created_at +
        '\n';
      rowstring = rowstring + each_row;
    }
    const csvString = `${headerString}${rowstring}`;
    // write the current list of answers to a local csv file
    const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/event.csv`;
    console.log('pathToWrite', pathToWrite);
    // pathToWrite /storage/emulated/0/Download/data.csv
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        console.log(`wrote file ${pathToWrite}`);
        let options = {
          type: 'text/csv',
          url: pathToWrite,
          social: Share.Social.EMAIL
        }
       Share.open(options);
        // wrote file /storage/emulated/0/Download/data.csv
      })
      .catch(error => console.error(error));
  };
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

 
  
  _renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.itemview_a}>
          <View style={styles.itmeimgcontainer_a}>
            <View style={styles.itemimgview_a}>
              <Image
                style={styles.itemimg_a}
                imageStyle={styles.itemimg_a}
                source={Images.avataricon}
              />
            </View>
            <View style={styles.itemtxtview_a}>
              <Text style={styles.itemtxt_a}>
                {item.event_attendee_first_name}{' '}{item.event_attendee_last_name}
              </Text>
              <Text style={styles.itemtxt2_a}>
                Email: {item.event_attendee_email}
              </Text>
              <Text style={styles.itemtxt2_a}>
                Phone: {item.event_attendee_telephone}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    const txtItem = this.props.navigation.state.params.eventdata;
    // attendeData

    return (
      <View style={{flex: 1}} onLayout={this._onLayout}>
        <View style={{flex: 1,
    marginLeft:10,
    marginRight:10,
    marginTop:10,}}>
          <Image
            style={styles.itemview}
            imageStyle={styles.itemview1}
            source={{uri: txtItem.event_photo_url}}
          />
          <View style={styles.itmeimgcontainer}>
            <View style={styles.itemtxtview}>
              <Text style={styles.itemtxt}>{txtItem.event_name}</Text>
              {this.checkActive(txtItem.event_date) === 'A' ? (
                <Text style={{color: 'white'}}>Active</Text>
              ) : (
                <Text style={{color: 'red'}}>Inactive</Text>
              )}
            </View>
            <View style={styles.itemtxtview}>
              <Text style={styles.itemtxt2}>
                {this.convertStringtoDate(txtItem.event_date)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 2, marginLeft:10, marginRight:10}}>
          <Text
            style={{
              margin: 15,
              marginBottom: 5,
              fontSize: 16,
              color: '#39A2C1',
              fontWeight: 'bold',
              alignSelf: 'flex-start',
            }}>
            Attendees
          </Text>
          <FlatList
            data={this.state.datasource}
            numColumns={1}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}
const styles = {
  itemcontainer: {
    width: Dimensions.get('window').width * 0.96-20,
    height: Dimensions.get('window').width * 0.6,
    marginLeft: Dimensions.get('window').width * 0.02-10,
    marginRight: Dimensions.get('window').width * 0.02-10,
    marginBottom: 5,
    marginTop: 5,
  },
  itmeimgcontainer_a: {
   
    width: '90%',
    flexDirection: 'row',
  },
  itemview: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  itemview1: {
    borderRadius: 10,
    borderColor:'#808080',
    borderWidth:0.2,
  },
  itemimg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    margin: '10%',
  },
  itemtxtview_a: {
    width: '80%',
    // marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemimgview_a: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    // marginTop: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  itemimg_a: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemtxt_a: {
    // textAlign:'center',
    // fontWeight: 'bold',
    fontSize: 12,
  },
  itemtxt2_a: {
    fontSize: 12,
    marginTop: 1,
  },
  itmeimgcontainer: {
    width: '100%',
    backgroundColor: '#524e4ec2',
    height: 50,
    position: 'absolute',
    padding: 5,
    bottom: 0,
  },
  itemtxtview: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemtxt: {
    color: 'white',
  },
  itemtxt2: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
  itemview_a: {
    flex: 1,
    borderColor:'white',
    alignItems: 'center',
    borderWidth: 0.2,
    borderBottomColor: '#808080',
    backgroundColor: '#ffffff',
  },
};
export default EventViewAttendeesScreen;
