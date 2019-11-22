import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './style';
import * as constant from '../../../constants/constant';

class FlatButton extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          backgroundColor: '#F26622',
          height: constant.BUTTON_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          this.props.onPress();
        }}>
        <Text style={{color: 'white', fontSize: 15}}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
export default FlatButton;
