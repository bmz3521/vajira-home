import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, Image } from '@components';
import { BaseStyle, Images } from '@config';

const Loading = () => {
	return (
		<SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<View
					style={{
						width: 150,
						height: 100,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Image
						source={Images.spinner}
						style={{
							width: 200,
							height: 200,
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};
export default Loading;
