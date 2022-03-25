import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import _ from 'lodash';
import { Header, SafeAreaView, Text, Icon, EventCard } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';

import styles, { ItemRow, Selete, UnSelete } from './style';

const Dropdown = ({ options, options2, onSelect, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'doctors', title: 'แพทย์' },
    { key: 'others', title: 'วิชาชีพอื่น' },
  ]);

  const optionsFilter = _.filter(options, o => {
    return _.includes(_.lowerCase(o.name), _.lowerCase(searchText));
  });

  const options2Filter = _.filter(options2, o => {
    return _.includes(_.lowerCase(o.name), _.lowerCase(searchText));
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <View style={styles.searchSection}>
        <Icon
          name="search"
          color="#8d8d8d"
          solid
          size={20}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setSearchText(text)}
          placeholder="ค้นหาแผนก"
          placeholderTextColor={BaseColor.grayColor}
          value={searchText}
        />
      </View>

      {renderTopCard(onSelect)}

      <View style={styles.title}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
          แผนกต่างๆของโรงพยาบาลวชิรพยาบาล
        </Text>
      </View>
      <View style={styles.cardList}>
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene(
            navigation,
            onSelect,
            optionsFilter,
            options2Filter,
          )}
          renderTabBar={renderTabBar(index)}
          onIndexChange={setIndex}
        />
        {_.isEmpty(optionsFilter) && (
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Text grayColor>ไม่พบรายการ</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const Route = ({ filtered, onSelect }) => {
  return (
    <View>
      {filtered.map((option, index) => {
        return (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.9}
            style={styles.iconTopParent3}
            onPress={() => {
              onSelect(option);
            }}
          >
            <View style={styles.btnContainer}>
              <View style={styles.textContainer} />
              <Text body1 bold style={styles.txt}>
                {option.name}
              </Text>
            </View>

            <View style={styles.iconContainer}>
              <Icon name="chevron-right" size={20} color="#0A7C53" />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const renderTabBar = tabBorder => props => (
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={{
      backgroundColor: '#09B678',
      height: '100%',
      borderTopLeftRadius: tabBorder === 0 ? 12 : 0,
      borderBottomLeftRadius: tabBorder === 0 ? 12 : 0,
      borderTopRightRadius: tabBorder === 1 ? 12 : 0,
      borderBottomRightRadius: tabBorder === 1 ? 12 : 0,
      // borderTopRightRadius: tabBorder === 0 ? 12 : 0,
      // borderBottomRightRadius: tabBorder === 0 ? 12 : 0,
    }}
    style={styles.tabbar}
    tabStyle={styles.tab}
    inactiveColor="#000"
    activeColor="#fff"
    renderLabel={({ route, focused, color }) => (
      <View>
        <Text bold headline semibold={focused} style={{ color }}>
          {route.title}
        </Text>
      </View>
    )}
  />
);

const renderScene = (navigation, onSelect, optionsFilter, options2Filter) => ({
  route,
}) => {
  let filtered;
  switch (route.key) {
    case 'doctors':
      filtered = optionsFilter;
      break;
    case 'others':
      filtered = options2Filter;
      break;
  }

  return (
    <Route
      navigation={navigation}
      filtered={filtered}
      onSelect={item => onSelect(item)}
    />
  );
};

const renderTopCard = onSelect => {
  return (
    <ScrollView horizontal>
      <TouchableOpacity
        // style={{ alignItems: "center" }}
        activeOpacity={0.9}
        onPress={() => onSelect({ name: 'ออร์โธปิดิกส์', id: 2 })}
        style={styles.iconTopParent}
      >
        <View width={180} height={182} style={{ borderRadius: 12 }}>
          <Image
            source={Images.ajmason}
            color={BaseColor.primaryColor}
            solid
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 12,
            }}
          />
        </View>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            position: 'absolute',
            right: 10,
            top: 30,
            fontSize: 16,
          }}
          caption1
          grayColor
        >
          พบแพทย์
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            position: 'absolute',
            right: 10,
            top: 50,
            fontSize: 16,
          }}
          caption1
          grayColor
        >
          โรคกระดูก
        </Text>
        <Icon
          name="chevron-right"
          style={{
            height: 50,
            width: 20,
            color: 'white',
            fontWeight: 'normal',
            position: 'absolute',
            right: 10,
            bottom: 0,
            fontSize: 30,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        // style={{ alignItems: "center" }}
        activeOpacity={0.9}
        onPress={() => onSelect({ name: 'อายุรกรรมต่อมไร้ท่อ', id: 1 })}
        style={styles.iconTopParent2}
      >
        <View width={180} height={182} style={{ borderRadius: 12 }}>
          <Image
            source={Images.ajswangjit}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            position: 'absolute',
            right: 10,
            top: 30,
            fontSize: 16,
          }}
          caption1
          grayColor
        >
          พบแพทย์
        </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            position: 'absolute',
            right: 10,
            top: 50,
            fontSize: 16,
          }}
          caption1
          grayColor
        >
          โรคเบาหวาน
        </Text>
        <Icon
          name="chevron-right"
          style={{
            height: 50,
            width: 20,
            color: 'white',
            fontWeight: 'normal',
            position: 'absolute',
            right: 10,
            bottom: 0,
            fontSize: 30,
          }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Dropdown;
