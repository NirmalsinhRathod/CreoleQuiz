import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import * as constant from '../../../constants/constant'

class Button extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    width: '80%',
                    height: constant.BUTTON_HEIGHT,
                    borderRadius: constant.BUTTON_HEIGHT / 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => {
                    this.props.onPress()
                }}
            >
                <Text>{title}</Text>
            </TouchableOpacity>
        );
    }

}
export default Button;