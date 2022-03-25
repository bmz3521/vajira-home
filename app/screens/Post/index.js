import React, { Component } from "react";
import { RefreshControl, FlatList, View, Text, ScrollView } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
	Header,
	SafeAreaView,
	PostItem,
	Animated,
	ProfileAuthor,
	Icon,
	EventCard,
	CarouselComponent,
	CardList,
	EventItem,
} from "@components";
import styles from "./styles";
import * as Utils from "@utils";

// Load sample data
import { PostData } from "@data";

export default class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			posts: PostData,
			data: [
				{
					id: "1",
					image: Images.trip1,
					title: "ยาเถื่อน ผลิตภัณฑ์สุขภาพเถื่อน และการโฆษณาปลอม",
					subtitle: "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม",
					rate: "ประมาณเวลาการอ่าน: 3 นาที",
					content: "ในช่วงไม่กี่ปีที่ผ่านมา สังคมกำลังให้ความสนใจเกี่ยวกับประสบการณ์ในเรื่องคนที่กำลังจะเสียชีวิตและการเสียชีวิตมากขึ้นเรื่อย ๆ มีหลายเหตุผลที่ทำให้เกิดเหตุการณ์นี้แต่มีหลายคนที่อาจจะโต้แย้งว่าธุรกิจที่เกี่ยวข้องกับเรื่องความตายเน้นเรื่องผลกำไรมากกว่าให้ความสำคัญกับตัวบุคคล ซึ่งมันทำให้แต่ละคนรู้สึกไม่สบายใจเมื่อคิดถึงเรื่องการตายของตนเอง BJ Miller ผู้บริหารระดับสูงของ Zen Hospice Project ในเมืองซานฟรานซิสโกได้กล่าวไว้ในรายการ TED talk 2015 ว่าการตายนั้นเป็นสิ่งที่หลีกเลี่ยงไม่ได้ เราไม่ควรมองว่าการเสียชีวิตนั้นเป็นบทสุดท้ายของชีวิตคนคนหนึ่ง การเสียชีวิตนั้นไม่ควรเกิดขึ้นในความเงียบและโดดเดี่ยว ทุกคนต้องการการสนับสนุนเมื่อตนเองกำลังก้าวผ่านช่วงเวลาเหล่านี้ของชีวิต หลายคนคาดหวังให้การเสียชีวิตเป็นไปอย่างสง่างาม เต็มไปด้วยความรักและความเคารพ อย่างไรก็ตามโรงพยาบาลส่วนใหญ่ที่ดูแลผู้ป่วยระยะสุดท้ายนั้นไม่ได้ถูกออกแบบมาเพื่อสนับสนุนการดูแลผู้ป่วยกลุ่มนี้ นอกจากนั้นหลายคนก็อยากเลือกสถานที่และวิธีการเสียชีวิตของตนเองซึ่งไม่ได้จำกัดอยู่เพียงแต่ภายในโรงพยาบาลเท่านั้น"
				},
				{
					id: "2",
					image: Images.trip2,
					title: "คุยกับแพทย์ของคุณเรื่องการแพทย์ทางเลือก",
					subtitle: "กระทรวงสาธารณะสุข",
					rate: "ประมาณเวลาการอ่าน: 5 นาที",
					content: "ในช่วงไม่กี่ปีที่ผ่านมา สังคมกำลังให้ความสนใจเกี่ยวกับประสบการณ์ในเรื่องคนที่กำลังจะเสียชีวิตและการเสียชีวิตมากขึ้นเรื่อย ๆ มีหลายเหตุผลที่ทำให้เกิดเหตุการณ์นี้แต่มีหลายคนที่อาจจะโต้แย้งว่าธุรกิจที่เกี่ยวข้องกับเรื่องความตายเน้นเรื่องผลกำไรมากกว่าให้ความสำคัญกับตัวบุคคล ซึ่งมันทำให้แต่ละคนรู้สึกไม่สบายใจเมื่อคิดถึงเรื่องการตายของตนเอง BJ Miller ผู้บริหารระดับสูงของ Zen Hospice Project ในเมืองซานฟรานซิสโกได้กล่าวไว้ในรายการ TED talk 2015 ว่าการตายนั้นเป็นสิ่งที่หลีกเลี่ยงไม่ได้ เราไม่ควรมองว่าการเสียชีวิตนั้นเป็นบทสุดท้ายของชีวิตคนคนหนึ่ง การเสียชีวิตนั้นไม่ควรเกิดขึ้นในความเงียบและโดดเดี่ยว ทุกคนต้องการการสนับสนุนเมื่อตนเองกำลังก้าวผ่านช่วงเวลาเหล่านี้ของชีวิต หลายคนคาดหวังให้การเสียชีวิตเป็นไปอย่างสง่างาม เต็มไปด้วยความรักและความเคารพ อย่างไรก็ตามโรงพยาบาลส่วนใหญ่ที่ดูแลผู้ป่วยระยะสุดท้ายนั้นไม่ได้ถูกออกแบบมาเพื่อสนับสนุนการดูแลผู้ป่วยกลุ่มนี้ นอกจากนั้นหลายคนก็อยากเลือกสถานที่และวิธีการเสียชีวิตของตนเองซึ่งไม่ได้จำกัดอยู่เพียงแต่ภายในโรงพยาบาลเท่านั้น"

				},
				{
					id: "3",
					image: Images.trip3,
					title: "บัญญัติสิทธิของผู้รับบริการทางทันตกรรม",
					subtitle: "กระทรวงสาธารณะสุข",
					rate: "ประมาณเวลาการอ่าน: 2 นาที",
					content: "ในช่วงไม่กี่ปีที่ผ่านมา สังคมกำลังให้ความสนใจเกี่ยวกับประสบการณ์ในเรื่องคนที่กำลังจะเสียชีวิตและการเสียชีวิตมากขึ้นเรื่อย ๆ มีหลายเหตุผลที่ทำให้เกิดเหตุการณ์นี้แต่มีหลายคนที่อาจจะโต้แย้งว่าธุรกิจที่เกี่ยวข้องกับเรื่องความตายเน้นเรื่องผลกำไรมากกว่าให้ความสำคัญกับตัวบุคคล ซึ่งมันทำให้แต่ละคนรู้สึกไม่สบายใจเมื่อคิดถึงเรื่องการตายของตนเอง BJ Miller ผู้บริหารระดับสูงของ Zen Hospice Project ในเมืองซานฟรานซิสโกได้กล่าวไว้ในรายการ TED talk 2015 ว่าการตายนั้นเป็นสิ่งที่หลีกเลี่ยงไม่ได้ เราไม่ควรมองว่าการเสียชีวิตนั้นเป็นบทสุดท้ายของชีวิตคนคนหนึ่ง การเสียชีวิตนั้นไม่ควรเกิดขึ้นในความเงียบและโดดเดี่ยว ทุกคนต้องการการสนับสนุนเมื่อตนเองกำลังก้าวผ่านช่วงเวลาเหล่านี้ของชีวิต หลายคนคาดหวังให้การเสียชีวิตเป็นไปอย่างสง่างาม เต็มไปด้วยความรักและความเคารพ อย่างไรก็ตามโรงพยาบาลส่วนใหญ่ที่ดูแลผู้ป่วยระยะสุดท้ายนั้นไม่ได้ถูกออกแบบมาเพื่อสนับสนุนการดูแลผู้ป่วยกลุ่มนี้ นอกจากนั้นหลายคนก็อยากเลือกสถานที่และวิธีการเสียชีวิตของตนเองซึ่งไม่ได้จำกัดอยู่เพียงแต่ภายในโรงพยาบาลเท่านั้น"

				},
				{
					id: "4",
					image: Images.trip4,
					title: "เคล็ดลับการประหยัดเงินจากประกันสุขภาพ",
					subtitle: "ศูนย์ข่าวสปสช",
					rate: "ประมาณเวลาการอ่าน: 3 นาที",
					content: "ในช่วงไม่กี่ปีที่ผ่านมา สังคมกำลังให้ความสนใจเกี่ยวกับประสบการณ์ในเรื่องคนที่กำลังจะเสียชีวิตและการเสียชีวิตมากขึ้นเรื่อย ๆ มีหลายเหตุผลที่ทำให้เกิดเหตุการณ์นี้แต่มีหลายคนที่อาจจะโต้แย้งว่าธุรกิจที่เกี่ยวข้องกับเรื่องความตายเน้นเรื่องผลกำไรมากกว่าให้ความสำคัญกับตัวบุคคล ซึ่งมันทำให้แต่ละคนรู้สึกไม่สบายใจเมื่อคิดถึงเรื่องการตายของตนเอง BJ Miller ผู้บริหารระดับสูงของ Zen Hospice Project ในเมืองซานฟรานซิสโกได้กล่าวไว้ในรายการ TED talk 2015 ว่าการตายนั้นเป็นสิ่งที่หลีกเลี่ยงไม่ได้ เราไม่ควรมองว่าการเสียชีวิตนั้นเป็นบทสุดท้ายของชีวิตคนคนหนึ่ง การเสียชีวิตนั้นไม่ควรเกิดขึ้นในความเงียบและโดดเดี่ยว ทุกคนต้องการการสนับสนุนเมื่อตนเองกำลังก้าวผ่านช่วงเวลาเหล่านี้ของชีวิต หลายคนคาดหวังให้การเสียชีวิตเป็นไปอย่างสง่างาม เต็มไปด้วยความรักและความเคารพ อย่างไรก็ตามโรงพยาบาลส่วนใหญ่ที่ดูแลผู้ป่วยระยะสุดท้ายนั้นไม่ได้ถูกออกแบบมาเพื่อสนับสนุนการดูแลผู้ป่วยกลุ่มนี้ นอกจากนั้นหลายคนก็อยากเลือกสถานที่และวิธีการเสียชีวิตของตนเองซึ่งไม่ได้จำกัดอยู่เพียงแต่ภายในโรงพยาบาลเท่านั้น"

				},
				{
					id: "5",
					image: Images.trip5,
					title: "การดูแลเมื่อผู้ป่วยเข้าสู่ช่วงสุดท้ายของชีวิต",
					subtitle: "รพวชิรพยาบาล",
					rate: "ประมาณเวลาการอ่าน: 5 นาที",
					content: "ในช่วงไม่กี่ปีที่ผ่านมา สังคมกำลังให้ความสนใจเกี่ยวกับประสบการณ์ในเรื่องคนที่กำลังจะเสียชีวิตและการเสียชีวิตมากขึ้นเรื่อย ๆ มีหลายเหตุผลที่ทำให้เกิดเหตุการณ์นี้แต่มีหลายคนที่อาจจะโต้แย้งว่าธุรกิจที่เกี่ยวข้องกับเรื่องความตายเน้นเรื่องผลกำไรมากกว่าให้ความสำคัญกับตัวบุคคล ซึ่งมันทำให้แต่ละคนรู้สึกไม่สบายใจเมื่อคิดถึงเรื่องการตายของตนเอง BJ Miller ผู้บริหารระดับสูงของ Zen Hospice Project ในเมืองซานฟรานซิสโกได้กล่าวไว้ในรายการ TED talk 2015 ว่าการตายนั้นเป็นสิ่งที่หลีกเลี่ยงไม่ได้ เราไม่ควรมองว่าการเสียชีวิตนั้นเป็นบทสุดท้ายของชีวิตคนคนหนึ่ง การเสียชีวิตนั้นไม่ควรเกิดขึ้นในความเงียบและโดดเดี่ยว ทุกคนต้องการการสนับสนุนเมื่อตนเองกำลังก้าวผ่านช่วงเวลาเหล่านี้ของชีวิต หลายคนคาดหวังให้การเสียชีวิตเป็นไปอย่างสง่างาม เต็มไปด้วยความรักและความเคารพ อย่างไรก็ตามโรงพยาบาลส่วนใหญ่ที่ดูแลผู้ป่วยระยะสุดท้ายนั้นไม่ได้ถูกออกแบบมาเพื่อสนับสนุนการดูแลผู้ป่วยกลุ่มนี้ นอกจากนั้นหลายคนก็อยากเลือกสถานที่และวิธีการเสียชีวิตของตนเองซึ่งไม่ได้จำกัดอยู่เพียงแต่ภายในโรงพยาบาลเท่านั้น"

				},
				{
					id: "6",
					image: Images.trip6,
					title: "การเคลื่อนที่จะเปลี่ยนความคิดที่มีต่อสุขภาพยุคลดิจิทัลไปอย่างไร",
					subtitle: "ศูนย์ข่าวสปสช.",
					rate: "ประมาณเวลาการอ่าน: 3 นาที",
					content: "ในช่วงไม่กี่ปีที่ผ่านมา สังคมกำลังให้ความสนใจเกี่ยวกับประสบการณ์ในเรื่องคนที่กำลังจะเสียชีวิตและการเสียชีวิตมากขึ้นเรื่อย ๆ มีหลายเหตุผลที่ทำให้เกิดเหตุการณ์นี้แต่มีหลายคนที่อาจจะโต้แย้งว่าธุรกิจที่เกี่ยวข้องกับเรื่องความตายเน้นเรื่องผลกำไรมากกว่าให้ความสำคัญกับตัวบุคคล ซึ่งมันทำให้แต่ละคนรู้สึกไม่สบายใจเมื่อคิดถึงเรื่องการตายของตนเอง BJ Miller ผู้บริหารระดับสูงของ Zen Hospice Project ในเมืองซานฟรานซิสโกได้กล่าวไว้ในรายการ TED talk 2015 ว่าการตายนั้นเป็นสิ่งที่หลีกเลี่ยงไม่ได้ เราไม่ควรมองว่าการเสียชีวิตนั้นเป็นบทสุดท้ายของชีวิตคนคนหนึ่ง การเสียชีวิตนั้นไม่ควรเกิดขึ้นในความเงียบและโดดเดี่ยว ทุกคนต้องการการสนับสนุนเมื่อตนเองกำลังก้าวผ่านช่วงเวลาเหล่านี้ของชีวิต /n หลายคนคาดหวังให้การเสียชีวิตเป็นไปอย่างสง่างาม เต็มไปด้วยความรักและความเคารพ อย่างไรก็ตามโรงพยาบาลส่วนใหญ่ที่ดูแลผู้ป่วยระยะสุดท้ายนั้นไม่ได้ถูกออกแบบมาเพื่อสนับสนุนการดูแลผู้ป่วยกลุ่มนี้ นอกจากนั้นหลายคนก็อยากเลือกสถานที่และวิธีการเสียชีวิตของตนเองซึ่งไม่ได้จำกัดอยู่เพียงแต่ภายในโรงพยาบาลเท่านั้น"

				}],
			relate: [
				{
					id: "0",
					image: Images.trending1,
					title: "โรคกระดูก",
					time: "Thu, Oct 31, 9:00am",
					location: "Tobacco Dock, London"
				},
				{
					id: "1",
					image: Images.trending2,
					title: "ทันตกรรม",
					time: "Thu, Oct 31, 9:00am",
					location: "Tobacco Dock, London"
				},
				{
					id: "1",
					image: Images.trending3,
					title: "โรคผิวหนัง",
					time: "Thu, Oct 31, 9:00am",
					location: "Tobacco Dock, London"
				},
				{
					id: "1",
					image: Images.trending4,
					title: "ความสวย",
					time: "Thu, Oct 31, 9:00am",
					location: "Tobacco Dock, London"
				},
				{
					id: "1",
					image: Images.trending5,
					title: "ผิวหน้า",
					time: "Thu, Oct 31, 9:00am",
					location: "Tobacco Dock, London"
				},
				{
					id: "1",
					image: Images.trending6,
					title: "ระบบสืบพันธุ์",
					time: "Thu, Oct 31, 9:00am",
					location: "Tobacco Dock, London"
				},
				{
					id: "1",
					image: Images.trending7,
					title: "สุขภาวะ",
					time: "Thu, Oct 31, 9:00am",
					location: "Tobacco Dock, London"
				},
				{
					id: "1",
					image: Images.trending8,
					title: "รักษาทางเลือก",
					time: "Thu, Oct 31, 9:00am",
					location: "Tobacco Dock, London"
				}
			],
		};
	}

	render() {
		const { navigation } = this.props;
		const { promotion, packages, clinics, heightHeader, normalClinics, relate, search, data } = this.state;

		return (
			<SafeAreaView
				style={BaseStyle.safeAreaView}
				forceInset={{ top: "always" }}
			>
				<Header
					title="ข่าวสุขภาพ"
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
						navigation.navigate("Home");
					}}
				/>
				<SafeAreaView
					style={BaseStyle.safeAreaView}
					forceInset={{ top: "always" }}
				>
					<ScrollView
						scrollEventThrottle={8}
					>
						<View style={{
							marginTop: 5,
						}}>
						</View>

						<CarouselComponent
							carouselType={'newsBlog'}
						/>

						<View style={{ paddingRight: 10 }}>
							<Text
								title3
								bold
								style={{
									fontWeight: 'bold', marginLeft: 20, marginBottom: 10, marginTop: 12,
								}}
							>
								เรื่องเด่นวันนี้
        </Text>
							<FlatList
								contentContainerStyle={{
									marginBottom: 12,
								}}
								refreshControl={
									<RefreshControl
										colors={[BaseColor.primaryColor]}
										tintColor={BaseColor.primaryColor}
										refreshing={this.state.refreshing}
										onRefresh={() => { }}
									/>
								}
								data={data}
								keyExtractor={(item, index) => item.id}
								renderItem={({ item, index }) => (
									<CardList
										image={item.image}
										title={item.title}
										subtitle={item.subtitle}
										rate={item.rate}
										style={{ marginBottom: 20, }}
										onPress={() => {
											navigation.navigate('PostDetail', {
												ImageBanner: item.image,
												otherParam: 'anything you want here',
												content: item.content,
												subtitle: item.subtitle,
											});
										}}
									/>
								)}
							/>
						</View>
						<View
							style={{
								marginTop: 30,
								marginBottom: 5,
							}}>
							<Text
								title3
								bold
								style={{ fontWeight: 'bold', marginLeft: 20, marginBottom: 10 }}
							>
								ค้นหาเรื่องที่ท่านสนใจ
                            </Text>
							<FlatList
								contentContainerStyle={{
									paddingRight: 10,
									paddingLeft: 12,
									marginBottom: 12,
									marginTop: 12,
								}}
								horizontal={true}
								data={relate}
								showsHorizontalScrollIndicator={false}
								keyExtractor={(item, index) => item.id}
								renderItem={({ item, index }) => (
									<EventCard
										image={item.image}
										title={item.title}
										time={item.time}
										location={item.location}
										onPress={() =>
											navigation.navigate("EventDetail")
										}
										style={styles.eventCard}
									/>
								)}
							/>


						</View>

						<View style={{ flex: 1 }}>
							<FlatList
								contentContainerStyle={{
									paddingTop: 50,
									paddingBottom: 20,

								}}
								columnWrapperStyle={{
									marginHorizontal: 20
								}}
								refreshControl={
									<RefreshControl
										colors={[BaseColor.primaryColor]}
										tintColor={BaseColor.primaryColor}
										refreshing={this.state.refreshing}
										onRefresh={() => { }}
									/>
								}
								scrollEventThrottle={1}

								showsVerticalScrollIndicator={false}
								numColumns={2}
								data={data}
								key={"gird"}
								keyExtractor={(item, index) => item.id}
								renderItem={({ item, index }) => (
									<EventItem
										grid
										image={item.image}
										title={item.title}
										subtitle={item.subtitle}
										location={item.location}
										tracking={item.tracking}
										rate={item.rate}
										status={item.status}
										price={item.price}
										priceSale={item.priceSale}
										eventType={item.eventType}
										time={item.time}
										user={item.user}
										numTicket={item.numTicket}
										liked={item.liked}
										style={
											index % 2 == 0
												? {
													marginBottom: 20
												}
												: {
													marginLeft: 15,
													marginBottom: 20
												}
										}
										onPress={() =>
											navigation.navigate("EventDetail")
										}
										onPressTag={() =>
											navigation.navigate("Review")
										}
									/>
								)}
							/>

						</View>
					</ScrollView>
				</SafeAreaView>
			</SafeAreaView>
		);
	}
}
