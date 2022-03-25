import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    contain: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 2,
        borderColor: BaseColor.fieldColor,
        shadowColor: '#F7F7F7',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        width: '100%',
    },
    content: {
        flexDirection: "row",
        flexWrap: "nowrap",
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: "space-between",
    },
    contentTitle: {
        padding: 5,
        flex: 2,
        justifyContent: "flex-start"
    },
    contentPrice: {
        padding: 5,
        justifyContent: "flex-end"
    }
});
