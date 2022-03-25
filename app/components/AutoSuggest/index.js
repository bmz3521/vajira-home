import React from "react";
import { View, TextInput, FlatList, TouchableHighlight } from "react-native";
import { Icon, Text } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";

function AutoSuggest(props) {
    const { style, keyExtractor, renderItem, size } = props;

    const [textFilter, setTextFilter] = React.useState("");
    const [dataFilter, setDataFilter] = React.useState([]);

    const changeText = React.useCallback(() => (text) => {
        if (text == "") {
            setTextFilter(text);
            setDataFilter([]);
        } else {
            setTextFilter(text);
            setDataFilter(props.data.filter(d => props.filter(d, text)))
        }   
    }, [props.data, props.filter]);

    const selectSuggest = React.useCallback((item) => () => {
        changeText()("");
        props.onPress(item);
    }, [props.onPress]);

    return (
        <View style={[styles.content, style]}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={textFilter} onChangeText={changeText()} />
                <Icon style={styles.icon} name="angle-down" size={20} />
            </View>
            <View style={styles.autocompleteContainer}>
                <FlatList
                    data={dataFilter.slice(0, size)}
                    keyExtractor={keyExtractor}
                    renderItem={(data => (
                        <TouchableHighlight
                            style={[styles.item, style]}
                            onPress={selectSuggest(data.item)}
                        >
                            {renderItem(data)}
                        </TouchableHighlight>
                    ))}
                />
            </View>
        </View>
    );
}

AutoSuggest.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    data: PropTypes.array,
    size: PropTypes.number,
    filter: PropTypes.func,
    keyExtractor: PropTypes.func,
    renderItem: PropTypes.func,
    onPress: PropTypes.func,
};

AutoSuggest.defaultProps = {
    data: [],
    size: 5,
    keyExtractor: (item, index) => item,
    filter: (item, text) => item.toLowerCase().includes(text.toLowerCase()),
    renderItem: (item) => <Text>{item}</Text>,
    onPress: () => {}
};


export default AutoSuggest;
