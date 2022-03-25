import { StyleSheet, Dimensions } from 'react-native';
import { homeStyle, performance } from '../../AppStyles';
// screen sizing
const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width < height ? width : height;

const glassNumColums = 4;
// item size

const GLASS_ITEM_OFFSET = 25;
const GLASS_ITEM_MARGIN = GLASS_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: homeStyle.container,
  titleContainer: homeStyle.titleContainer,
  title: homeStyle.title,
  waterText: homeStyle.purpleText,
  mainText: homeStyle.mainText,
  secText: homeStyle.secText,
  waterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: GLASS_ITEM_OFFSET,
    marginTop: 10,
    width: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN,
    height: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN + 10
  },
  glass: {
    width: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN,
    height: (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN
  },
  photoContainer: {
    margin: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    marginLeft: GLASS_ITEM_OFFSET,
    marginRight: GLASS_ITEM_OFFSET
  },
  columnContainer: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  line: {
    width: 1,
    height: 40,
    backgroundColor: 'silver',
    marginLeft: 20,
    marginRight: 20
  },
  plus: {
    alignSelf: 'center',
    position: 'absolute',
    top: ((SCREEN_WIDTH - GLASS_ITEM_MARGIN) / glassNumColums - GLASS_ITEM_OFFSET) / 2 - 20,
    width: ((SCREEN_WIDTH - GLASS_ITEM_MARGIN) / glassNumColums - GLASS_ITEM_OFFSET) / 2,
    height: ((SCREEN_WIDTH - GLASS_ITEM_MARGIN) / glassNumColums - GLASS_ITEM_OFFSET) / 2
  },
  greenContainer: {
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#80dc92'
  },
  redContainer: {
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#f4dcdc'
  },
  redText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f77777'
  },
  greenText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#29963e'
  },
  detailsContainer: performance.detailsContainer,
  performanceContainer: performance.performanceContainer,
  performanceContainerBorderless: performance.performanceContainerBorderless,
  performanceRowContainer: performance.performanceRowContainer,
  performanceIcon: performance.performanceIcon,
  performanceTextContainer: performance.performanceTextContainer
});

export default styles;
