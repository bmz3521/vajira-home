import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    container: {
        marginVertical: 5,
        paddingHorizontal: 5,
        overflow:'hidden',
    },
    row: {
        flexDirection: 'row',
    },
    titleContainer: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: BaseColor.BlackColor,
        shadowOpacity: 0.2,
        elevation: 5,
        backgroundColor: BaseColor.fieldColor,
        width: '100%',
    },
    titleBlock: {
        flexDirection: 'column',
        padding: 10,
        flex: 1,
    },
    iconBlock: {
        alignSelf: 'center',
    },
    bodyContainer : {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: BaseColor.BlackColor,
        shadowOpacity: 0.2,
        elevation: 4,
        backgroundColor: BaseColor.fieldColor,
    },
    icon: {
        marginTop: 3,
        marginHorizontal: 10,
        padding: 5,
        color: BaseColor.blueColor,
    },
});
