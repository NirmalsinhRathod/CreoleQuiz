import { StyleSheet, Dimensions } from 'react-native';
import color from '../../../color'
import * as fonts from '../../../font/index'

let screenWidth = Dimensions.get('screen').width
export default styles = StyleSheet.create({
    safeareaview: {
        top: 0,
        width: '100%',
        backgroundColor: color.blue
    },
    container: {
        width: '100%',
        height: 45,
        backgroundColor: color.blue,
        alignItems: 'center',
    },
    text: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        fontSize: 18,
        fontFamily: fonts.Bold
    },
    iconStyleLeft: {
        height: 30,
        width: 30,
        // backgroundColor: 'red',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 10,
        bottom: 5,
        padding: 10
    },
    iconStyleRight: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
        position: 'absolute',
        right: 10,
        bottom: 5,
        padding: 10

    }
});
