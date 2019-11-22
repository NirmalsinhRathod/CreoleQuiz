import { NavigationActions } from 'react-navigation';

export const navigateToScreen = ({ screen }) => (dispatch) => {
	dispatch(
		NavigationActions.navigate({
			routeName: screen
		})
	);
	setTimeout(() => {
		// alert('Called');
	}, 100);
};
