import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor, BaseStyle } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    blockView: {
        paddingVertical: 20,
        borderBottomColor: BaseColor.textSecondaryColor,
        backgroundColor: BaseColor.whiteColor,
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: "row",
        margin: 5,
    },
    leftView: {
        flex: 1,
        alignItems: "flex-start",
    },
    rightView: {
        flex: 1,
        alignItems: "flex-end",
    },
    centerView: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    image: {
        width: Utils.scaleWithPixel(128),
        height: Utils.scaleWithPixel(96),
        borderRadius: 0,
    },
    resultContainer: {
        paddingVertical: 15,
    },
});
