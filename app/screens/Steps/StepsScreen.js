import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import styles from './styles';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import ProgressCircle from 'react-native-progress-circle';
import Modal from 'react-native-modal';
import GoalAchievedScreen from '../GoalAchieved/GoalAchievedScreen';
import { lineChartConfig, lineChartData } from '../../data/dataArrays';
import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor } from '@config';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

export default class StepsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: '#F4F6FA',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerRight: (
        <TouchableHighlight
          underlayColor="rgb(69, 183, 87)"
          onPress={() => params.toggleModal()}
        >
          <Image
            style={styles.goalAchievedIcon}
            source={require('../../assets/icons/goalAchieved.png')}
          />
        </TouchableHighlight>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      toggleModal: this.toggleModal
    });
  }

  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  toggleModal = () => {
    this.setState(prevState => ({ modal: !prevState.modal }));
  };

  render() {
    const { navigation } = this.props;
    var stepsDone = navigation.getParam('stepsDone');
    var stepsGoal = navigation.getParam('stepsGoal');

    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
title="Steps"
renderLeft={() => {
return (
<Icon name="chevron-left" size={20} />
);
}}
onPressLeft={() => {
navigation.goBack();
}}
/>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            You walked <Text style={styles.stepsText}>{stepsDone}</Text> steps today
          </Text>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={(stepsDone / stepsGoal) * 100}
              radius={80}
              borderWidth={8}
              color="rgb(69, 183, 87)"
              shadowColor="#ffff"
              bgColor="#F4F6FA"
            >
              <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                <Image
                  style={styles.circleImg}
                  source={require('../../assets/icons/walk.png')}
                />
                <Text style={styles.circleText}>{(stepsDone / stepsGoal) * 100} % </Text>
                <Text style={{ fontWeight: '500', textAlign: 'center' }}>of daily goal</Text>
              </View>
            </ProgressCircle>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>1300</Text>
            <Text style={styles.secText}>Cal Burned</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.columnContainer}>
            <Text style={styles.mainText}>10000</Text>
            <Text style={styles.secText}>Daily goal</Text>
          </View>
        </View>
        <View style={styles.statisticContainer}>
          <Text style={styles.statisticTxt}>Statistic</Text>
          <Chart
  style={{ height: 200, width: 400 }}
  data={[
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 2, y: 6 },
    { x: 3, y: 3 },
    { x: 4, y: 5 },
    { x: 5, y: 8 },
    { x: 6, y: 12 },
    { x: 7, y: 14 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 },
  ]}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: -2, max: 10 }}
  yDomain={{ min: -4, max: 20 }}
>
  <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={3} />
  <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} />
  <Line theme={{ stroke: { color: '#44bd32', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#44ad32' }, selected: { color: 'red' } } }} />
</Chart>

        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.performanceContainer}>
            <View style={styles.performanceRowContainer}>
              <Image
                style={styles.performanceIcon}
                source={require('../../assets/icons/goodFace.png')}
              />
              <View style={styles.perfromanceText}>
                <Text style={styles.mainText}>Best Performance</Text>
                <Text style={styles.secText}>Monday</Text>
              </View>
            </View>
            <Text style={styles.mainText}>10</Text>
          </View>
          <View style={styles.performanceContainerBorderless}>
            <View style={styles.performanceRowContainer}>
              <Image
                style={styles.performanceIcon}
                source={require('../../assets/icons/badFace.png')}
              />
              <View style={styles.perfromanceTextContainer}>
                <Text style={styles.mainText}>Worst Performance</Text>
                <Text style={styles.secText}>Sunday</Text>
              </View>
            </View>
            <Text style={styles.mainText}>6</Text>
          </View>
        </View>
        <Modal isVisible={this.state.modal}>
          <GoalAchievedScreen toggleModal={this.toggleModal} />
        </Modal>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

//initial chart
/*
  <LineChart
            data={{
              labels: ['6AM', '9AM', '12AM', '3PM', '6PM'],
              datasets: [
                {
                  data: [0, 0, 0, 1000, 2000, 400, 3000, 0, 0, 0],
                  color: (opacity = 1) => `rgba(254, 156, 94, ${opacity})` // optional
                }
              ]
            }}
            width={SCREEN_WIDTH - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffff',
              backgroundGradientFrom: '#ffff',
              backgroundGradientTo: '#ffff',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(254, 156, 94, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
          />
          */
