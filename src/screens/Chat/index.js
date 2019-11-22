import { GiftedChat } from 'react-native-gifted-chat';
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../store/Auth/actions';
import firebase from 'react-native-firebase';
import moment from 'moment';
const commentDateFormate = 'YYYY-MM-DD HH:mm:ss';
class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			chatId: '123456',
			userId: 2,
			isFirstTime: true
		};
		setTimeout(() => {
			this.getchatList();
		}, 10);
		// setTimeout(() => {
		// 	let user1 = {};
		// 	user1.userId = 1;
		// 	user1.firstName = 'Jack';
		// 	user1.lastName = 'Sparrow';
		// 	user1.status = true;

		// 	let user2 = {};
		// 	user2.userId = 2;
		// 	user2.firstName = 'Caption';
		// 	user2.lastName = 'Caption';
		// 	user2.status = true;

		// 	let updateChatListInfo1 = {};
		// 	updateChatListInfo1['users/1'] = user1;
		// 	updateChatListInfo1['users/2'] = user2;
		// 	firebase.database().ref().update(updateChatListInfo1, function(error) {});

		// 	let chatList = {};
		// 	let chatId = '123456';
		// 	let bothUser = {};
		// 	bothUser['1'] = user1;
		// 	bothUser['2'] = user2;
		// 	chatList.allMembers = bothUser;
		// 	chatList.chatId = chatId;
		// 	chatList.chatTypeId = 1;
		// 	chatList.createdByuserId = 1;

		// 	let memberStatus = {};
		// 	memberStatus['1'] = true;
		// 	memberStatus['2'] = true;
		// 	chatList.memberStatus = memberStatus;

		// 	chatList.onlineMembers = memberStatus;
		// 	chatList.onlineMembersSystem = memberStatus;

		// 	//userConnection
		// 	let userConnection = {};
		// 	userConnection['123456'] = 0;

		// 	let obj = {};
		// 	obj['chatList/123456'] = chatList;
		// 	obj['userConnection/1'] = userConnection;
		// 	obj['userConnection/2'] = userConnection;
		// 	firebase.database().ref().update(obj, function(error) {});
		// 	setTimeout(() => {
		// 		this.getchatList();
		// 	}, 2000);
		// }, 100);
	}
	getchatList() {
		var chatListPath = `chatList/${this.state.chatId}`;

		firebase.database().ref(chatListPath).persistenceEnabled = true;
		firebase.database().ref(chatListPath).keepSynced(true);

		firebase.database().ref(chatListPath).on('value', (snap) => {
			if (snap.exists()) {
				let ref = snap.ref.toString();
				var myArray = ref.split('chatList/');

				if (myArray[1] !== this.state.chatId) {
					return;
				}

				let stringifyObject = JSON.stringify(snap);
				let obj = JSON.parse(stringifyObject);

				let objMem = {};
				obj.allMembers.map((value, index) => {
					if (value) {
						objMem[value.userId] = value;
					}
				});
				obj.allMembers = objMem;
				let allMem = obj.allMembers;
				let userName = '';
				let currentUserName = '';
				if (Object.keys(obj.allMembers).length > 0) {
					let allMemKeys = Object.keys(obj.allMembers);
					allMemKeys.map((item) => {
						if (item == this.state.userId) {
							// Login user
							currentUserName = allMem[item].firstName;
						} else if (item != this.state.userId) {
							// Opponet
							userName = allMem[item].lastName;
						}
					});
				}

				var displayData = [];
				displayData.push(obj);
				this.state.displayData = displayData;
				this.setState({
					displayData,
					userName,
					currentUserName
				});
				if (this.state.isFirstTime) {
					this.state.isFirstTime = false;
					setTimeout(() => {
						this.getCountinueChild();
					}, 30);
				}
			} else {
			}
		});
	}
	getCountinueChild() {
		var converstionData = `converstionData/${this.state.chatId}`;
		firebase.database().ref(converstionData).persistenceEnabled = true;
		firebase.database().ref(converstionData).keepSynced(true);
		firebase
			.database()
			.ref(converstionData)
			.once('value', (snap) => {
				if (snap.exists()) {
					let data = [];
					snap.forEach((dic) => {
						var key = dic.key;
						let stringifyObject = JSON.stringify(dic.val());
						let obj = JSON.parse(stringifyObject);
						obj.key = key;
						var local_date = moment.utc(obj.createdAt).local().format(commentDateFormate);

						var plaintext = '';
						let isSystem = false;
						if (obj.isSystemMessage) {
							plaintext = obj.text;
							isSystem = true;
						} else {
							// var bytes = CryptoJS.AES.decrypt(obj.text, SECRET_KEY);
							// plaintext = bytes.toString(CryptoJS.enc.Utf8);
							plaintext = obj.text;
						}

						// Create an object in same formate as Gifted chat need
						let messageObject = {};
						messageObject['_id'] = obj.key;
						messageObject['text'] = plaintext;
						messageObject['createdAt'] = local_date;

						let userName = '';
						let userPic = '';
						let item = this.state.displayData[0];

						let allMem = item.allMembers;
						let userKey = Object.keys(allMem).filter((value) => value === obj.senderId);

						if (Object.keys(userKey).length > 0) {
							let senderUserId = userKey[0];
							if (allMem[senderUserId].firstName) {
								userName = allMem[senderUserId].firstName;
							}
							if (allMem[senderUserId].profilePic) {
								userPic = allMem[senderUserId].profilePic;
							}
						}

						let userData = {};
						userData['_id'] = obj.senderId;
						userData['name'] = userName;
						userData['avatar'] = userPic;

						messageObject['user'] = userData;
						messageObject['system'] = isSystem;

						data.push(messageObject);
					});
					if (data) {
						this.state.messages = data;
						this.setState({
							messages: data
						});
					}
				}
				// this.onReceiveMessage()
			})
			.then(() => {
				setTimeout(() => {
					// this.setState({
					//     isChatLoaded: false
					// })
					this.onReceiveMessage();
				}, 1000);
			});
	}
	updateMessageCount() {
		var userOnlinePath = `totalMessageCount/${this.state.userId}/${this.state.chatId}`;
		firebase
			.database()
			.ref(userOnlinePath)
			.transaction((currentLike) => {
				return currentLike + 1;
			})
			.then(() => dispatch({}));
	}
	checkId(id) {
		let isFound = false;
		if (this.state.messages.length > 0) {
			let data = this.state.messages.filter((value) => value._id === id);
			if (data.length > 0) {
				isFound = true;
			}
		}
		return isFound;
	}
	onReceiveMessage() {
		var converstionData = `converstionData/${this.state.chatId}`;
		firebase.database().ref(converstionData).on('child_added', (snap) => {
			if (snap.exists()) {
				let isExists = this.checkId(snap.key);
				if (isExists) return;
				let ref = snap.ref.toString();
				var myArray = ref.split('converstionData/');
				let refChild = myArray[1].toString();
				var myArray1 = refChild.split('/');
				if (myArray1[0] !== this.state.chatId) {
					return;
				}

				let stringifyObject = JSON.stringify(snap);
				let obj = JSON.parse(stringifyObject);
				obj.key = snap.key;
				var local_date = moment.utc(obj.createdAt).local().format(commentDateFormate);

				var plaintext = '';
				let isSystem = false;
				if (obj.isSystemMessage) {
					plaintext = obj.text;
					isSystem = true;
				} else {
					// var bytes = CryptoJS.AES.decrypt(obj.text, SECRET_KEY);
					// plaintext = bytes.toString(CryptoJS.enc.Utf8);
					plaintext = obj.text;
				}

				// Create an object in same formate as Gifted chat need
				let messageObject = {};
				messageObject['_id'] = obj.key;
				messageObject['text'] = plaintext;
				messageObject['createdAt'] = local_date;

				let userName = '';
				let userPic = '';
				let item = this.state.displayData[0];

				let allMem = item.allMembers;
				let userKey = Object.keys(allMem).filter((value) => value === obj.senderId);

				if (Object.keys(userKey).length > 0) {
					let senderUserId = userKey[0];
					if (senderUserId != this.state.userId) {
						if (allMem[senderUserId].lastName) {
							userName = allMem[senderUserId].lastName;
						}
					} else {
						if (allMem[senderUserId].firstName) {
							userName = allMem[senderUserId].firstName;
						}
					}
					if (allMem[senderUserId].profilePic) {
						userPic = allMem[senderUserId].profilePic;
					}
				}

				let userData = {};
				userData['_id'] = obj.senderId;
				userData['name'] = userName;
				userData['avatar'] = userPic;

				messageObject['user'] = userData;
				messageObject['system'] = isSystem;
				console.log('messageObject: ', messageObject);
				this.setState((previousState) => ({
					messages: GiftedChat.append(previousState.messages, messageObject)
				}));
			}
		});
	}
	// componentWillMount() {
	// 	this.setState({
	// 		messages: [
	// 			{
	// 				_id: 1,
	// 				text: 'Hello developer',
	// 				createdAt: new Date(),
	// 				user: {
	// 					_id: 2,
	// 					name: 'React Native',
	// 					avatar: 'https://placeimg.com/140/140/any'
	// 				}
	// 			}
	// 		]
	// 	});
	// }

	onSend(messages = []) {
		// this.setState((previousState) => ({
		// 	messages: GiftedChat.append(previousState.messages, messages)
		// }));

		console.log(messages);

		// var ciphertext = CryptoJS.AES.encrypt(textNew, SECRET_KEY);
		// let text = ciphertext.toString();

		let text = messages[0].text;

		var createdDate = moment.utc(new Date()).format(commentDateFormate);

		// Update the unread counter, it will incrment the counter by one for those user who are not online.
		let item = this.state.displayData[0];
		let onlineMember = item.onlineMembers;

		let isOffLine = false;
		Object.keys(onlineMember).map((value, index) => {
			if (value !== undefined && value !== this.state.userId) {
				if (onlineMember[value] === false) {
					isOffLine = true;
					var userOnlinePath = `userConnection/${value}/${this.state.chatId}`;
					firebase
						.database()
						.ref(userOnlinePath)
						.transaction((currentLike) => {
							return currentLike + 1;
						})
						.then(() => {
							this.updateMessage(createdDate, text);
						});
				}
			}
		});

		if (isOffLine === false) {
			this.updateMessage(createdDate, text);
		}
		this.updateMessageCount();
	}

	updateMessage(createdDate, text) {
		this.updateMessageCount();
		let messageObject = {
			text: text,
			senderId: this.state.userId,
			type: 0,
			createdAt: createdDate
		};
		let chatListObject = {
			text: text,
			userId: this.state.userId,
			type: 0,
			createdAt: createdDate
		};
		var converstionDataPath = `converstionData/${this.state.chatId}`;
		firebase.database().ref(converstionDataPath).push(messageObject, (error) => {});

		// Update the lastMessage in chatList
		let updateChatListInfo = {};
		updateChatListInfo[`chatList/${this.state.chatId}/lastMessage`] = chatListObject;
		updateChatListInfo[`chatList/${this.state.chatId}/updateAt`] = moment().unix();
		firebase.database().ref().update(updateChatListInfo, function(error) {});
		this.setUnreadCountZero();
	}
	setUnreadCountZero() {
		var userOnlinePath = `userConnection/${this.state.userId}`;
		let obj = {};
		obj[this.state.chatId] = 0;
		firebase.database().ref(userOnlinePath).update(obj);
	}
	render() {
		return (
			<GiftedChat
				alignTop
				messages={this.state.messages}
				onSend={(messages) => this.onSend(messages)}
				user={{
					_id: this.state.userId
				}}
			/>
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

export default connect(mapStateToProps, { login })(Chat);
