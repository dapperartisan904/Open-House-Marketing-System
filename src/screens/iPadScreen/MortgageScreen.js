import { DashboardService, AuthService } from '@services';
import React, { Component } from 'react';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
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
import { Images, Constants, Layouts } from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import { SearchBar, Input, Avatar } from 'react-native-elements';

const _keyExtractor = item => item.uniqueid;

class MortgageScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select Partner',
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
          onPress={() => { Linking.openURL(Constants.shareurl); }}>
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
      refresh: true,
      flag: false,
      spinner: false,
      loadingtxt: '',
      isDisabled: false,
      isOpen: false,
      newtitle: '',
      searchText: '',
      checkmanage: false,
      flag1: true,
      selecteditem: '',
      dashboard:
        this.props.dashboard && this.props.dashboard.motgages
          ? this.props.dashboard.motgages.sort(
            (a, b) => a.loan_officer_name > b.loan_officer_name,
          )
          : [],
    };
    this.update_partner = this.update_partner.bind(this);
    this.LoadMortgage = this.LoadMortgage.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 250 && prevProps.dashboard.status === 90) {
      this.setState({ spinner: false });
      this.LoadMortgage();
    }
  }
  async LoadMortgage() {
    this.setState({ spinner: false });
    let res = await AuthService.authlogin(Constants.user_mail, Constants.user_password);
    let advertisingid1 = res[0].advertising_id;
    this.props.login.account = res[0];
    var info = await DashboardService.getMortgage(advertisingid1, 0);
    this.setState({
      dashboard: info.data.sort(
        (a, b) => a.loan_officer_name > b.loan_officer_name,
      )
    });
    this.setState({ refresh: !this.state.refresh });
  }
  componentWillUnmount() { }

  _saveprofile = () => { };
  onError(error) {
    alert(error);
  }
  _renderItem = ({ item }) => {
    if (item.is_selected === 1) {
      this.setState({ selecteditem: item });
    }
    return (
      <TouchableOpacity
        onPress={() => this.itemClick(item)}
        style={styles.itemcontainer}>
        <View style={styles.itemview}>
          <View style={styles.itmeimgcontainer}>
            <View style={styles.itemimgview}>
              {item.loan_officer_photo === '' ? (
                <Avatar
                  size={Layouts.MORT_AVARTA_SIZE}
                  rounded
                  source={Images.defaultmortgage}
                />
              ) : (
                  <Avatar
                    size={Layouts.MORT_AVARTA_SIZE}
                    rounded
                    source={{ uri: item.loan_officer_photo }}
                    onError={this.onError.bind(this)}
                  />
                )}
            </View>
            <View style={styles.itemtxtview}>
              <Text style={[styles.txtrow, styles.txth1]}>{item.name}</Text>
              <Text style={[styles.txtrow, styles.txth1]}>{item.loan_officer_name}</Text>
              <Text style={[styles.txtrow, styles.txth1]}>{item.title}</Text>
              <Text style={[styles.txtrow, styles.txth2]}>{item.line1}</Text>
              <Text style={[styles.txtrow, styles.txth2]}>{item.line2}</Text>
              <Text style={[styles.txtrow, styles.txth2]}>{item.line3}</Text>
            </View>
            <View style={styles.image_check}>
              {item.is_selected === '1' && (
                <Image
                  style={styles.itemimg_check}
                  imageStyle={styles.itemimg}
                  source={Images.checkmarkicon}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  itemClick(item) {
    Constants.company_logo_url = item.logo_url;
    // this.props.update_partner(item);
    // this.setState({ spinner: true });
    this.setState({ selecteditem: true });
    let message =
      'Do you want to select ' + item.loan_officer_name + ' from ' +
      item.name +
      ' as your preferred Mortgage partner?';
    Alert.alert(
      'Please Confirm',
      message,
      [

        { text: 'YES', onPress: () => { this.props.update_partner(item); this.setState({ spinner: true }); } },
        {
          text: 'NO',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  search = searchText => {
    this.setState({ searchText: searchText });
    this.changesearch(searchText);
  };
  clearsearch = () => {
    this.setState({ searchText: '' });
    let properties = this.props.dashboard && this.props.dashboard.motgages
      ? this.props.dashboard.motgages : [];
    this.setState({ dashboard: properties });
  };
  changesearch = (searchText) => {
    let properties = this.props.dashboard && this.props.dashboard.motgages
      ? this.props.dashboard.motgages : [];
    let res = [];

    if (!searchText || searchText === '') {
      res = [...properties];
    } else if (properties && properties.length) {
      res = properties.filter(
        item =>
          item.loan_officer_name
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1
      );
    }
    this.setState({ dashboard: res });
  };
  update_partner = item => {
    // alert('enter');
    // Constants.updateflag = 1;
    // Constants.mortgage_flag=1;

    this.setState({ flag: true });

  };

  componentDidMount() { }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Updating selected Mortgage Partner'}
          textStyle={styles.spinnerTextStyle}
        />
        {/* 'Updating selected Mortgage Partner' */}
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
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  itemtxtview: {
    marginLeft: 20,
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
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 18,
  },
  txtrow: {
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
  },
  itemview: {
    height: Layouts.MORT_ITEM_HEIGHT,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 0.25,
    borderColor: Constants.UIColor.lightGray,
    backgroundColor: '#ffffff',
  },
  itemimg: {
    width: '90%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    // margin:'10%',
  },
  searchbar: {
    backgroundColor: '#F4F4F4',
  },
  searchbartxt: {
    backgroundColor: 'white',
  },
  image_check: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 2,
    top: 4,
  },
  itemimg_check: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    // margin:'10%',
    marginRight: 8,
    marginTop: 15,
  },
  itemimgview: {
    height: Layouts.MORT_ITEM_HEIGHT,
    width: Layouts.MORT_ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txth1: {
    fontSize: Constants.TEXT_FONT_SIZE_SMALL,
  },
  txth2: {
    fontSize: Constants.TEXT_FONT_SIZE_DETAIL,
  },
  itmeimgcontainer: {
    width: '100%',
    flexDirection: 'row',

  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: Actions.logout,
      setpropertyitem: Actions.setpropertyitem,
      sethousehandletype: Actions.sethousehandletype,
      update_partner: Actions.updatepartner,
      getmortgage: Actions.getmortgage,
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
)(MortgageScreen);
