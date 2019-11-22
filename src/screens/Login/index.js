import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
  Dimensions,
  Button,
  Alert,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import firebase from 'react-native-firebase';
import Header from '../../components/atoms/Header'
import * as resources from 'resources';
import CodeInput from 'react-native-confirmation-code-input';
import color from '../../color';


//import { SafeAreaView } from 'react-navigation';
const className = 'Login';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
      otp: '',
      isLoading: false,
      user: null,
      message: '',
      codeInput: '',
      confirmResult: null,
      modalVisible: false,
      isLoading: false
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentWillUnmount() {
    this.setState({
      phoneNumber: ''
    })
  }
  clearState() {
    this.setState({
      email: '',
      password: '',
    });
  }
  showAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK' },
      ]
    );
  }
  validateCode() {
    if (this.state.otp.length < 6) {
      this.showAlert("Confirmation Code", "Please enter your confirmation code")
    } else {
      this.confirmCode()
    }
  }
  validatePhone() {
    if (this.state.phoneNumber.length < 10) {
      this.showAlert("Phone Number", "Please enter your correct phone number")
    } else {
      this.signIn()
    }
  }
  renderConfirmCodeBox() {
    return (
      <View style={styles.modalContainer}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}>
          <View style={styles.modal}>
            <Text style={styles.confirmationCode}>Confirmation code</Text>
            <View style={styles.numContainer}>
              <Text >+91{this.state.phoneNumber}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => this.setState({ modalVisible: false })}>
                <Text style={{ color: 'blue' }}>Edit</Text>
              </TouchableOpacity>
            </View>

            <CodeInput
              ref="codeInputRef1"
              secureTextEntry
              keyboardType={'number-pad'}
              className={'border-box'}
              activeColor={color.blue}
              inactiveColor={color.darkGray}
              space={8}
              codeLength={6}
              size={30}
              inputPosition='left'
              onFulfill={(otp) => this.setState({ otp })}
            />
            <TouchableOpacity
              onPress={() => {
                this.validateCode()
              }}
              style={styles.submitButton}>
              <View>
                {this.state.isLoading === true
                  ? <ActivityIndicator color='white' /> :
                  <Text style={styles.logintext}>SUBMIT</Text>
                }
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { this.signIn() }}
              style={styles.resendButton}>
              <Text style={styles.logintext}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View >
    );
  }
  signIn = () => {
    this.setState({
      isLoading: true
    })
    const { phoneNumber } = this.state;
    let number = '+91' + phoneNumber
    this.setState({ message: 'Sending code ...' });
    firebase.auth().signInWithPhoneNumber(number)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!', modalVisible: true, isLoading: false }))
      .catch(error => {
        this.setState({ isLoading: false })
        this.showAlert('Error', 'Please enter a valid phone number without country code')
      });
  }

  confirmCode = () => {
    this.setState({ isLoading: true })
    const { otp, confirmResult } = this.state;
    if (confirmResult && otp.length) {
      confirmResult.confirm(otp)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!', modalVisible: false, isLoading: false });
          let phoneNum = user.phoneNumber
          firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
            if (snapshot.val() == null) {
              navigation.navigate("SignUp", { 'phone': phoneNum })
            } else {
              if (snapshot.child('isAdmin').val() === 0) {
                navigation.navigate('Home')
              } else {
                navigation.navigate('AdminHome')
              }
            }
          });

        })
        .catch(error => {
          this.showAlert('Confirmation Code', error.message)
          this.setState({ isLoading: false })
        }
        );
    }
  };

  onLoginSuccess() {
    this.setState({
      isLoading: false
    })
    this.props.navigation.navigate('Home')
  }
  onLoginFailure(errorMessage) {
    this.setState({
      isLoading: false
    })
    alert(errorMessage)
  }

  renderSignupButton() {
    return (
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Text style={styles.signupLink}
          onPress={() => this.props.navigation.navigate("SignUp")}>Sign up</Text>
      </View >
    )
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Image
          style={styles.img}
          source={resources.IC_LOGO}
          resizeMode={'contain'} />
        <View style={styles.container}>
          <Text style={styles.placeholdertext}>Phone Number</Text>
          <TextInput
            style={styles.textfieldStyle}
            keyboardType={'numeric'}
            maxLength={10}
            onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
            value={this.state.phoneNumber} />
          <TouchableOpacity onPress={() => { this.validatePhone() }}
            disabled={this.state.isLoading}
            style={styles.loginButton}>
            <View>
              {this.state.isLoading === true
                ? <ActivityIndicator color='white' /> :
                <Text style={styles.logintext}>SUBMIT</Text>}
            </View>
          </TouchableOpacity>
          {this.renderConfirmCodeBox()}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(Login);
