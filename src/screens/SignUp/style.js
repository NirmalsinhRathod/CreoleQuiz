import { StyleSheet, Dimensions } from 'react-native';
import * as constant from '../../constants/constant';
import * as fonts from '../../font'
import color from '../../color'
const dropdownwidth = Dimensions.get('window').width - 45
const containerHeight = Dimensions.get('window').height
export default styles = StyleSheet.create({
  container: {
    // backgroundColor: 'gray',
    height: containerHeight,
    width: '100%',
    //alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    //paddingTop: 10,
    //justifyContent: 'center',
  },
  placeholdertext: {
    color: color.black,
    fontFamily: fonts.Regular,
    marginTop: 10,
    marginLeft: 5,
    fontSize: 14,
    padding: 5
  },
  textfieldStyle: {
    height: 40,
    width: '90%',
    backgroundColor: 'white',
    borderColor: color.lightGray,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 20,
    marginTop: 5,
    fontSize: 14,
    color: color.black,
    fontFamily: fonts.Regular,
  },
  textAreaStyle: {
    height: 150,
    width: '90%',
    justifyContent: "flex-start",
    backgroundColor: 'skyblue',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 20,
    marginTop: 20
  },
  loginContainer: {
    flexDirection: 'row',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logintext: {
    color: 'white',
    fontFamily: fonts.Bold,
    fontSize: 16,

  },
  loginLink: {
    paddingLeft: 5,
    padding: 10
  },
  sliderContainer: {
    width: '90%',
    height: 40,
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  slider: {
    width: '90%',
    height: 25,
    position: 'absolute',
    left: 0
  },
  experianceCountText: {
    alignSelf: 'center',
    fontSize: 15,
    position: 'absolute',
    right: 10,
    color: color.black,
    fontFamily: fonts.Regular,
  },
  signupButton: {
    backgroundColor: color.blue,
    height: 40,
    width: '90%',
    marginTop: 30,

    borderRadius: 20,
    justifyContent: 'center',
    alignItems: "center"
  },
  dropdownview: {
    width: dropdownwidth,
    marginLeft: 10
  },
  dropdwontext: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    color: color.black
  },
  item: {
    borderWidth: 1,
    borderColor: color.lightGray,
    backgroundColor: '#FFF',
  },
  lable: {
    color: color.darkGray,
    fontFamily: fonts.Regular,
    fontSize: 14,
  },
  itemSelected: {
    backgroundColor: color.lightBlue,
    borderColor: color.lightBlue,
    borderWidth: 1,
  }
});
