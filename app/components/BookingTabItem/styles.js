import { BaseColor } from "@config";
import { StyleSheet } from "react-native";
import * as Utils from "@utils";

export default StyleSheet.create({
    content: {
        margin: 4,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: BaseColor.textSecondaryColor,
        marginBottom: 10,
    },
    blockView: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: "row",
    },
    col: {
        flexDirection: "column",
        flex: 1,
        borderLeftWidth: 0.5,
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
