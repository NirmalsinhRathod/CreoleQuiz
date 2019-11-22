import { Platform, AsyncStorage, NetInfo, Alert, Text } from 'react-native';

const BASE_URL = 'http://creolestudios.com/';
export const serverCall = ({ url, request, method, isRaw }) => {
	return new Promise(function(success, failure) {
		success({});
		failure('Message will come here');
	});
};
