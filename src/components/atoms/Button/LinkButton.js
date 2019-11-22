import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import * as constant from '../../../constants/constant';
import font from '../../../font';

class LinkButton extends React.Component {
  render() {
    const {title, style} = this.props;
    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          this.props.onPress();
        }}>
        <Text
          style={{
            color: constant.LINK_COLOR,
            fontSize: 14,
            fontFamily: font.RobotoRegular,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}
export default LinkButton;
