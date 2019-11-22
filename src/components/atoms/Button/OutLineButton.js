import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './style';
import * as constant from '../../../constants/constant';

class OutLineButton extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderRadius: 3,
          borderColor: constant.LINK_COLOR,
          backgroundColor: '#FFFFFF',
          height: constant.BUTTON_HEIGHT,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          this.props.onPress();
        }}>
        <Text style={{color: constant.LINK_COLOR, fontSize: 15}}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
export default OutLineButton;
