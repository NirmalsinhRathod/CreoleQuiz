import { StyleSheet, Dimensions } from 'react-native';
import * as constant from '../../constants/constant';
import color from '../../color';
const newHeight = Dimensions.get('screen').height - 400
let screenHeight = Dimensions.get('screen').height
let topMargin = ((screenHeight - 222) / 2)
export default (styles = StyleSheet.create({
	container: {
		height: newHeight,
		width: '90%',
		//alignItems: 'center',
		marginLeft: 20,
		marginRight: 20,
		justifyContent: 'center'
	},
	childview: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	img: {
		width: '100%',
		height: 150,
		marginTop: 100
	},
	placeholdertext: {
		color: color.darkGray,
		//fontStyle:'italic',
		marginTop: 10,
		marginLeft: 10
	},
	textfieldStyle: {
		height: 40,
		width: '100%',
		backgroundColor: 'white',
		borderColor: color.lightGray,
		color: color.darkGray,
		borderWidth: 1,
		paddingLeft: 10,
		paddingRight: 5,
		borderRadius: 20,
		marginTop: 10
	},
	signupContainer: {
		flexDirection: 'row',
		width: '90%',
		marginVertical: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	signupLink: {
		paddingLeft: 5,
		padding: 10,
		color: color.darkGray,
	},
	signupText: {
		paddingLeft: 10,
		color: color.darkGray,
	},
	loginButton: {
		backgroundColor: color.blue,
		height: 40,
		width: '100%',
		marginTop: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: "center"
	},
	logintext: {
		color: 'white',
		fontWeight: 'bold',

	},
	submitButton: {
		alignSelf: 'center',
		height: 40,
		width: '90%',
		marginBottom: 10,
		backgroundColor: color.blue,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	resendButton: {
		alignSelf: 'center',
		height: 40,
		width: '90%',
		marginBottom: 20,
		backgroundColor: color.blue,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.lightBlue,
		height: 280,
		width: '92%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
		marginTop: 50,
		// marginLeft: 40,
		alignSelf: 'center'

	},
	text: {
		color: '#3f2949',
		marginTop: 10
	},
	confirmationCode: {
		marginTop: 20
	},
	editButton: {
		padding: 10,
		paddingTop: 0,
		color: 'blue'
	},
	numContainer: {
		flexDirection: 'row',
		marginTop: 10
	}
}));
