import React, { Component } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button } from "@components";
import styles from "./styles";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            loading: false,
            success: {
                name: true,
                email: true,
                address: true
            },
            ready: true,
        };
    }


  handleSubmit = async values => {
    const { dispatch } = this.props;
    this.setState({ loading: true });

    const y = values.get('year');
    const d = values.get('day');
    const m = values.get('month');

    // const birthDate = new Date(y, m, d);
    const birthDate = buildDate(d, m, y);
    const data = {
      email: values.get('email'),
      firstname: values.get('firstname'),
      lastname: values.get('lastname'),
      password: values.get('password'),
      referredBy: sessionStorage.getItem('invitationCode'),
      birthDate: birthDate._d,
    };

    // dispatch(register(data));
    try {
      await UserAPI.register(data);

      this.setState({ loading: false, registered: true });
      dispatch(closeModal());
    } catch (e) {
      let error = false;
      switch (e.response.statusCode) {
        case 422:
          error = 'This email already exists';
          break;

        default:
          break;
      }

      this.setState({ loading: false, error });
    }
  };

    onSignUp() {
        const { navigation } = this.props;
        let { name, email, address, success } = this.state;

        if (name == "" || email == "" || address == "") {
            this.setState({
                success: {
                    ...success,
                    name: name != "" ? true : false,
                    email: email != "" ? true : false,
                    address: address != "" ? true : false
                }
            });
        } else {
            this.setState(
                {
                    loading: true
                },
                () => {
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                        navigation.navigate("SignIn");
                    }, 500);
                }
            );
        }
    }

    render() {
        const { navigation } = this.props;
        let { loading, name, email, address, success, ready } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Sign Up"
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
                    <TextInput
            keyboardType="email-address"
            style={[
              BaseStyle.textInput,
              {
                fontSize: 18,
                height: 'auto',
                padding: 18,
                marginBottom: -1,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderColor: '#CCCCCC',
                borderWidth: 1,
                backgroundColor: '#FFFFF',
              },
            ]}
            // onChangeText={events.handleChangeText('email')}
            autoCorrect={false}
            placeholder="E-mail"
            placeholderTextColor={
              ready ? BaseColor.grayColor : BaseColor.primaryColor
            }
            value={email}
            selectionColor={BaseColor.primaryColor}
          />
          <TextInput
            style={[
              BaseStyle.textInput,
              {
                fontSize: 18,
                height: 'auto',
                padding: 18,
                marginBottom: -1,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderColor: '#CCCCCC',
                borderWidth: 1,
                backgroundColor: '#FFFFF',
              },
            ]}
            // onChangeText={events.handleChangeText('password')}
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={
              ready ? BaseColor.grayColor : BaseColor.primaryColor
            }
            // value={password}
            password
            selectionColor={BaseColor.primaryColor}
          />
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 65 }]}
                            onChangeText={text => this.setState({ name: text })}
                            autoCorrect={false}
                            placeholder="Name"
                            placeholderTextColor={
                                success.name
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={name}
                        />
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text =>
                                this.setState({ email: text })
                            }
                            autoCorrect={false}
                            placeholder="Email"
                            keyboardType="email-address"
                            placeholderTextColor={
                                success.email
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={email}
                        />
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text =>
                                this.setState({ address: text })
                            }
                            autoCorrect={false}
                            placeholder="Address"
                            placeholderTextColor={
                                success.address
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={address}
                        />
                        <View style={{ width: "100%" }}>
                            <Button
                                full
                                style={{ marginTop: 20 }}
                                loading={loading}
                                onPress={() => this.onSignUp()}
                            >
                                Sign Up
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
