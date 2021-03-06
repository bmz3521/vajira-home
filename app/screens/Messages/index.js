import React, { Component } from "react";
import { Platform, View } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    GiftedChat,
    Actions,
    Bubble,
    SystemMessage
} from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import CustomView from "./CustomView";
import { Header, SafeAreaView, Icon, Text } from "@components";
import * as Utils from "@utils";
import styles from "./styles";

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false
        };

        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this._isAlright = null;
    }

    componentWillMount() {
        this._isMounted = true;
        this.setState(() => {
            return {
                messages: require("./data/messages.js")
            };
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onLoadEarlier() {
        this.setState(previousState => {
            return {
                isLoadingEarlier: true
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState(previousState => {
                    return {
                        messages: GiftedChat.prepend(
                            previousState.messages,
                            require("./data/old_messages.js")
                        ),
                        loadEarlier: false,
                        isLoadingEarlier: false
                    };
                });
            }
        }, 500); // simulating network
    }

    onSend(messages = []) {
        this.setState(previousState => {
            return {
                messages: GiftedChat.append(previousState.messages, messages)
            };
        });

        // for demo purpose
        this.answerDemo(messages);
    }

    answerDemo(messages) {
        if (messages.length > 0) {
            if (messages[0].image || messages[0].location || !this._isAlright) {
                this.setState(previousState => {
                    return {
                        typingText: "React Native is typing"
                    };
                });
            }
        }

        setTimeout(() => {
            if (this._isMounted === true) {
                if (messages.length > 0) {
                    if (messages[0].image) {
                        this.onReceive("Nice picture!");
                    } else if (messages[0].location) {
                        this.onReceive("My favorite place");
                    } else {
                        if (!this._isAlright) {
                            this._isAlright = true;
                            this.onReceive("Alright");
                        }
                    }
                }
            }

            this.setState(previousState => {
                return {
                    typingText: null
                };
            });
        }, 500);
    }

    onReceive(text) {
        this.setState(previousState => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native",
                        avatar: Images.profile2
                    }
                })
            };
        });
    }

    renderCustomActions(props) {
        if (Platform.OS === "ios") {
            return <CustomActions {...props} />;
        }
        const options = {
            "Action 1": props => {
                alert("option 1");
            },
            "Action 2": props => {
                alert("option 2");
            },
            Cancel: () => {}
        };
        return <Actions {...props} options={options} />;
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#f0f0f0"
                    }
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15
                }}
                textStyle={{
                    fontSize: 14
                }}
            />
        );
    }

    renderCustomView(props) {
        return <CustomView {...props} />;
    }

    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }

    render() {
        const { navigation } = this.props;

        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Review"
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
                                Replay
                            </Text>
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {}}
                />
                <GiftedChat
                    messages={this.state.messages}
                    isAnimated={true}
                    showAvatarForEveryMessage={true}
                    onSend={this.onSend}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}
                    user={{
                        _id: 1 // sent messages should have same user._id
                    }}
                    renderActions={this.renderCustomActions}
                    renderBubble={this.renderBubble}
                    renderSystemMessage={this.renderSystemMessage}
                    renderCustomView={this.renderCustomView}
                    renderFooter={this.renderFooter}
                />
            </SafeAreaView>
        );
    }
}
