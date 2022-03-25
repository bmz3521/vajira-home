import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import { Text } from '@components';
import LocationIcon from '@assets/images/location.png';
import MedicalSchoolIcon from '@assets/images/medical-school.png';
import LikeIcon from '@assets/images/like.png';
import { getImage } from '@utils/uploadImageHelper';

import { Card, ProfileImage, LeftCard, Tag, Image } from './style';

const DoctorCard = ({ data, handle }) => {
	return (
		<TouchableHighlight
			underlayColor="transparent"
			onPress={() => handle({ ...data, price: 500 })}
		>
			<Card>
				<LeftCard>
					<ProfileImage
						source={{
							uri: getImage(_.get(data, 'profileImage')),
						}}
					/>
					<Text bold numberOfLines={1} style={{ marginTop: 8 }}>
						{_.get(data, 'fullname')}
					</Text>
					<View style={{ flexDirection: 'row' }}>
						<Image source={LikeIcon} />
						<Text caption1 grayColor>
							{`10 (20)`}
						</Text>
					</View>
				</LeftCard>
				<View style={{ flex: 1 }}>
					<Tag>
						<Text whiteColor semibold caption1 numberOfLines={1}>
							{_.get(data, 'doctorType.name')}
						</Text>
					</Tag>
					<View style={{ marginTop: 8, flexDirection: 'row' }}>
						<Image source={LocationIcon} />
						<Text caption1 numberOfLines={1} style={{ flex: 1 }}>
							Personal Clinic
            </Text>
					</View>
					<View style={{ marginTop: 5, flexDirection: 'row' }}>
						<Image source={MedicalSchoolIcon} />
						<Text caption1 numberOfLines={1} style={{ flex: 1 }}>
							Harvard School of Medicine
            </Text>
					</View>
					{/* <Text grayColor overline style={{ marginTop: 8 }}>
						Strarting at
          </Text>
					<Text title3 bold blueColor>
					</Text> */}
				</View>
			</Card>
		</TouchableHighlight>
	);
};

export default DoctorCard;
