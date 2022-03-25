import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { BaseColor } from "@config";
import { Text } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";

export default class ProcedurePackageListItem extends Component {
    constructor(props) {
        super(props);

        this.state = { selected: props.selected };
    }

    componentDidUpdate(prevProps) {
        if(this.props.selected !== prevProps.selected) {
            this.setState({ selected: this.props.selected });
        }
      } 

    selectItem() {
        const { id, name, maxPrice, onPress } = this.props;

        const minified = { id, name, minPrice: maxPrice, maxPrice, price: maxPrice + "" };
        onPress(!this.state.selected, minified);
        this.setState(s => ({ selected: !s.selected }));
    }

    render() {
        const { style, name, discountedPrice, maxPrice } = this.props;
        return (
            <TouchableOpacity
                style={[styles.contain, style, {
                    backgroundColor: this.state.selected ? BaseColor.primaryColor : BaseColor.whiteColor,
                }]}
                onPress={this.selectItem.bind(this)}
                activeOpacity={0.9}
            >
                <View style={styles.content}>
                    <View style={styles.contentTitle}>
                        <Text title semibold>
                            {name}
                        </Text>
                    </View>
                    <View style={styles.contentPrice}>
                        <Text body2 grayColor>
                            <strike>{discountedPrice}</strike>
                        </Text>
                        <Text body1>
                            {maxPrice}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

ProcedurePackageListItem.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    id: PropTypes.string,
    name: PropTypes.string,
    discountedPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    selected: PropTypes.bool,
    onPress: PropTypes.func
};

ProcedurePackageListItem.defaultProps = {
    id: "",
    name: "",
    discountedPrice: 0,
    maxPrice: 0,
    selected: false,
    style: {},
    onPress: () => {}
};
