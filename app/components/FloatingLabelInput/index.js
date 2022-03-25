import React from "react";
import { View, TextInput, Animated } from "react-native";
import PropTypes from "prop-types";
import { Icon, Text } from "@components";
import styles from "./styles";

function FloatingLabelInput(props) {
    const { label, value, regex, message, required, multiline } = props;

    const [firstFocus, setFirstFocus] = React.useState(false);
    const [focus, setFocus] = React.useState(false);
    const [validated, setValidated] = React.useState(!!value);
    const _animatedIsFocused = new Animated.Value(!!value ? 1 : 0);

    const labelStyle = {
        top: _animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [multiline ? 33 : 18, 0],
        }),
        fontSize: _animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 14],
        }),
        color: _animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: ['#aaa', '#000'],
        }),
    };

    React.useEffect(() => {
        Animated.timing(_animatedIsFocused, {
            toValue: (focus || !!value) ? 1 : 0,
            duration: 200,
        }).start();
    }, []);

    React.useEffect(() => {
        if (!!regex) {
            try {
                setValidated(regex.test(value));
            } catch (e) {
                setValidated(!!value);
            }
        } else {
            setValidated(!!value);
        }
    }, [regex, value])

    React.useEffect(() => {
        if (props.onValidate) {
            props.onValidate(validated);
        }
    }, [validated])

    let errMessage = '';
    if (required && firstFocus && !focus) {
        if (!!message) {
            errMessage = message;
        } else if (!validated) {
            errMessage = `Please enter a valid ${label.toLowerCase()}.`;
        } else if (!value) {
            errMessage = `Please enter your ${label.toLowerCase()}.`;
        }
    }
    let borderColor = !firstFocus ? '#555' : validated ? '#388E3C' : '#b00020';

    return (
        <View>
            <View style={{ paddingTop: multiline ? 33 : 18 }}>
                <Animated.Text style={[styles.label, labelStyle]}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    style={
                        multiline
                        ? [styles.multilineInput, { borderColor: borderColor }]
                        : [styles.input, { borderBottomColor: borderColor }]
                    }
                    onFocus={() => { setFocus(true); setFirstFocus(true); }}
                    onBlur={() => { setFocus(false); }}
                    //blurOnSubmit
                    underlineColorAndroid='transparent'
                />
                {firstFocus && (
                    <Icon 
                        style={[styles.icon, {
                            top: multiline ? 33 : 18, 
                            right: multiline ? 10 : 0,
                        }]}
                        name={validated ? 'check' : 'times'}
                        size={20}
                        color={validated ? '#03da5c' : '#b00020'}
                    />
                )}
            </View>
            <Text style={{ color: '#b00020' }}>{errMessage}</Text>
        </View>
    );
}

FloatingLabelInput.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    value: PropTypes.string,
    regex: PropTypes.string,
    message: PropTypes.string,
    required: PropTypes.bool,
    multiline: PropTypes.bool,
    onChangeText: PropTypes.func,
    onValidate: PropTypes.func,
};

FloatingLabelInput.defaultProps = {
    style: {},
    label: "",
    value: "",
    regex: "",
    message: "",
    required: false,
    multiline: false,
    onChangeText: () => {},
    onValidate: () => {},
};

export default FloatingLabelInput;
