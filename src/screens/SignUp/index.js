import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';
import firebase from 'react-native-firebase';
import * as utility from '../../Utillity/util';
import Slider from '@react-native-community/slider';
import color from '../../color'
import RadioButton from '../../components/atoms/RadioButton'
import Header from '../../components/atoms/Header'
import * as IMG from '../../resources/index';
import { Dropdown } from 'react-native-material-dropdown';
import { TagSelect } from 'react-native-tag-select';


class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			phone: '',
			name: '',
			address: '',
			experiance: 0,
			rate: 0,
			password: '',
			randomString: '',
			designation: '',
			isLoading: false,
			error: '',
			ans1: {},
			ans2: {},
			ans3: {},
			questionData: [{ question: 'Question 1' }, { question: 'Question 2' }, { question: 'Question 3' }],
			data: [{
				value: 'Wordpress developer',
			}, {
				value: 'PHP developer',
			}, {
				value: 'Mobile developer',
			}],
			skills: [
				{ id: 1, label: 'HTML' },
				{ id: 2, label: 'CSS' },
				{ id: 3, label: 'JavaScript' },
				{ id: 4, label: 'PHP' },
			],
			selectedSkills: [],
		};
	}
	componentDidMount() {
		// let isLoginFlag =
		let PhoneNumber = this.props.navigation.getParam('phone')
		this.setState({
			phone: PhoneNumber,
		})
	}

	checkValidation() {
		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (this.state.name.trim() === '') {
			this.showAlert('Full Name', 'Please enter your full name')
		} else if (this.state.email.trim() === '') {
			this.showAlert('Full Name', 'Please enter your email')
		} else if (reg.test(this.state.email) === false) {
			this.showAlert('Full Name', 'Please enter a valid email')
		} else {
			this.SignUp.bind(this);
			this.SignUp();
		}
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
	componentWillUnmount() {
		this.setState({
			name: '',
			email: '',
			designation: '',
			experiance: 0,
			rate: 0,
			phone: '',
			selectedSkills: [],
		})
	}
	SignUp() {
		let userId = firebase.auth().currentUser.uid
		let userRef = firebase.database().ref('users/');
		userRef.child(userId).set({
			name: this.state.name,
			email: this.state.email,
			designation: this.state.designation,
			programmingExperiance: this.state.experiance,
			wordPressRating: this.state.rate,
			phone: this.state.phone,
			skills: this.state.selectedSkills,
			isAdmin: 0
		});
		this.props.navigation.navigate('Home')
	}
	clearState() {
		this.setState({
			email: '',
			password: ''
		});
	}
	renderLoginButton() {
		return (
			<View style={styles.loginContainer} >
				<Text style={styles.loginText}>Already have an account?</Text>
				<Text style={styles.loginLink} onPress={() => this.props.navigation.navigate('Login')}>
					Login
				</Text>
			</View>
		);
	}
	setAnswer1 = (value) => {
		this.setState({ ans1: value });
	};
	setAnswer2 = (value) => {
		this.setState({ ans2: value });
	};
	setAnswer3 = (value) => {
		this.setState({ ans3: value });
	};
	render() {
		return (
			<View>
				<Header
					title={'SIGNUP'}
					textColor={'white'}
				// leftImage={showBack && IMG.IC_BACK}
				// leftButtonPress={() => {
				// 	showBack && this.props.navigation.goBack()
				// }} 
				/>

				<ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', paddingBottom: 60 }}>
					<View>
						<Text style={styles.placeholdertext}>Full Name</Text>
						<TextInput
							style={styles.textfieldStyle}
							//placeholder={"Full Name"}
							onChangeText={(name) => this.setState({ name })}
							value={this.state.name} />

						<Text style={styles.placeholdertext}>Email Address</Text>
						<TextInput
							style={styles.textfieldStyle}
							//placeholder={"Email Address"}
							keyboardType={'email-address'}
							onChangeText={(email) => this.setState({ email })}
							value={this.state.email} />

						<View style={styles.dropdownview}>
							<Dropdown
								label='Designation'
								data={this.state.data}
								textColor={color.darkGray}
								itemColor={color.darkGray}
								selectedItemColor={color.darkGray}
								value={this.state.data[0].value}
								onChangeText={(value) => {
									this.setState({
										designation: value
									})
								}} />
						</View>

						<Text style={styles.placeholdertext}>How many years of programming experiance do you have?</Text>
						<View style={styles.sliderContainer}>
							<Slider
								style={styles.slider}
								minimumValue={0}
								maximumValue={10}
								step={1}
								value={this.state.experiance}
								onValueChange={(experiance) => this.setState({ experiance })}
								minimumTrackTintColor={color.blue}
								maximumTrackTintColor={color.lightGray} />

							<Text style={styles.experianceCountText}>{this.state.experiance}</Text>
						</View>

						<Text style={styles.placeholdertext}>How much do you rate yourself in Wordpress?</Text>
						<View style={styles.sliderContainer}>
							<Slider
								style={styles.slider}
								minimumValue={0}
								maximumValue={10}
								step={1}
								value={this.state.rate}
								onValueChange={(rate) => this.setState({ rate })}
								minimumTrackTintColor={color.blue}
								maximumTrackTintColor={color.lightGray} />
							<Text style={styles.experianceCountText}>{this.state.rate}</Text>
						</View>

						<Text style={styles.placeholdertext}>What other skills do you have?</Text>
						<View style={{
							marginTop: 10
						}}>
							<TagSelect
								data={this.state.skills}
								//max={3}
								ref={(tag) => {
									this.tag = tag;
								}}
								itemStyle={styles.item}
								itemLabelStyle={styles.lable}
								itemStyleSelected={styles.itemSelected}
								itemLabelStyleSelected={styles.lable}
								onItemPress={() => {
									this.setState({ selectedSkills: this.tag.itemsSelected })
									//alert(JSON.stringify(this.tag.itemsSelected))
								}}
								onMaxError={() => {
									Alert.alert('Ops', 'Max reached');
								}}
							/>
						</View>
						<TouchableOpacity
							onPress={() => {
								// this.SignUp.bind(this);
								this.checkValidation();
							}}
							style={styles.signupButton}
						>
							<Text style={{ color: 'white' }}>
								{this.state.isLoading === true ? <ActivityIndicator /> : 'Sign up'}
							</Text>
						</TouchableOpacity>
						{this.renderLoginButton()}
					</View>
				</ScrollView>
			</View >
		);
	}
}

const mapStateToProps = (state) => {
	const { loading, userData, isSuccess } = state.auth;
	return {
		loading,
		userData,
		isSuccess
	};
};

export default connect(mapStateToProps)(SignUp);
