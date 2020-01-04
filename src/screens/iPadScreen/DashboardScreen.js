import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Images, Constants, Layouts } from '@commons';
import Spinner from 'react-native-loading-spinner-overlay';
import email from 'react-native-email';

import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
const _keyExtractor = item => item.name;
class DashboardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      loadingtxt: '',
      isDialogVisible: false,
      newtitle: '',
      gridtype: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 200 && prevProps.dashboard.status === 100) {
      this.props.dashboardstatuschange(0);
    }
    if (this.props.dashboard.status === 240 && prevProps.dashboard.status === 100) {
      this.props.dashboardstatuschange(1);
    }
    if (this.props.dashboard.status === 210 && prevProps.dashboard.status === 100) {
      this.props.dashboardstatuschange(2);
    }
    if (this.props.dashboard.status === 220) {
      this.props.dashboardstatuschange(3);
    }
    if (this.props.dashboard.status === 230 && prevProps.dashboard.status === 100) {
      Constants.loadLMSflag = 1;
      this.props.dashboardstatuschange(4);
    }
    if (this.props.dashboard.status === 280) {
      this.props.dashboardstatuschange(6);
    }
    if (this.props.dashboard.status === 260 && prevProps.dashboard.status === 100) {
      this.props.dashboardstatuschange(5);
    }
  }
  componentDidMount() { }
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ height: Layouts.DASHBOARD_LIST_ITEM_HEIGHT }}
        onPress={() => this.godetail(item.img)}>
        <View style={styles.itemcontainer}>
          <View style={{ width: Layouts.DASHBOARD_LIST_ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
            <Avatar
              rounded
              size={Layouts.DASHBOARD_AVARTA_SIZE}
              source={Images[item.img]}
              activeOpacity={0.7}
              avatarStyle={{ borderWidth: 0.5, borderColor: '#909090', backgroundColor: 'white' }}
            />
          </View>
          <View style={styles.textblock}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.optionDescription}>{item.desc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  godetail = txt => {
    if (txt === 'property') {
      if (this.props.dashboard.status !== 200)
        this.props.getproperties();
    }
    if (txt === 'event') {
      if (this.props.dashboard.status !== 240)
        this.props.getevent();
    }
    if (txt === 'lead') {
      if (this.props.dashboard.status !== 210)
        this.props.getlead();
    }
    if (txt === 'question') {
      if (this.props.dashboard.status !== 220)
        this.props.getopenhouse();
    }
    if (txt === 'mls') {
      if (this.props.dashboard.status !== 230)
        this.props.myboard();
    }
    if (txt === 'profile') {
      this.props.dashboardstatuschange(90);
    }
    if (txt === 'mortgage')
      if (this.props.dashboard.status !== 260) {
        this.props.getmortgage();
      }
    if (txt === 'support') {
      this.handleEmail();
    }
  };

  handleEmail = () => {
    const to = ['support@openhousemarketingsystem.com'];
    email(to, {
      cc: [Constants.user_mail],
      subject: 'Open House Support',
      body: '',
    }).catch(console.error);
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Spinner
            visible={this.state.spinner}
            textContent={this.state.loadingtxt}
            textStyle={styles.spinnerTextStyle}
          />
          <FlatList
            data={
              this.props.login && this.props.login.homedata
                ? this.props.login.homedata
                : []
            }
            numColumns={1}
            keyExtractor={_keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#DFE0DF',
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
  itemview: {
    flex: 1,
    marginTop: 8,
    marginLeft: 4,
    marginRight: 4,
    borderColor: '#808080',
    alignItems: 'center',
    borderWidth: 0.2,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  itemimg: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    marginTop: 5,
  },
  itemimgview: {
    height: (Dimensions.get('window').height < Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width) / 3 * 0.2,
    width: (Dimensions.get('window').height < Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width) / 3 * 0.2,
    borderRadius: (Dimensions.get('window').height < Dimensions.get('window').width ? Dimensions.get('window').height : Dimensions.get('window').width) / 6 * 0.2,
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemtxtview: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  itemtxt: {
    textAlign: 'center',
    fontSize: 14,
  },
  itmeimgcontainer: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: '90%',
  },

  itemcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layouts.MARGIN_LEFT_NORMAL,
    marginRight: Layouts.MARGIN_LEFT_NORMAL,
    marginTop: Layouts.MARGIN_LEFT_NORMAL,

    backgroundColor: '#f3f4f9',
    borderColor: '#d3d3d3',
    borderWidth: 0.25,
    borderRadius: 5,

    flex: 1,
    flexDirection: 'row',
  },

  textblock: {
    marginRight: Layouts.MARGIN_LEFT_NORMAL,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
  },

  optionDescription: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
  },
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange: Actions.dashboardstatuschange,
      getlead: Actions.getlead,
      getevent: Actions.getevent,
      event: Actions.getevent,
      getopenhouse: Actions.getOpenHouse,
      myboard: Actions.getMyboard,
      getprofile: Actions.getprofile,
      getmortgage: Actions.getmortgage,
      getproperties: Actions.getproperties,
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
  mapStateToProps, mapDispatchToProps,
)(DashboardScreen);
