import React, { Component } from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import i18next from 'i18next';
import { BaseStyle, BaseColor, Images } from '@config';

import {
  // Image,
  Text,
  Icon,
} from '@components';
export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      icons: [
        {
          icon: Images.homeicon2,
          name: i18next.t('mobile-app:Home'),
          route: 'HomeDental',
        },
        { icon: Images.homeicon2, name: 'ข้อมูลสิทธิ', route: 'Car' },
        { icon: Images.homeicon2, name: 'ข้อมูลส่วนบุคคล', route: 'Profile' },
        { icon: Images.homeicon2, name: 'ข้อมูลโรงพยาบาล', route: 'Profile' },
        { icon: Images.homeicon2, name: 'ข้อมูลโรคภูมิแพ้', route: 'Allergy' },
        { icon: Images.homeicon2, name: 'ข้อมูลยา', route: 'TelePharmacist' },
      ],
      iconsMany: [
        {
          icon: 'qrcode',
          name: 'ใช้สิทธิ',
          route: 'Profile3',
        },
        {
          icon: 'newspaper',
          name: 'ข่าวสุขภาพ',
          route: 'Post',
        },
        {
          icon: 'bullhorn',
          name: 'ประกาศ',
          route: 'Post',
        },
        {
          icon: 'shield-alt',
          name: 'ดูประกัน',
          route: 'Profile',
        },
        {
          icon: 'wallet',
          name: 'กระเป๋าสุขภาพ',
          route: 'Profile3',
        },
        {
          icon: 'user-md',
          name: 'ปรึกษากับแพทย์',
          route: 'Profile',
        },
        {
          icon: 'prescription',
          name: 'สั่งยาเภสัช',
          route: 'PharmacyList',
        },
        {
          icon: 'ellipsis-h',
          name: 'อื่นๆ',
          route: 'More',
        },
      ],
    };
  }

  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  }

  renderIconService() {
    const { navigation } = this.props;

    return this.state.icons.map((icon, i) => {
      return (
        <TouchableOpacity
          key={i}
          // style={{ alignItems: "center" }}
          activeOpacity={0.9}
          onPress={() => navigation.navigate(icon.route)}
          style={styles.iconParent}
        >
          <View>
            <Image
              source={icon.icon}
              size={10}
              // color={BaseColor.primaryColor}
              // solid
              style={{ width: 33, height: 33 }}
            />
          </View>
          <Text caption1 grayColor>
            {icon.name}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  renderIconManyService() {
    const { navigation, even } = this.props;
    const { iconsMany, icons } = this.state;

    return (
      <FlatList
        data={iconsMany}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemServiceMany}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}
            >
              <View style={styles.iconContentMany}>
                <Icon name={item.icon} size={24} color={'#7d7d7d'} solid />
              </View>
              <Text footnote grayColor>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    );
  }

  render() {
    const {
      data: { title, subtitle },
      even,
    } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}
      >
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return even ? (
      <View style={{ flex: 1 }}>{this.renderIconManyService()}</View>
    ) : (
      <View style={styles.contentServiceIcon}>{this.renderIconService()}</View>
    );
  }
}
