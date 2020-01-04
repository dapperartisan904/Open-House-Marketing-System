import React, { Component } from 'react';
import { Avatar, Text, Image } from 'react-native-elements';
import { View, Label } from 'native-base';
import { Linking } from 'react-native';
import { Images, Constants } from '@commons';
import { Button } from 'native-base';
import Moment from 'moment';
import email from 'react-native-email';
import Share from 'react-native-share';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import connect from 'react-redux/es/connect/connect';
import Layouts from '../../common/Layoutsd';
// import {NODATA} from 'dns';
class Detail_AttendeeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtItem: this.props.ipad.data
    };
  }
  Return_Bool(item) {
    if (item === 1) {
      return 'YES';
    } else {
      return 'NO';
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
  componentDidMount() {
  }
  componentDidUpdate() {
    if (this.props.ipad.dashboardstatus === 722 && prevProps.ipad.dashboardstatus === 70) {
      this._handelMail();
    }
  }
  _handelMail = () => {
    const shareOptions = {
      title: 'Share via',
      email: Constants.user_mail,
      message: 'Disclosure Form',
      social: Share.Social.EMAIL
    };
    Share.shareSingle(shareOptions);

  };
  render() {
    if (Constants.selecteditem.attendee_pdf_url) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 9 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                  marginLeft: 5,
                }}>
                <Avatar
                  rounded
                  source={Images.avataricon}
                  size={Layouts.LEAD_DETAIL_AVARTA_SIZE / 2}
                  overlayContainerStyle={{ backgroundColor: '#ffffff', borderColor: '#808080', borderWidth: 0.5 }}
                  activeOpacity={0.9}
                />
              </View>
              <View style={{ flex: 5, marginTop: Layouts.LEAD_DETAIL_MARGIN_TEXT_LINE }}>
                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    {this.state.txtItem.attendee_first_name} {this.state.txtItem.attendee_last_name}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Email:</Text>
                  <Text style={styles.txtnormal}>{this.state.txtItem.attendee_email}</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Phone:</Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_telephone}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Visited:</Text>
                  <Text style={styles.txtnormal}>{this.convertStringtoDate(this.state.txtItem.created_at)}</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Add To Property Match?</Text>
                  <Text style={styles.txtnormal}>
                    {/* {this.state.txtItem.attendee_prospect_match} */}
                    {this.Return_Bool(this.state.txtItem.attendee_prospect_match)}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    Do you Currently Own or Rent?
                </Text>
                  <Text style={styles.txtnormal}>
                    {/* {this.state.txtItem.attendee_own_or_rent} */}
                    {this.Return_Bool(this.state.txtItem.attendee_own_or_rent)}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Received CMA?:</Text>
                  <Text style={styles.txtnormal}>
                    {/* {this.state.txtItem.attendee_receive_cma} */}
                    {this.Return_Bool(this.state.txtItem.attendee_receive_cma)}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    How Soon Are You Looking to Buy?
                </Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_how_soon_looking_to_buy_or_rent}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Lead Source:</Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_hear_about_listing} :
                  {this.state.txtItem.attendee_how_hear_about_listing_answer}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    Are You currently pre-quelified for a mortgage?
                </Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_are_you_prequalified}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    How good is your current credit?:
                </Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_how_good_is_your_credit}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    Do you currently have a Real Estate Attorney?
                </Text>
                  <Text style={styles.txtnormal}>
                    {/* {this.state.txtItem.attendee_have_real_estate_attorney} */}
                    {this.Return_Bool(this.state.txtItem.attendee_have_real_estate_attorney)}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    How would you like to me follow up with you?
                </Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_follow_up_via}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Note</Text>
                </View>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  fontSize={Constants.TEXT_FONT_SIZE_SMALL}
                  style={{
                    height: Layouts.LEAD_DETAIL_NOTE_HEIGHT,
                    borderColor: 'grey',
                    borderRadius: 10,
                    paddingLeft: 4,
                    width: '95%',
                    marginTop: 10,
                    borderWidth: 0.5,
                  }}
                  onChangeText={attendee_notes => {
                    this.setState({ txtItem: attendee_notes });
                  }}
                  value={this.state.txtItem.attendee_notes}></TextInput>
              </View>
            </View>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 9 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  marginTop: Layouts.MARGIN_NORMAL,
                  marginLeft: Layouts.MARGIN_NORMAL,
                }}>
                <Avatar
                  rounded
                  source={Images.avataricon}
                  size={Layouts.LEAD_DETAIL_AVARTA_SIZE}
                  overlayContainerStyle={{ backgroundColor: '#ffffff', borderColor: '#808080', borderWidth: 0.5 }}
                  activeOpacity={0.9}
                />
              </View>
              <View style={{ flex: 5, marginTop: Layouts.LEAD_DETAIL_MARGIN_TEXT_LINE }}>
                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    {this.state.txtItem.attendee_first_name} {this.state.txtItem.attendee_last_name}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Email:</Text>
                  <Text style={styles.txtnormal}>{this.state.txtItem.attendee_email}</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Phone:</Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_telephone}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Visited:</Text>
                  <Text style={styles.txtnormal}>{this.convertStringtoDate(this.state.txtItem.created_at)}</Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Add To Property Match?</Text>
                  <Text style={styles.txtnormal}>
                    {/* {this.state.txtItem.attendee_prospect_match} */}
                    {this.Return_Bool(this.state.txtItem.attendee_prospect_match)}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    Do you Currently Own or Rent?
                </Text>
                  <Text style={styles.txtnormal}>
                    {/* {this.state.txtItem.attendee_own_or_rent} */}
                    {this.Return_Bool(this.state.txtItem.attendee_own_or_rent)}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Received CMA?:</Text>
                  <Text style={styles.txtnormal}>
                    {/* {this.state.txtItem.attendee_receive_cma} */}
                    {this.Return_Bool(this.state.txtItem.attendee_receive_cma)}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    How Soon Are You Looking to Buy?
                </Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_how_soon_looking_to_buy_or_rent}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Lead Source:</Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_hear_about_listing} :
                  {this.state.txtItem.attendee_how_hear_about_listing_answer}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    Are You currently pre-quelified for a mortgage?
                </Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_are_you_prequalified}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    How good is your current credit?:
                </Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_how_good_is_your_credit}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    Do you currently have a Real Estate Attorney?
                </Text>
                  <Text style={styles.txtnormal}>
                    {/* {this.state.txtItem.attendee_have_real_estate_attorney} */}
                    {this.Return_Bool(this.state.txtItem.attendee_have_real_estate_attorney)}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>
                    How would you like to me follow up with you?
                </Text>
                  <Text style={styles.txtnormal}>
                    {this.state.txtItem.attendee_follow_up_via}
                  </Text>
                </View>

                <View style={styles.containertxt}>
                  <Text style={styles.txtbold}>Note</Text>
                </View>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  fontSize={Constants.TEXT_FONT_SIZE_SMALL}
                  style={{
                    height: Layouts.LEAD_DETAIL_NOTE_HEIGHT,
                    borderColor: 'grey',
                    borderRadius: 10,
                    paddingLeft: 4,
                    width: '95%',
                    marginTop: 10,
                    borderWidth: 0.5,
                  }}
                  onChangeText={attendee_notes => {
                    this.setState({ txtItem: attendee_notes });
                  }}
                  value={this.state.txtItem.attendee_notes}></TextInput>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}
const styles = {
  containertxt: {
    flexDirection: 'row',
    marginTop: Layouts.LEAD_DETAIL_MARGIN_TEXT_LINE,
  },
  txtbold: {
    fontSize: Layouts.TEXT_FONT_SIZE_SMALL,
    fontWeight: 'bold',
    maxWidth: '70%',
  },
  txtnormal: {
    fontSize: Layouts.TEXT_FONT_SIZE_SMALL,
    fontWeight: 'normal',
    marginLeft: 5,
    maxWidth: '70%',
  },
  btn: {
    backgroundColor: '#38a2c2',
    height: 70,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',

  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
  },
};
function mapStateToProps({ login, dashboard, ipad }) {
  return {
    ipad: ipad,
    login: login,
    dashboard: dashboard,
  };
}
export default connect(
  mapStateToProps,
)(Detail_AttendeeScreen);
