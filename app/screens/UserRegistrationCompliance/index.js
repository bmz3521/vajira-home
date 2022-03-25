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
import text from './complianceText.js';
const UserRegistrationCompliance = props => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const { actions, teleActions, navigation, auth, user } = props;

  // navigation.navigate('Home');

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="เงื่อนไขการใช้งาน"
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
      <View style={{ width: 50, height: 10, backgroundColor: '#284F30' }} />
      <ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
        <View style={{ marginTop: 30, marginBottom: 20 }}>
          <Image
            source={VjrLogo}
            style={{ height: 100 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 24 }}>มหาวิทยาลัยนวมินทราธิราช</Text>
          <Text style={{ fontSize: 18, marginBottom: 30 }}>
            คณะแพทยศาสตร์โรงพยาบาลวชิรพยาบาล
          </Text>
          <Text style={{ fontSize: 18 }}>
            ข้อกำหนดและเงื่อนไขการใช้บริการ Vajira@Home
            สำหรับการใช้งานในฐานะผู้รับบริการของโรงพยาบาล
          </Text>
        </View>
        <Text style={{ paddingHorizontal: 5, fontSize: 16 }}>{text}</Text>
      </ScrollView>

      <View
        style={{ flexDirection: 'row', marginLeft: 15, marginVertical: 30 }}
      >
        <CheckBox
          style={{
            width: 30,
            height: 30,
          }}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text style={{ fontSize: 16, marginHorizontal: 10, marginRight: 30 }}>
          ข้าพเจ้ายอมรับข้อกำหนดและเงื่อนไขการใช้บริการนี้
        </Text>
      </View>

      <View style={{ marginHorizontal: 15, marginBottom: 30 }}>
        <TouchableOpacity
          full
          disabled={!toggleCheckBox}
          style={{
            borderRadius: 5,
            backgroundColor: toggleCheckBox ? '#284F30' : 'grey',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
          onPress={() => navigation.navigate('SecondStep')}
        >
          <Text
            bold
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#FFFFFF',
            }}
          >
            ถัดไป
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
)(UserRegistrationCompliance);
