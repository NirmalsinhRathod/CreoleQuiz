import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import RadioGroup, { Radio } from "react-native-radio-input";

class RadioButton extends React.Component {

    getChecked = (value) => {
        // value = our checked value
        this.props.getValue(value);
        // return value
    }
    render() {
        const { question, data } = this.props;
        // let selectedButton = this.props.data.find(e => e.selected == true);
        // selectedButton = selectedButton && selectedButton.value;

        return (
            <View style={styles.container}>
                <Text style={styles.questionText}>{this.props.question}</Text>
                <View style={styles.optionsContainer}>
                    <RadioGroup getChecked={this.getChecked} >
                        <Radio iconName={"lens"} label={"Yes"} value={"Yes"} />
                        <Radio iconName={"lens"} label={"No"} value={"No"} />
                    </RadioGroup>
                </View>
            </View>
        )
    }

}
export default RadioButton;