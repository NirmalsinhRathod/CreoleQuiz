import { StyleSheet } from 'react-native';
import color from '../../color';
import * as fonts from '../../font/index';
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,

    },
    rulestext: {
        width: '90%',
        padding: 5,
        color: color.darkGray,
        fontFamily: fonts.Regular,
        fontSize: 15
    },
    viewContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 10,
        paddingTop: 10
        //padding: 10
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 12,
        backgroundColor: color.black
    }
});
export default styles;