import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    content: {
        flexDirection: 'column',
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: BaseColor.blueColor,
        borderRadius: 4,
    },
    icon: {
        marginTop: 3,
        marginHorizontal: 10,
        padding: 5,
        color: BaseColor.blueColor,
    },
    input: {
        padding: 5,
        flex: 1,
    },
    autocompleteContainer: {
        left: 0,
        position: 'absolute',
        right: 0,
        top: Utils.scaleWithPixel(35),
        zIndex: 1
    },
    item: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#aaa',
        padding: 5,
        backgroundColor: BaseColor.whiteColor,
    }
});
