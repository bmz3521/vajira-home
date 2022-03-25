import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList, Alert } from 'react-native';
import styles from './styles';
import ModalMealScreen from '../ModalMeal/ModalMealScreen';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { lineChartConfig, lineChartData } from '../../data/dataArrays';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor } from '@config';

class BloodGlucose extends React.Component {
  static navigationOptions = ({ navigation, route }) => {
    return {
      headerStyle: {
        backgroundColor: '#F4F6FA',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerRight: (
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => onPressModal()}
        >
          <Image style={styles.addIcon} source={require('../../assets/icons/addIcon.png')} />
        </TouchableHighlight>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = { visibleModalId: null, deleteModal: false, deleteMealId: -1 };
  }

  componentDidMount() {
    // this.props.navigation.setParams({
    //   onPressModal: this.onPressModal
    // });
  }

  toggleModal = () => {
    this.setState({
      visibleModal: null
    });
  };

  onPressModal = () => {
    this.setState({
      visibleModal: 'swipeable'
    });
  };

  onPressDeleteIcon = mealId => {
    this.setState(prevState => ({ deleteModal: !prevState.deleteModal, deleteMealId: mealId }));
  };

  onPressDeleteMeal = () => {
    this.props.removeMeal(this.state.deleteMealId);
    this.setState(prevState => ({ deleteMealId: -1 }));

    //for initial delete screen
    //this.setState(prevState => ({ deleteModal: !prevState.deleteModal,deleteMealId: -1 }));
  };

  onPressCancel = () => {
    this.setState(prevState => ({
      deleteMealId: -1
    }));

    //for initial delete screen
    //this.setState(prevState => ({ deleteModal: !prevState.deleteModal,deleteMealId: -1 }));
  };

  showDeleteScreen = id => {
    this.onPressDeleteIcon(id);
    Alert.alert(
      'Are you sure you want to delete this meal?',
      '',
      [
        { text: 'Yes', onPress: () => this.onPressDeleteMeal() },
        {
          text: 'Cancel',
          onPress: () => this.onPressCancel(),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  };

  renderFood = ({ item, index }) => (
    <View style={index == 0 ? styles.foodContainerBoarderless : styles.foodContainer}>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodQuantity}>{item.quantity}</Text>
        </View>
        <Text style={styles.foodCalories}>{item.calories}</Text>
      </View>
    </View>
  );

  renderMeal = ({ item, index }) => (
    <View style={styles.mealContainer}>
      <Text style={styles.mealName}>{item.meal}</Text>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={item.foods}
        renderItem={this.renderFood}
        extraData={this.state}
        //keyExtractor={item => `${item.id}`}
        listKey={index => `${index}`}
      />
      <TouchableHighlight
        style={styles.deleteIconContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        //onPress={() => this.onPressDeleteIcon(item.id)}
        onPress={() => this.showDeleteScreen(item.id)}
      >
        <Image style={styles.deleteIcon} source={require('../../assets/icons/deleteIcon.png')} />
      </TouchableHighlight>
    </View>
  );

  getCaloriesDone() {
    var calories = 0;
    this.props.nutrition.map(data => {
      data.foods.map(food => {
        calories += food.calories;
      });
    });
    return calories;
  }

  render() {
    // const { params = {} } = this.props.navigation.state;

    const macroNutrients = this.props.route.params.macroNutrients;
    const caloriesDone = this.getCaloriesDone();
    const data = {
      labels: ['Low', 'High', 'Good'], // optional
      data: [
        macroNutrients.proteinDone / macroNutrients.proteinGoal,
        macroNutrients.carbDone / macroNutrients.carbGoal,
        macroNutrients.fatDone / macroNutrients.fatGoal
      ],
      barColor: ['green', 'orange', 'black'],
      strokeWidth: 2
    };
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="Blood Glucose"
        renderLeft={() => {
        return (
        <Icon name="chevron-left" size={20} />
        );
        }}
        onPressLeft={() => {
        this.props.navigation.goBack();
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
        {/* <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => onPressModal()}
        >
          <Image style={styles.addIcon} source={require('../../assets/icons/addIcon.png')} />
        </TouchableHighlight> */}
        </View>
        <View style={{ alignSelf: 'center' }}>
          <ProgressChart
            data={data}
            width={SCREEN_WIDTH}
            height={200}
            chartConfig={{
              backgroundGradientFrom: 'white',
              backgroundGradientTo: '#F4F6FA',
              useShadowColorFromDataset: true,
              color: (opacity = 1) => `rgba(69, 183, 87, ${opacity})`
            }}
          />
        </View>
        <View>
          <View style={styles.macroRowContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.orangeBox} />
              <Text style={styles.macroNutrientName}>Low</Text>
            </View>
            <Text style={styles.macroNutrientGrams}>{macroNutrients.proteinDone}mmol/L</Text>
            <Text style={styles.macroNutrientProcent}>
              {((macroNutrients.proteinDone / macroNutrients.proteinGoal) * 100).toPrecision(2)}%
            </Text>
          </View>
          <View style={styles.macroRowContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.purpleBox} />
              <Text style={styles.macroNutrientName}>High</Text>
            </View>
            <Text style={styles.macroNutrientGrams}>{macroNutrients.carbDone}mmol/L</Text>
            <Text style={styles.macroNutrientProcent}>
              {((macroNutrients.carbDone / macroNutrients.carbGoal) * 100).toPrecision(2)}%
            </Text>
          </View>
          <View style={styles.macroRowContainerBorderless}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.greenBox} />
              <Text style={styles.macroNutrientName}>Good</Text>
            </View>
            <Text style={styles.macroNutrientGrams}>{macroNutrients.fatDone}mmol/L</Text>
            <Text style={styles.macroNutrientProcent}>
              {((macroNutrients.fatDone / macroNutrients.fatGoal) * 100).toPrecision(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.statisticContainer} >
          <Text pointerEvents="none" style={styles.statisticTxt}>เทรนด์</Text>
          <TouchableHighlight
          disabled={true}
          >
          <Chart
          disableTouch={true}
          disableGestures={false}
  style={{ height: 200, width: '100%', marginTop: 40 }}
  data={[
  { x: 5, y: 15 },
  { x: 6, y: 6 },
  { x: 7, y: 15 },
  { x: 8, y: 3 },
]}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 5, max: 8 }}
>
  <VerticalAxis
    tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
    theme={{
      axis: { stroke: { color: '#aaa', width: 2 } },
      ticks: { stroke: { color: '#aaa', width: 2 } },
      labels: { formatter: (v: number) => v.toFixed(2) },
    }}
  />
  <HorizontalAxis
    tickCount={9}
    theme={{
      axis: { stroke: { color: '#aaa', width: 2 } },
      ticks: { stroke: { color: '#aaa', width: 2 } },
      labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(1) },
    }}
  />
  <Line theme={{ stroke: { color: 'green', width: 2 } }} />
  <Line smoothing="bezier" tension={0.3} theme={{ stroke: { color: 'orange', width: 2 } }} />
  <Line smoothing="cubic-spline" tension={0.3} theme={{ stroke: { color: '#3fc7bc', width: 2 } }} />
</Chart>
</TouchableHighlight>
        </View>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={this.props.nutrition}
            renderItem={this.renderMeal}
            extraData={this.state}
            //keyExtractor={item => `${item.id}`}
            listKey={-1}
          />
        </View>
        <Modal
          isVisible={this.state.visibleModal === 'swipeable'}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection={['down']}
        >
          <ModalMealScreen toggleModal={this.toggleModal} />
        </Modal>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    nutritionDone: state.nutrition.nutritionDone,
    nutritionGoal: state.nutrition.nutritionGoal,
    nutrition: state.nutrition.nutrition
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeMeal: mealId => dispatch({ type: 'REMOVE_MEAL', mealId })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BloodGlucose);

//initial alert screen for delete meal - line 221
/*
 <Modal isVisible={this.state.deleteModal}>
          <View style={styles.deleteContainer}>
            <Text style={styles.deleteTxt}>Are you sure you want to delete this meal?</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                onPress={() => this.onPressDeleteMeal()}
              >
                <Text style={styles.deleteSecTxt}>Yes</Text>
              </TouchableHighlight>
              <Text> / </Text>
              <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                onPress={() => this.onPressCancel()}
              >
                <Text style={styles.deleteSecTxt}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        */
