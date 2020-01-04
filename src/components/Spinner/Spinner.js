import React from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
const {width, height, scale} = Dimensions.get("window");

import {Colors} from '@commons';

const SIZES = {SMALL: 'small', LARGE: 'large'};

export const Mode = {normal: 'normal', full: 'full', overlay: 'overlay', overlay1: 'overlay1'};

class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {animating} = nextProps;
        this.setState({animating: animating});
    }

    render() {
        const {size, color, mode} = this.props;

        let containerStyle = styles.container;
        switch (mode) {
            case Mode.full:
                containerStyle = styles.container_full_stretch;
                break;
            case Mode.overlay:
                containerStyle = styles.container_overlay;
            case Mode.overlay1:
                containerStyle = styles.container_overlay1;

                break;
        }
        return (
            <View style={containerStyle}>
                <ActivityIndicator
                    size={size}
                    color={color}
                    style={[styles.wrapper, {borderRadius: size == SIZES.SMALL ? 10 : 20}]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: null,
        width: null,
    },
    container_full_stretch: {
        flexGrow: 1,
        height: null,
        width: null,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_overlay1: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
    },
    container_overlay: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
    },
    wrapper: {
        backgroundColor: 'transparent',
        zIndex: 100,
    }
});

Spinner.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    mode: PropTypes.string,
};

Spinner.defaultProps = {
    color: Colors.lightblue,
    size: 'large',
    mode: Mode.normal,
};

export default Spinner;

