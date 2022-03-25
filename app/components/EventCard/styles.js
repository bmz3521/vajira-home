import { StyleSheet } from "react-native";
import * as Utils from "@utils";
import { BaseColor } from "@config";
export default StyleSheet.create({
    imageBanner: {
        height: Utils.scaleWithPixel(76.8),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    content: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: BaseColor.fieldColor,
        width: Utils.scaleWithPixel(138),
        // borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
        // boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px",

    },
    contentCard: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: BaseColor.fieldColor,
        width: Utils.scaleWithPixel(138),
        // borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
        // boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px",
        
    }
    
});
