import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, FlatList, BackHandler } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { login } from '../../store/Auth/actions';
import styles from './style';
import Button from '../../components/atoms/Button';
import Header from '../../components/atoms/Header';
import * as IMG from '../../resources/index';
import color from '../../color';
import OutLineButton from '../../components/atoms/Button/OutLineButton';

import RadioGroup, { Radio } from "react-native-radio-input";

import RadioButton from '../../components/atoms/RadioButton'
import Orientation from 'react-native-orientation';

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionsList: [],
			quiztitle: '',
			nodeTitle: '',
			currentindex: 1,
			queIndex: 0,
			correctAnsId: 0,
			score: 0,
			prevAnsId: 0,
			attemptedAnsList: [],
			totalAttamptedQue: 0,
			numberQuestions: 0,
			currentQuiz: 0,
			isLoading: true,
			isConnected: true

		};
		this.AnsList = [];
		this.queIndex = 0;
		this.ansId = 0;
		this.activequiz = 0;

		let currentQuiz = this.props.navigation.state.params.currentActiveQuiz;
		this.state.currentQuiz = currentQuiz;
		setTimeout(() => {
			this.getQuestionsList();
		}, 10);
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}
	onBackPress = () => {
		this.endQuiz()
		return true;
	};
	completeQuiz() {

	}
	getQuestionsList() {
		let numberQuestions = 20;
		var quePath = `numberQuestions/`;
		firebase.database().ref(quePath).persistenceEnabled = true;
		firebase.database().ref(quePath).keepSynced(true);

		firebase.database().ref(quePath).once('value').then((snapshot) => {
			if (snapshot.val()) {
				numberQuestions = snapshot.val();
			}
			this.state.numberQuestions = numberQuestions;

			var quizPath = `quiz/${this.state.currentQuiz}`;
			firebase.database().ref(quizPath).persistenceEnabled = true;
			firebase.database().ref(quizPath).keepSynced(true);

			firebase.database().ref(quizPath).once('value').then((snapshot) => {
				if (snapshot.val()) {
					let quiz = snapshot.val();
					let title = quiz.title;
					let nodeTitle = quiz.quizName;
					let queArray = quiz.questions;
					var b = queArray.slice();
					let randomSample = [];
					for (var i = 0; i < numberQuestions; i++) {
						var rand = b[Math.floor(Math.random() * b.length)];
						let index = b.indexOf(rand);
						b.splice(index, 1);
						randomSample.push(rand);
					}
					randomSample.map((item) => {
						item.attempted_ans = 0;
						item.isEnable = true
					});

					this.setState({
						questionsList: randomSample,
						quiztitle: title,
						isLoading: false,
						nodeTitle
					});
				}
			});
		});
	}
	setAnswers(value) {
		let index = this.queIndex;
		let answers = this.state.questionsList[index].answers;
		let attemptedAns = this.state.questionsList[index].attempted_ans;
		let scoreCount = this.state.score;
		let attemptedAnswers = [];
		let totalAttemptedQue = this.state.totalAttamptedQue + 1;
		//this.state.questionsList[index].attempted_ans = value.id;
		if (value.id === attemptedAns) {
			if (item.correct_answer === 1) {
				this.setState({
					correctAns: 1,
					//prevAnsId: item.id,
					score: scoreCount + 1,
					totalAttamptedQue: totalAttemptedQue
				});
			} else {
				this.setState({
					correctAns: 1,
					totalAttamptedQue: totalAttemptedQue
				});
			}
		}
		// answers.map((item) => {
		// 	if (item.correct_answer === 1) {
		// 		this.setState({
		// 			correctAnsId: item.id
		// 		});
		// 	}
		// 	if (value.id === item.id) {
		// 		this.ansId = item.id;
		// 		if (item.correct_answer === 1) {
		// 			this.isCorrect = 1;
		// 			this.setState({
		// 				correctAns: 1,
		// 				prevAnsId: item.id,
		// 				score: scoreCount + 1,
		// 				totalAttamptedQue: totalAttemptedQue
		// 			});
		// 		} else {
		// 			this.isCorrect = 0;
		// 			this.setState({
		// 				correctAns: 0,
		// 				prevAnsId: item.id,
		// 				totalAttamptedQue: totalAttemptedQue
		// 			});
		// 		}
		// 	}
		// });
	}
	setPreviousData() {
		let answers = [];
		let index = this.queIndex;
		let attemptedAns = this.state.questionsList[index].attempted_ans;
		firebase
			.database()
			.ref('quiz/' + this.state.currentQuiz + '/questions/' + this.queIndex + '/answers')
			.once('value')
			.then((snapshot) => {
				answers = snapshot.val();
				answers.map((item) => {
					if (item.correct_answer === 1) {
						if (attemptedAns !== 0) {
							this.setState({
								correctAnsId: item.id,
								prevAnsId: attemptedAns
							});
						}
					}
				});
			});
	}

	checkConnectivity() {
		NetInfo.isConnected.fetch().then(isConnected => {
			if (isConnected === true) {
				this.setResultData()
				//this.setState({ isConnected: true })
			} else {
				alert('Please check your Internet connectivity.')
				//this.setState({ isConnected: false })
				//failure(language.InternetConnection);
			}
		});
	}
	setResultData() {


		// Lets find out quiz que, user's answers, score

		let score = 0
		let attempted_que = 0
		let queId = []
		this.state.questionsList.map((question => {

			if (question.attempted_ans !== undefined && question.attempted_ans !== 0) {
				attempted_que = attempted_que + 1
				let obj = {}
				obj.queId = question.id
				obj.ansId = question.attempted_ans
				let correctAnswer = question.answers.filter(ans => ans.correct_answer === 1)
				if (correctAnswer.length > 0) {
					obj.correctAnsId = correctAnswer[0].id
					// Check for correct score
					if (correctAnswer[0].id === question.attempted_ans) {
						score = score + 1
					}
				} else {
					obj.correctAnsId = -1
				}
				queId.push(obj)
			}
		}))

		let quiz_title = '';
		quiz_title = 'Quiz' + this.state.currentQuiz;
		let userInfo = this.props.navigation.state.params.userInfo;
		var path = 'result/' + firebase.auth().currentUser.uid + '/';
		firebase.database().ref(path).update({
			email: userInfo.email,
			name: userInfo.name,
			phone: userInfo.phone,
			uid: firebase.auth().currentUser.uid
		});
		firebase.database().ref(path + '/quiz/' + this.state.nodeTitle).update({
			score: score,
			attempted_que: attempted_que,
			quiz: quiz_title,
			attempted: queId
		});
		this.props.navigation.navigate('EndQuiz', {
			score: score,
			total: this.state.questionsList.length,
		});
	}

	renderchildItemsOld = (item, index) => {
		let bgColor = 'white';
		let bordercolor = color.darkGray
		let isSelected = 0
		if (this.ansId === item.id || this.state.prevAnsId === item.id) {
			bgColor = color.blue;
			bordercolor = color.blue;
			// if (item.correct_answer === 1) {
			// 	//bgColor = 'green';
			// 	bgColor = color.blue;
			// } else if (item.correct_answer === 0) {
			// 	//bgColor = 'red';
			// 	bgColor = color.blue;
			// }
		}
		return (

			<View style={styles.ansview}>
				<TouchableOpacity disabled={this.state.prevAnsId === 0 ? false : true}
					onPress={() => {
						this.setAnswers(item);
					}}>
					<View style={[styles.circle, { backgroundColor: bgColor, borderColor: bordercolor }]}></View>
				</TouchableOpacity>
				<Text style={{ marginLeft: 10, color: color.darkGray }}>{item.answer}</Text>
				{/* <TouchableOpacity

					style={[styles.ansbutton, { backgroundColor: bgColor }]}>
					
				</TouchableOpacity> */}
			</View>
		);
	};
	renderchildItems(item, index) {
		//let attemptedAns = this.state.questionsList[this.queIndex].attempted_ans;
		console.log("attemptedAns ==> " + JSON.stringify(item))
		return (
			<View style={{
				width: 100,
				height: 20,
				backgroundColor: 'red',
				marginTop: 10
			}}>
				<Text>Hello</Text>
			</View>
		);
	}


	renderItems = ({ item, index }) => {
		return (
			<View style={styles.question}>
				<Text style={styles.questionText}>{item.title}</Text>
				{
					item.answers.map((currentAnswer) => {
						let bgColor = currentAnswer.id === item.attempted_ans ? color.blue : 'white'
						let bordercolor = currentAnswer.id === item.attempted_ans ? color.blue : color.darkGray
						return (
							<View style={styles.ansview}>
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										justifyContent: 'center',
										marginLeft: 20
									}}
									disabled={item.isEnable ? false : true}
									onPress={() => {
										let questionsList = this.state.questionsList
										questionsList[index].attempted_ans = currentAnswer.id
										this.setState({
											questionsList
										})
										// this.setAnswers(item);
									}}>
									<View style={[styles.circle, { backgroundColor: bgColor, borderColor: bordercolor }]}></View>
									<Text style={styles.ansText}>{currentAnswer.answer}</Text>

								</TouchableOpacity>
								{/* <TouchableOpacity

					style={[styles.ansbutton, { backgroundColor: bgColor }]}>
					
				</TouchableOpacity> */}
							</View>
						)
					})
				}
				{/* <FlatList
					style={styles.childflatlist}
					contentContainerStyle={styles.flatlistContainer}
					data={item.answers}
					extraData={this.state}
					renderItem={({ item, index }) => {
						this.renderchildItems(item, index);
					}
					}

					//renderItem={this.renderchildItems(item, this.state.questionsList[index].attempted_ans)}
					numColumns={1}
					scrollEnabled={false}
				/> */}
			</View>
		);
	};
	endQuiz() {
		Alert.alert('End Quiz', 'Are you sure you want to end the quiz?', [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'Yes',
				onPress: () => {
					// this.props.navigation.navigate('Home');
					this.setResultData()
				}
			}
		]);
	}
	render() {
		let queTitle = this.state.quiztitle.toUpperCase();


		let isNextEnable = false
		let cIndex = this.queIndex

		if (this.state.questionsList && this.state.questionsList.length > 0) {
			let questionsList = this.state.questionsList
			if (questionsList[cIndex].attempted_ans) {
				if (questionsList[cIndex].attempted_ans !== 0) {
					isNextEnable = true
				}
			}
		}

		return (
			<View style={styles.container}>

				<Header
					rightImage={IMG.IC_QUIT}
					rightButtonPress={this.endQuiz.bind(this)}
					title={queTitle}
					textColor={'white'}
				/>

				<View style={styles.viewcontainer}>

					<Text style={styles.quenotext}>{'Question ' + (this.queIndex + 1) + ' of ' + this.state.questionsList.length}</Text>
					<FlatList
						ref={(ref) => {
							this.flatListRef = ref;
						}}
						style={styles.flatlistView}
						data={this.state.questionsList}
						horizontal={true}
						renderItem={this.renderItems}
						scrollEnabled={false}
						extraData={this.state}
						showsHorizontalScrollIndicator={false}
						keyExtractor={(value, index) => String(index)}
					/>
					<View style={styles.bottombuttonview}>
						{/* <OutLineButton
							title={'PREVIOUS'}
							onPress={() => {
								let newIndex = this.queIndex - 1;
								if (this.queIndex > 0) {
									this.queIndex = this.queIndex - 1;
									this.flatListRef.scrollToIndex({ index: newIndex, animated: true });
									this.setState({
										currentindex: newIndex
									});
									setTimeout(() => {
										this.setPreviousData();
									}, 300);
								}

							}}>
						</OutLineButton> */}
						{this.queIndex !== this.state.questionsList.length - 1 && isNextEnable && (
							<OutLineButton
								title={'NEXT'}
								onPress={() => {
									let cIndex = this.state.currentindex
									let newIndex = this.queIndex + 1;
									this.queIndex = newIndex;
									if (newIndex < this.state.questionsList.length) {
										let questionsList = this.state.questionsList
										if (questionsList[cIndex].attempted_ans !== 0) {
											questionsList[cIndex].isEnable = false
										}
										this.flatListRef.scrollToIndex({ index: newIndex, animated: true });
										this.setState({
											currentindex: newIndex,
											prevAnsId: 0,
											questionsList
										});
										setTimeout(() => {
											this.setPreviousData();
										}, 300);
									}

								}}>
							</OutLineButton>
						)}
						{this.queIndex === this.state.questionsList.length - 1 && (
							<OutLineButton title={'SUBMIT'}
								onPress={() => {
									this.checkConnectivity()
									//this.setResultData();
								}}>
							</OutLineButton>
						)}
					</View>
				</View>
				{this.state.isLoading === true ? (
					<View style={styles.indicatorview}>
						<ActivityIndicator />
					</View>
				) : null}
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

export default connect(mapStateToProps, { login })(Quiz);
