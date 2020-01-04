import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Avatar, Text, Image } from 'react-native-elements';
import { View } from 'native-base';
import { Linking, Dimensions, FlatList, Alert, Modal } from 'react-native';
import { Images } from '@commons';
import { SearchBar, Input } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Constants } from '@commons';
import { Button } from 'native-base';
import { ScrollView } from 'react-native'
import { Layouts } from '../../common';
// import {NODATA} from 'dns';
const _keyExtractor = item => item.name;
class SelectMLSScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mls_organize: '',
      mls_name: '',
      modalVisible: false,
      data_source: [],
      select_item: null,
    };
    this.props.dashboard.status = 200;
    this.ShowModal = this.ShowModal.bind(this);
    this.Back = this.Back.bind(this)
  }
  Return_Bool(item) {
    if (item === 1) {
      return 'YES';
    } else {
      return 'NO';
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.dashboard.status === 257) {
      var datas =
        this.props.dashboard && this.props.dashboard.searchData
          ? this.props.dashboard.searchData
          : [];
      if (Constants.searchFlag === 1) {
        this.setState({ data_source: datas });
        Constants.searchFlag = 0;
      }
    }
    if (this.props.dashboard.status === 258) {
      this.props.dashboardstatuschange(19)
    }
    if (this.props.dashboard.status === 230) {
      Constants.loadLMSflag = 1;
      this.setState({ modalVisible: false })
    }
  }



  SetFlatData(datas) {

  }
  componentDidMount() {

  }
  searchMLSAccount = () => {
    Constants.searchFlag = 1;
    this.props.searchData(this.state.select_item, this.state.mls_name);
  };
  ShowModal() {
    this.setState({ modalVisible: true });
  }
  itemClick(item) {
    this.setState({
      select_item: item,
      mls_organize: item.mls_organization_name,
    });
    this.setState({ modalVisible: false })
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
              fontSize: 22,
              textAlign: 'center',
            }}>
            {item.mls_organization_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  Back() {
    this.setState({ modalVisible: false })
  }
  render() {
    // const txtItem = this.props.navigation.state.params.buyer_data;
    return (
      <View style={{ flex: 1 }}>
        <Text style={
          [styles.field_txt,
          {
            fontSize: Layouts.TEXT_FONT_SIZE_SMALL,
          }]}>
          Select MLS Organization :
        </Text>
        <TouchableOpacity style={{
          height: Layouts.INPUTTEXT_HEIGHT_NORMAL,
          marginLeft: Layouts.MARGIN_NORMAL,
          justifyContent: 'center',
        }}>
          <TextInput style={{
            color: '#000000',
            fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
            height: '100%',
            textAlignVertical: 'bottom',
            borderBottomWidth: 0.5,
            borderBottomColor: '#808080',

          }}
            onFocus={this.ShowModal}>
            {this.state.mls_organize}
          </TextInput>
        </TouchableOpacity>
        <Text style={[styles.field_txt, {
          fontSize: Layouts.TEXT_FONT_SIZE_SMALL,
        }]}>
          Enter Name, Email Address or Agent Id :
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: '#808080',
            height: Layouts.INPUTTEXT_HEIGHT_NORMAL,
            fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
            marginLeft: Layouts.MARGIN_NORMAL,
          }}
          value={this.state.mls_name}
          onChangeText={mls_name => {
            this.setState({ mls_name });
          }}></TextInput>

        <View style={{ flexDirection: 'row', marginTop: Layouts.MARGIN_NORMAL, }}>
          {/* <Button block style={styles.btn} onPress={() => this._save()}>
            <Text style={[styles.btntxt]}>Save</Text>
          </Button> */}
          <Button block style={styles.btn} onPress={() => { this.searchMLSAccount(); }}>
            <Text style={[styles.btntxt]}>Search</Text>
          </Button>
          <Button block style={styles.btn} onPress={() => this.props.dashboardstatuschange(19)}>
            <Text style={[styles.btntxt]}>Cancel</Text>
          </Button>
        </View>
        {this.state.data_source.length > 0 && (
          <Text
            style={{
              color: '#39A2C1',
              marginTop: Layouts.MARGIN_LARGE,
              fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
              marginLeft: Layouts.MARGIN_NORMAL,
            }}>
            Available Agents
          </Text>
        )}
        <FlatList
          data={this.state.data_source}
          numColumns={1}
          keyExtractor={_keyExtractor}
          renderItem={this._renderItem}
        />
        <Modal
          style={{ width: '50%', height: '95%' }}
          backdropPressToClose={false}
          animationType={'slide'}
          visible={this.state.modalVisible}
        >

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
                  imageStyle={{ width: Layouts.MARGIN_NORMAL * 3, height: Layouts.MARGIN_NORMAL * 3 }}
                  style={{ width: Layouts.MARGIN_NORMAL * 3, height: Layouts.MARGIN_NORMAL * 3 }}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ textAlign: 'center', color: '#808080', marginTop: 5, fontSize: Layouts.TEXT_FONT_SIZE_TITLE }}>
              Select MLS Organization
            </Text>
            <ScrollView>
              <FlatList
                style={{ flex: 1, marginTop: 20, }}
                data={Constants.MlsData}
                numColumns={1}
                keyExtractor={_keyExtractor}
                renderItem={this._renderTextItem}
              />
            </ScrollView>
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
    marginTop: Layouts.MARGIN_LARGE,
    fontSize: Layouts.TEXT_FONT_SIZE_DETAIL,
    marginLeft: Layouts.MARGIN_NORMAL,
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
  btn: {
    backgroundColor: '#38a2c2',
    height: Layouts.SMALL_BUTTON_HEIGHT,
    marginLeft: Layouts.MARGIN_NORMAL,
    marginRight: Layouts.MARGIN_NORMAL,
    width: Layouts.SMALL_BUTTON_WIDTH,
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: Layouts.TEXT_FONT_SIZE_NORMAL,
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
    width: '95%',
    flexDirection: 'row',
    marginTop: 15,
    paddingBottom: 15,
    borderColor: '#000000',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#808080',
    borderWidth: 0.5,
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
      dashboardstatuschange: Actions.dashboardstatuschange,
      searchData: Actions.SearchLMSAccount,
      linkData: Actions.LinkLMSAccount,
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

