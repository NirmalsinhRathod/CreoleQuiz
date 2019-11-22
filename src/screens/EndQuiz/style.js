import { StyleSheet, Dimensions } from 'react-native';
import color from '../../color'
const newHeight = Dimensions.get('window').height - 70
export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: newHeight,
        alignItems: 'center',
        justifyContent: 'center',
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
    text: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    }
});
