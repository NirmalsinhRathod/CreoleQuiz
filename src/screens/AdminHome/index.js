import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform, Dimensions, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { login } from '../../store/Auth/actions';
import styles from './style';
import Header from '../../components/atoms/Header';
import * as IMG from '../../resources/index';
import color from '../../color'

class AdminHome extends Component {
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
			data: [
				{ key: 'Quiz 1', value: 'Quiz1' },
				{ key: 'Quiz 2', value: 'Quiz2' },
				{ key: 'Quiz 3', value: 'Quiz3' },
				{ key: 'No Quiz', value: null }
			]
		};
		this.getToken();
	}
	componentDidMount() {
		// firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then((snapshot) => {
		// 	let isAdmin = false;
		// 	if (snapshot.val().isAdmin) {
		// 		isAdmin = snapshot.val().isAdmin;
		// 	}
		// 	this.setState({
		// 		isAdmin,
		// 		userInfo: snapshot.val()
		// 	});
		// });
		firebase.database().ref('activeQuiz/').on('value', (snapshot) => {
			if (snapshot.val()) {
				this.setState({
					activeQuiz: snapshot.val(),
					selectedQuiz: snapshot.val(),
				});
			} else {
				this.setState({
					activeQuiz: null,
					selectedQuiz: null,
				});
			}
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
	setActiveQuiz(index) {
		let activeQuiz = {};
		activeQuiz['activeQuiz'] = index;
		firebase.database().ref().update(activeQuiz, function (error) { });
	}
	renderQuizList() {
		return (
			<View style={styles.quizListContainer}>
				<View style={{ height: 60, justifyContent: 'center', alignContent: 'center', flexDirection: 'column', borderBottomColor: color.lightGray, borderBottomWidth: 0.5 }}>
					<Text style={{ alignSelf: 'center' }}>Select a quiz</Text>
				</View>
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
									backgroundColor: this.state.selectedQuiz === item.value ? color.lightBlue : 'white'
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
				/>
			</View >
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
						this.props.navigation.navigate('Login');
					}, 100);
				}
			}
		]);
	}
	render() {
		return (
			<View style={styles.container}>
				<Header
					leftImage={IMG.IC_LOGOUT}
					// rightImage={this.state.isAdmin === 1 && IMG.IC_SETTING}
					// rightButtonPress={() => this.state.isAdmin === 1 && this.props.navigation.navigate('Admin')}
					rightImage={IMG.IC_SETTING}
					leftButtonPress={this.logout.bind(this)}
					rightButtonPress={() => this.props.navigation.navigate('Admin')}
					title={'AdminHome'}
					textColor={'white'}
				/>
				{this.renderQuizList()}
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

export default connect(mapStateToProps, { login })(AdminHome);
