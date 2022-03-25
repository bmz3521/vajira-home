import React from "react";
import { View, TouchableOpacity } from "react-native";
import { BaseColor } from "@config";
import { Text } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";

function ProcedureListItem(props) {
    const { style, name, price, freeze } = props;

    const [selected, setSelected] = React.useState(props.selected);

    React.useEffect(() => {
        setSelected(props.selected);
    }, [props.selected]);

    const selectItem = React.useCallback((props) => () => {
        const { id, name, minPrice, maxPrice, price, onPress } = props;
        const minified = { id, name, minPrice, maxPrice, price };
        onPress(!selected, minified);
        setSelected(!selected);
    }, []);

    return (
        <TouchableOpacity
            style={[styles.contain, style, {
                backgroundColor: selected && !freeze ? BaseColor.primaryColor : BaseColor.whiteColor,
            }]}
            onPress={selectItem(props)}
            activeOpacity={0.9}
        >
            <View style={styles.content}>
                <View style={styles.contentTitle}>
                    <Text title semibold>
                        {name}
                    </Text>
                </View>
                <View style={styles.contentPrice}>
                    <Text body2 grayColor={!selected}>
                        {`( ${price} )`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

ProcedureListItem.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    selected: PropTypes.bool,
    freeze: PropTypes.bool,
    onPress: PropTypes.func
};

ProcedureListItem.defaultProps = {
    id: "",
    name: "",
    price: "",
    minPrice: 0,
    maxPrice: 0,
    selected: false,
    freeze: false,
    style: {},
    onPress: () => {}
};

export default ProcedureListItem;
