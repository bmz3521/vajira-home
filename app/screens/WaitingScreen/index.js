import React, { useState, useEffect } from "react";
import {
	View,
	ScrollView,
	Button,
	TouchableOpacity,
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
	Header,
	SafeAreaView,
	Icon,
	Text,
} from "@components";
import { connect } from 'react-redux';
import _, { indexOf } from 'lodash'
// import styles from "./styles";
import stylesCard, { Card, ProfileImage, LeftCard, Tag, TagText, Image } from './style';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { TelemedicineActions } from '@actions';

function WaitingScreen(props) {
	const { navigation, userTele } = props;


	useEffect(() => {
		// const { userId } = jwtDecode(localStorage.getItem('token'))
	
	})

	const changeStatus = (() => {
		// const { userId } = jwtDecode(localStorage.getItem('token'))
		var updateData = {
			status: 'offline'
		}
		// firebase
		// 	.database()
		// 	.ref(`patientStatus/${userId}`)
		// 	.update(updateData)
	})

	return (
		<SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
			<Header
				title="My Booking"
				renderLeft={() => {
					return (
						<Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
					);
				}}
				onPressLeft={() => {
					navigation.goBack(); changeStatus()
				}}
			/>
			<View>
				<TouchableOpacity onPress={() => { navigation.navigate("MyBookings") }}>
					<Text>กดเพื่อไปต่อ</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		userTele: state.userTele,
	};
};

export default connect(mapStateToProps)(WaitingScreen);