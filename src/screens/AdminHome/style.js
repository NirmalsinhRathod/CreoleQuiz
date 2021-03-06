import { StyleSheet } from 'react-native';
import color from '../../color';
import * as fonts from '../../font'

export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
        //flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    quizListContainer: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
        width: '100%',
    },
    selectquiztext: {
        alignSelf: 'center',
        fontFamily: fonts.Bold,
        fontSize: 18
    },
    numOfQue: {
        flexDirection: 'row',
        width: '90%',
        marginBottom: 20,
        height: 50,
        justifyContent: 'center',
        // alignSelf: 'center',
        alignItems: 'center',
    },
    textFieldQue: {
        height: 40,
        width: '40%',
        borderRadius: 20,
        backgroundColor: 'skyblue',
        alignSelf: 'center',
        paddingHorizontal: 10
    },
    btnSubmit: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'skyblue',
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginLeft: 10
    },
    btnTitle: {
        alignSelf: 'center',
        marginBottom: 10
    },
    btnFlatlist: {
        width: '100%',
        justifyContent: 'center',
        marginHorizontal: 10,
        alignSelf: 'center',
        // marginTop: 20,
        alignItems: 'center',
        height: 60,
        borderBottomWidth: 0.5,
        borderBottomColor: color.lightGray,
        //backgroundColor: 'skyblue'
    },
    btnStartQuiz: {
        height: 50,
        borderRadius: 25,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnStartQuizTitle: {
        paddingHorizontal: 15
    },
    text: {
        fontFamily: fonts.Medium,
        fontSize: 15,
        color: color.darkGray
    }
});
