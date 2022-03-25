import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button, FloatingLabelInput } from "@components";
import styles from "./styles";

const formSubmission = [
    {
        label: "First Name",
        key: "firstname",
        required: true,
    },
    {
        label: "Last Name",
        key: "lastname",
        required: true,
    },
    {
        label: "Email Address",
        key: "email",
        required: true,
        regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    {
        label: "Message to Doctor",
        key: "message",
        required: true,
        multiline: true,
    },
]

function MedicalQueryForm(props) {
    const { navigation } = props;
    const { clinic, quotation } = navigation.state.params;

    const [patient, setPatient] = React.useState({});
    const [checker, setChecker] = React.useState({});

    React.useEffect(() => {
        const check = {};

        if (quotation.patient) {
            formSubmission.forEach(f => check[f.key] = true);
            setPatient(patient);
            setChecker(check);
        } else {
            formSubmission.forEach(f => check[f.key] = false);
            setChecker(check);
        }
    }, [])

    const onNext = React.useCallback(() => () => {
        navigation.navigate("BookingOverview", {
            clinic: clinic,
            quotation: Object.assign({}, quotation, {
                message: patient['message'],
            }),
            patient: patient,
        })
    }, [navigation, clinic, quotation, patient])

    const onValueChange = React.useCallback((key) => (value) => {
        setPatient(Object.assign({}, patient, { [key]: value }))
    }, [patient])

    const onValidate = React.useCallback((key) => (value) => {
        setChecker(Object.assign({}, checker, { [key]: value }))
    }, [checker])

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: "always" }}
        >
            <Header
                title="Medical Query Form"
                renderLeft={() => {
                    return (
                        <Icon
                            name="chevron-left"
                            size={20}
                            color={BaseColor.primaryColor}
                        />
                    );
                }}
                renderRight={() => {
                    return (
                        <Text headline primaryColor>
                            Reset
                        </Text>
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
                onPressRight={() => {}}
            />
            <ScrollView style={[ styles.container ]}>
                <View style={[
                    styles.formView,
                    BaseStyle.bodyPaddingDefault,
                ]}>
                    <FlatList
                        data={formSubmission}
                        keyExtractor={(item, index) => item.key}
                        renderItem={({ item }) => (
                            <FloatingLabelInput
                                {...item}
                                value={patient[item.key]}
                                onChangeText={onValueChange(item.key)}
                                onValidate={onValidate(item.key)}
                            />
                        )}
                    />
                </View>
            </ScrollView>
            <View style={[ styles.footer ]}>
                <Button 
                    disabled={Object.keys(checker).some(k => !checker[k])}
                    full
                    flat
                    onPress={onNext()}>
                    Next
                </Button>
            </View>
        </SafeAreaView>
    );
}

export default MedicalQueryForm;
