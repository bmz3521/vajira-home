import React, { Component } from "react";
import {
    FlatList,
    RefreshControl,
    View,
    Animated,
    Platform
} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    CruiseItem,
    FilterSort
} from "@components";
import styles from "./styles";
import * as Utils from "@utils";

// Load sample data
import { CruiseData } from "@data";

export default class Cruise extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        // Temp data define
        this.state = {
            refreshing: false,
            loading: false,
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnim
                ),
                0,
                40
            ),
            modeView: "block",
            cruise: CruiseData
        };

        this.onChangeView = this.onChangeView.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
    }

    onChangeSort() {}

    /**
     * @description Open modal when filterring mode is applied
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onFilter() {
        const { navigation } = this.props;
        navigation.navigate("CruiseFilter");
    }

    /**
     * @description Open modal when view mode is pressed
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     */
    onChangeView() {
        let { modeView } = this.state;
        Utils.enableExperimental();
        switch (modeView) {
            case "block":
                this.setState({
                    modeView: "grid"
                });
                break;
            case "grid":
                this.setState({
                    modeView: "list"
                });
                break;
            case "list":
                this.setState({
                    modeView: "block"
                });
                break;
            default:
                this.setState({
                    modeView: "block"
                });
                break;
        }
    }

    /**
     * @description Render container view
     * @author Passion UI <passionui.com>
     * @date 2019-08-03
     * @returns
     */
    renderContent() {
        const { modeView, cruise, refreshing, clampedScroll } = this.state;
        const { navigation } = this.props;
        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 40],
            outputRange: [0, -40],
            extrapolate: "clamp"
        });
        switch (modeView) {
            case "block":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentContainerStyle={{
                                marginBottom: 50,
                                backgroundColor: BaseColor.fieldColor
                            }}
                            contentInset={{ top: 50 }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            data={cruise}
                            key={"block"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <CruiseItem
                                    block
                                    image={item.image}
                                    brand={item.brand}
                                    name={item.name}
                                    location={item.location}
                                    price={item.price}
                                    saleOff={item.saleOff}
                                    rate={item.rate}
                                    rateStatus={item.rateStatus}
                                    numReviews={item.numReviews}
                                    rateCount={item.rateCount}
                                    time={item.time}
                                    itinerary={item.itinerary}
                                    style={{
                                        marginBottom: 20,
                                        backgroundColor: BaseColor.whiteColor
                                    }}
                                    onPress={() =>
                                        navigation.navigate("CruiseDetail")
                                    }
                                    onPressTag={() =>
                                        navigation.navigate("Review")
                                    }
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
            case "grid":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentInset={{ top: 50 }}
                            columnWrapperStyle={{
                                marginHorizontal: 20
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            numColumns={2}
                            data={cruise}
                            key={"grid"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <CruiseItem
                                    grid
                                    image={item.image}
                                    brand={item.brand}
                                    name={item.name}
                                    location={item.location}
                                    price={item.price}
                                    saleOff={item.saleOff}
                                    rate={item.rate}
                                    rateStatus={item.rateStatus}
                                    numReviews={item.numReviews}
                                    rateCount={item.rateCount}
                                    time={item.time}
                                    itinerary={item.itinerary}
                                    onPress={() =>
                                        navigation.navigate("CruiseDetail")
                                    }
                                    style={{
                                        marginBottom: 10,
                                        marginLeft: index % 2 ? 15 : 0
                                    }}
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }]
                                }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
            case "list":
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentInset={{ top: 50 }}
                            contentContainerStyle={{
                                backgroundColor: BaseColor.fieldColor
                            }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            data={cruise}
                            key={"list"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <CruiseItem
                                    list
                                    image={item.image}
                                    brand={item.brand}
                                    name={item.name}
                                    location={item.location}
                                    price={item.price}
                                    saleOff={item.saleOff}
                                    rate={item.rate}
                                    rateStatus={item.rateStatus}
                                    numReviews={item.numReviews}
                                    rateCount={item.rateCount}
                                    time={item.time}
                                    itinerary={item.itinerary}
                                    style={{
                                        marginBottom: 20,
                                        backgroundColor: BaseColor.whiteColor
                                    }}
                                    onPress={() =>
                                        navigation.navigate("CruiseDetail")
                                    }
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                {
                                    transform: [{ translateY: navbarTranslate }]
                                }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
            default:
                return (
                    <View style={{ flex: 1 }}>
                        <Animated.FlatList
                            contentInset={{ top: 50 }}
                            refreshControl={
                                <RefreshControl
                                    colors={[BaseColor.primaryColor]}
                                    tintColor={BaseColor.primaryColor}
                                    refreshing={refreshing}
                                    onRefresh={() => {}}
                                />
                            }
                            scrollEventThrottle={1}
                            onScroll={Animated.event(
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: {
                                                y: this.state.scrollAnim
                                            }
                                        }
                                    }
                                ],
                                { useNativeDriver: true }
                            )}
                            data={cruise}
                            key={"block"}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <CruiseItem
                                    block
                                    image={item.image}
                                    brand={item.brand}
                                    name={item.name}
                                    location={item.location}
                                    price={item.price}
                                    saleOff={item.saleOff}
                                    rate={item.rate}
                                    rateStatus={item.rateStatus}
                                    numReviews={item.numReviews}
                                    rateCount={item.rateCount}
                                    time={item.time}
                                    itinerary={item.itinerary}
                                    style={{
                                        marginBottom: 10
                                    }}
                                    onPress={() =>
                                        navigation.navigate("CruiseDetail")
                                    }
                                    onPressTag={() =>
                                        navigation.navigate("Preview")
                                    }
                                />
                            )}
                        />
                        <Animated.View
                            style={[
                                styles.navbar,
                                { transform: [{ translateY: navbarTranslate }] }
                            ]}
                        >
                            <FilterSort
                                modeView={modeView}
                                onChangeSort={this.onChangeSort}
                                onChangeView={this.onChangeView}
                                onFilter={this.onFilter}
                            />
                        </Animated.View>
                    </View>
                );
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Cruise"
                    subTitle="01 Aug 2019, 4 Days 5 Nights"
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
                            <Icon
                                name="search"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {
                        navigation.navigate("SearchHistory");
                    }}
                />
                {this.renderContent()}
            </SafeAreaView>
        );
    }
}
