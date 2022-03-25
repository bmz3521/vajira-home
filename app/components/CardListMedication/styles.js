import { StyleSheet } from "react-native";
import * as Utils from "@utils";

export default StyleSheet.create({
    contain: {
        flexDirection: "row",
        paddingLeft: 20,
        borderWidth: 2,
        borderStyle: 'solid',
        marginHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#cecece'
    },
    contentRate: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    image: {
        width: Utils.scaleWithPixel(110),
        height: Utils.scaleWithPixel(80),
        borderRadius: 0
    }
});
