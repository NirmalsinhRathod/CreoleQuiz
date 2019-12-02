import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform, Dimensions, FlatList, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { login } from '../../store/Auth/actions';
import styles from './style';
import Header from '../../components/atoms/Header';
import * as fonts from '../../font/index';
import * as IMG from '../../resources/index';
import color from '../../color'
import { StackActions, NavigationActions } from 'react-navigation';
import NetInfo from "@react-native-community/netinfo";
import { FloatingAction } from "react-native-floating-action";

import * as ATOM from '../../components/atoms/InternetConnectivity'


const offlineText = 'Please check your internet connection.'

class Home extends Component {
	constructor() {
		super();
		this.state = {
			isAdmin: 0,
			userInfo: {},
			taken: 0,
			numberOfQue: 0,
			selectedQuiz: null,
			quizData: [],
			activeQuiz: -1,
			score: 0,
			quizlist: [
				{ 'quizName': 'Quiz 1', 'currentquiz': 'Quiz1' },
				{ 'quizName': 'Quiz 2', 'currentquiz': 'Quiz2' },
				{ 'quizName': 'Quiz 3', 'currentquiz': 'Quiz3' },
			],
			data: [
				{ key: 'Quiz-1', value: 'Quiz1' },
				{ key: 'Quiz-2', value: 'Quiz2' },
				{ key: 'Quiz-3', value: 'Quiz3' },
				{ key: 'No Quiz', value: null }
			]
		};
		this.getToken();
	}
	componentDidMount() {

		firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then((snapshot) => {
			console.log("User Info ==> " + JSON.stringify(snapshot.val()))
			let isAdmin = false;
			if (snapshot.val().isAdmin) {
				isAdmin = snapshot.val().isAdmin;
			}
			this.setState({
				isAdmin,
				userInfo: snapshot.val()
			});
		});
		firebase.database().ref('activeQuiz/').on('value', (snapshot) => {
			if (snapshot.val()) {
				this.setState({
					activeQuiz: snapshot.val(),
					selectedQuiz: snapshot.val(),
					quizData: []
				});

				firebase
					.database()
					.ref('result/')
					.child(firebase.auth().currentUser.uid)
					.child('/quiz/')
					.once('value')
					.then((snapshot) => {
						let allQuizData = [];
						snapshot.forEach((child) => {
							let obj = child.val();
							obj.key = child.key;
							allQuizData.push(obj);
						});

						this.setState({
							//taken: snapshot.child('score').val(),
							quizData: allQuizData
						});
					});
			} else {
				this.setState({
					activeQuiz: -1,
					selectedQuiz: -1,
					quizData: []
				});
			}
		});

		firebase.database().ref('numberQuestions/').once('value').then((snapshot) => {
			this.setState({
				numberOfQue: snapshot.val()
			});
		});
	}
	async getToken() {
		let fcmToken = await firebase.messaging().getToken();
		let path = 'users/' + firebase.auth().currentUser.uid;
		if (fcmToken) {
			let token = {};
			token[`${fcmToken}`] = Platform.OS;
			let updateChatListInfo = {};
			updateChatListInfo[path + '/device_token'] = token;
			updateChatListInfo[path + '/os_type'] = Platform.OS == 'ios' ? '1' : '2';
			firebase.database().ref().update(updateChatListInfo, function (error) { });
		}
	}
	updateQuestionQuiz() {
		let noQue = {};
		noQue['numberQuestions'] = parseInt(this.state.numberOfQue);
		firebase.database().ref().update(noQue, function (error) { });
	}
	setActiveQuiz(index) {
		let activeQuiz = {};
		activeQuiz['activeQuiz'] = index;
		firebase.database().ref().update(activeQuiz, function (error) { });
	}
	renderQuizList() {
		let screenWidth = Dimensions.get('screen').width;
		let numColumns = 1;
		let width = screenWidth * 0.6;
		if (this.state.data.length % 2 === 0) {
			numColumns = 2;
			width = screenWidth * 0.4;
		}
		return (
			<View style={styles.quizListContainer}>
				<View style={styles.numOfQue}>
					<TextInput
						style={styles.textFieldQue}
						placeholder={'Enter number of question'}
						keyboardType={'email-address'}
						onChangeText={(numberOfQue) => this.setState({ numberOfQue })}
						value={this.state.numberOfQue}
					/>
					<TouchableOpacity onPress={() => this.updateQuestionQuiz()} style={styles.btnSubmit}>
						<Text>Submit</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.btnTitle}>Select a Quiz</Text>
				<FlatList
					scrollEnabled={false}
					data={this.state.data}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							onPress={() => {
								this.setState({
									selectedQuiz: item.value
								});
								this.setActiveQuiz(item.value);
							}}
							style={[
								styles.btnFlatlist,
								{
									width: width,
									backgroundColor: this.state.selectedQuiz === item.value ? 'green' : 'skyblue'
								}
							]}
						>
							{/* onPress={() =>
								this.props.navigation.navigate('Quiz')
							} */}
							{/* style={{ justifyContent: 'center', marginHorizontal: 10, alignSelf: 'center', marginTop: 20, alignItems: 'center', height: 50, backgroundColor: 'skyblue', width: width }}> */}
							<Text>{item.key}</Text>
						</TouchableOpacity>
					)}
					numColumns={numColumns}
				/>
			</View>
		);
	}
	logout() {
		Alert.alert('Logout', 'Are you sure you want to logout?', [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'Logout',
				onPress: () => {
					firebase.auth().signOut();
					setTimeout(() => {
						this.moveToLogin()
					}, 100);
				}
			}
		]);
	}
	moveToLogin() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: 'Login' })],
		});
		this.props.navigation.dispatch(resetAction);
	}
	renderStartButton() {
		var newQuizStr = this.state.activeQuiz.replace('Quiz', '');
		return (
			<TouchableOpacity
				onPress={() => {
					NetInfo.isConnected.fetch().then(isConnected => {
						if (isConnected === true) {

							this.props.navigation.navigate('Quiz', {
								currentActiveQuiz: newQuizStr,
								userInfo: this.state.userInfo
							});
						} else {
							alert(offlineText)
						}

					});

				}}
				style={styles.btnStartQuiz}>
				<Text style={styles.btnStartQuizTitle}>Start Quiz</Text>
			</TouchableOpacity>
		);
	}
	renderItem = ({ item, index }) => {
		let score = 0
		let attempted_que = 0
		let isActive = false
		if (item.currentquiz === this.state.activeQuiz) {
			isActive = true
		}
		let allAttQuizName = []
		this.state.quizData.filter((value) => {
			allAttQuizName.push(value.key)
			if (value.key === item.currentquiz) {
				score = value.score
				attempted_que = value.attempted_que
				isActive = false
			}
		})

		let isQuizDisable = false
		let isQuiz3 = false
		if (this.state.activeQuiz === 'Quiz3' && item.currentquiz === 'Quiz3') {
			isQuiz3 = true
			let count = 0
			this.state.quizData.filter((value) => {
				if (value.key === 'Quiz1' || value.key === 'Quiz2') {
					count = count + 1
				}
			})
			if (count === 2) {
				isQuizDisable = false
			} else {
				isQuizDisable = true
			}
			// Here we need to check if user is already attempted previous quiz or not

		}

		return (
			<View style={styles.itemview}>
				<View style={styles.childview}>
					<Text style={styles.quiztext}>
						{item.quizName}
					</Text>
					{
						attempted_que > 0 && <Text style={styles.scoretext}>
							{'Score: ' + score + '/' + this.state.numberOfQue}
						</Text>
					}
				</View>

				{
					!isQuizDisable &&

					<View style={styles.startbtnview}>
						<TouchableOpacity
							disabled={isActive ? false : true}
							onPress={() => {
								let newQuizStr = this.state.activeQuiz.replace('Quiz', '');
								this.props.navigation.navigate('Quiz', {
									currentActiveQuiz: newQuizStr,
									userInfo: this.state.userInfo
								});
							}}
							style={isActive ? styles.btnStartQuiz : styles.btnStartQuizDisable}>
							<Text style={isActive ? styles.btnStartQuizTitle : styles.btnStartQuizTitleDisable}>START QUIZ</Text>
						</TouchableOpacity>
						{
							attempted_que > 0 && <Text
								style={styles.attemptedtxt}>
								{'Already attempted'}
							</Text>
						}
					</View>
				}

				{
					isQuizDisable &&
					<View style={styles.startbtnview}>
						<Text
							style={styles.attemptedtxt}>
							Sorry, You haven't attempted previous Quiz
						</Text>
					</View>
				}


				<View style={{
					width: '100%',
					borderBottomColor: color.lightGray,
					borderBottomWidth: 1,
				}}></View>
			</View >
		);
	};
	renderActiveQuiz() {
		if (this.state.isAdmin === 1) {
			return null;
		}
		if (this.state.activeQuiz !== -1) {
			// Quiz is ACTIVE
			let ary = this.state.quizData.filter((value) => value.key === this.state.activeQuiz);

			if (ary && ary.length > 0) {
				return (
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Text>Already attempted</Text>
					</View>
				);
			} else {
				return (
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Text>ACTIVE.. You can play</Text>
						{this.renderStartButton()}
					</View>
				);
			}
		} else {
			return (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text style={{ color: 'red' }}>IN ACTIVE</Text>
				</View>
			);
		}
	}
	render() {
		return (
			<View >

				<Header
					leftImage={IMG.IC_LOGOUT}
					leftButtonPress={this.logout.bind(this)}
					textColor={'white'}
					title={'HOME'}
				/>
				<View style={styles.actionview}>
					<TouchableOpacity
						style={styles.actionButtonIcon}
						onPress={() => {
							this.props.navigation.navigate('Rules')
						}}>
						<Text style={styles.ruleText}>Rules</Text>
						{/* <Image
							source={IMG.IC_INFO}
							style={styles.actionImg}
						/> */}
					</TouchableOpacity>

				</View>
				<View style={styles.container}>
					<FlatList
						scrollEnabled={true}
						extraData={this.state}
						data={this.state.quizlist}
						renderItem={this.renderItem}
					// keyExtractor={item => item.id}
					/>

				</View>

				{/* <View style={{ height: '90%',backgroundColor:'red' }}>
					
				</View> */}

				{/* {this.state.taken === 1 && this.state.isAdmin === 0 ? (
					<Text>Quiz is already taken</Text>
				) : (
					<View>{this.renderStartButton()}</View>
				)} */}

				{/* {this.renderActiveQuiz()}
				{this.state.isAdmin === 1 && (
					<View style={{ position: 'absolute', bottom: 20, height: 60 }}>{this.renderQuizList()}</View>
				)} */}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { loading, userData } = state.auth;
	return {
		loading,
		userData
	};
};

export default connect(mapStateToProps, { login })(Home);
