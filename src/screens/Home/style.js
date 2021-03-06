import { StyleSheet, Dimensions, Platform } from 'react-native';
import color from '../../color';
import * as fonts from '../../font/index';
const containerHeight = Dimensions.get('window').height - 70
const height = Dimensions.get('window').height
export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: containerHeight,
        //marginTop: 0,
        //alignItems: 'center',
        justifyContent: 'center',
    },
    quizListContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 120
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
        justifyContent: 'center',
        marginHorizontal: 10,
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        height: 50,
        // backgroundColor: 'skyblue'
    },
    btnStartQuiz: {
        width: 150,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: color.blue,
        borderWidth: 1
    },
    btnStartQuizDisable: {
        width: 150,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: color.lightGray,
        borderWidth: 1
    },
    btnStartQuizTitle: {
        paddingHorizontal: 15,
        color: color.blue,
        fontFamily: fonts.Medium
    },
    btnStartQuizTitleDisable: {
        paddingHorizontal: 15,
        color: color.lightGray,
        fontFamily: fonts.Medium
    },
    itemview: {
        width: '100%',
        height: 100,
        marginTop: 10
    },
    childview: {
        width: '100%', flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    quiztext: {
        fontSize: 16,
        fontFamily: fonts.Bold
    },
    scoretext: {
        fontSize: 16,
        color: color.darkGray,
        fontFamily: fonts.Bold
        //fontWeight:'bold'
    },
    startbtnview: {
        width: '100%', flexDirection: 'row',
        padding: 10
    },
    attemptedtxt: {
        fontSize: 16,
        color: color.blue,
        marginTop: 10,
        marginLeft: 10,
        fontFamily: fonts.RegularItalic

    },
    actionButtonIcon: {
        width: 50,
        height: 50,
        zIndex: 50,
        borderRadius: 25,
        bottom: Platform.OS === 'ios' ? (height * 0.1) : (height * 0.04),
        right: 20,
        backgroundColor: color.blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionview: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    actionImg: {
        width: 20,
        height: 20
    },
    ruleText: {
        fontSize: 12,
        fontFamily: fonts.MediumItalic,
        color: 'white'
    }
});
