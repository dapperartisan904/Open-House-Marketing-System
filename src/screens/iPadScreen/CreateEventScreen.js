import React, { Component } from 'react';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';

import connect from 'react-redux/es/connect/connect';
import { Calendar } from 'react-native-calendars';
import Moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import { Images, Fonts, Constants } from '@commons';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import { Button } from 'native-base';
import UUIDGenerator from 'react-native-uuid-generator';
import { Item, Input, Label } from 'native-base';
import Orientation from 'react-native-orientation'
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../common/Colors';

class CreateEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountnum:
        props.login.account && props.login.account.account_num
          ? props.login.account.account_num
          : '',
      eventName: '',
      eventDate: '',
      uniqueid: '',
      selectedFlag: 0,
      checkedFlag: 0,
    };

    this.onDateChange = this.onDateChange.bind(this);
  }
  componentDidMount() {
    UUIDGenerator.getRandomUUID(uuid => {
      this.setState({ uniqueid: uuid });
    });

  }
  _save = () => {
    const { eventName, eventDate, uniqueid, accountnum } = this.state;
    data = {
      accountnum: accountnum,
      uniqueid: uniqueid,
      eventdate: eventDate,
      eventname: eventName,
    }

    if (eventName === '') {
      Alert.alert('Please Enter Event Name');
    } else if (this.state.selectedFlag === 0) {
      Alert.alert('Please Select Event Date');
    } else if (this.state.checkedFlag === 0) {
      Alert.alert('Please Select Correct Event Date');
    }
    else {
      this.props.createevent(data);
    }
  };
  componentWillUnmount() {
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 450) {
      this.props.dashboardstatuschange(32);
      Constants.eventflag = 0;
    }
  }

  onDateChange(date) {
    
    
    // var selectday = Moment(date).format('YYYY-MM-DD');
    // if (date > new Date().valueOf()) {
    //   this.setState({ checkedFlag: 1, selectedFlag: 1, eventDate: selectday })
    // } else {
    //   alert('You can not create event in the past.');
    //   this.setState({ checkedFlag: 0, selectedFlag: 1, eventDate: '' })
    // }


    var selectday = Moment(date).format('YYYY-MM-DD');
    const oneday = 60 * 60 * 24 * 1000;
    if (date > new Date().valueOf() ){
      this.setState({ checkedFlag: 1, selectedFlag: 1, eventDate: selectday })
    }else if((new Date().valueOf() - date < oneday) ){
      this.setState({ checkedFlag: 1, selectedFlag: 1, eventDate: selectday })
    }
     else {
      alert('You can not create event in the past');
      // alert(new Date().valueOf() - date);
      this.setState({ checkedFlag: 0, selectedFlag: 1, eventDate: '' })
    }
  }
  render() {
    const calendar_height = Constants.CREAT_EVENT_MODAL_HEIGTHT - 200;
    const calendar_width = Constants.CREAT_EVENT_MODAL_WIDTH;
    const minDate = new Date(2012, 1, 1);
    const maxDate = new Date(2999, 12, 30);
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={styles.title}>Create Event</Text>
        <Item stackedLabel style={styles.eventName}>
          <Label style={styles.txtlabel}>Event Name</Label>
          <TextInput
            value={this.state.eventName}
            width={'100%'}
            height={Constants.INPUTTEXT_WIDTH_NORMAL}
            fontSize={Constants.TEXT_FONT_SIZE_NORMAL}
            placeholder='Event Namte'
            onChangeText={text => this.setState({ eventName: text })}
          />
        </Item>
        <CalendarPicker
          width={calendar_width}
          height={calendar_height}
          startFromMonday={true}
          todayBackgroundColor="#f2e6ee"
          selectedDayColor="#7300e6"
          minDate={minDate}
          maxDate={maxDate}
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
        <View style={styles.txtrow}>
          <Button block style={styles.txtviewitem} onPress={() => this._save()}>
            <Text style={[styles.btntxt]}>SAVE</Text>
          </Button>
          <Button block style={styles.txtviewitem} onPress={() => { this.props.dashboardstatuschange(15); }}>
            <Text style={[styles.btntxt]}>CANCEL</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {

  txtinput: {
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
    color: Colors.BUTTON_COLOR,
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
    fontSize: Constants.BUTTON_FONT_SIZE_SMALL,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtlabel: {
    fontSize: Constants.TEXT_FONT_SIZE_SMALL,
    fontWeight: 'bold',
    color: 'red',
  },
  pickeritem: {
    height: 50,
  },
  btn: {
    backgroundColor: '#38a2c2',
    height: 60,
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15,
    width: 150,
  },

  container: {
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
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  eventName: {
    marginTop: 20,
  },
  txtrow: {
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  txtviewitem: {
    width: Constants.SMALL_BUTTON_WIDTH,
    height: Constants.SMALL_BUTTON_HEIGHT,
    backgroundColor: Colors.BUTTON_COLOR,
    marginLeft: 10,
    marginRight: 10,
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange: Actions.dashboardstatuschange,
      createevent: Actions.createevent,
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
)(CreateEventScreen);
