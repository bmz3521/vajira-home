/* eslint-disable no-undef */
import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
// orientation must fixed

const ICONNumColums = 4;
// item size
const ICON_ITEM_OFFSET = 0;
const ICON_ITEM_MARGIN = ICON_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  contentRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 10
},
contentResultRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
},
contentList: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10
},
contentQuest: {
    height: 85,
    justifyContent: "space-between",
    marginTop: 10
},
lineRow: {
    flexDirection: "row",
    justifyContent: "space-between"
},
drugList: {
    marginVertical: 30,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-between",
    alignItems: "center"
},
iconRight: {
  marginBottom: 15,
    flexDirection: "row",
    alignItems: "flex-start"
},
interioItem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center"
},
  input: {
    marginTop: 0,
    backgroundColor: 'transparent',
    fontSize: 24,
    marginHorizontal: 10,
    marginRight: 20,
    alignSelf: 'flex-end',
    flex: 1,
    textAlign: 'right',
    marginBottom: -12
},
inputTime: {
  width: 120,
  marginTop: -12,
  height: 50,
  backgroundColor: 'transparent',
  fontSize: 18,
  marginHorizontal: 10,
  alignSelf: 'flex-end',
  flex: 1.8,
  textAlign: 'right', alignSelf: 'stretch',
  color:'green'
},
inputPeriod: {
  width: 100,
  marginTop: 0,
  height: 10,
  backgroundColor: 'transparent',
  fontSize: 18,
  marginHorizontal: 10,
  alignSelf: 'flex-end',
  flex: 1.2,
  textAlign: 'right', alignSelf: 'stretch',
  color:'green'
},
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#FFFF',
    fontFamily: 'Rubik',
    borderRadius: 10,
  },
  fullScreenContainer: {
    marginTop: 0,
    flex: 1,
    backgroundColor: '#FFFF',
    fontFamily: 'Rubik',
  },
  bar: {
    height: 4,
    width: 150,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#cbd7e1',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  mealIcon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20
  },
  titleContainer: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    width: SCREEN_WIDTH - 100
  },
  mainTxt: {
    textAlign: 'center',
    fontSize: 25,
    color: '#2d3142',
    marginBottom: 5
  },
  mealContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: ICON_ITEM_OFFSET,
    marginTop: 10,
    width: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - 2 * ICON_ITEM_MARGIN,
    height: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN
  },
  mealTitle: {
    textAlign: 'center',
    marginTop: 5,
    width: (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN,
    fontSize: 16,
    color: '#2d3142'
  },
  secTxt: {
    color: '#9c9eb9',
    fontSize: 16,
    textAlign: 'center'
  },
  timeCardContainer: {
    paddingVertical: 0,
    paddingBottom: 0,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '95%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  cardContainer: {
    marginTop: 10,
    paddingVertical: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '95%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  titleRowContainer: {
    paddingTop: 0,
    alignSelf: 'flex-start',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 30,
    // width: '100%'
  },
  foodRowContainer: {
    paddingTop: 10,
    borderBottomColor:'grey',
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%'
  },
  timeTitle: {
    flex: 0.5,
    alignSelf: 'flex-end',
    fontSize: 18,
    color: '#2d3142',
    textAlign: 'left', 
    marginBottom: 10,
    lineHeight: 18,

  },
  timeTitle2: {
    flex: 0.5,
    alignSelf: 'flex-end',
    fontSize: 18,
    color: '#2d3142',
    textAlign: 'left', 
    marginBottom: 15,
    lineHeight: 18,
  },
  foodTitle1: {
    flex: 0.9,
    alignSelf: 'flex-end',
    fontSize: 18,
    color: '#2d3142',
    textAlign: 'left', 
  },
  foodTitle3: {
    flex: 0.4,
    alignSelf: 'flex-end',
    fontSize: 16,
    color: '#2d3142',
    textAlign: 'right',
  },
  foodTitle: {
    flex: 0.3,
    alignSelf: 'flex-end',
    fontSize: 16,
    color: '#2d3142',
    textAlign: 'right',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 30
  },
  btnContainerCancel: {
    marginHorizontal: 10,
    height: 50,
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderColor: 'rgb(69, 183, 87)',
    borderRadius: 60,
    alignSelf: 'center',
    flex: 1
  },
  btnContainer: {
    marginHorizontal: 10,
    height: 50,
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgb(69, 183, 87)',
    borderColor: 'rgb(69, 183, 87)',
    borderRadius: 60,
    alignSelf: 'center',
    flex: 1
  },
  btnContainerDisabled: {
    marginHorizontal: 10,
    flex: 1,
    height: 50,
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgb(69, 183, 87)',
    borderColor: 'rgb(69, 183, 87)',
    borderRadius: 60,
    alignSelf: 'center',
    opacity: 0.5
  },
  btnTxt: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  }
});

export default styles;
