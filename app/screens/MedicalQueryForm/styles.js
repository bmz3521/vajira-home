import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    container: {
        backgroundColor: BaseColor.fieldColor,
    },
    footer: {
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: BaseColor.whiteColor,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    formView: {
        padding: 10,
        paddingBottom: 20,
        backgroundColor: "#FFF",
    },
});
