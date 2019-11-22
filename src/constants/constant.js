import {Dimensions, Platform} from 'react-native';

export const IS_IPHONE = Platform.OS === 'ios' ? true : false;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const BUTTON_HEIGHT = 50;
export const MIN_PASS_LENGHT = 6;
export const LINK_COLOR = '#F26622';
