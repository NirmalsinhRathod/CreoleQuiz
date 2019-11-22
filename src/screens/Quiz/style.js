import { StyleSheet, Dimensions } from 'react-native';
import * as constant from '../../constants/constant'
import color from '../../color';
import * as fonts from '../../font';

const que_height = Dimensions.get('window').width
const ans_width = Dimensions.get('window').width * 0.4
const que_width = Dimensions.get('window').width
const ansview = Dimensions.get('window').width * 0.8
const containerHeight = Dimensions.get('window').height * 0.7
const indicatorHeight = Dimensions.get('window').height - 80
export default styles = StyleSheet.create({
    container: {
        width: '100%',
        height: containerHeight,
        //backgroundColor: 'white',
    },
    flatlistView: {
        width: '100%',
        height: containerHeight,
        //backgroundColor: 'green'
        //marginTop: 60
        //backgroundColor: 'white',
    },
    bottombuttonview: {
        //height: 50,
        //position: 'absolute',
        //backgroundColor: 'red',
        //bottom: containerHeight,
        marginLeft: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    question: {
        width: que_height,
        height: que_width,
        //backgroundColor: 'red',
        marginTop: 10,
        // justifyContent: 'center',
        alignContent: 'center'

    },
    questionText: {
        color: color.black,
        fontSize: 16,
        marginTop: 10,
        //fontWeight: 'bold',
        marginLeft: 16,
        marginRight: 16,
        fontFamily: fonts.Bold
        //textAlign: 'justify'
    },
    nextbuttonview: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nextbutton: {
        width: 150,
        height: 35,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: color.blue,
        borderWidth: 1,
        marginLeft: 10,
        // backgroundColor: 'skyblue',
        // width: ans_width,
        // marginLeft: 10,
        // height: constant.BUTTON_HEIGHT,
        // borderRadius: constant.BUTTON_HEIGHT / 2,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    ansview: {
        marginTop: 10,
        flexDirection: 'row',
        // marginTop: 20,
        paddingTop: 10,
        //height: 40,
        //marginLeft: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        //backgroundColor: 'red',
        width: ansview
    },
    ansText: {
        marginLeft: 10, color: color.darkGray
    },
    ansbutton: {
        width: '100%',
        height: constant.BUTTON_HEIGHT,
        borderRadius: constant.BUTTON_HEIGHT / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    childflatlist: {
        width: que_width,
        height: que_height,
        marginTop: 20,
        //backgroundColor: 'red'
    },
    flatlistContainer: {
        marginLeft: 20
        //alignSelf: 'center'
    },
    scoretext: {
        width: '100%',
        textAlign: 'center',
        padding: 10,
        fontSize: 16
    },
    viewcontainer: {
        marginTop: 20,
    },
    indicatorview: {
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: indicatorHeight
    },
    quenotext: {
        color: color.black,
        //fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        width: '100%',
        fontFamily: fonts.Bold
        //marginTop: 10
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 2,
        //borderColor: color.darkGray,
        backgroundColor: 'white'
    }


});
