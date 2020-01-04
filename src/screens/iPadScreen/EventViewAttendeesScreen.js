import React, { Component } from 'react';
import { Avatar, Text, Button, Image } from 'react-native-elements';
import { Linking, Dimensions, FlatList, View } from 'react-native';
import { Images } from '@commons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Layouts } from '../../common';
class EventViewAttendeesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: this.props.ipad.data.attendeData,
      txtItem: this.props.ipad.data.eventdata,
    };
  }
  componentDidMount() {
  }
  componentDidUpdate() {
    if (this.props.ipad.dashboardstatus === 721 && prevProps.ipad.dashboardstatus === 70) {
      this.exportCSVFile();
    }
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



  _renderItem = ({ item }) => {
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
  render() {

    // attendeData

    return (
      <View style={{ flex: 1, flexDirection: 'row', borderColor: '#808080', borderStyle: 'solid', borderWidth: 0.5 }}>
        <View style={{
          flex: 1, margin: 5,
        }}>
        
            <Image
                style={styles.itemview}
                imageStyle={styles.itemimg}
                source={{ uri: this.state.txtItem.event_photo_url }}
              />
              
          
          <View style={{backgroundColor:'white'}}>
          <View style={{backgroundColor:'white'}}>
          <View style={{ width: '98%', flexDirection: 'row', justifyContent: 'space-between',}}>
            <Text style={[styles.itemtxt,{alignSelf: 'flex-start'}]}>{this.state.txtItem.event_name}</Text>
            {this.checkActive(this.state.txtItem.event_date) === 'A' ? (
              <Text style={{ color: 'black',fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,alignSelf: 'flex-end' }}>Active</Text>
            ) : (
                <Text style={{ color: 'red',fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,alignSelf: 'flex-end' }}>Inactive</Text>
              )}
             </View> 
            <Text style={styles.itemtxt2}>
              {this.convertStringtoDate(this.state.txtItem.event_date)}
            </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
          {
            this.state.datasource && (
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
            )
          }
          
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
  itmeimgcontainer_a: {
    width: '90%',
    flexDirection: 'row',
  },
  itemview: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
  },
  itemview1: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
  },
  itemimg: {
    width: '100%',
    height: '100%',
    
  },
  itemtxtview_a: {
    width: '100%',
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemimgview_a: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 0.5,
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
    backgroundColor: 'white',
    height: 80,
    position: 'relative',
    padding: 5,
  },
  itemtxtview: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemtxt: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    color: 'black',
    padding: 2,
  },
  itemtxt2: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    color: 'black',
    padding: 2,
  },
  itemview_a: {
    flex: 1,
    borderColor: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    borderBottomColor: '#808080',
    backgroundColor: '#ffffff',
  },
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange: Actions.dashboardstatuschange
    },
    dispatch,
  );
}
function mapStateToProps({ login, dashboard, ipad }) {
  return {
    ipad: ipad,
    login: login,
    dashboard: dashboard,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventViewAttendeesScreen);
