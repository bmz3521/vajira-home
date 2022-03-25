import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { AuthActions } from '@actions';
import { bindActionCreators } from 'redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Picker,
} from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon, Text, Button, Image } from '@components';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-community/google-signin';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      loading: false,
      success: {
        id: true,
        password: true,
      },
    };
  }

  // signIn = async () => {
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const userInfo = await GoogleSignin.signIn();
  //       this.setState({ userInfo });
  //     } catch (error) {
  //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //         // user cancelled the login flow
  //       } else if (error.code === statusCodes.IN_PROGRESS) {
  //         // operation (e.g. sign in) is in progress already
  //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //         // play services not available or outdated
  //       } else {
  //         // some other error happened
  //       }
  //     }
  //   };
  //   getCurrentUserInfo = async () => {
  //     try {
  //       const userInfo = await GoogleSignin.signInSilently();
  //       this.setState({ userInfo });
  //     } catch (error) {
  //       if (error.code === statusCodes.SIGN_IN_REQUIRED) {
  //         // user has not signed in yet
  //       } else {
  //         // some other error
  //       }
  //     }
  //   };
  //   isSignedIn = async () => {
  //     const isSignedIn = await GoogleSignin.isSignedIn();
  //     this.setState({ isLoginScreenPresented: !isSignedIn });
  //   };
  //   getCurrentUser = async () => {
  //     const currentUser = await GoogleSignin.getCurrentUser();
  //     this.setState({ currentUser });
  //   };
  //   signOut = async () => {
  //     try {
  //       await GoogleSignin.revokeAccess();
  //       await GoogleSignin.signOut();
  //       this.setState({ user: null }); // Remember to remove the user from your app's state as well
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   revokeAccess = async () => {
  //     try {
  //       await GoogleSignin.revokeAccess();
  //       console.log('deleted');
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  onLogin() {
    const { id, password, success } = this.state;
    const { navigation } = this.props;
    if (id == '' || password == '') {
      this.setState({
        success: {
          ...success,
          id: false,
          password: false,
        },
      });
    } else {
      this.setState(
        {
          loading: true,
        },
        () => {
          this.props.actions.authentication(true, response => {
            if (
              response.success &&
              id == 'smpk@evernetwork.io' &&
              password == '123456'
            ) {
              const userId = 'smpk';
              navigation.goBack();
            } else {
              this.setState({
                loading: false,
              });
            }
          });
        },
      );
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="ลงทะเบียน"
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
            navigation.navigate('Home');
          }}
        />
        <Image
          source={Images.logo}
          style={{
            width: 65,
            height: 65,
            border: 21,
            marginLeft: 170,
            marginTop: 10,
            marginBottom: 5,
          }}
        />

        <Text
          title2
          bold
          style={{ textAlign: 'center', color: '#0D587A', marginBottom: 5 }}
        >
          Welcome to Ever Care
        </Text>
        <ScrollView>
          <View style={styles.contain}>
            {/* <Image source={Images.landing1}/> */}
            <TextInput
              style={[
                BaseStyle.textInput,
                {
                  marginTop: 10,
                  borderColor: 'gray',
                  borderWidth: 1,
                  backgroundColor: '#fffff',
                  borderRadius: 7,
                },
              ]}
              onChangeText={text => this.setState({ id: text })}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    id: true,
                  },
                });
              }}
              autoCorrect={false}
              placeholder="Thailand (+66)"
              placeholderTextColor={
                this.state.success.id
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.id}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              keyboardType={'phone-pad'}
              style={[
                BaseStyle.textInput,
                {
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginBottom: 15,
                  backgroundColor: '#fffff',
                  borderRadius: 7,
                },
              ]}
              onChangeText={text => this.setState({ password: text })}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    password: true,
                  },
                });
              }}
              autoCorrect={false}
              placeholder="Phone Number"
              secureTextEntry={true}
              placeholderTextColor={
                this.state.success.password
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state}
              password
              selectionColor={BaseColor.primaryColor}
            />

            <Text caption1 style={{ textAlign: 'center' }}>
              We’ll call or text to confirm your number. Standard
            </Text>
            <Text
              caption1
              style={{ textAlign: 'center', marginBottom: 5, marginRight: 100 }}
            >
              message and data rates apply.
            </Text>
            <View style={{ width: '100%' }}>
              <Button
                full
                loading={this.state.loading}
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  backgroundColor: '#284F30',
                }}
                onPress={() => {
                  this.onLogin();
                }}
              >
                Continue
              </Button>
            </View>
            <Text>or</Text>
            <View style={{ width: '100%' }}>
              <Button
                full
                loading={this.state.loading}
                style={{
                  marginTop: 10,
                  borderRadius: 10,
                  borderColor: '#1877F2',
                  borderWidth: 1,
                  backgroundColor: '#FFFFF',
                }}
                onPress={() => {
                  this.onLogin();
                }}
              >
                {/* <Image 
                            source={Images.facebook}
                            style={{
                                width: 17,
                                height: 17,
                              
                       
                            }}
                        /> */}

                <Text bold style={{ color: 'black', marginLeft: 205 }}>
                  Continue with Facebook
                </Text>
              </Button>
            </View>
            <View style={{ width: '100%', marginTop: 0, borderRadius: 28 }}>
              <Button
                full
                loading={this.state.loading}
                style={{
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor: '#fffff',
                  borderColor: 'red',
                  borderWidth: 1,
                }}
                onPress={() => {
                  this.onLogin();
                }}
              >
                {/* <Image 
                            source={Images.google}
                            style={{
                                width: 30,
                                height: 30,
                           
                       
                            }}
                        /> */}
                <Text bold style={{ color: 'black', textAlign: 'right' }}>
                  Continue with Google
                </Text>
              </Button>

              {/* <LoginButton
             style={styles.default}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn2')}>
              <Text body1 style={{ marginTop: 25 }}>
                Already have an account ?{' '}
                <Text bold style={{ textDecorationLine: 'underline' }}>
                  Login
                </Text>
              </Text>
            </TouchableOpacity>

            {/* <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}
    disabled={this.state.isSigninInProgress} /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
