import React, { Component } from 'react';
import { View, Alert, Animated, Easing, } from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import { requestPerson, connectionState } from '../../../store/Connection/actions';
import { connect } from 'react-redux';
import styles from './style'
class InternectConnectivity extends Component {

    animationConstants = {
        DURATION: 800,
        TO_VALUE: 4,
        INPUT_RANGE: [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
        OUTPUT_RANGE: [0, -15, 0, 15, 0, -15, 0, 15, 0]
    }
    state = {

        offlineText: ''
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this.checkConnectivity());
    }

    componentWillUnmount() {

        //NetInfo.isConnected.removeEventListener('change', this.checkConnectivity());
        //this.animation = new Animated.Value(0);
    }

    componentDidUpdate(prevProps, prevState) {

        // if (prevProps.isInternetConnected !== this.props.isInternetConnected) {
        //     alert(this.props.isInternetConnected)
        //     //this.checkConnectivity()
        // }

    }

    _handleConnectionChange = (isConnected) => {
        this.props.dispatch(connectionState({ status: isConnected }));
    };
    checkConnectivity() {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected === true) {

                this._handleConnectionChange(isConnected)
            }

        });
    }
    showAlert(title, message) {
        Alert.alert(
            title,
            message,
            [
                { text: 'OK' },
            ]
        );
    }
    triggerAnimation = () => {
        this.animation.setValue(0);
        Animated.timing(this.animation, {
            duration: this.animationConstants.DURATION,
            toValue: this.animationConstants.TO_VALUE,
            useNativeDriver: true,
            ease: Easing.bounce
        }).start();
    }

    render() {

        return (
            <View></View>
        )

    }
}
const mapStateToProps = state => {
    const { isInternetConnected } = state.connection
    console.log(JSON.stringify(state.connection));

    return {
        isInternetConnected
    }
};

export default connect(mapStateToProps, { connectionState })(InternectConnectivity);