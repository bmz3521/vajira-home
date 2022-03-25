import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { BaseStyle } from '@config';
export default StyleSheet.create({
  contain: { height: 45, flexDirection: 'row' },
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    width: 60,
  },
  contentCenter: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 20,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    // marginBottom: 10,
  },
});
// export default StyleSheet.create({
//     contain: {
//         elevation: 5,
//         flexDirection: "row",
//         paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
//         paddingVertical: 20,
//         justifyContent: "center",

//     },
//     contentLeft: {
//         flex: 1,
//         justifyContent: "center",
//         paddingLeft: 20,
//         width: 60,
//         height:40,
//         paddingBottom: Platform.OS === 'ios' ? 0 : 20,
//     },
//     contentCenter: {
//         flex: 2,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingBottom: Platform.OS === 'ios' ? 0 : 20,
//     },
//     contentRight: {
//         flex: 3,
//         justifyContent: "center",
//         alignItems: "flex-end",
//         paddingLeft: 10,
//         paddingRight: 20,
//         paddingTop: "auto",
//         paddingBottom: Platform.OS === 'ios' ? 0 : 20,
//     },
//     contentRightSecond: {
//         justifyContent: "center",
//         alignItems: "flex-end",
//         paddingLeft: 10,
//         paddingRight: 10,
//         paddingBottom: Platform.OS === 'ios' ? 0 : 20,

//     },
//     right: {
//         flex: 1,
//         alignItems: "center",
//         flexDirection: "row",
//         justifyContent: "flex-end"
//     }
// });
