import React from "react";
import { View, FlatList, TouchableOpacity, Animated } from "react-native";
import { Icon, Text, ProcedureListItem } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";

function ProcedureGroupItem(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [maxHeight, setMaxHeight] = React.useState(0);
    const [minHeight, setMinHeight] = React.useState(0);

    const { style, name, procedures, selectedProcedures, onChildPress } = props;
    const animation = new Animated.Value(65);

    const toggle = React.useCallback(() => () => {
        const initialValue = !expanded ? maxHeight + minHeight + 3 : minHeight + 3;
        const finalValue = !expanded ? minHeight + 3 : maxHeight + minHeight + 3;
    
        setExpanded(!expanded);

        animation.setValue(initialValue);
        Animated.spring(animation, { toValue: finalValue }).start();
    }, [expanded, maxHeight, minHeight, animation]);

    const _setMaxHeight = React.useCallback(() => (event) => {
        setMaxHeight(event.nativeEvent.layout.height);
    }, []);

    const _setMinHeight = React.useCallback(() => (event) => {
        setMinHeight(event.nativeEvent.layout.height);
    }, []);

    return (
        <Animated.View 
            style={[styles.container, { height: animation }]}
        >
            <View style={styles.titleContainer} onLayout={_setMinHeight()}>
                <TouchableOpacity
                    style={[style]} 
                    onPress={toggle()}
                    activeOpacity={0.9}
                >
                    <View style={styles.row}>
                        <View style={styles.titleBlock}>
                            <Text headline bold>{name}</Text>
                            <Text body2>{`( ${procedures.length} procedures )`}</Text>
                        </View>
                        <View style={styles.iconBlock}>
                            <Icon style={styles.icon} name={expanded ? "caret-up" : "caret-down"} size={20} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            
            <View style={styles.bodyContainer} onLayout={_setMaxHeight()}>
                <FlatList
                    data={procedures}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <ProcedureListItem
                            {...item}
                            selected={selectedProcedures.some(p => p.id === item.id)}
                            onPress={onChildPress}
                        />
                    )}
                />
            </View>
        </Animated.View>
    );
}

ProcedureGroupItem.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    procedures: PropTypes.array,
    selectedProcedures: PropTypes.array,
    onChildPress: PropTypes.func,
};

ProcedureGroupItem.defaultProps = {
    name: "",
    procedures: [],
    selectedProcedures: [],
    style: {},
    onChildPress: () => {},
};

export default ProcedureGroupItem;
