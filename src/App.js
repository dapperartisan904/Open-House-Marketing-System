/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from "./store";
import { PersistGate } from 'redux-persist/lib/integration/react'

import {Root} from 'native-base';
import {SigninScreen,SplashScreen} from "@screens";
import { Images, Fonts, Constants } from '@commons';
import { YellowBox} from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Warning: Failed']);


export default class App extends Component {

    render() {
        return (
            <Provider store= {store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Root>
                        <SigninScreen/>
                    </Root>
                </PersistGate>
            </Provider>
        );
    }
}


