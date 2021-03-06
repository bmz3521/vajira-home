import React, { useState, useRef } from 'react';
import { FlatList, RefreshControl, View, Animated } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { BaseStyle } from '@config';
import Carousel from 'react-native-snap-carousel';
import {
  Header,
  SafeAreaView,
  Icon,
  PlaceItem,
  FilterSort,
  CardList,
} from '@components';
import styles from './styles';
import * as Utils from '@utils';
import { PlaceListData } from '@data';
import pharmaShop from '@assets/images/osotSiam.jpeg';

export default function PharmacyList({ navigation }) {
  //   const {colors} = useTheme();
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    40,
  );

  const sliderRef = useRef(null);

  const [active, setActive] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(Utils.getWidthDevice());
  const [refreshing] = useState(false);
  const [modeView, setModeView] = useState('block');
  const [mapView, setMapView] = useState(false);
  const [region, setRegion] = useState({
    latitude: 13.719114,
    longitude: 100.4530485,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });

  const [list] = useState([
    {
      id: '0',
      image: pharmaShop,
      title: 'ร้านยาโอสถสยาม',
      subtitle: 'ภายในมหาวิทยาลัยสยาม ติดธนาคารกรุงเทพ',
      location: 'ถ. เพชรเกษม แขวงบางหว้า เขตภาษีเจริญ กรุงเทพมหานคร',
      region: {
        latitude: 13.719114,
        longitude: 100.4530485,
      },
      active: true,
      phone: '0-286-78000 ต่อ 5159',
      rate: 24,
      status: 'หยุดวันอาทิตย์และวันหยุดนักขัตฤกษ์',
      rateStatus: 'Very Good',
      numReviews: 4.5,
      link: 'https://www.facebook.com/OsotSiam.University/',
    },
  ]);

  /**
   * export viewport
   * @param {*} percentage
   * @returns
   */
  const getViewPort = percentage => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  };

  /**
   * call when on change sort
   */
  const onChangeSort = () => {};

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onFilter = () => {
    navigation.navigate('Filter');
  };

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onChangeView = () => {
    Utils.enableExperimental();
    switch (modeView) {
      case 'block':
        setModeView('grid');
        break;
      case 'grid':
        setModeView('list');
        break;
      case 'list':
        setModeView('block');
        break;
      default:
        setModeView('block');
        break;
    }
  };

  const onChangeMapView = () => {
    Utils.enableExperimental();
    setMapView(!mapView);
  };

  const onSelectLocation = location => {
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (
        element.region.latitude == location.latitude &&
        element.region.longitude == location.longitude
      ) {
        sliderRef.current.snapToItem(index);
        return;
      }
    }
  };

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  const renderList = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    switch (modeView) {
      case 'block':
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 10,
              }}
              refreshControl={
                <RefreshControl tintColor={'black'} refreshing={refreshing} />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
              data={list}
              key={'block'}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <PlaceItem
                  block
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  phone={item.phone}
                  rate={item.rate}
                  status={item.status}
                  rateStatus={item.rateStatus}
                  numReviews={item.numReviews}
                  onPress={() => navigation.navigate('PlaceDetail')}
                  onPressTag={() => navigation.navigate('Review')}
                />
              )}
            />
            {/* <Animated.View
              style={[
                styles.navbar,
                {transform: [{translateY: navbarTranslate}]},
              ]}>
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View> */}
          </View>
        );
      case 'grid':
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              columnWrapperStyle={{
                paddingLeft: 5,
                paddingRight: 20,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={list}
              key={'gird'}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <PlaceItem
                  grid
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  phone={item.phone}
                  rate={item.rate}
                  status={item.status}
                  rateStatus={item.rateStatus}
                  numReviews={item.numReviews}
                  style={{
                    marginLeft: 15,
                    marginBottom: 15,
                  }}
                  onPress={() => navigation.navigate('PlaceDetail')}
                  onPressTag={() => navigation.navigate('Review')}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}
            >
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );

      case 'list':
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
              data={list}
              key={'list'}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <PlaceItem
                  list
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  phone={item.phone}
                  rate={item.rate}
                  status={item.status}
                  rateStatus={item.rateStatus}
                  numReviews={item.numReviews}
                  style={{
                    marginBottom: 15,
                  }}
                  onPress={() => navigation.navigate('PlaceDetail')}
                  onPressTag={() => navigation.navigate('Review')}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}
            >
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      default:
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
              data={list}
              key={'block'}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <PlaceItem
                  block
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  location={item.location}
                  phone={item.phone}
                  rate={item.rate}
                  status={item.status}
                  rateStatus={item.rateStatus}
                  numReviews={item.numReviews}
                  onPress={() => navigation.navigate('PlaceDetail')}
                  onPressTag={() => navigation.navigate('Review')}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] },
              ]}
            >
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
        break;
    }
  };

  const renderMapView = () => {
    return (
      <View style={{ flex: 1 }}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
          {list.map((item, index) => {
            return (
              <Marker
                onPress={e => onSelectLocation(e.nativeEvent.coordinate)}
                key={item.id}
                coordinate={item.region}
              >
                <View
                  style={[
                    styles.iconLocation,
                    {
                      backgroundColor: index == active ? 'black' : 'white',
                      borderColor: 'black',
                    },
                  ]}
                >
                  <Icon
                    name="map-marker"
                    size={16}
                    color={index == active ? 'white' : 'black'}
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
        <View style={{ position: 'absolute', bottom: 0 }}>
          <Carousel
            ref={sliderRef}
            data={list}
            renderItem={({ item, index }) => (
              <CardList
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                rate={item.rate}
                style={{
                  margin: 3,
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  shadowColor: 'grey',
                  shadowOffset: {
                    width: 3,
                    height: 2,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('PlaceDetail')}
                onPressTag={() => navigation.navigate('Review')}
              />
            )}
            sliderWidth={viewportWidth}
            itemWidth={getViewPort(75) + getViewPort(2) * 2}
            firstItem={1}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={0.85}
            contentContainerCustomStyle={{ paddingVertical: 10 }}
            loop={true}
            loopClonesPerSide={2}
            autoplay={false}
            onSnapToItem={index => {
              setActive(index);
              setRegion({
                latitudeDelta: 0.009,
                longitudeDelta: 0.004,
                latitude: list[index] && list[index].region.latitude,
                longitude: list[index] && list[index].region.longitude,
              });
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="ร้านยาใกล้บ้าน"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-left"
              size={20}
              color={'black'}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Icon
              name={mapView ? 'align-right' : 'map'}
              size={20}
              color={'black'}
            />
          );
        }}
        // renderRightSecond={() => {
        //   return <Icon name="search" size={20} color={'black'} />;
        // }}
        // onPressRightSecond={() => {
        //   navigation.navigate('SearchHistory');
        // }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          onChangeMapView();
        }}
      />
      {mapView ? renderMapView() : renderList()}
    </SafeAreaView>
  );
}
