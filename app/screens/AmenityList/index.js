import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { SafeAreaView, Header, Icon, Text } from '@components';
import { BaseStyle, BaseColor } from '@config';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-fast-svg';
import styles from './styles';

function AmenityList(props) {
  const { navigation } = props;
  const { amenities } = navigation.state.params;

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: 'always' }}
    >
      <Header
        style={{ marginBottom: 10 }}
        title="Amenities"
        renderLeft={() => {
          return (
            <Icon name="chevron-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{ margin: 20 }}>
        <FlatList
          data={amenities}
          keyExtractor={(item, index) => item.id || index}
          renderItem={data => (
            <View>
              <View key={data.item.id} style={styles.item}>
                <SvgUri
                  width={25}
                  height={25}
                  source={{ uri: data.item.image }}
                />
                <Text body1 style={{ paddingLeft: 20, marginTop: 5 }}>
                  {data.item.name}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#CCCCCC',
                  marginTop: 15,
                  marginBottom: 15,
                }}
              />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

AmenityList.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  amenities: PropTypes.array,
};

AmenityList.defaultProps = {
  style: {},
  amenities: [],
};

export default AmenityList;
