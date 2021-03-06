import React, { Component } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Image,
    Header,
    SafeAreaView,
    Icon,
    Text,
    ClinicItem,
    Tag,
    ProfilePerformance,
    Card
} from "@components";
import styles from "./styles";

// Load sample data
import { UserData, ClinicData, ClinicPackageData } from "@data";

export default class Profile1 extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            packages: ClinicPackageData,
            clinics: ClinicData,
            userData: UserData[0]
        };
    }

    render() {
        const { navigation } = this.props;
        let { packages, clinics, userData } = this.state;

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Profile1"
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
                <ScrollView style={{ marginBottom: 20 }}>
                    {/* Profile Information */}
                    <View style={{ alignItems: "center" }}>
                        <Image source={userData.image} style={styles.image} />
                        <Text title1 semibold>
                            {userData.name}
                        </Text>
                        <Text subhead grayColor>
                            {userData.major}
                        </Text>
                        <Tag style={styles.tagFollow}>+ Follow</Tag>
                        <View style={styles.location}>
                            <Icon
                                name="map-marker-alt"
                                size={10}
                                color={BaseColor.primaryColor}
                            />
                            <Text
                                caption1
                                primaryColor
                                style={{
                                    marginLeft: 3
                                }}
                            >
                                {userData.address}
                            </Text>
                        </View>
                    </View>
                    <Text body2 grayColor style={styles.description}>
                        {userData.about}
                    </Text>
                    <View style={styles.contentField}>
                        <ProfilePerformance
                            type="primary"
                            data={userData.performance}
                        />
                    </View>
                    {/* Package Information */}
                    <View>
                        <Text
                            title3
                            semibold
                            style={{
                                marginLeft: 20,
                                marginTop: 20,
                                marginBottom: 10
                            }}
                        >
                            Packages
                        </Text>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={packages}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <Card
                                        style={[
                                            styles.clinicPackageItem,
                                            index == 0
                                                ? {
                                                    marginLeft: 20,
                                                    marginRight: 15
                                                }
                                                : { marginRight: 15 }
                                        ]}
                                        image={item.image}
                                        onPress={() =>
                                            navigation.navigate("PackageDetail")
                                        }
                                    >
                                        <Text headline semibold whiteColor>
                                            {item.name}
                                        </Text>
                                    </Card>
                                );
                            }}
                        />
                    </View>
                    {/* Clinic Information */}
                    <View>
                        <Text
                            title3
                            semibold
                            style={{
                                marginLeft: 20,
                                marginTop: 20,
                                marginBottom: 10
                            }}
                        >
                            Clinics
                        </Text>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={clinics}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <ClinicItem
                                    grid
                                    style={[
                                        styles.clinicItem,
                                        index == 0
                                            ? {
                                                marginLeft: 20,
                                                marginRight: 15
                                            }
                                            : { marginRight: 15 }
                                    ]}
                                    image={item.image}
                                    name={item.name}
                                    location={item.location}
                                    price={item.price}
                                    available={item.available}
                                    rate={item.rate}
                                    rateStatus={item.rateStatus}
                                    numReviews={item.numReviews}
                                    onPress={() => {
                                        navigation.navigate("ClinicDetail");
                                    }}
                                />
                            )}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
