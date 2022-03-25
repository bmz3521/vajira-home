import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, ClinicPackageItem } from "@components";
import styles from "./styles";

// Load sample data
import { PackageData } from "@data";

export default class PricingTable extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            clinicPackageItem: PackageData[0],
            clinicPackageItemDetail: PackageData[1]
        };
    }
    render() {
        const { navigation } = this.props;
        const { clinicPackageItem, clinicPackageItemDetail } = this.state;

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Pricing Table"
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
                <ScrollView>
                    <View style={styles.contain}>
                        {/* Package Component > Summarize */}
                        <ClinicPackageItem
                            packageName={clinicPackageItem.packageName}
                            price={clinicPackageItem.price}
                            type={clinicPackageItem.type}
                            description={clinicPackageItem.description}
                            onPressIcon={() => {
                                navigation.navigate("PricingTable");
                            }}
                            style={{ marginBottom: 10 }}
                        />
                        {/* Package Component > Expand Detail */}
                        <ClinicPackageItem
                            detail
                            packageName={clinicPackageItemDetail.packageName}
                            price={clinicPackageItemDetail.price}
                            type={clinicPackageItemDetail.type}
                            description={clinicPackageItemDetail.description}
                            services={clinicPackageItemDetail.services}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
