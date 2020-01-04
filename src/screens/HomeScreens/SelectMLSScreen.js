import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Avatar, Text, Button, Image } from 'react-native-elements';
import { View } from 'native-base';
import { Linking, Dimensions, FlatList, Modal, Alert,LayoutAnimation,Keyboard,Platform, } from 'react-native';
import { Images } from '@commons';
import { SearchBar, Input } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Constants } from '@commons';
import Orientation from 'react-native-orientation'
import { thisExpression } from '@babel/types';
// import {NODATA} from 'dns';
const _keyExtractor = item => item.name;
class SelectMLSScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search MLS Accounts',
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
          onPress={navigation.getParam('search')}>
          {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
          <Text style={{ color: '#0000ff' }}>Search</Text>
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
      mls_organize: '',
      mls_name: '',
      modalVisible: false,
      data_source: [],
      select_item: null,
      isKeyboardVisible: false,
    };
    this.props.dashboard.status = 200;
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  Return_Bool(item) {
    if (item === 1) {
      return 'YES';
    } else {
      return 'NO';
    }
  }
  componentDidUpdate(prevProps, prevState) {
    this.Back = this.Back.bind(this);
    if (this.props.dashboard.status === 257) {
      var datas =
        this.props.dashboard && this.props.dashboard.searchData
          ? this.props.dashboard.searchData
          : [];
      if (Constants.searchFlag === 1) {
        this.SetFlatData(datas);
        Constants.searchFlag = 0;
      }

      // alert(datas);

      // this.setState({
      //   data_source:
      //     this.props.dashboard && this.props.dashboard.searchData
      //       ? this.props.dashboard.searchData
      //       : [],
      // });
    }
    if (this.props.dashboard.status === 258) {
      this.props.myboard();
    }
    if (this.props.dashboard.status === 230) {
      Constants.loadLMSflag = 1;
      this.props.navigation.navigate('myBoardScreen');
    }
  }
  SetFlatData(datas) {
    this.setState({ data_source: datas });
  }
  componentDidMount() {
    this.props.navigation.setParams({ search: this.searchMLSAccount });
    this.ShowModal = this.ShowModal.bind(this);
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({android: 'keyboardDidShow', ios: 'keyboardWillShow'}),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({android: 'keyboardDidHide', ios: 'keyboardWillHide'}),
      this._keyboardDidHide.bind(this),
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({isKeyboardVisible: true, fromrange: 0});
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({isKeyboardVisible: false, fromrange: 0});
  }
  fadeIn(delay) {
    const {anim, typeid, fromrange} = this.state;
    let from = 1;
    from = fromrange;
    return {
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }

  searchMLSAccount = () => {
    // alert(this.state.mls_name);
      Keyboard.dismiss();
    Constants.searchFlag = 1;
    this.props.searchData(this.state.select_item, this.state.mls_name);
  };
  ShowModal() {
    // alert(Constants.MlsData.length);
    this.setState({
      modalVisible: true,
    });
  }
  itemClick(item) {
    this.setState({
      modalVisible: false,
      select_item: item,
      mls_organize: item.mls_organization_name,
    });
  }
  AdditemClick(item) {
    let message =
      'Are you sure you want to add ' +
      item.firstname +
      ' ' +
      item.lastname +
      '?';
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
            this.props.linkData(
              item,
              this.state.select_item.mls_organization_id,
            );
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.AdditemClick(item)}>
        <View style={styles.itemview}>
          <View style={styles.itmeimgcontainer}>
            <View style={styles.itemimgview}>
              {item.photourl && (
                <Avatar
                  size={(Dimensions.get('window').height - 92) * 0.1 - 20}
                  rounded
                  source={{ uri: item.photourl }}
                />
              )}
              {!item.photourl && (
                <Avatar
                  source={Images.avataricon}
                  size={(Dimensions.get('window').height - 92) * 0.1 - 20}
                  overlayContainerStyle={{ backgroundColor: '#ffffff' }}
                  activeOpacity={0.7}
                />
              )}
            </View>
            <View style={styles.itemtxtview}>
              <Text style={styles.itemtxt}>
                {item.firstname} {item.lastname}
              </Text>
              <Text style={styles.itemtxt2}>
                {this.state.select_item.mls_organization_name}
              </Text>
              <Text style={styles.itemtxt2}>Agent ID: {item.agentid}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  _renderTextItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.itemClick(item)}>
        <View style={styles.itemview}>
          <Text
            style={{
              color: '#3294fe',
              height: 40,
              padding: 5,
              fontSize: 18,
              textAlign: 'center',
            }}>
            {item.mls_organization_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  Back() {
    this.setState({ modalVisible: false })
  }
  render() {
    // const txtItem = this.props.navigation.state.params.buyer_data;
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        <Text style={styles.field_txt}>Select MLS Organization :</Text>

        <TouchableOpacity style={{ height: 40 }} onPress={this.ShowModal}>
          <Text style={{ color: '#000000', padding: 10 }}>
            {this.state.mls_organize}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            backgroundColor: '#888888',
            height: 0.005,
            marginTop: 2,
            marginLeft: 10,
            marginRight: 10,
          }}></Text>
        <Text style={styles.field_txt}>
          Enter Name, Email Address or Agent Id :
        </Text>
        <TextInput
          style={{ borderWidth: 0.2, borderColor: 'white', borderBottomColor: '#808080', height: 40, width: '95%', alignSelf: 'center' }}
          value={this.state.mls_name}
          onChangeText={mls_name => {
            this.setState({ mls_name });
          }}></TextInput>
        {this.state.data_source.length > 0 && (
          <Text
            style={{
              color: '#39A2C1',
              marginTop: 15,
              fontSize: 15,
              marginLeft: 10,
            }}>
            Available Agents
          </Text>
        )}
        {this.state.data_source.length > 0 && (
          <Text
            style={{
              backgroundColor: '#888888',
              height: 0.005,
              marginTop: 15,
              marginLeft: 10,
              marginRight: 10,
            }}></Text>
        )}

        <FlatList
          data={this.state.data_source}
          numColumns={1}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          backdropPressToClose={false}>
          <View style={styles.modal}>
            <View
              style={{
                left: 15,
                justifyContent: 'center',
                position: 'absolute'
              }}>
              <TouchableOpacity onPress={() => this.Back()}>
                <Image
                  source={Images.backicon}
                  imageStyle={{ width: 30, height: 30 }}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'center', color: '#808080', marginTop: 5, fontSize: 16 }}>
              Select MLS Organization
          </Text>
            <FlatList
              style={{ flex: 1, marginTop: 20, }}
              data={Constants.MlsData}
              numColumns={1}
              keyExtractor={_keyExtractor}
              renderItem={this._renderTextItem}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = {
  containertxt: {
    flexDirection: 'row',
    marginTop: 5,
  },
  txtbold: {
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: '70%',
  },
  txtnormal: {
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 10,
  },
  field_txt: {
    paddingTop: 10,
    fontSize: 12,
    marginLeft: 8,
    color: 'red',
  },
  itemview: {
    flex: 1,
    // margin: 8,
    alignItems: 'center',
    // borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#e6e6e6',
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
    height: (Dimensions.get('window').height - 92) * 0.1 - 20,
    width: (Dimensions.get('window').height - 92) * 0.1 - 20,
    borderRadius: (Dimensions.get('window').height - 92) * 0.1 * 0.5 - 10,
    borderWidth: 0.2,
    borderColor: '#CDCECD',
    // marginTop: 15,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemtxtview: {
    width: '80%',
    marginLeft: 20,
    // alignItems:'center',
  },
  itemtxt: {
    fontSize: 12,
    // textAlign:'center',
    // fontWeight: 'bold',
  },
  itemtxt2: {
    fontSize: 12,
    marginTop: 4,
  },
  itmeimgcontainer: {
    // marginBottom: 10,
    // alignItems:'center',
    width: '90%',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#808080',
    borderWidth: 0.2,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 50,
    marginTop: 50,
  },
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      // logout : Actions.logout,
      // setpropertyitem : Actions.setpropertyitem,
      // sethousehandletype : Actions.sethousehandletype,
      searchData: Actions.SearchLMSAccount,
      linkData: Actions.LinkLMSAccount,
      myboard: Actions.getMyboard,
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
)(SelectMLSScreen);

// export default SelectMLSScreen;
