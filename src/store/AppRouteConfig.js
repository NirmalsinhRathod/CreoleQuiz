import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Splash, Home, Login, SignUp, Admin, SearchList, Quiz, EndQuiz, AdminHome, Rules } from '../screens';

const AppRouteConfig = createStackNavigator(
	{
		Splash: {
			screen: Splash,
			navigationOptions: {
				gesturesEnabled: false
			}
		},
		Home: { screen: Home },
		AdminHome: { screen: AdminHome },
		Quiz: {
			screen: Quiz,
			navigationOptions: {
				gesturesEnabled: false
			}
		},
		EndQuiz: { screen: EndQuiz },
		SignUp: { screen: SignUp },
		Rules: { screen: Rules },
		Login: {
			screen: Login,
			navigationOptions: {
				gesturesEnabled: false
			}
		},
		Admin: {
			screen: Admin,
			navigationOptions: {
				gesturesEnabled: false
			}
		},

	},
	{
		headerMode: 'none'
	}
);
export default createAppContainer(AppRouteConfig);
