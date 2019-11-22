import React from 'react';
import { View,ActivityIndicator } from 'react-native';
import styles from './style';
import * as COLOR from '../../../constants/colors';

class Loader extends React.Component {
    render() {
        const { isLoading } = this.props;
        if (isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator 
                        size="large" 
                        color={COLOR.INDICATOR} 
                    />
                </View>
            );
        }
        return null
    }
}
export default Loader;