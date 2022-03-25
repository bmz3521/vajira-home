import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, SafeAreaView, Text } from "react-native";
import { Header, Icon } from '@components';
import { BaseStyle, BaseColor } from '@config';
import stylesCard, { Card, Image, LeftCard, SmallImage, Tag } from './style';
import axios from 'axios';
import Loading from './loading';
import { useDispatch } from 'react-redux';
import { TelemedicineActions } from '@actions';

function NewsDetail(props) {
	const { route, navigation } = props;
	const [loading, setLoading] = useState(true);
	const [news, setNews] = useState('');
	const dispatch = useDispatch();
	const detail = route.params.detail
	console.log('detail')
	console.log(props)

	useEffect(() => {
		axios.get(`https://news-backend.everapp.io/ever-news?type=${detail.type}`)
			.then(response => {
				setNews(response.data);
				setLoading(false)
			})
	}, []);

	const excludeSelf = [];

	for (let i in news) {
		if (news[i].id !== detail.id) {
			excludeSelf.push(news[i])
		}
	}

	console.log('exclude')
	console.log(excludeSelf)

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

	return (
		<SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
			<Header
				title="News Detail"
				renderLeft={() => {
					return (
						<Icon name="arrow-left" size={20} color={BaseColor.primaryColor} />
					);
				}}
				onPressLeft={() => {
					navigation.goBack();
				}}
			/>
			<ScrollView>
				<View
				style={{
					backgroundColor: '#284F30'
				}}
				>
				<View
				style={{
					paddingBottom: 20,
					borderBottomLeftRadius: 20,
					borderBottomRightRadius: 20,
					backgroundColor: 'white',
				}}
				>
				<Text style={{
					fontSize: 20,
					fontWeight: "bold",
					padding: 15
				}}>
					{detail.header}
				</Text>
				<Text style={{
					fontSize: 15,
					marginLeft: 12,
					padding: 5
				}}>
					{detail.date}
				</Text>
				<Tag style={{marginLeft: 12}}>{detail.agency}</Tag>
				<Tag style={{marginLeft: 12}}>{detail.type}</Tag>
				</View>
				<View 
				style={{
					fontSize: 15,
					backgroundColor: 'white',
					padding: 15,
					borderWidth: 1,
					margin: 15,
					borderRadius: 5,           
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
				}}>
				<Image
					style={{
						marginLeft: -15,
						marginTop: -15,
						marginBottom: 10,
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
						uri: `https://news-backend.everapp.io${detail.picture.url}`,
					}}
				/>
					<Text>
						{detail.content}
					</Text>
				</View>
				<View style={{ marginLeft: 10, marginBottom: 20, marginTop: 15 }}>
					<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>ข่าวอื่นๆที่คุณอาจสนใจ</Text>
				</View>
				{loading ? (
					<View style={{ alignItems: 'center', marginTop: 355 }}>
						<Loading></Loading>
					</View>
				) : (
						excludeSelf.map(result => (
							<TouchableOpacity
								style={{
									alignItems: 'center',
									width: '95%',
									borderRadius: 5,
									marginLeft: 10,
									marginBottom: 10,
								}}
								key={result.id}
								onPress={() => onApply(result)}
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
												uri: `https://news-backend.everapp.io${result.picture.url}`,
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
										>{result.header}</Text>
										<Text
											style={{
												flex: 1,
												color: 'gray',
												marginTop: 10
											}}
										>{result.type}
										</Text>
									</View>
								</Card>
							</TouchableOpacity>
						))
					)
				}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default NewsDetail;