import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _, { indexOf } from 'lodash'
import { View, Modal, ScrollView, TouchableHighlight, Alert, Picker } from 'react-native';
import { Header, SafeAreaView, Text, Icon } from '@components';
import { useSelector, connect } from 'react-redux';
import { BaseStyle, BaseColor } from '@config';
import {
	TopCard,
	ProfileImage,
} from './style';
import { FlatList } from 'react-native-gesture-handler';

function PreAssessment(props) {
	const telemedicine = useSelector(state => state.telemedicine);
	const { navigation, userTele } = props;
	const [selectedValue, setSelectedValue] = useState("3");

	return (
		<SafeAreaView>
			<Header
				title="แบบประเมินก่อนรับบริการ"
				renderLeft={() => {
					return (
						<Icon name="chevron-left" size={20} color={BaseColor.primaryColor} />
					);
				}}
				onPressLeft={() => {
					navigation.goBack();
				}}
			/>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 }}>
				{/* <View style={{ margin: 20, backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}> */}
				<Text style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>ความพึงพอใจในการรับบริการ</Text>
				<View style={{ flex: 1, paddingTop: 2, alignItems: "center" }}>
					<Picker
						selectedValue={selectedValue}
						style={{ height: 50, width: 50 }}
						onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
					>
						<Picker.Item label="1" value="1" />
						<Picker.Item label="2" value="2" />
						<Picker.Item label="3" value="3" />
						<Picker.Item label="4" value="4" />
						<Picker.Item label="5" value="5" />
					</Picker>
				</View>
				<TouchableHighlight
					style={{ ...styles.openButton, backgroundColor: "white", marginTop: 5, borderBottomWidth: 1, borderColor: "black" }}
					onPress={() => {
						() => navigation.navigate('TelePayment')
					}}
				>
					<Text style={{ color: "blacks", fontWeight: "bold", textAlign: "center" }}>เสร็จสิ้น</Text>
				</TouchableHighlight>
			</View>
		</SafeAreaView >
	)
}

const mapStateToProps = state => {
	return {
		userTele: state.userTele,
		user: state.user,
	};
};

export default connect(mapStateToProps)(PreAssessment);