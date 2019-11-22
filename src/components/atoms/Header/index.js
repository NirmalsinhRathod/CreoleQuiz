import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import styles from './style';
import color from '../../../color'
export default class Header extends Component {
    render() {
        const { title, leftButtonPress, rightButtonPress, leftImage, rightImage, textColor } = this.props;
        return (

            <SafeAreaView style={styles.safeareaview}>
                <View style={styles.container} >
                    <StatusBar barStyle="light-content"></StatusBar>
                    <TouchableOpacity
                        style={styles.iconStyleLeft}
                        onPress={leftButtonPress}>
                        <Image style={{ height: 20, width: 20 }} resizeMode={'contain'} source={leftImage} />
                    </TouchableOpacity>

                    <Text style={[styles.text, { color: textColor }]}>{title}</Text>

                    <TouchableOpacity
                        style={styles.iconStyleRight}
                        onPress={rightButtonPress}>
                        <Image style={{ height: 25, width: 25 }} resizeMode={'contain'} source={rightImage} />
                    </TouchableOpacity>
                </View >
            </SafeAreaView>
        );
    }
}
