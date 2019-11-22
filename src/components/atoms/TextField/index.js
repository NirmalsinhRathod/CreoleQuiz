import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './style';

class TextField extends React.Component {
  render() {
    const { value, placeholder, onChangeText, style, maxLength } = this.props;
    let keyboardType = this.props.keyboardType
      ? this.props.keyboardType
      : 'default';
    let length = maxLength ? maxLength : 60;
    return (
      // <View style={[style, { paddingLeft: 0, paddingRight: 0, backgroundColor: 'white', }]}>
      <TextInput
        {...this.props}
        maxLength={length}
        keyboardType={keyboardType}
        secureTextEntry={
          this.props.secureTextEntry ? this.props.secureTextEntry : false
        }
        style={{ height: 50 }}
        underlineColorAndroid={'transparent'}

        value={value}
        placeholder={placeholder}
      />
      // </View>
    );
  }
}
export default TextField;
