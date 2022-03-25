import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, SafeAreaView, Text, FlatList, TextInput } from "react-native";
import { Header, Icon } from '@components';
import _ from 'lodash'
import { BaseStyle, BaseColor } from '@config';
import stylesCard, { Card, Image, LeftCard, SmallImage } from './style';
import axios from 'axios';
import Loading from './loading';
import { useDispatch } from 'react-redux';
import { TelemedicineActions } from '@actions';

function News(props) {
	const { navigation } = props;
	const [loading, setLoading] = useState(true);
	const [news, setNews] = useState('');
	const dispatch = useDispatch();
	const [detail, setDetail] = useState('');
	const [searchText, setSearchText] = useState('');
	const [searchType, setSearchType] = useState('');
	const [selectedItem, setSelected] = useState('Main');

	useEffect(() => {
		axios.get(`https://news-backend.everapp.io/ever-news`)
			.then(response => {
				setNews(response.data);
				setLoading(false)
			})
	}, []);

	const newsType = [
		'Main', 'Hot', 'Medical', 'Science'
	]

	console.log('news')
	console.log(news)

	const onApply = item => {
		const data = {
			detail: item,
		};
		console.log('detail');
		console.log(data);

		dispatch(TelemedicineActions.setTelemedicine(data));
		navigation.navigate('NewsDetail', {
			detail: item,
		});
	};

	const excludePin = [];

	for (let i in news) {
		if (news[i].pinStatus == false) {
			excludePin.push(news[i])
		}
	}

	const optionsFilter = _.filter(excludePin, n => {
		return (
			_.includes(_.lowerCase(n.keyword), _.lowerCase(searchText))
		);
	});

	const filterType = _.filter(excludePin, n => {
		return (
			_.includes(_.lowerCase(n.type), _.lowerCase(searchType))
		);
	});

	const pinStatus = [];

	for (let i in news) {
		if (news[i].pinStatus == true) {
			pinStatus.push(news[i]);
		}
	}

	return (
		<SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
			<Header
				title="News"
				renderLeft={() => {
					return (
						<Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
					);
				}}
				onPressLeft={() => {
					navigation.goBack();
				}}
			/>
			{selectedItem == 'Main' ? (
				<View
					style={{ marginHorizontal: 5 }}>
					<TextInput
						style={BaseStyle.textInput}
						placeholder="ค้นหา"
						placeholderTextColor={BaseColor.grayColor}
						onChangeText={text => setSearchText(text)}
						value={searchText}
					/>
				</View>
			) : (
					<View></View>
				)}
			<View>
				<FlatList
					data={newsType}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={
								() => { setSearchType(item); setSelected(item) }
							}>
							{item == selectedItem ? (
								<View style={{ backgroundColor: '#284F30', marginTop: 15, alignItems: 'center' }}>
									<Text style={{ color: 'white', marginHorizontal: 20 }}>{item}</Text>
								</View>
							) : (
									<View style={{ marginTop: 15, alignItems: 'center' }}>
										<Text style={{ color: 'black', marginHorizontal: 20 }}>{item}</Text>
									</View>)
							}
						</TouchableOpacity>
					)}
				/>
			</View>
			<View style={{marginBottom: 20}}>
				<FlatList
					data={pinStatus}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={{
								marginBottom: 20,
								borderRadius: 5,
							}}
							onPress={() => onApply(item)}
							key={item.id}
						>
							<Image
								style={{
								  borderBottomWidth: 0,
								  borderRadius: 5,           
								  shadowOffset: {
									width: 0,
									height: 2,
								  },
								  shadowOpacity: 0.25,
								  shadowRadius: 3.84,
								  elevation: 5,
								}}
								source={{
									uri: `https://news-backend.everapp.io${item.picture.url}`,
								}}
							/>
							<View style={{
								backgroundColor: "white",
								marginHorizontal: 5,
								borderRadius: 5,
								width: 350,
								padding: 10,
								marginLeft: 12,
								position: "absolute",
								top: 193,
								left: 3,
								shadowOffset: {
									width: 0,
									height: 2,
								  },
								  shadowOpacity: 0.25,
								  shadowRadius: 3.84,
								  elevation: 5,
							}}>
								<Text
									style={{
										fontSize: 12,
										fontWeight: 'bold',
										textAlign: 'left',
										paddingRight: 15,
										color: 'black',
									}}
								>{item.header}</Text>
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>
			<ScrollView
			    style={{
					marginBottom: 20
				}}
			>
				{selectedItem == 'Main' ? (
					loading ? (
						<View style={{ alignItems: 'center', marginTop: 355 }} >
							<Loading></Loading>
						</View>
					) : (
							optionsFilter.map(item => (
								<TouchableOpacity
									style={{
										alignItems: 'center',
										width: '95%',
										borderRadius: 5,
										marginTop: 5,
										marginLeft: 10,
									}}
									onPress={() => onApply(item)}
									key={item.id}
									selects={detail}>
									<Card
									    style={{
											borderWidth: 1, 
											borderRadius: 5,           
											shadowOffset: {
												width: 0,
												height: 2,
											},
											shadowOpacity: 0.25,
											shadowRadius: 3.84,
											elevation: 5
										}}
									>
										<LeftCard>
											<SmallImage
												source={{
													uri: `https://news-backend.everapp.io${item.picture.url}`,
												}}
											/>
										</LeftCard>
										<View style={{ margin: 5, borderRadius: 7, flex: 1 }}>
											<Text
												style={{
													fontSize: 12,
													fontWeight: '500',
													textAlign: 'left',
													paddingRight: 15,
												}}
											>{item.header}</Text>
											<Text
												style={{
													flex: 1,
													color: 'gray',
													marginTop: 10
												}}
											>{item.type}
											</Text>
										</View>
									</Card>
								</TouchableOpacity>
							))
						)
				) : (
						filterType.map(item => (
							<TouchableOpacity
								style={{
									alignItems: 'center',
									width: '95%',
									borderRadius: 5,
									marginTop: 5,
									marginLeft: 10,
								}}
								onPress={() => onApply(item)}
								key={item.id}
								selects={detail}>
								<Card
									style={{
										borderWidth: 1, 
										borderRadius: 5,           
										shadowOffset: {
											width: 0,
											height: 2,
										},
										shadowOpacity: 0.25,
										shadowRadius: 3.84,
										elevation: 5
									}}
								>
									<LeftCard>
										<SmallImage
											source={{
												uri: `https://news-backend.everapp.io${item.picture.url}`,
											}}
										/>
									</LeftCard>
									<View style={{ margin: 5, borderRadius: 7, flex: 1 }}>
										<Text
											style={{
												fontSize: 12,
												fontWeight: '500',
												textAlign: 'left',
												paddingRight: 15,
											}}
										>{item.header}</Text>
										<Text
											style={{
												flex: 1,
												color: 'gray',
												marginTop: 10
											}}
										>{item.type}
										</Text>
									</View>
								</Card>
							</TouchableOpacity>
						))
					)
				}
			</ScrollView>
		</SafeAreaView>
	)
}

export default News;