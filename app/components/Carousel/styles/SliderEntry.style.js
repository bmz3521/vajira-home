import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index.style';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.18;
const slideWidth = wp(100);
const itemHorizontalMargin = wp(0);
const itemHorizontalMarginNewsBlog = wp(13);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
export const itemWidthNewsBlog = slideWidth + itemHorizontalMarginNewsBlog * 2;

const entryBorderRadius = 10;

export default StyleSheet.create({
    slideInnerContainer: {
        width: '95%',
        height: slideHeight,
        paddingBottom: 0, // needed for shadow
        borderRadius: entryBorderRadius,
        marginHorizontal: 10,
    },
    shadow: {
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'transparent',
        height: '100%',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
        width: '100%',
    },
    imageContainerNewsBlog: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'transparent',
        height: '100%',
        // borderTopLeftRadius: entryBorderRadius,
        // borderTopRightRadius: entryBorderRadius,
        // borderBottomRightRadius: entryBorderRadius,
        // borderBottomLeftRadius: entryBorderRadius,
        width: '100%',
    },
    imageContainerEven: {
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
        height: '100%',
        flex: 1,
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        // borderTopLeftRadius: entryBorderRadius,
        // borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        // paddingTop: 20 - entryBorderRadius,
        // paddingHorizontal: 16,
        backgroundColor: 'transparent',
        // borderBottomLeftRadius: entryBorderRadius,
        // borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: 'transparent'
    },
    title: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'black'
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'black'
    }
});
