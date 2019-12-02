import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { login } from '../../store/Auth/actions';
import styles from './style';
import Header from '../../components/atoms/Header'
import * as IMG from '../../resources/index'
import { throwStatement } from '@babel/types';
import color from '../../color'

class Admin extends Component {
	constructor() {
		super();
		this.state = {
			search: '',
			data: [
				{ 'key': 'Quiz1', 'value': 1 },
				{ 'key': 'Quiz2', 'value': 2 },
				{ 'key': 'Quiz3', 'value': 3 },
			],
			selectedQuiz: 0,
			selectQuizAry: [],
			userAry: [],
			resultAry: [],
			refresh: true
		};
	}
	renderGlobleSearch() {
		this.state.resultAry = []
		for (let i = 0; i < this.state.userAry.length; i++) {
			let compare1 = this.state.userAry[i].name.toLowerCase()
			let compare2 = this.state.search.toLowerCase()
			if (compare1.includes(compare2)) {
				this.setState({

				})
				this.state.resultAry = this.state.resultAry.concat(this.state.userAry[i])
			}
		}
	}
	renderSearchResult() {
		// alert(this.state.selectQuizAry)
		// if (this.state.selectQuizAry.length === 0) {
		// 	this.setState({
		// 		resultAry: this.state.userAry,

		// 	})
		// 	// alert(this.state.selectQuizAry)
		// }
		// this.state.resultAry = []
		// this.setState({
		// 	resultAry: []
		// })
		for (let i = 0; i < this.state.userAry.length; i++) {
			let compare1 = this.state.userAry[i].name.toLowerCase()
			let compare2 = this.state.search.toLowerCase()
			if (compare1.includes(compare2)) {
				// for (let j = 0; j < this.state.selectQuizAry.length; j++) {
				// let currentTab = this.state.selectQuizAry[j]
				if ((Object.keys(this.state.userAry[i].quiz)).includes(this.state.data[this.state.selectedQuiz].key)) {
					// currentTab = null
					this.setState({
						refresh: !this.state.refresh
					})
					//don't add element array if already in array
					if (!this.state.resultAry.includes(this.state.userAry[i])) {
						this.state.resultAry = this.state.resultAry.concat(this.state.userAry[i])
					}
				} else {
					this.setState({
						refresh: !this.state.refresh
					})
					//don't add element array if already in array
					this.state.resultAry = []
				}
			}
		}
	}
	componentDidMount() {
		var refer = firebase.database().ref('result');
		refer.once('value', snapshot => {
			//if (snapshot.hasChild('result')) {
			//this.setState({ userAry: Object.values(snapshot.child('result').val()) })
			//}
			this.setState({
				userAry: Object.values(snapshot.val())
			})
			//console.log(JSON.stringify(snapshot.val()))
			// refer.once('value').then(snapshot => {

		});
	}
	renderQuizList() {
		let screenWidth = Dimensions.get('screen').width
		let numColumns = 1
		let numOptions = this.state.data.length
		let width = screenWidth / numOptions
		return (
			<View>
				<FlatList
					scrollEnabled={false}
					data={this.state.data}
					horizontal={true}
					renderItem={({ item, index }) =>
						<TouchableOpacity
							onPress={() =>
								this.setState({ selectedQuiz: index })
							}
							style={[styles.quizButtons, { backgroundColor: this.state.selectedQuiz === index ? color.lightBlue : 'white', width: width }]}>
							<Text style={styles.text}>{item.key}</Text>
						</TouchableOpacity>}
					numColumns={numColumns}
				/>
			</View>
		)
	}
	renderItem = ({ item, index }) => {

		let data = Object.values(item.quiz)
		for (let i = 0; i < data.length; i++) {
			if (Object.keys(data[i]).includes('score') && this.state.data[this.state.selectedQuiz].key === data[i].quiz) {
				return (
					<View style={styles.searchResultContainer}>
						<View style={styles.userData}>
							<Text style={styles.nametext}>{item.name}</Text>
							<Text style={styles.emailtext}>{item.phone}</Text>
							<Text style={styles.emailtext}>{item.email}</Text>
						</View>
						{
							data.length > 0 &&
							<FlatList
								data={data}
								renderItem={({ item, index }) => (
									<View>
										{
											this.state.data[this.state.selectedQuiz].key === data[index].quiz &&
											<View style={styles.scoreBedge}>
												<Text style={styles.scoreText}>{data[index].score}</Text>
											</View>
										}
									</View>
								)
								}
							/>
						}
					</View >

				)
			}
		}

	}
	renderUserData() {
		let height = Dimensions.get('window').height
		return (
			<View style={styles.userContainer}>
				<FlatList
					contentContainerStyle={{ paddingBottom: 180 }}
					data={this.state.search === '' ? this.state.userAry : this.state.resultAry}
					renderItem={this.renderItem}
					extraData={this.state}
				/>
			</View>
		)
	}

	renderSearchbar() {
		return (
			<View style={styles.searchBar}>
				<View style={styles.searchBarContainer}>
					<View style={styles.searchIconContainer}>
						< Image source={IMG.IC_SEARCH} style={styles.iconStyle} />
					</View>
					<TextInput
						placeholder={"Search User"}
						style={styles.textFieldContainer}
						onChangeText={(search) => this.setState({ search })}
						value={this.state.search}
						returnKeyType="search"
						onSubmitEditing={() => this.renderSearchResult()}
					// onSubmitEditing={() => alert(JSON.stringify(this.props.favorites))}
					/>
					{/* <TouchableOpacity
						onPress={() => { this.setState({ search: '', resultAry: [] }) }}
						style={styles.clearButton}>
						{this.state.search !== '' && <Image style={styles.clearButton} source={IMG.IC_CLEAR} />}
					</TouchableOpacity> */}
					<TouchableOpacity
						onPress={() => {
							this.renderSearchResult()
						}}
						style={styles.cancelButtonContainer}
					>
						<Text style={styles.cancelText}>Search</Text>
					</TouchableOpacity>
				</View>
			</View >
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<Header
					title={'ADMIN'}
					textColor={'white'}
					leftButtonPress={() => this.props.navigation.goBack()}
					leftImage={IMG.IC_BACK}
				/>
				{this.renderSearchbar()}
				{this.renderQuizList()}
				{this.renderUserData()}
			</View >
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

export default connect(mapStateToProps, {})(Admin);
