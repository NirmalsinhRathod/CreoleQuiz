import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import * as IMG from '../../resources/index';
import Header from '../../components/atoms/Header'
import Orientation from 'react-native-orientation'
import style from '../../components/atoms/Header/style';
import { StackActions, NavigationActions } from 'react-navigation';

export default class EndQuiz extends Component {
    constructor() {
        super();
        this.state = {
            score: 0,
            total: 0,
        }
    }
    //

    componentDidMount() {
        // Orientation.lockToPortrait();
        this.setState({
            score: this.props.navigation.state.params.score,
            total: this.props.navigation.state.params.total,
        })

    }
    moveToHome() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAction);
    }
    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            // do something with landscape layout
        } else {
            // do something with portrait layout
        }
    }
    componentWillUnmount() {
        // Remember to remove listener
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    render() {
        return (
            <View>
                <Header title={'RESULT'}
                    textColor={'white'} />
                <View style={styles.container}>
                    <Text style={styles.totalscoretext}>{'Total Score'}</Text>
                    <View style={styles.childview}>

                        <Text style={styles.text}>{this.state.score + '/' + this.state.total}</Text>
                    </View>
                    <TouchableOpacity style={styles.homeview}
                        onPress={() => {
                            //this.props.navigation.push('Home')
                            this.moveToHome()
                        }}
                    >
                        <Image source={IMG.IC_HOME}
                            style={styles.homebtn}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
