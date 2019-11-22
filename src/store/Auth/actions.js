import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE
} from './actionTypes';
import { Platform, AsyncStorage, Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { serverCall } from '../request';

export const goToChat = () => (dispatch) => {
	const resetAction = StackActions.reset({
		index: 0,
		actions: [NavigationActions.navigate({ routeName: 'Chat' })]
	});
	dispatch(resetAction);
};
export const login = (request) => (dispatch) => {
	// const resetAction = StackActions.reset({
	// 	index: 0,
	// 	actions: [NavigationActions.navigate({ routeName: 'Home' })]
	// });
	// dispatch(resetAction);

	return;
	returnToDispatch(dispatch, LOGIN_REQUEST);

	serverCall({ url: 'login', request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, LOGIN_SUCCESS, '');
			AsyncStorage.setItem('userData', JSON.stringify(response.data));
			// alert('Success');
			// dispatch(NavigationActions.back());
			// const resetAction = NavigationActions.reset({
			// 	index: 0,
			// 	actions: [ NavigationActions.navigate({ routeName: 'MainTabbar' }) ]
			// });
			const resetAction = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'MainTabbar' })]
			});
			dispatch(resetAction);
			// dispatch(
			// 	NavigationActions.navigate({
			// 		routeName: 'MainTabbar'
			// 	})
			// );
		})
		.catch((error) => {
			returnToDispatch(dispatch, LOGIN_FAILURE, error);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});
};

export const signup = (request) => (dispatch) => {
	returnToDispatch(dispatch, SIGNUP_REQUEST);

	serverCall({ url: 'register', request: request, method: 'post' })
		.then((response) => {
			returnToDispatch(dispatch, SIGNUP_SUCCESS, '');
			setTimeout(() => {
				showAlert(response.message);
			}, 100);
			dispatch(NavigationActions.back());
		})
		.catch((error) => {
			returnToDispatch(dispatch, LOGIN_FAILURE, error);
			setTimeout(() => {
				showAlert(error);
			}, 100);
		});

	setTimeout(() => {
		// returnToDispatch(dispatch, SIGNUP_FAILURE, error)
	}, 2000);
};

showAlert = (msg) => {
	Alert.alert('', msg);
};

returnToDispatch = (dispatch, type, payload) => {
	dispatch({
		type: type,
		payload: payload
	});
};
