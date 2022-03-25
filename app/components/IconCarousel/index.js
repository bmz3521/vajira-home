import React, { Component } from 'react';
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  Animated,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Carousel, {
  Pagination,
  getInputRangeFromIndexes,
} from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.style';
import { ENTRIES1, ENTRIES2 } from './static/entries';
import { scrollInterpolators, animatedStyles } from './utils/animations';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

export default class IconCarousel extends Component {
  constructor(props) {
    super(props);
    const scrollAnim = new Animated.Value(0);

    this.state = {
      scrollAnim,
      slider1ActiveSlide: 0,
      scrollX: new Animated.Value(0),
      xPos: 0,
    };
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />;
  }

  _scrollInterpolator(index, carouselProps) {
    const range = [1, 0];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return { inputRange, outputRange };
  }
  _animatedStyle = (index, animatedValue, carouselProps) => {
    // this.setState({scrollAnim: animatedValue});
    console.log(animatedValue);
    return {
      opacity: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
        extrapolate: 'clamp',
      }),
    };
  };

  handleScroll(event) {
    this.setState({
      xPos: event.nativeEvent.contentOffset.x,
    });
  }

  mainExample(textName, title, subtitle) {
    const { slider1ActiveSlide } = this.state;
    let heightSwitch =
      this.state.xPos > 220 ? 180 + this.state.xPos * 0.1 : 180;

    const range = [1, 0, -1];

    // console.log(this.state.scrollX);
    const scrollValue = this.state.scrollX;

    const heightChange = this.state.scrollX.interpolate({
      inputRange: [0, 10],
      outputRange: [-20, 0],
      extrapolate: 'clamp',
    });

    console.log(heightChange);

    return (
      <View>
        {/* <Text style={styles.title}>{`${textName}`}</Text>
                {title && <Text style={styles.subtitle}>{title}</Text>} */}
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={false}
          //   firstItem={0}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          //   containerCustomStyle={{height: heightSwitch}}

          contentContainerCustomStyle={styles.sliderContentContainer}
          carouselHorizontalPadding={0}
          loop={false}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          //   autoplayInterval={3000}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
          //   scrollInterpolator={this._scrollInterpolator}
          //   slideInterpolatedStyle={this._animatedStyle}

          useScrollView={true}
          //   onScroll={(event) => {
          //     this.xOffset = event.nativeEvent.contentOffset.x
          // }}
          // onScroll={(event) => this.handleScroll(event)}

          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.state.scrollX } } },
          ])}
          scrollEventThrottle={160}
        />
        <Animated.View
          style={
            ([styles.exampleContainer], { height: 20, marginTop: heightChange })
          }
        >
          <Pagination
            dotsLength={2}
            activeDotIndex={this.state.slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={'#2DCFA1'}
            dotStyle={styles.paginationDot}
            inactiveDotColor={colors.black}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            //   carouselRef={this._slider1Ref}
            //   tappableDots={!!this._slider1Ref}
          />
        </Animated.View>
      </View>
    );
  }

  momentumExample(number, title) {
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Carousel
          data={ENTRIES2}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          activeSlideAlignment={'start'}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 4,
            tension: 40,
          }}
        />
      </View>
    );
  }

  layoutExample(number, title, type) {
    const isTinder = type === 'tinder';
    return (
      <View
        style={[
          styles.exampleContainer,
          isTinder ? styles.exampleContainerDark : styles.exampleContainerLight,
        ]}
      >
        <Text
          style={[styles.title, isTinder ? {} : styles.titleDark]}
        >{`Example ${number}`}</Text>
        <Text style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>
          {title}
        </Text>
        <Carousel
          data={isTinder ? ENTRIES2 : ENTRIES1}
          renderItem={isTinder ? this._renderLightItem : this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
      </View>
    );
  }

  customExample(number, title, refNumber, renderItemFunc) {
    const isEven = refNumber % 2 === 0;

    // Do not render examples on Android; because of the zIndex bug, they won't work as is
    return !IS_ANDROID ? (
      <View
        style={[
          styles.exampleContainer,
          isEven ? styles.exampleContainerDark : styles.exampleContainerLight,
        ]}
      >
        <Text
          style={[styles.title, isEven ? {} : styles.titleDark]}
        >{`Example ${number}`}</Text>
        <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>
          {title}
        </Text>
        <Carousel
          data={isEven ? ENTRIES2 : ENTRIES1}
          renderItem={renderItemFunc}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          scrollInterpolator={
            scrollInterpolators[`scrollInterpolator${refNumber}`]
          }
          slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
          useScrollView={true}
        />
      </View>
    ) : (
      false
    );
  }

  get gradient() {
    return false;
  }

  carouselRenderrer(carouselType, textName) {
    const example1 = this.mainExample(
      textName,
      'Browse beautiful places to stay with all the comforts of home, plus more.',
    );
    const example2 = this.momentumExample(
      2,
      'Momentum | Left-aligned | Active animation',
    );
    const example3 = this.layoutExample(
      3,
      '"Stack of cards" layout | Loop',
      'stack',
    );
    const example4 = this.layoutExample(
      4,
      '"Tinder-like" layout | Loop',
      'tinder',
    );
    const example5 = this.customExample(
      5,
      'Custom animation 1',
      1,
      this._renderItem,
    );
    const example6 = this.customExample(
      6,
      'Custom animation 2',
      2,
      this._renderLightItem,
    );
    const example7 = this.customExample(
      7,
      'Custom animation 3',
      3,
      this._renderDarkItem,
    );
    const example8 = this.customExample(
      8,
      'Custom animation 4',
      4,
      this._renderLightItem,
    );
    switch (carouselType) {
      case '1':
        return example1;
        break;
      case '2':
        return example2;
        break;
      case '3':
        return example3;
        break;
      case '4':
        return example4;
        break;
      case '5':
        return example5;
        break;
      case '6':
        return example6;
        break;
      case '7':
        return example7;
        break;
      case '8':
        return example8;
        break;
      default:
      // code block
    }
  }

  render() {
    const { carouselType, textName } = this.props;

    const HEADER_MIN_HEIGHT = 180;
    const headerMaxHeight = 220;

    const HEADER_SCROLL_DISTANCE = headerMaxHeight - HEADER_MIN_HEIGHT;

    const headerHeight = this.state.scrollAnim.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [headerMaxHeight, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    console.log(this.state.scrollX);
    // console.log(this.state.xPos);
    // console.log(this.state.slider1ActiveSlide);
    return (
      <SafeAreaView>
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.3)'}
          barStyle={'light-content'}
        />
        {this.gradient}
        <ScrollView
          style={{ paddingLeft: 0, paddingRight: 0 }}
          contentContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
          scrollEventThrottle={16}
          directionalLockEnabled={true}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.state.scrollX } } },
          ])}
        >
          {this.carouselRenderrer(carouselType, this.props.textName)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
