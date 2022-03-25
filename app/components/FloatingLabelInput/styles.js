import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    label: {
        position: 'absolute',
        left: 0,
        marginTop: 10,
        marginHorizontal: 5,
    },
    input: {
        fontSize: 20,
        textAlignVertical: "top",
        borderBottomWidth: 1,
    },
    multilineInput: {
        fontSize: 20,
        textAlignVertical: "top",
        borderWidth: 1,
        height: 200,
        paddingHorizontal: 10,
    },
    icon: {
        position: 'absolute',
        right: 0,
        marginTop: 10,
        padding: 5,
    },
});
