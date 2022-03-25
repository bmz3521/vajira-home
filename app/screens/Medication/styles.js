import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    footerText: {
        fontSize: 14,
        color: "#aaa"
    },
    eventCard: {
        lineHeight: 30,
        paddingBottom: 0,
        marginHorizontal: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    },
});

// export default StyleSheet.create({

//     postDetailBanner: {
//         // flex: 1,
//         height: 220,
//         justifyContent: "flex-start",
//         alignItems: "flex-end",
//         resizeMode
//     },
//     postDetailBannerOpacity: {
//         position: "absolute",
//         height: 220,
//         width: "100%",
//         backgroundColor: "black",
//         opacity: 0.3
//     },
//     postDetail: {
//         marginTop: 10,
//         ...BaseStyle.bodyMarginDefault
//     },
//     postDetailTitle: {
//         marginTop: 10
//     },
//     postDetailContent: {
//         marginTop: 5
//     }
// });
