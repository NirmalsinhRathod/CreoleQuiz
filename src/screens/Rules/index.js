import React, { Component } from 'react';
import { View, Text, FlatList, Platform } from 'react-native';
import Header from '../../components/atoms/Header';
import styles from './style'
import * as IMG from '../../resources/index';

export default class Rules extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rules: [
                {
                    desc: 'There are individual prizes for quiz 1 & 2.'
                },
                {
                    desc: 'Each quiz will be active only for a certain period of time throughout the day.'
                },
                {
                    desc: `To attempt quiz 3(oh don't forget, it has a bumper prize), it is mandatory for you to have attempted quiz 1 & 2.`
                },


            ]
        }
    }
    componentDidMount() {


    }

    renderItems = ({ item, index }) => {
        return (
            <View style={styles.viewContainer}>
                <View style={styles.circle}></View>
                <Text style={styles.rulestext}>{item.desc}</Text>

            </View>
        )
    }
    render() {

        return (
            <View>
                <Header
                    title={'Rules'}
                    textColor={'white'}
                    leftImage={IMG.IC_BACK}
                    leftButtonPress={() => {
                        this.props.navigation.navigate('Home')
                    }}
                />
                <View style={styles.container}>

                    <View>
                        <FlatList

                            data={this.state.rules}
                            renderItem={this.renderItems}
                        />
                    </View>

                    {
                        Platform.OS === 'ios' && <Text style={styles.rulestext}>Note: Apple is not sponser of this quiz.</Text>
                    }

                </View>
            </View>
        );
    }
}
