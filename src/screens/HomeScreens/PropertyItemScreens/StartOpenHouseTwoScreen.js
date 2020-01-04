import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Orientation from 'react-native-orientation'
import {
  Button,
} from 'native-base';
import { Images, Fonts } from '@commons';
import Image from 'react-native-image-progress';
import Constants from '../../../common/Constants';
import Layouts from '../../../common/Layoutsd';

class StartOpenHouseTwoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    console.log('##############')
    console.log(this.props.dashboard.mortgageitem)
  }
  componentDidMount() { }

  componentWillUnmount() { }
  componentDidUpdate(prevProps, prevState) { }

  continue = () => {
    this.props.navigation.navigate('startOpenHouseThreeScreen');
    // this.props.navigation.navigate('question12Screen');
  };
  gobackdashboard = () => {
    this.props.navigation.goBack();
  };
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    if (Constants.device_Pad) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Text style={styles.backtxt}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formviewcontainer}>
            <View style={styles.imgcontainer_text}>
              <Text style={{ fontSize: Layouts.TEXT_FONT_SIZE_NORMAL }}>Brought To You By</Text>
            </View>
            <View style={styles.imgcontainer}>
              {Constants.company_logo_url == '' ? <Image
                imageStyle={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                source={{ uri: this.props.dashboard.mortgageitem.logo_url }}
                style={{ width: Layouts.START_OPEN_ONE_LOGO_WIDTH, height: Layouts.START_OPEN_ONE_LOGO_HEIGHT }}
              /> : <Image
                  imageStyle={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                  source={{ uri: Constants.company_logo_url }}
                  style={{ width: Layouts.START_OPEN_ONE_LOGO_WIDTH, height: Layouts.START_OPEN_ONE_LOGO_HEIGHT }}
                />}
            </View>
          </View>
          <View style={[styles.profileview, { bottom: 70 }]}>
            <Button block style={[styles.btn, { height: Layouts.BIG_BUTTON_HEIGHT, width: '90%', alignSelf: 'center' }]} onPress={() => this.continue()}>
              <Text style={[styles.btntxt, { fontSize: Layouts.TEXT_FONT_SIZE_BIG }]}>CONTINUE</Text>
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container} onLayout={this._onLayout}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.lockbtnview}
              onPress={this.gobackdashboard}>
              <Text style={styles.backtxt}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formviewcontainer}>
            <View style={[styles.imgcontainer_text]}>
              <Text>Brought To You By</Text>
            </View>
            <View style={[styles.imgcontainer]}>
              {Constants.company_logo_url == '' ? <Image
                source={{ uri: this.props.dashboard.mortgageitem.logo_url }}
                style={styles.officelog}
                resizeMode='contain'
                imageStyle={{ width: '100%', height: '100%' }}
              /> : <Image
                  source={{ uri: Constants.company_logo_url }}
                  style={styles.officelog}
                  resizeMode='contain'
                  imageStyle={{ width: '100%', height: '100%' }}
                />}

            </View>
          </View>
          <View style={styles.profileview}>
            <Button block style={styles.btn} onPress={() => this.continue()}>
              <Text style={[styles.btntxt]}>CONTINUE</Text>
            </Button>
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  lockbtnview: {
    width: 70,
    height: 50,
    marginTop: 25,
    marginRight: 10,
  },
  lockimg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  lockimg1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // resizeMode:'contain'
  },
  formviewcontainer: {
    width: '80%',
    height: 250,
    marginLeft: '10%',
    marginRight: '10%',
    // alignSelf:'center',
    // justifyContent:'center',
    backgroundColor: 'white',
  },
  officelog: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  imgcontainer_text: {
    justifyContent: 'center',
    fontSize: 18,
    marginBottom: 30,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#38a2c2',
    width: '90%',
    height: 60,
    marginLeft: '5%',
  },
  btntxt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  txtitem: {
    width: '90%',
    fontSize: 7,
    textAlign: 'center',
  },
  profileview: {
    position: 'absolute',
    height: 70,
    width: '100%',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilelogview: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    marginLeft: 10,
  },
  textdetail: {
    flexDirection: 'column',
    // alignItems:'center',
    marginLeft: 10,
  },
  textitem: {
    fontSize: 10,
    color: 'white',
  },
  backtxt: {
    fontFamily: Fonts.bodonitalic,
    fontSize: 18,
    //
  },
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
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
)(StartOpenHouseTwoScreen);
