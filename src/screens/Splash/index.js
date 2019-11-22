import React, { Component } from 'react';
import { View, AsyncStorage, ImageBackground } from 'react-native';
import styles from './style';
import * as resources from 'resources';
import { StackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import CodePush from "react-native-code-push";
class Splash extends Component {
	constructor(props) {
		super(props);
		this.state = { restartAllowed: true };

		setTimeout(() => {
			const navigation = this.props.navigation
			firebase.auth().onAuthStateChanged(function (user) {
				if (user) {
					let phoneNum = user.phoneNumber
					let userId = user.uid
					firebase.database().ref('users/' + userId).once('value').then((snapshot) => {
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
				} else {
					navigation.navigate('Login');
				}
			});
		}, 1000);
	}
	componentDidMount() {
		this.syncImmediate()
	}
	codePushStatusDidChange(syncStatus) {
		switch (syncStatus) {
			case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
				this.setState({ syncMessage: "Checking for update." });
				break;
			case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
				this.setState({ syncMessage: "Downloading package." });
				break;
			case CodePush.SyncStatus.AWAITING_USER_ACTION:
				this.setState({ syncMessage: "Awaiting user action." });
				break;
			case CodePush.SyncStatus.INSTALLING_UPDATE:
				this.setState({ syncMessage: "Installing update." });
				break;
			case CodePush.SyncStatus.UP_TO_DATE:
				this.setState({ syncMessage: "App up to date.", progress: false });
				break;
			case CodePush.SyncStatus.UPDATE_IGNORED:
				this.setState({ syncMessage: "Update cancelled by user.", progress: false });
				break;
			case CodePush.SyncStatus.UPDATE_INSTALLED:
				this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
				break;
			case CodePush.SyncStatus.UNKNOWN_ERROR:
				this.setState({ syncMessage: "An unknown error occurred.", progress: false });
				break;
		}
	}

	codePushDownloadDidProgress(progress) {
		this.setState({ progress });
	}

	toggleAllowRestart() {
		this.state.restartAllowed
			? CodePush.disallowRestart()
			: CodePush.allowRestart();

		this.setState({ restartAllowed: !this.state.restartAllowed });
	}

	getUpdateMetadata() {
		CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
			.then((metadata: LocalPackage) => {
				this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version", progress: false });
			}, (error: any) => {
				this.setState({ syncMessage: "Error: " + error, progress: false });
			});
	}

	/** Update is downloaded silently, and applied on restart (recommended) */
	sync() {
		CodePush.sync(
			{},
			this.codePushStatusDidChange.bind(this),
			this.codePushDownloadDidProgress.bind(this)
		);
	}

	/** Update pops a confirmation dialog, and then immediately reboots the app */
	syncImmediate() {
		CodePush.sync(
			{ installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
			this.codePushStatusDidChange.bind(this),
			this.codePushDownloadDidProgress.bind(this)
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					source={resources.IC_LOGO}
					resizeMode={'contain'}
					style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
				/>
			</View>
		);
	}
}
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_START };

Splash = CodePush(codePushOptions)(Splash);

export default Splash;