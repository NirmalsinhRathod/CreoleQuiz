import { StyleSheet } from 'react-native';
import color from '../../color'
import * as fonts from '../../font'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    viewStyle: {
        // flexDirection: 'row',
        // backgroundColor: 'red',
        width: '100%',
        position: "absolute",
        top: 60,
        marginBottom: 10,
        // backgroundColor: "skyblue",
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '95%',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderRadius: 25,
        borderColor: color.lightGray
    },
    headerContainer: {
        // backgroundColor: "#F6FCFD",
        backgroundColor: 'white',
        // marginHorizontal: 10,
        width: '100%',
        borderRadius: 25,
        height: 50,
        marginBottom: 15,
        // width: '100%',
        flexDirection: "row",
    },
    iconContainer: {
        height: 20,
        width: 20,
        position: "absolute",
        left: 10
    },
    icon: {
        height: 20,
        width: 20
    },
    textFieldContainer: {
        // height: '100%',
        // width: '100%',
        // position: "absolute",
        marginRight: 100,
        marginLeft: 25,
        paddingRight: 20,
        minWidth: 250,
        fontFamily: fonts.Regular,
        fontSize: 16
        // paddingRight: '12%'

    },
    cancelButtonContainer: {
        position: 'absolute',
        right: 10,
        alignSelf: "center",
        height: 50,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'red'
    },
    cancelText: {
        color: color.blue,
        fontSize: 15,
        fontFamily: fonts.Bold,
        position: 'absolute',
        left: 5,
    },
    clearButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 15, right: 75,
        position: 'absolute'
    },
    userContainer: {
        width: '100%',
        height: '100%'
    },
    quizButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: color.lightGray,
        borderWidth: 0.5,
        height: 50,
    },
    userData: {
        padding: 15,
        flex: 3,
    },
    icon: {
        height: 20,
        width: 20
    },
    searchResultContainer: {
        flexDirection: 'row',
        borderBottomColor: color.lightGray,
        borderBottomWidth: 0.5,
    },
    scoreBedge: {
        height: 40,
        width: 40,
        marginRight: 15,
        marginTop: 30,
        backgroundColor: color.blue,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20
    },
    scoreText: {
        fontSize: 15,
        fontFamily: fonts.Bold,
        color: 'white'
    },
    searchBar: {
        height: 80,
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBarContainer: {
        height: 50,
        width: '95%',
        borderRadius: 25,
        borderColor: "gray",
        borderWidth: 0.3,
        flexDirection: 'row'
    },
    searchIconContainer: {
        height: 50,
        width: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        height: 20,
        width: 20,
        marginLeft: 30
    },
    text: {
        fontFamily: fonts.Medium,
        fontSize: 15,
        color: color.darkGray
    },
    nametext: {
        fontSize: 18,
        fontFamily: fonts.Bold,
    },
    emailtext: {
        fontSize: 15,
        fontFamily: fonts.Medium,
        marginTop: 5,
        color: color.darkGray
    }

});
