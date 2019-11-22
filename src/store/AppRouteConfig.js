import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Splash, Home, Login, SignUp, Admin, SearchList, Quiz, EndQuiz, AdminHome } from '../screens';

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
		Quiz: { screen: Quiz },
		EndQuiz: { screen: EndQuiz },
		SignUp: { screen: SignUp },
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
