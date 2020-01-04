import React, { Component } from 'react';
import { DashboardService, AuthService } from '@services';
import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import { Images, Fonts, Constants, Layouts } from '@commons';
import Image from 'react-native-image-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import { SearchBar, Avatar } from 'react-native-elements';

const _keyExtractor = item => item.name;

class MyBoardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      spinner: false,
      loadingtxt: '',
      isDisabled: false,
      isOpen: false,
      newtitle: '',
      searchText: '',
      checkmanage: false,
      dashboard:
        this.props.dashboard && this.props.dashboard.myboard
          ? this.props.dashboard.myboard
          : [],
      unlinkflag: false,
    };
  }

  _renderItem = ({ item }) => {
    if (item === 0) {
      return (
        <View style={styles.collectioncell}>
          <View style={[styles.containerView, styles.addcellcontainer]}>

            <View style={[styles.headerSection, styles.vcenter_wrapper]} >
              <Text style={styles.headerLbl}>
                Link to MLS Organization
              </Text>
            </View>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => this.addLMSaccount()}>
              <Image
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
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => this.Unlink(item)}>
              <Image
                style={styles.deleteButton}
                source={Images.delete_icon}
                imageStyle={{ height: '100%', width: '100%', resizeMode: 'stretch' }}
              />
            </TouchableOpacity>
            <View style={styles.imageviewcontainer}>
              {item.photourl && (
                <Avatar
                  size={Layouts.MLS_AVARTA_SIZE}
                  rounded
                  style={styles.imageview}
                  source={{ uri: item.photourl }}
                />
              )}
              {!item.photourl && (
                <Avatar
                  source={Images.avataricon}
                  size={Layouts.MLS_AVARTA_SIZE}
                  style={styles.imageview}
                  overlayContainerStyle={{ backgroundColor: '#ffffff' }}
                  activeOpacity={0.7}
                />
              )}
            </View>
            <View style={styles.textblock}>
              <Text style={styles.textrow}>
                {item.firstname} {item.lastname}
              </Text>
              <Text style={styles.textrow}>{item.mls_organization_name}</Text>
              <Text style={styles.textrow}>Agent ID: {item.agentid}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  async componentDidMount() {
    this.Unlink = this.Unlink.bind(this);

    this.addLMSaccount = this.addLMSaccount.bind(this);
  }
  addLMSaccount() {
    this.props.dashboardstatuschange(16);
  }
  async LoadMortgage() {
    let res = await AuthService.authlogin(Constants.user_mail, Constants.user_password);
    var account_num = res[0].account_num;
    var info = await DashboardService.getmyboard(account_num);
    this.setState({ dashboard: info.data });
    this.setState({ refresh: !this.state.refresh });

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 230 && this.state.unlinkflag) {
      this.setState({ unlinkflag: false })
      this.setState({ spinner: false });
      this.LoadMortgage();
    }
    if(Constants.mlsflag == 1){
      this.LoadMortgage();
      Constants.mlsflag = 0;
    }
  }

  Unlink(item) {
    let message = 'Are you sure you want' + ' to remove/unlink ' + item.firstname + ' ' + item.lastname + ' ' + 'from your account?';
    Alert.alert(
      'Please Confirm',
      message,
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            this.setState({ unlinkflag: true })
            // this.setState({ spinner: true });
            this.props.unlinkaccount(item);
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.loadingtxt}
          textStyle={styles.spinnerTextStyle}
        />
        <FlatList
          extraData={this.state.refresh}
          data={[0, ...this.state.dashboard]}
          numColumns={3}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
          style={styles.propertyCollections}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  propertyCollections: {
    // backgroundColor: '#555',
    marginLeft: Layouts.MARGIN_NORMAL / 2,
    marginTop: Layouts.MARGIN_NORMAL / 2,
    marginBottom: Layouts.MARGIN_NORMAL / 2,
    marginRight: Layouts.MARGIN_NORMAL / 2,
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
    backgroundColor: '#808080',
    width: Dimensions.get('window').width / 5 * 0.96,
    height: Dimensions.get('window').width / 5 * 0.6 + 130,
    margin: 10,
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
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    position: 'relative',
    padding: 5,
    borderWidth: 0.5,
  },

  headerSection: {
    backgroundColor: 'white',
    borderTopLeftRadius: Layouts.MARGIN_NORMAL / 2,
    borderTopRightRadius: Layouts.MARGIN_NORMAL / 2,
    width: '100%',
    height: Layouts.ADD_PROPERTY_TEXT_HEIGHT,
  },

  plusImage: {
    width: Layouts.ADD_IMAGE_SIZE,
    height: Layouts.ADD_IMAGE_SIZE,
  },

  mlsIdLbl: {
    fontSize: 10,
    color: 'black',
    backgroundColor: 'white',
    marginLeft: 10,
  },

  menuwrapper: {
    marginRight: 5,
    width: 25,
  },

  menu: {
    width: 25,
    height: 25,
  },

  propertyImage: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    height: 125,
  },

  footerLayer: {
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 10,
    backgroundColor: 'white',
    color: 'black',
    marginTop: 5,
    marginLeft: 5,
  },

  address: {
    fontSize: 10,
    backgroundColor: 'white',
    color: 'black',
    marginTop: 5,
    marginLeft: 5,
  },

  cityTownLbl: {
    fontSize: 10,
    backgroundColor: 'white',
    color: 'black',
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
  },

  rentalLbl: {
    fontSize: 10,
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'right',
    marginTop: 5,
    marginRight: 10,
  },

  saleLbl: {
    color: 'red',
  },


  collectioncell: {
    width: Layouts.ITEM_SIZE,
    height: Layouts.ITEM_SIZE,
  },

  containerView: {
    borderColor: Constants.UIColor.lightGray,
    borderWidth: 0.5,
    borderRadius: Layouts.MARGIN_NORMAL / 2,
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },

  addcellcontainer: {
    backgroundColor: Constants.UIColor.lightGray,
  },

  headerLayer: {
    height: 20,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  vcenter_wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  headerLbl: {
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },

  imageviewcontainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  imageview: {
    justifyContent: 'center',
    width: Layouts.MLS_AVARTA_SIZE,
    height: Layouts.MLS_AVARTA_SIZE,
  },

  deleteButton: {
    marginRight: 5,
    marginTop: 5,
    width: Layouts.MLS_UNLINK_IMAGE_SIZE,
    height: Layouts.MLS_UNLINK_IMAGE_SIZE,
    alignSelf: 'flex-end',
  },

  textblock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textrow: {
    width: '95%',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dashboardstatuschange: Actions.dashboardstatuschange,
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
