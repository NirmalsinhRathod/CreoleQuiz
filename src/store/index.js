import { combineReducers } from 'redux';
import authReducer from './Auth/reducers';
import coonectionReducer from './Connection/reducer'

import AppRouteConfig from './AppRouteConfig';

const initialState = {
	type: 'Reset',
	index: 0,
	routes: [{ key: 'SplashScreen', routeName: 'Splash' }]
};

const navReducer = (state = initialState, action) => {
	const nextState = AppRouteConfig.router.getStateForAction(action, state);
	return nextState || state;
};

const rootReducer = combineReducers({
	nav: navReducer,
	auth: authReducer,
	connection: coonectionReducer
});

export default rootReducer;
