import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

const paddingText = 5;

export default StyleSheet.create({
    //css Gird
    girdContent: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginBottom: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginHorizontal: 2.5,

    },
    girdImage: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: Utils.scaleWithPixel(120),
        width: "100%"
    },
    girdContentLocation: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 10,
        paddingHorizontal: paddingText,
    },
    girdContentRate: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        paddingHorizontal: paddingText,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,

    },
    contentPadding: {
        paddingHorizontal: paddingText,
    },
    //css List
    listContentService: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    tag: {
        flexDirection: "row",
        padding: 5,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 10
    },
    listContentRate: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },
    listContentIcon: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    listContentRight: {
        marginHorizontal: 10,
        flex: 1
    },
    listImage: {
        height: Utils.scaleWithPixel(150, 1),
        width: Utils.scaleWithPixel(120, 1)
    },
    listContent: {
        flexDirection: "row",
        
    },
    listRowPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5
    },
    //css block
    blockPriceContent: {
        position: "absolute",
        top: 10,
        left: 20,
        backgroundColor: BaseColor.primaryColor,
        borderRadius: 8,
        padding: 5
    },
    blockDetailContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    blockImage: {
        height: Utils.scaleWithPixel(200),
        width: "100%"
    }
});
