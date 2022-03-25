import * as yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { bindActionCreators } from 'redux';
import React, { Fragment, useState } from 'react';
import styles from './styles';

import { useDispatch } from 'react-redux';
import {
	TextInput,
	Button,
	Text,
	Alert,
	View,
	TouchableOpacity,
	Platform,
	Modal,
} from 'react-native';
import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor } from '@config';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

const UserRegistation = props => {

}