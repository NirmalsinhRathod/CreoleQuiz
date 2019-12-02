import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  Modal,
  Platform,
  TouchableHighlight,
  Dimensions,
  Button,
  Alert,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import firebase from 'react-native-firebase';
import Header from '../../components/atoms/Header';
import * as resources from 'resources';
import * as fonts from '../../font';
import CodeInput from 'react-native-confirmation-code-input';
import color from '../../color';
import { StackActions, NavigationActions } from 'react-navigation';
import CountDown from 'react-native-countdown-component';
import * as utility from '../../Utillity/util';
import NetInfo from '@react-native-community/netinfo';
import * as ATOMS from '../../components/atoms';

//import { SafeAreaView } from 'react-navigation';
const className = 'Login';
const offlineText = 'Please check your internet connection.';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      phoneNumber: '',
      codeInput: '',
      isLoading: false,
      user: null,
      message: '',
      codeInput: '',
      confirmResult: null,
      modalVisible: false,
      isConfirmCodeLoading: false,
      isLoading: false,
      isResendOTP: false,
      isTimerFinish: false,
      isDemoAccount: false,
      emailDemo: '',
      passDemo: ''
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //alert(JSON.stringify(user))
          //this.setState({ user: user.toJSON(), modalVisible: false });
          this.finalCodeConfirmation(user);
        } else {
          // User has been signed out, reset the state
          this.setState({
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '',
            confirmResult: null
          });
        }
      });
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      if (this.unsubscribe) this.unsubscribe();
    }
    this.setState({
      phoneNumber: ''
    });
  }
  clearState() {
    this.setState({
      email: '',
      password: ''
    });
  }
  showAlert(title, message) {
    Alert.alert(title, message, [{ text: 'OK' }]);
  }

  moveToScreen() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'AdminHome' })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  validateCode() {
    if (this.state.codeInput.length < 6) {
      this.showAlert('Confirmation Code', 'Please enter your confirmation code');
    } else {
      NetInfo.isConnected.fetch().then((isConnected) => {
        if (isConnected === true) {
          this.confirmCode();
        } else {
          alert(offlineText);
        }
      });
    }
  }
  onChanged(text) {
    const reg = /^([0-9])+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      //alert(text)
      this.setState({ phoneNumber: text });
    }
  }
  loginWithEmail() {
    this.setState({
      isLoading: true
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.emailDemo, this.state.passDemo)
      .then(() => {
        this.setState({
          isLoading: false
        });
        if (this.state.emailDemo.toLocaleLowerCase() === 'user@gmail.com') {
          this.moveToScreen('Home');
        } else {
          this.moveToScreen('AdminHome');
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
        setTimeout(() => {
          alert('Please enter registered email address.');
        }, 100);
      });
  }
  validatePhone() {
    const reg = /^\(?([0-9])$/;
    if (this.state.phoneNumber.length < 10) {
      this.showAlert('Phone Number', 'Please enter your phone number');
    } else {
      NetInfo.isConnected.fetch().then((isConnected) => {
        if (isConnected === true) {
          this.signIn();
        } else {
          alert(offlineText);
        }
      });
    }
  }
  renderConfirmCodeBox() {
    return (
      // <View style={styles.modalContainer}>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => this.setState({ modalVisible: false })}
      >
        <View style={styles.modal}>
          <Text style={styles.confirmationCode}>Confirmation code</Text>
          <View style={styles.numContainer}>
            <Text>+91{this.state.phoneNumber}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => this.setState({ modalVisible: false })}
            >
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
            inputPosition="left"
            onFulfill={(codeInput) => this.setState({ codeInput })}
          />
          {/* <TextInput
            style={styles.textfieldStyle}
            keyboardType={'numeric'}
            maxLength={10}
            onChangeText={(codeInput) => this.setState({ codeInput })}
            value={this.state.codeInput} /> */}
          <TouchableOpacity
            onPress={() => {
              this.validateCode();
            }}
            style={styles.submitButton}
          >
            <View>
              {this.state.isConfirmCodeLoading === true ? (
                <ActivityIndicator color="white" />
              ) : (
                  <Text style={styles.logintext}>SUBMIT</Text>
                )}
            </View>
          </TouchableOpacity>
          {this.state.isTimerFinish === false ? (
            <CountDown
              until={90}
              onFinish={() => this.setState({ isTimerFinish: true })}
              // onPress={() => alert('hello')}
              digitStyle={{ backgroundColor: color.blue }}
              digitTxtStyle={{ color: color.white, fontFamily: fonts.Regular }}
              timeLabelStyle={{ color: color.lightBlue, fontFamily: fonts.Regular }}
              timeToShow={['M', 'S']}
              size={12}
            />
          ) : (
              <TouchableOpacity
                onPress={() => {
                  this.signIn();
                }}
                style={styles.resendButton}
              >
                <View>
                  {this.state.isResendOTP === true ? (
                    <ActivityIndicator color="white" />
                  ) : (
                      <Text style={styles.otpText}>RESEND OTP</Text>
                    )}
                </View>
              </TouchableOpacity>
            )}
        </View>
      </Modal>
      // </View >
    );
  }
  renderDemoAccount() {
    return (
      // <View style={styles.modalContainer}>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.isDemoAccount}
        onRequestClose={() => this.setState({ isDemoAccount: false })}
      >
        <View style={[styles.modal, { height: 350 }]}>
          <Text style={styles.placeholdertext}>Email Address</Text>
          <TextInput
            style={styles.textfieldStyle}
            keyboardType={'email-address'}
            maxLength={100}
            onChangeText={(emailDemo) => {
              this.setState({
                emailDemo
              });
            }}
            value={this.state.emailDemo}
          />

          <Text style={styles.placeholdertext}>Password</Text>
          <TextInput
            style={styles.textfieldStyle}
            secureTextEntry={true}
            maxLength={100}
            onChangeText={(passDemo) => {
              this.setState({
                passDemo
              });
            }}
            value={this.state.passDemo}
          />

          <TouchableOpacity
            onPress={() => {
              this.loginWithEmail();
            }}
            disabled={this.state.isLoading}
            style={styles.loginButton}
          >
            <View>
              {this.state.isLoading === true ? (
                <ActivityIndicator color="white" />
              ) : (
                  <Text style={styles.logintext}>SUBMIT</Text>
                )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({
                isDemoAccount: false
              });
            }}
            disabled={this.state.isLoading}
            style={styles.loginButton}
          >
            <View>
              {this.state.isLoading === true ? (
                <ActivityIndicator color="white" />
              ) : (
                  <Text style={styles.logintext}>CLOSE</Text>
                )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      // </View >
    );
  }
  verifyNumber = () => {
    this.setState({
      isLoading: true,
      isResendOTP: true
    });
    const { phoneNumber } = this.state;
    let number = '+91' + phoneNumber;
    firebase.auth().verifyPhoneNumber(number).on(
      'state_changed',
      (phoneAuthSnapshot) => {
        console.log('Satate ==> ' + phoneAuthSnapshot.state);

        // How you handle these state events is entirely up to your ui flow and whether
        // you need to support both ios and android. In short: not all of them need to
        // be handled - it's entirely up to you, your ui and supported platforms.

        // E.g you could handle android specific events only here, and let the rest fall back
        // to the optionalErrorCb or optionalCompleteCb functions
        switch (phoneAuthSnapshot.state) {
          // ------------------------
          //  IOS AND ANDROID EVENTS
          // ------------------------

          case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
            console.log('code sent ==> ' + JSON.stringify(phoneAuthSnapshot));
            this.setState({
              confirmResult: phoneAuthSnapshot,
              message: 'Code has been sent!',
              modalVisible: true,
              isLoading: false,
              isResendOTP: false
            });
            // on ios this is the final phone auth state event you'd receive
            // so you'd then ask for user input of the code and build a credential from it
            // as demonstrated in the `signInWithPhoneNumber` example above
            break;
          case firebase.auth.PhoneAuthState.ERROR: // or 'error'
            console.log('verification error' + phoneAuthSnapshot.error.message);
            console.log(phoneAuthSnapshot.error);
            alert('Phone Verification Error');
            break;

          // ---------------------
          // ANDROID ONLY EVENTS
          // ---------------------
          case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
            console.log('auto verify on android timed out');
            // proceed with your manual code input flow, same as you would do in
            // CODE_SENT if you were on IOS
            break;
          case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
            // auto verified means the code has also been automatically confirmed as correct/received
            // phoneAuthSnapshot.code will contain the auto verified sms code - no need to ask the user for input.
            console.log('auto verified on android');
            console.log(JSON.stringify(phoneAuthSnapshot));

            // Example usage if handling here and not in optionalCompleteCb:
            // const { verificationId, code } = phoneAuthSnapshot;
            // const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

            // Do something with your new credential, e.g.:
            // firebase.auth().signInWithCredential(credential);
            // firebase.auth().currentUser.linkWithCredential(credential);
            // etc ...
            break;
        }
      },
      (error) => {
        // optionalErrorCb would be same logic as the ERROR case above,  if you've already handed
        // the ERROR case in the above observer then there's no need to handle it here
        console.log(error);
        // verificationId is attached to error if required
        console.log(error.verificationId);
      },
      (phoneAuthSnapshot) => {
        // optionalCompleteCb would be same logic as the AUTO_VERIFIED/CODE_SENT switch cases above
        // depending on the platform. If you've already handled those cases in the observer then
        // there's absolutely no need to handle it here.

        // Platform specific logic:
        // - if this is on IOS then phoneAuthSnapshot.code will always be null
        // - if ANDROID auto verified the sms code then phoneAuthSnapshot.code will contain the verified sms code
        //   and there'd be no need to ask for user input of the code - proceed to credential creating logic
        // - if ANDROID auto verify timed out then phoneAuthSnapshot.code would be null, just like ios, you'd
        //   continue with user input logic.
        console.log('phoneAuthSnapshot ==> ' + JSON.stringify(phoneAuthSnapshot));
        // console.log("User ID  ==> " + firebase.auth().currentUser.uid);
        // let userId = firebase.auth().currentUser.uid
        // firebase.database().ref('users/' + userId).once('value').then((snapshot) => {
        //   if (snapshot.val() == null) {
        //     this.moveToScreen('SignUp')
        //   } else {
        //     if (snapshot.child('isAdmin').val() === 0) {
        //       this.moveToScreen('Home')
        //     } else {
        //       this.moveToScreen('AdminHome')
        //     }
        //   }
        // });
      }
    );
    // optionally also supports .then & .catch instead of optionalErrorCb &
    // optionalCompleteCb (with the same resulting args)
  };
  signIn = () => {
    this.setState({
      isLoading: true,
      isResendOTP: true
    });
    const { phoneNumber } = this.state;
    let number = '+91' + phoneNumber;
    this.setState({ message: 'Sending code ...' });
    firebase
      .auth()
      .signInWithPhoneNumber(number)
      .then((confirmResult) => {
        this.setState({
          confirmResult,
          message: 'Code has been sent!',
          modalVisible: true,
          isLoading: false,
          isResendOTP: false
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false, isResendOTP: false });
        this.showAlert('Error', error.message);
        console.log(error.message); //'Please enter a valid phone number without country code'
      });
  };

  finalCodeConfirmation(user) {
    this.setState({ message: 'Code Confirmed!', modalVisible: false, isConfirmCodeLoading: false });
    setTimeout(() => {
      let phoneNum = user.phoneNumber;
      firebase.database().ref('users/' + user.uid).once('value').then((snapshot) => {
        if (snapshot.val() == null) {
          this.moveToScreen('SignUp');
        } else {
          if (snapshot.child('isAdmin').val() === 0) {
            this.moveToScreen('Home');
          } else {
            this.moveToScreen('AdminHome');
          }
        }
      });
    }, 100);
  }
  confirmCode = () => {
    this.setState({ isConfirmCodeLoading: true });
    const { codeInput, confirmResult } = this.state;
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then((user) => {
          console.log('code confirmed');

          this.finalCodeConfirmation(user);
        })
        .catch((error) => {
          this.showAlert('Confirmation Code', error.message);
          this.setState({ isConfirmCodeLoading: false });
        });
    }
  };

  moveToScreen(screenName) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: screenName })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  onLoginSuccess() {
    this.setState({
      isLoading: false
    });
    this.moveToScreen('Home');
  }
  onLoginFailure(errorMessage) {
    this.setState({
      isLoading: false
    });
    alert(errorMessage);
  }
  renderSignupButton() {
    return (
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Text style={styles.signupLink} onPress={() => this.props.navigation.navigate('SignUp')}>
          Sign up
				</Text>
      </View>
    );
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Image style={styles.img} source={resources.IC_LOGO} resizeMode={'contain'} />
        <View style={styles.container}>
          <Text style={styles.placeholdertext}>Phone Number</Text>
          <TextInput
            style={styles.textfieldStyle}
            keyboardType={'numeric'}
            maxLength={10}
            onChangeText={(phoneNumber) => this.onChanged(phoneNumber)}
            value={this.state.phoneNumber}
          />
          <TouchableOpacity
            onPress={() => {
              this.validatePhone();
            }}
            disabled={this.state.isLoading}
            style={styles.loginButton}
          >
            <View>
              {this.state.isLoading === true ? (
                <ActivityIndicator color="white" />
              ) : (
                  <Text style={styles.logintext}>SUBMIT</Text>
                )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({
                isDemoAccount: true
              });
            }}
            disabled={this.state.isLoading}
            style={[styles.loginButton, { position: 'absolute', bottom: 10 }]}
          >
            <View>
              {this.state.isLoading === true ? (
                <ActivityIndicator color="white" />
              ) : (
                  <Text style={styles.logintext}>DEMO ACCOUNT</Text>
                )}
            </View>
          </TouchableOpacity>

          {this.renderDemoAccount()}
          {this.renderConfirmCodeBox()}
          {/* <ATOMS.InternectConnectivity /> */}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(Login);