import React, { Component } from 'react';
import Timer from 'react-timer-mixin';
import { DashboardService, AuthService } from '@services';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  TextInput,
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
import { SearchBar, Avatar } from 'react-native-elements';
import { ProgressCircle, CircleSnail } from '@components';
import Modal from 'react-native-modalbox';
import { SwipeListView } from 'react-native-swipe-list-view';
import Orientation from 'react-native-orientation'
const _keyExtractor = item => item.name;

class MyBoardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Linked MLS Accounts',
      headerTitleStyle: {
        fontSize: 16,
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
          onPress={navigation.getParam('addmlsaccount')}>
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
      data_list: [
        {
          name: 'Anthony Robinson',
          date: 'My MLS/Real Estate Board Is Not Listed',
        },
        {
          name: 'Anthony Robinson',
          date: 'My MLS/Real Estate Board Is Not Listed',
        },
        {
          name: 'Anthony Robinson',
          date: 'My MLS/Real Estate Board Is Not Listed',
        },
        {
          name: 'Anthony Robinson',
          date: 'My MLS/Real Estate Board Is Not Listed',
        },
        {
          name: 'Anthony Robinson',
          date: 'My MLS/Real Estate Board Is Not Listed',
        },
        {
          name: 'Anthony Robinson',
          date: 'My MLS/Real Estate Board Is Not Listed',
        },
        {
          name: 'Anthony Robinson',
          date: 'My MLS/Real Estate Board Is Not Listed',
        },
        {
          name: 'Anthony Robinson',
          date: 'My MLS/Real Estate Board Is Not Listed',
        },
      ],
      refresh: false,
      spinner: false,
      loadingtxt: 'Unlinking...',
      isDisabled: false,
      isOpen: false,
      newtitle: '',
      searchText: '',
      checkmanage: false,
      dashboard:
        this.props.dashboard && this.props.dashboard.myboard
          ? this.props.dashboard.myboard
          : [],
      openValue: 75,
    };
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    this.openRowRefs = [];
  }

  _renderItem = ({ item }) => {
    return (
      // <TouchableOpacity style={styles.itemcontainer}>
      <View style={styles.itemview}>
        <View style={styles.itmeimgcontainer}>
          <View style={styles.itemimgview}>
            {item.photourl && (
              <Avatar
                size={(Dimensions.get('window').height - 92) * 0.1 - 25}
                rounded
                source={{ uri: item.photourl }}
              />
            )}
            {!item.photourl && (
              <Avatar
                source={Images.avataricon}
                size={(Dimensions.get('window').height - 92) * 0.1 - 25}
                overlayContainerStyle={{ backgroundColor: '#ffffff' }}
                activeOpacity={0.7}
              />
            )}
          </View>
          <View style={styles.itemtxtview}>
            <Text style={styles.itemtxt}>
              {item.firstname} {item.lastname}
            </Text>
            <Text style={styles.itemtxt2}>{item.mls_organization_name}</Text>
            <Text style={styles.itemtxt2}>Agent ID: {item.agentid}</Text>
          </View>
        </View>
      </View>

      // </TouchableOpacity>
    );
  };

  async componentDidMount() {
    this.LoadMortgage = this.LoadMortgage.bind(this);
    this.Unlink = this.Unlink.bind(this);
    // if (this.props.dashboard.status === 230) {
    //   //alert('Success');
    //   this.setState({
    //     dashboard:
    //       this.props.dashboard && this.props.dashboard.myboard
    //         ? this.props.dashboard.myboard
    //         : [],
    //   });
    // }
    this._addLMSaccount = this._addLMSaccount.bind(this);
    this.props.navigation.setParams({ addmlsaccount: this._addLMSaccount });
  }
  _addLMSaccount() {
    // alert('testtest');
    this.props.navigation.navigate('selectmls');
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 230) {
      if (Constants.loadLMSflag === 1) {
        Constants.loadLMSflag = 0;
        this.LoadMortgage();
      }
    }
  }
  async LoadMortgage() {
    let res = await AuthService.authlogin(Constants.user_mail, Constants.user_password);
    var account_num = res[0].account_num;
    var info = await DashboardService.getmyboard(account_num);
    this.setState({ dashboard: info.data });
    this.setState({ refresh: !this.state.refresh });
    this.setState({ spinner: false });
  }
  Unlink(item) {
    let message = 'Are you sure you want' + ' to unlink account?';
    Alert.alert(
      '',
      message,
      [
        {
          text: 'NO',
          onPress: () => {
            this.openRowRefs.forEach(
              ref => {
                ref.closeRow();
              }
            )
          },
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            Constants.loadLMSflag = 1;
            this.setState({ spinner: true })
            this.props.unlinkaccount(item);
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  onRowDidOpen = (rowKey, rowMap) => {
    this.openRowRefs.push(rowMap[rowKey]);
  }
  render() {
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <SwipeListView
          onRowDidOpen={this.onRowDidOpen}
          extraData={this.state.refresh}
          data={this.state.dashboard}
          numColumns={1}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
          // renderItem={ (data) => (
          //     <View style={styles.rowFront}>
          //         <Text>I am {data.name} in a SwipeListView</Text>
          //     </View>
          // )}
          renderHiddenItem={data => (
            <TouchableOpacity
              style={styles.rowBack}
              onPress={() => {
                this.Unlink(data.item);
              }}>
              <Text></Text>
              <Text style={{ color: '#fff' }}>Unlink</Text>
            </TouchableOpacity>
          )}
          
          leftOpenValue={0}
          rightOpenValue={-this.state.openValue}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#f00',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  itemtxtview: {
    marginLeft: 40,
    justifyContent: 'center',
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
    paddingLeft: 10,
    fontSize: 18,
  },
  txtrow: {
    marginTop: 20,
  },
  txtbtn: {
    color: '#0520F1',
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

    color: 'white',
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  itemcontainer: {
    width: '100%',
  },
  itemview: {
    flex: 1,
    // margin: 8,
    alignItems: 'center',
    // borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#d6d6d6',
    backgroundColor: '#ffffff',
  },
  itemimg: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    // margin:'10%',
  },
  itemimgview: {
    height: (Dimensions.get('window').height - 92) * 0.1 - 25,
    width: (Dimensions.get('window').height - 92) * 0.1 - 25,
    borderRadius: (Dimensions.get('window').height - 92) * 0.1 * 0.5 - 12.5,
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    // marginTop: 15,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemtxtview: {
    width: '80%',
    marginLeft: 10,
    // alignItems:'center',
  },
  itemtxt: {
    fontSize: 14,
    fontWeight: 'bold'
    // textAlign:'center',

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
    marginTop: 8,
    marginBottom: 8,
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // logout : Actions.logout,
      // setpropertyitem : Actions.setpropertyitem,
      // sethousehandletype : Actions.sethousehandletype,
      unlinkaccount: Actions.unlinkaccount,
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
)(MyBoardScreen);
