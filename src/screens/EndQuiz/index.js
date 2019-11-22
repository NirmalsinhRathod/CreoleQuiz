import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import * as IMG from '../../resources/index';
import Header from '../../components/atoms/Header'
import Orientation from 'react-native-orientation'
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
                    leftImage={IMG.IC_BACK}
                    leftButtonPress={() => {
                        this.props.navigation.goBack()
                    }}
                    textColor={'white'} />
                <View style={styles.container}>
                    <Text >{'Total Score'}</Text>
                    <View style={styles.childview}>

                        <Text style={styles.text}>{this.state.score + '/' + this.state.total}</Text>
                    </View>

                </View>

            </View>
        );
    }
}
