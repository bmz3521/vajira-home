import { BaseColor } from "@config";
import { StyleSheet } from "react-native";
import * as Utils from "@utils";

export default StyleSheet.create({
    content: {
        marginHorizontal: 10,
        margin: 4,
        borderColor: BaseColor.textSecondaryColor,
        marginBottom: 10,
        borderRadius: 10,
        // backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.02,
        shadowRadius: 0.27,

        padding: 10,
        marginBottom: 70,
        flexDirection: 'row'

    },
    blockView: {
        borderRadius: 10,
        backgroundColor: 'white',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderBottomColor: BaseColor.textSecondaryColor,
        // borderBottomWidth: 1,
    },
    row: {
        flexDirection: "row",
    },
    col: {
        flexDirection: "column",
        flex: 4,
    },
    colFirstChild: {
        flexDirection: "column",
        flex: 1,
    },
    leftView: {
        flex: 1,
    },
    leftView2: {
        flex: 2,
    },
    rightView: {
        flex: 1,
        alignItems: "flex-end",
    },
    image: {
        width: Utils.scaleWithPixel(96),
        height: Utils.scaleWithPixel(64),
        borderRadius: 0,
    },
});
