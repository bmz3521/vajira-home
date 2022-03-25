import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'transparent',
    background2: 'transparent'
};

const entryBorderRadius = 20;


export default StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
      },
    exampleContainerDark: {
        backgroundColor: colors.black,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
    },
    exampleContainerLight: {
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
    },
    title: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 50,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        overflow: 'visible',
        marginBottom: 0, // for custom animations
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
    },
    sliderContentContainer: {
        padding: 10,
                marginBottom: 0, // for custom animations
                borderTopLeftRadius: entryBorderRadius,
                borderTopRightRadius: entryBorderRadius,
                borderBottomRightRadius: entryBorderRadius,
                borderBottomLeftRadius: entryBorderRadius,
    },
    paginationContainer: {
        marginTop: -50,
    },
    paginationDot: {
        width: 10,
        height: 3,
        borderRadius: 10,
        marginHorizontal: 1,
        color: 'white'
    }
});
