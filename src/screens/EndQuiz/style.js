import { StyleSheet, Dimensions } from 'react-native';
import color from '../../color'
import * as fonts from '../../font'
const newHeight = Dimensions.get('window').height - 70
export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: newHeight,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    childview: {
        width: 150,
        height: 150,
        borderRadius: 80,
        backgroundColor: color.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    homeview: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: color.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        position: 'absolute',
        bottom: 20
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        fontFamily: fonts.Bold,
    },
    totalscoretext: {
        paddingTop: 30,
        fontSize: 20,
        // textAlign: 'center',
        fontFamily: fonts.Bold,
        color: color.black
    },
    homebtn: {
        height: '50%',
        width: '50%',
    }
});
