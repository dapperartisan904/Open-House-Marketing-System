import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
    StyleSheet, View, Text, Animated, Keyboard, Platform, KeyboardAvoidingView, LayoutAnimation,
    TouchableOpacity, ImageBackground, Dimensions,
    TextInput, Alert, FlatList
} from 'react-native';
import { Button, Icon } from 'native-base';
import { Images, Fonts, Constants } from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import { ProgressCircle, CircleSnail } from '@components';
const _keyExtractor = item => item.name;
var Mailer = require('NativeModules').RNMail;
import email from 'react-native-email';
import Orientation from 'react-native-orientation'
class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            // title:'Open',
            // headerTitleStyle: { fontSize: 18,fontWeight:'bold',alignSelf:'center' ,
            //     textAlign:"center",
            //     flex:1 },
            headerTitle: (
                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: 18, fontWeight: 'bold',
                        }}>Open</Text>
                        <Text style={{
                            fontSize: 8,
                        }}>TM</Text>
                    </View>
                </View>
            ),
            headerRight: (
                <TouchableOpacity style={{ marginRight: 20, flex: 1, alignSelf: 'center', justifyContent: 'center' }}
                    onPress={navigation.getParam('changegrid')}
                >
                    <Image source={Images.switch_layout}
                        imageStyle={{
                            width: 25,
                            height: 25,
                        }}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity
                    style={{
                        marginLeft: 20,
                        flex: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={navigation.getParam('logout')}>
                    <Image
                        source={Images.logout}
                        imageStyle={{ width: 25, height: 25 }}
                        style={{ width: 25, height: 25 }}
                    />
                </TouchableOpacity>
            ),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            loadingtxt: '',
            isDialogVisible: false,
            newtitle: '',
        };

        if (Constants.device_Pad) {
            Orientation.lockToLandscape();
        } else {
            Orientation.lockToPortrait();
        }

    }
    componentDidUpdate(prevProps, prevState) {

        if (this.props.dashboard.status === 210) {
            this.props.navigation.navigate('leadScreen');
        }
        if (this.props.dashboard.status === 220) {
            // this.props.navigation.navigate('openhouseScreen');
        }
        if (this.props.dashboard.status === 230) {
            Constants.loadLMSflag = 1;
            this.props.navigation.navigate('myBoardScreen');
        }
        if (this.props.dashboard.status === 240) {
            if (Constants.eventflag === 1) {
                this.props.navigation.navigate('event');
                Constants.eventflag = 0;
            }
        }
        if (this.props.dashboard.status === 280) {
            this.props.navigation.navigate('profileScreen');
        }
        if (this.props.dashboard.status === 260) {
            this.props.navigation.navigate('mortgageScreen');
        }

        if (
            this.state.loadingtxt !== this.props.dashboard.loadingtxt &&
            this.props.dashboard.loadingtxt !== ''
        ) {
            this.setState({ loadingtxt: this.props.dashboard.loadingtxt });
        }
        if (
            this.props.dashboard.status >= 200 &&
            prevProps.dashboard.status === 100 &&
            this.state.spinner
        ) {
            this.setState({ spinner: false });
            if (this.props.dashboard.status === 200) {
                this.props.navigation.navigate('propertyScreen');
            }
        }
        if (this.props.dashboard.status === 100 && !this.state.spinner) {
            this.setState({ spinner: true });
        }

    }
    componentDidMount() {
        this.props.navigation.setParams({ changegrid: this._changegrid });
        this.props.navigation.setParams({ logout: this._logout });
    }
    componentWillUnmount() {

    }
    _changegrid = () => {
        this.props.navigation.navigate('dashboard');
    }
    _logout = () => {

        Alert.alert(
            '',
            'Are you sure you want to logout?',
            [
                { text: 'NO' },
                { text: 'YES', onPress: this.logouthandle }
            ],
        );

    }
    logouthandle = () => {
        this.props.logout();
        this.props.navigation.navigate('signinScreen');
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.godetail(item.img)} style={styles.itemcontainer}>
                <View style={styles.itemview}>
                    <View style={styles.itmeimgcontainer}>
                        <View style={styles.itemimgview}>
                            <Image
                                style={styles.itemimg}
                                imageStyle={styles.itemimg}
                                source={Images[item.img]}
                            />
                        </View>
                        <View style={styles.itemtxtview}>
                            <Text style={styles.itemtxt}>{item.name}</Text>
                            <Text style={styles.itemtxt2}>{item.desc}</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }

    showDialog = (status) => {
        this.setState({ isDialogVisible: status });
    }

    godetail = (txt) => {
        if (txt === 'property') {
            this.props.getproperties();
        }
        if (txt === 'event') {
            Constants.eventflag = 1;
            this.props.event();
        }
        if (txt === 'lead') {
            this.props.getlead();
        }
        if (txt === 'question') {
            this.props.getopenhouse();
        }
        if (txt === 'mls') {
            this.props.myboard();
        }
        if (txt === 'profile') {
            this.props.getprofile();
        }
        if (txt === 'mortgage') {
            this.props.getmortgage();
        }
        if (txt === 'support') {
            this.handleEmail();
        }
    }
    handleEmail = () => {
        const to = ['support@openhousemarketingsystem.com'];
        email(to, {
            // Optional additional arguments
            cc: [Constants.user_mail], // string or array of email addresses
            subject: 'Open House Support',
            body: '',
        }).catch(console.error);
    };
    _onLayout = event => {
        if (Constants.device_Pad) {
            Orientation.lockToLandscape();
        } else {
            Orientation.lockToPortrait();
        }
    }
    render() {

        return (
            <View
                style={{ flex: 1, }}
                onLayout={this._onLayout}
            >
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.loadingtxt}
                    textStyle={styles.spinnerTextStyle}
                />
                <FlatList
                    data={(this.props.login && this.props.login.homedata) ? this.props.login.homedata : []}
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
        fontSize: 16
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    itemcontainer: {
        width: '100%',
    },
    itemview: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 0.2,
        borderColor: '#CDCECD',
        backgroundColor: '#f3f4f9',
    },
    itemimg: {
        width: '80%',
        height: '80%',
        resizeMode: "contain",
        margin: '10%',

    },
    itemimgview: {
        height: (Dimensions.get('window').height - 100) * 0.1 - 5,
        width: (Dimensions.get('window').height - 100) * 0.1 - 5,
        borderRadius: (Dimensions.get('window').height - 92) * 0.1 * 0.5 - 2.5,
        borderWidth: 0.2,
        borderColor: '#CDCECD',
        // marginTop: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        marginTop: 8,

    },
    itemtxtview: {
        width: '80%',
        marginTop: 15,
        marginLeft: 10,
        // alignItems:'center',
    },
    itemtxt: {
        fontSize: 14,
        // textAlign:'center',
        fontWeight: 'bold',
    },
    itemtxt2: {
        fontSize: 14,
        marginTop: 4,
        paddingRight: 5,
    },
    itmeimgcontainer: {
        // marginBottom: 10,
        // alignItems:'center',
        width: '90%',
        flexDirection: 'row',
    }

};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: Actions.logout,
        getproperties: Actions.getproperties,
        getlead: Actions.getlead,
        getevent: Actions.getevent,
        event: Actions.getevent,
        getopenhouse: Actions.getOpenHouse,
        myboard: Actions.getMyboard,
        getprofile: Actions.getprofile,
        getmortgage: Actions.getmortgage,
    }, dispatch);
}

function mapStateToProps({ login, dashboard }) {
    return {
        login: login,
        dashboard: dashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
