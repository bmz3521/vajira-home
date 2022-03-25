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
            clinicPackageItem: PackageData[0]
        };
    }
    render() {
        const { navigation } = this.props;
        const { clinicPackageItem } = this.state;

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
                        <ClinicPackageItem
                            icon
                            packageName={clinicPackageItem.packageName}
                            price={clinicPackageItem.price}
                            type={clinicPackageItem.type}
                            description={clinicPackageItem.description}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
