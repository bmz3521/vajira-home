import * as yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { bindActionCreators } from 'redux';
import React, { Fragment, useState } from 'react';
import styles from './styles';
import CheckBox from '@react-native-community/checkbox';
import VjrLogo from './vjr.png';
import { useDispatch } from 'react-redux';
import {
  TextInput,
  Button,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Header, SafeAreaView, Icon, Image } from '@components';
import { BaseStyle, BaseColor } from '@config';
import { ScrollView } from 'react-native-gesture-handler';
// import text from './complianceText.js';

const UserRegistrationFail = props => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const { actions, teleActions, navigation, auth, user } = props;

  // navigation.navigate('Home');

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="กรุณาลองใหม่อีกครั้ง"
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

      <View
        style={{ flexDirection: 'row', marginLeft: 15, marginVertical: 30 }}
      >
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text style={{ fontSize: 16, marginLeft: 10 }}>
          ข้าพเจ้ายอมรับข้อกำหนดและเงื่อนไขการใช้บริการนี้
        </Text>
      </View>

      <View style={{ marginHorizontal: 15, marginBottom: 30 }}>
        <TouchableOpacity
          full
          style={{
            borderRadius: 5,
            backgroundColor: '#284F30',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
          onPress={() => navigation.navigate('UserRegistation')}
        >
          <Text
            bold
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#FFFFFF',
            }}
          >
            ลองใหม่
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserRegistrationFail);
