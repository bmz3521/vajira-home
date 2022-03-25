import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1,
    },
    exampleContainer: {
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 20,
        // alignItems: 'flex-start'

    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 10,
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 16,
        paddingLeft: 20,

        // fontStyle: 'italic',
        textAlign: 'left'
    },
    slider: {
        overflow: 'visible', // for custom animations,
        paddingHorizontal: 0,

    },
    sliderContentContainer: {
        flexGrow: 0,
        paddingVertical: 10, // for custom animation
        paddingHorizontal: 0,
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    iconParent: {
        width: '33%',
        alignItems: 'center',
        marginBottom: 14,
        marginTop: 14,
      },
      
});
