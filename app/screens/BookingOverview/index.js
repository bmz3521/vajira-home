import React from "react";
import { View, ScrollView, Image } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button, StarRating } from "@components";
import { getTimeText } from '@utils/shared';
import styles from "./styles";

function BookingOverview(props) {
    const { navigation } = props;
    const { clinic, quotation, patient } = navigation.state.params;

    const onBookNow = React.useCallback(() => () => {
        navigation.navigate("BookingLoading", { clinic, quotation, patient })
    }, [navigation]);

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            forceInset={{ top: "always" }}
        >
            <Header
                title="Booking Overview"
                subTitle={clinic.name}
                renderLeft={() => {
                    return (
                        <Icon
                            name="chevron-left"
                            size={20}
                            color={BaseColor.primaryColor}
                        />
                    );
                }}
                onPressLeft={() => {
                    navigation.goBack();
                }}
            />
            <ScrollView style={{ backgroundColor: BaseColor.whiteColor }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={styles.blockView}>
                        <View style={styles.row}>
                            <View style={styles.leftView}>
                                <Text body1 semibold style={{ marginBottom: 5 }}>
                                    {clinic.name}
                                </Text>
                                <StarRating
                                    disabled={true}
                                    starSize={10}
                                    maxStars={5}
                                    rating={clinic.clinicRating}
                                    fullStarColor={BaseColor.accentColor}
                                />
                                <Text body2 grayColor style={{ marginVertical: 10 }}>
                                    {clinic.address}
                                </Text>
                            </View>
                            <View style={styles.rightView}>
                                <Image
                                    style={styles.image}
                                    source={{uri: clinic.featureImageM}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.blockView}>
                        <View style={styles.row}>
                            <View style={styles.centerView}>
                                <Text caption style={{ marginBottom: 5 }}>From</Text>
                                <Text body1 semibold>
                                    {getTimeText(quotation.startTime)}
                                </Text>
                            </View>
                            <View style={styles.centerView}>
                                <Icon
                                    name="long-arrow-alt-right"
                                    size={24}
                                    solid
                                />
                            </View>
                            <View style={styles.centerView}>
                                <Text caption style={{ marginBottom: 5 }}>To</Text>
                                <Text body1 semibold>
                                    {getTimeText(quotation.endTime)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.blockView}>
                        <Text body1 semibold>
                            Procedures
                        </Text>
                        {quotation.procedures.map(procedure => (
                            <View style={styles.row}>
                                <View style={styles.leftView}>
                                    <Text body2>{procedure.name}</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text body2 grayColor>
                                        ({procedure.price})
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.blockView}>
                        <Text body1 style={{ marginBottom: 10 }}>
                            Information
                        </Text>
                        <View style={styles.row}>
                            <View style={styles.leftView}>
                                <Text body2>Name</Text>
                            </View>
                            <View style={styles.rightView}>
                                <Text body2>
                                    {`${patient.firstname} ${patient.lastname}`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.leftView}>
                                <Text body2>Email</Text>
                            </View>
                            <View style={styles.rightView}>
                                <Text body2>
                                    {patient.email}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.leftView}>
                                <Text body2>Message</Text>
                            </View>
                            <View style={styles.rightView}>
                                <Text body2 style={{ textAlign: 'left' }}>
                                    {patient.message}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[ styles.resultContainer ]}>
                <View style={styles.row}>
                    <View style={styles.centerView}>
                        <Text blueColor>{quotation.totalPrice}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.centerView}>
                        <Text body1 semibold blueColor>
                            {getTimeText(quotation.startTime)}
                        </Text>
                    </View>
                    <View style={styles.centerView}>
                        <Icon
                            name="long-arrow-alt-right"
                            size={24}
                            solid
                        />
                    </View>
                    <View style={styles.centerView}>
                        <Text body1 semibold blueColor>
                            {getTimeText(quotation.endTime)}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Button
                    full
                    flat
                    onPress={onBookNow()}
                >
                    Booking now
                </Button>
            </View>
        </SafeAreaView>
    );
}

export default BookingOverview;
