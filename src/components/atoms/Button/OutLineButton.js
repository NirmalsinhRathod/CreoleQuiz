import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import color from '../../../color'
import * as fonts from '../../../font/index'
import * as constant from '../../../constants/constant';

class OutLineButton extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <TouchableOpacity
        style={{
          width: 130,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: color.blue,
          borderWidth: 1,
          // marginLeft: 10,
        }}

        onPress={() => {
          this.props.onPress();
        }}
      >
        <Text style={{
          color: color.blue,
          fontFamily: fonts.Bold,
          fontSize: 15
        }}>{title}</Text>
      </TouchableOpacity>
      // <TouchableOpacity
      //   style={{
      //     borderWidth: 2,
      //     borderRadius: 3,
      //     borderColor: constant.LINK_COLOR,
      //     backgroundColor: '#FFFFFF',
      //     height: constant.BUTTON_HEIGHT,
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //   }}
      //   onPress={() => {
      //     this.props.onPress();
      //   }}>
      //   <Text style={{color: constant.LINK_COLOR, fontSize: 15}}>{title}</Text>
      // </TouchableOpacity>
    );
  }
}
export default OutLineButton;
