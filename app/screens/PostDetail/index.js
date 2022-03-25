import React, { Component } from "react";
import { View, ScrollView, Animated } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    ProfileAuthor,
    ProfileGroup,
    Card,
    PostListItem
} from "@components";
import * as Utils from "@utils";
import styles from "./styles";

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._deltaY = new Animated.Value(0);
    }

    render() {
        const heightHeader = Utils.heightHeader();
        const heightImageBanner = Utils.scaleWithPixel(250);
        const marginTopBanner = heightImageBanner - heightHeader - 30;
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <Animated.Image
                    source={this.props.navigation.state.params.ImageBanner}
                    style={[
                        styles.imgBanner,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(195),
                                    Utils.scaleWithPixel(195)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    heightHeader
                                ]
                            })
                        }
                    ]}
                />
                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    <Header
                        title=""
                        renderLeft={() => {
                            return (
                                <Icon
                                    name="chevron-left"
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                            );
                        }}
                        renderRight={() => {
                            return (
                                <Icon
                                    name="bookmark"
                                    solid
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                            );
                        }}
                        onPressLeft={() => {
                            navigation.goBack();
                        }}
                        onPressRight={() => { }}
                    />
                    <ScrollView
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: { y: this._deltaY }
                                }
                            }
                        ])}
                        scrollEventThrottle={8}
                    >
                        <View
                            style={{
                                paddingHorizontal: 20,
                                marginBottom: 20,
                                marginTop: marginTopBanner
                            }}
                        >
                            <Text
                                headline
                                semibold
                                whiteColor
                                numberOfLines={1}
                            >
                            </Text>
                            <ProfileAuthor
                                // image={Images.profile2}
                                name={this.props.navigation.state.params.subtitle}
                                description="24 ชมที่แล้ว | 191,413 views"
                                textRight="ตค 2019"
                                style={{
                                    marginTop: 20
                                }}
                            />
                            <Text body2>
                            {JSON.stringify(navigation.getParam('content', 'default value'))}
                            </Text>
                            <Text
                             body2
                                style={{
                                    marginTop: 20
                                }}
                            >
                                                            {JSON.stringify(navigation.getParam('content', 'default value'))}

                            </Text>
                            <Text
                             body2
                                style={{
                                    marginTop: 20
                                }}
                            >
                                                            {JSON.stringify(navigation.getParam('content', 'default value'))}

                            </Text>
                            {/* <ProfileGroup
                                name="Steve, Lincoln, Harry"
                                detail="and 15 people like this"
                                users={[
                                    { image: Images.profile1 },
                                    { image: Images.profile3 },
                                    { image: Images.profile4 }
                                ]}
                            /> */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20
                                }}
                            >
                                {/* <Text headline semibold>
                                    Top experiences
                                </Text>
                                <Text footnote grayColor>
                                    Show more
                                </Text> */}
                            </View>
                            {/* Image gallery */}
                            <View style={styles.contentImageFollowing}>
                                {/* <View style={{ flex: 4, marginRight: 10 }}>
                                    <Card
                                        style={{ borderRadius: 8 }}
                                        image={Images.trip7}
                                    >
                                        <Text headline semibold whiteColor>
                                            Dallas
                                        </Text>
                                    </Card>
                                </View> */}
                                <View style={{ flex: 6 }}>
                                    {/* <View style={{ flex: 1 }}>
                                        <Card
                                            style={{ borderRadius: 8 }}
                                            image={Images.trip3}
                                        >
                                            <Text headline semibold whiteColor>
                                                Warsaw
                                            </Text>
                                        </Card>
                                    </View> */}
                                    {/* <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            marginTop: 10
                                        }}
                                    >
                                        <View
                                            style={{ flex: 6, marginRight: 10 }}
                                        >
                                            <Card
                                                style={{
                                                    borderRadius: 8
                                                }}
                                                image={Images.trip4}
                                            >
                                                <Text
                                                    headline
                                                    semibold
                                                    whiteColor
                                                >
                                                    Yokohama
                                                </Text>
                                            </Card>
                                        </View>
                                        <View style={{ flex: 4 }}>
                                            <Card
                                                style={{ borderRadius: 8 }}
                                                image={Images.trip6}
                                            >
                                                <Text
                                                    headline
                                                    semibold
                                                    whiteColor
                                                >
                                                    10+
                                                </Text>
                                            </Card>
                                        </View>
                                    </View> */}
                                </View>
                            </View>
                            {/* Featured Posts */}
                            <Text
                                headline
                                bold
                                style={{
                                    marginTop: 20
                                }}
                            >
                                บทความที่เกี่ยวข้อง
                            </Text>
                            <PostListItem
                                title="การวางแผนป้องกันข้อมูลเกี่ยวกับสุขภาพออนไลน์"
                                description="จากมุมมองของ Lupton พบว่าข้อเสียที่หลีกเลี่ยงไม่ได้เกี่ยวกักับเทคโนโลยีสุขภาพก็คือ มันทำให้สามารถติดตามประชากรและแต่ละคนโดยการเก็บข้อมูลโดยเฉพาะข้อมูลส่วนบุคคล"
                                style={{ marginTop: 10, width: '100%', backgroundColor: 'white' }}
                                image={Images.trip9}
                                onPress={() => {
                                    navigation.navigate("Back");
                                }}
                            />
                            <PostListItem
                                description="Lupton ยังได้กล่าวอีกว่าในช่วงเวลาเหล่านั้น การส่งเสริมให้มีการแบ่งปันข้อมูลอาจเริ่มจากการชักชวนหรืออาจกลายเป็นการบังคับได้โดยเฉพาะเมื่อมีปัจจัยทางการเงิน เช่น. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
                                title="การเก็บข้อมูลสำหรับการศึกษาสุขภาพระดับประชากร"
                                style={{ marginTop: 10, width: '100%' }}
                                image={Images.trip8}
                                onPress={() => {
                                    navigation.navigate("Back");
                                }}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}
