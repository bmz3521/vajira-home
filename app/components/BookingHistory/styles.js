import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    contain: {
        shadowOffset: { height: 1 },
        shadowColor: BaseColor.grayColor,
        shadowOpacity: 1.0,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#919191",
        marginBottom: 12,
    },
    nameContent: {
        borderBottomWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderBottomColor: BaseColor.whiteColor,
        // backgroundColor: BaseColor.lightPrimaryColor,
        backgroundColor: "white",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    validContent: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 7,
        // backgroundColor: BaseColor.fieldColor,
        backgroundColor: "white",
        justifyContent: "space-between",
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8
    },
    mainContent: {
        // backgroundColor: BaseColor.lightPrimaryColor,
        backgroundColor: "white",
        paddingHorizontal: 12,
        paddingVertical: 20,
        flexDirection: "row"
    }
});
