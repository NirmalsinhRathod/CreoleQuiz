import { StyleSheet } from 'react-native';
import * as CONSTANTS from '../../../constants/constant';
import * as COLOR from '../../../constants/colors';

export default styles = StyleSheet.create({
    container: {
        width: CONSTANTS.SCREEN_WIDTH,
        height: CONSTANTS.SCREEN_HEIGHT,
        backgroundColor: COLOR.LOADER_BG,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
