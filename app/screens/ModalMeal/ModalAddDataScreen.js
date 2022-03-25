import React, { useRef } from 'react';
import axios from 'axios';
import { ModalSelectList } from 'react-native-modal-select-list';

import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
  OpaqueColorValue,
} from 'react-native';
import { Dimensions } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { Image, Icon } from '@components';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalSelector from 'react-native-modal-selector';
import config from '@_config';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Label,
  Form,
} from 'native-base';
import moment from 'moment/min/moment-with-locales';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import PropTypes from 'prop-types';
// import RNPickerSelect from 'react-native-picker-select';
import Glucose from './health-monitoring-logo/blood-glucose.png';
import Pressure from './health-monitoring-logo/blood-pressure.png';
import Exercise from './health-monitoring-logo/health-activity.png';
import Water from './health-monitoring-logo/water.png';
import Weight from './health-monitoring-logo/weight.png';
import Medication from './health-monitoring-logo/medicine.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
moment.locale('th');

import { getAccessToken } from '@utils/asyncStorage';

class ModalAddDataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.flatList = React.createRef();
    this.modalRef = React.createRef();
    this.state = {
      mappedDrug: [],
      patientDrugs: [],
      selectedDrugs: [],
      periodSelect: '',
      typeId: '',
      date: new Date(),
      value: new Date(),
      mode: 'datetime',
      displayFormat: 'dddd DD/MM/YYYY HH:mm a',
      label: moment()
        .utcOffset('+07:00')
        .format('dddd DD/MM/YYYY h:mm a'),
      timeValueAdd: moment().format('YYYY-MM-DD HH:mm:ss'),
      adults: 20,
      adults2: 12,
      adults3: 6,
      adults4: 3,
      takeDrug1: 0,
      takeDrug2: 0,
      takeDrug3: 0,
      takeDrug4: 0,
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      text6: '',
      meal: [
        { id: 0, name: 'ค่าน้ำตาล', check: false, image: Glucose },
        { id: 1, name: 'ความดัน', check: false, image: Pressure },
        { id: 2, name: 'น้ำหนัก', check: false, image: Weight },
        { id: 3, name: 'ทานยา', check: false, image: Medication },
      ],
      period: [
        { id: 0, name: 'ค่าน้ำตาล', check: false },
        { id: 1, name: 'ความดันโลหิต', check: false },
        { id: 2, name: 'น้ำหนัก', check: false },
        { id: 3, name: 'ทานยา', check: false },
      ],
      foods: [
        {
          id: 0,
          name: 'Blood Glucose',
          inputAmount: [
            {
              id: 0,
              textInput: 'text1',
              name: 'ค่าน้ำตาล',
              measurements: 'มก./ดล.',
            },
          ],
          calories: 150,
          quantity: '200 grams',
          check: false,
        },
        {
          id: 1,
          name: 'Blood Pressure & Pulse',
          calories: 150,
          quantity: '200 grams',
          check: false,
          inputAmount: [
            {
              id: 0,
              textInput: 'text2',
              name: 'ความดันตัวบน',
              measurements: 'มม. ปรอท',
            },
            {
              id: 0,
              textInput: 'text3',
              name: 'ความดันตัวล่าง',
              measurements: 'มม. ปรอท',
            },
            {
              id: 0,
              textInput: 'text4',
              name: 'ชีพจร',
              measurements: 'ครั้ง/นาที',
            },
          ],
          textInput: 'text2',
        },
        {
          id: 2,
          name: 'Weight',
          calories: 300,
          quantity: '100 grams',
          check: false,
          textInput: 'text3',
          inputAmount: [
            { id: 0, textInput: 'text5', name: 'น้ำหนัก', measurements: 'กก.' },
            { id: 0, textInput: 'text6', name: 'ส่วนสูง', measurements: 'ม.' },
          ],
        },
      ],
    };
  }

  openModal = () => this.modalRef.show();

  fetchHIEData = async () => {
    let userId;
    if (this.props.user.data !== null) {
      userId = this.props.user.data.id;
    } else {
      userId = 0;
    }
    const response = await axios(
      `${config.apiUrl}/UserInfos/checkUserVisitedByVerifiedFromHIE?patientId=${userId}`,
    );

    const visitItem = response.data.docs;
    var result = [].concat(...visitItem.map(o => o.drugs));
    await this.setState({ patientDrugs: result });

    const mappedDrug = result.map(item => {
      return {
        label: `${item.drugNondugName} ${item.medlblhlp3 &&
          '- ' + item.medlblhlp3}`,
        value: item,
      };
    });

    await this.setState({ mappedDrug: mappedDrug });
  };

  removeOption = id => {
    const filteredArray = this.state.selectedDrugs.filter(function(obj) {
      return obj._id !== id;
    });
    this.setState({ selectedDrugs: filteredArray });
  };
  onSelectedOption = value => {
    const element = value;

    Array.prototype.inArray = function(comparer) {
      for (var i = 0; i < this.length; i++) {
        if (comparer(this[i])) return true;
      }
      return false;
    };
    Array.prototype.pushIfNotExist = function(element, comparer) {
      if (!this.inArray(comparer)) {
        this.push(element);
      }
    };

    const array = this.state.selectedDrugs;

    array.pushIfNotExist(element, function(e) {
      return e._id === element._id;
    });

    this.setState({ selectedDrugs: array });
  };

  checkGlucose = () => {
    const { text1 } = this.state;

    if (text1 !== '') {
      return 1;
    } else {
      return 0;
    }
  };

  getGreetingTime = currentTime => {
    if (!currentTime || !currentTime.isValid()) {
      currentTime = moment();
    }

    const wakeUpPeriod = 5;
    const splitMorningMeal = 7;
    const splitAfternoonMeal = 12;
    const splitAfternoon = 16;
    const eveningMeal = 18; // 24hr time to split the evening

    const currentHour = parseFloat(currentTime.format('HH'));

    switch (true) {
      case currentHour <= wakeUpPeriod && currentHour >= 4:
        return 'ตื่นนอน';
        break;
      case currentHour <= splitMorningMeal && currentHour >= wakeUpPeriod:
        return 'ก่อนอาหารเช้า';
        break;
      case currentHour <= 11 && currentHour >= splitMorningMeal:
        return 'หลังอาหารเช้า';
        break;
      case currentHour <= splitAfternoonMeal && currentHour >= 11:
        return 'ก่อนอาหารเที่ยง';

        break;
      case currentHour <= splitAfternoon && currentHour >= splitAfternoonMeal:
        return 'หลังอาหารเที่ยง';

        break;
      case currentHour <= eveningMeal && currentHour >= splitAfternoon:
        return 'ก่อนอาหารเย็น';

        break;
      case currentHour <= 20 && currentHour >= eveningMeal:
        return 'หลังอาหารเย็น';

        break;
      case currentHour <= 0 && currentHour >= 20:
        return 'เวลานอน';
        break;
      case currentHour == 0:
        return 'เที่ยงคืน';
        break;
      case currentHour >= 0 && currentHour <= wakeUpPeriod:
        return 'เที่ยงคืน';
        break;
      default:
        return '';
        break;
    }
  };

  checkValidation = () => {
    const { text1, text2, text3, text4, text5, text6 } = this.state;
    console.log(text1);
    console.log('text1');
    let mealArr = this.state.meal;
    let foodArr = this.state.foods;
    var mealValid = 0;
    let foodValid = 0;
    mealArr.map(data => {
      if (data.check) {
        mealValid = 1;
      }
    });
    let glucoseCheck = false;
    let pressureCheck = false;
    let weightCheck = false;
    let glucoseOpen = false;
    let pressureOpen = false;
    let weightOpen = false;
    let checkInput = 0;
    let checkInput2 = 0;
    let checkInput3 = 0;

    if (text1 !== '' && mealArr[0].check) {
      glucoseCheck = true;
      glucoseOpen = true;
      checkInput++;
    } else if (mealArr[0].check) {
      glucoseCheck = false;
      checkInput--;
    }

    if ((text2 && text3 && text4) !== '' && mealArr[1].check) {
      pressureCheck = true;
      pressureOpen = true;
      checkInput2++;
    } else if (mealArr[1].check) {
      pressureCheck = false;
      checkInput2--;
    }
    console.log('text5');
    console.log(text6);

    if ((text5 && text6) !== '' && mealArr[2].check) {
      console.log('text5text6');
      weightCheck = true;
      weightOpen = true;
      checkInput3++;
    } else if (mealArr[2].check) {
      weightCheck = false;
      checkInput3--;
    }

    if (glucoseCheck && pressureCheck && weightCheck) {
      return 1;
    } else {
      return 0;
    }
  };

  onPressAdd = () => {
    const {
      text1,
      text2,
      text3,
      text4,
      text5,
      text6,
      value,
      timeValueAdd,
      periodSelect,
      typeId,
    } = this.state;

    let mealType = '';
    let periodType = '';

    let glucoseCheck = false;
    let pressureCheck = false;
    let weightCheck = false;

    if (text1 !== '') {
      glucoseCheck = true;
    } else {
    }

    if ((text2 && text3 && text4) !== '') {
      pressureCheck = true;
    } else {
    }

    if ((text5 & text6) !== '') {
      weightCheck = true;
    } else {
    }

    this.state.meal.map(data => {
      if (data.check) {
        mealType = data.name;
      }
    });
    let foodsArr = [];
    this.state.foods.map(data => {
      if (data.check) {
        foodsArr.push(data);
      }
    });
    var id = 0;
    if (this.props.nutrition.length > 0) {
      id = this.props.nutrition[this.props.nutrition.length - 1].id + 1;
    }
    let meal = {
      id: id,
      meal: mealType,
      foods: foodsArr,
    };

    console.log(text2);
    console.log(text3);
    console.log('value');

    console.log(value);
    const valueMoment = moment(value);
    const valueFormatted =
      valueMoment && valueMoment.format('YYYY-MM-DD HH:mm:ss');

    let glucoseMeasurements = {
      id: 1,
      glucose: this.state.text1,
      timeStamp: valueFormatted ? valueFormatted : timeValueAdd,
      type: 'glucose',
    };
    let pressureMeasurements = {
      systolic: this.state.text2,
      diastolic: this.state.text3,
      pulse: this.state.text4,
      timeStamp: valueFormatted ? valueFormatted : timeValueAdd,
      type: 'pressure',
    };
    let weightMeasurements = {
      weight: this.state.text5,
      height: this.state.text6,
      bmi: this.state.text5 / Math.pow(this.state.text6, 2),
      timeStamp: valueFormatted ? valueFormatted : timeValueAdd,
      type: 'weight',
    };

    let mealArr = this.state.meal;

    if (mealArr[0].check) {
      this.props.addGlucose(glucoseMeasurements),
      this.setState({typeId: '2'});
    }
    if (mealArr[1].check) {
      this.props.addPressure(pressureMeasurements),
      this.setState({typeId: '1'});
    }
    if (mealArr[2].check) {
      this.props.addWeight(weightMeasurements);
      // this.setState({typeId: '3'});
    }

    console.log('diaryData');

    let currentPeriod = this.getGreetingTime();
    let diaryData = {
      timeStamp: valueFormatted ? valueFormatted : timeValueAdd,
      period: periodSelect !== '' ? periodSelect : currentPeriod,
      measurements: {
        glucoseMeasurements: mealArr[0].check && glucoseMeasurements,
        pressureMeasurements: mealArr[1].check && pressureMeasurements,
        weightMeasurements: mealArr[2].check && weightMeasurements,
      },
    };

    this.sendDataToBackend(diaryData);
    this.props.navigation.navigate('HealthActivity');
  };

  async sendDataToBackend(diaryData) {
    let userId;
    if (this.props.user.data !== null) {
      userId = this.props.user.data.id;
    } else {
      userId = 0;
    }

    const ACCESS_TOKEN = await getAccessToken();
    await axios.post(
      `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}`,
      {
        detail: diaryData,
        appUserId: userId,
        monitoringtypeid: this.state.typeId,
      },
    );
  }

  onPressCancel() {
    this.props.navigation.goBack();
  }

  onPressMeal = id => {
    if (id === 3) {
      this.fetchHIEData();
    }

    let arr = this.state.meal;
    let arr2 = this.state.foods;
    arr.map(data => {
      if (!data.check && data.id == id) {
        data.check = true;
      } else if (data.check && data.id == id) {
        data.check = false;
      }
    });

    arr2.map(data => {
      if (!data.check && data.id == id) {
        data.check = true;
      } else if (data.check && data.id == id) {
        data.check = false;
      }
    });

    this.setState({
      meal: arr,
      food: arr2,
    });

    // setTimeout(() => this.flatList.current.scrollToEnd(), 200)
  };

  onPressFood = id => {
    let arr = this.state.foods;
    arr.map(data => {
      if (!data.check && data.id == id) {
        data.check = true;
      } else if (data.check && data.id == id) {
        data.check = false;
      }
    });
    this.setState({
      food: arr,
    });
  };

  changeText = (text, textInput) => {
    const textok = 'text1';
    if (text == '') {
      this.setState({
        [textInput]: text,
      });
    } else {
      this.setState({
        [textInput]: text,
      });
    }
  };

  showDateTimePicker = () => {
    // alert('showDateTimePicker');
    this.setState({ show: true });
    Keyboard.dismiss();
  };

  hideDateTimePicker = () => {
    console.log('trigger');
    this.setState({ show: false });
  };

  handleDatePicked = async value => {
    console.log('handleDatePicked');

    console.log(value);
    await this.setState({ value: value });
    setTimeout(() => {
      this.hideDateTimePicker();
    }, 250);
  };

  renderMeal = ({ item }) => (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => this.onPressMeal(item.id)}
      style={{ marginBottom: 30 }}
    >
      <View style={styles.mealContainer}>
        <Image
          style={{ height: 50, width: 50, marginBottom: 10 }}
          source={item.image}
        />
        <Image
          style={styles.circle}
          source={
            item.check
              ? require('../../assets/icons/fullCircle.png')
              : require('../../assets/icons/emptyCircle.png')
          }
        />
        <Text style={styles.mealTitle}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  renderFood = ({ item }) =>
    // <TouchableHighlight
    //   underlayColor="rgb(69, 183, 87)"
    //   onPress={() => this.onPressFood(item.id)}
    // >
    item.check && (
      <View style={styles.cardContainer}>
        <View style={styles.titleRowContainer}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.circle}
              source={
                item.check
                  ? require('../../assets/icons/fullCircle.png')
                  : require('../../assets/icons/emptyCircle.png')
              }
            />
          </View>
          <View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: '#284F30',
                marginBottom: 5,
              }}
            >
              {item.id === 0 && 'ค่าน้ำตาลในเลือด'}
              {item.id === 1 && 'ความดันและชีพจร'}
              {item.id === 2 && 'ดัชนีมวลกาย'}
            </Text>
          </View>
        </View>
        {item.inputAmount.map(input => (
          <View style={styles.foodRowContainer}>
            <Text style={styles.foodTitle1}>{input.name}</Text>
            <TextInput
              multiline={true}
              numberOfLines={1}
              keyboardType="decimal-pad"
              style={styles.input}
              placeholder="Aa"
              value={this.state[input.textInput]}
              onChangeText={value => this.changeText(value, input.textInput)}
            />
            <Text style={styles.foodTitle3}>{input.measurements}</Text>
          </View>
        ))}
      </View>
    );
  // </TouchableHighlight>

  render() {
    const {
      label,
      value,
      show,
      mode,
      displayFormat,
      periodSelect,
    } = this.state;

    console.log('this.state.meal[3]');

    console.log(this.state.meal[3].check);

    let index = 0;
    console.log('periodSelect');
    console.log(periodSelect);
    const currentTime = moment();
    let optionPeriod = '';

    console.log('optionPeriod');
    // console.log(this.getGreetingTime(currentTime));
    // console.log(getGreetingTime(optionPeriod));

    const data = [
      { key: index++, section: true, label: 'ช่วงเวลา' },
      { key: index++, label: 'ตื่นนอน' },
      { key: index++, label: 'ก่อนอาหารเช้า' },
      { key: index++, label: 'หลังอาหารเช้า' },
      // etc...
      // Can also add additional custom keys which are passed to the onChange callback
      { key: index++, label: 'ก่อนอาหารเที่ยง' },
      { key: index++, label: 'หลังอาหารเที่ยง' },
      { key: index++, label: 'ก่อนอาหารเย็น' },
      { key: index++, label: 'หลังอาหารเย็น' },
      { key: index++, label: 'ก่อนอาหารทานเล่น' },
      { key: index++, label: 'หลังอาหารทานเล่น' },
      { key: index++, label: 'ก่อนออกกำลังกาย' },
      { key: index++, label: 'หลังออกกำลังกาย' },
      { key: index++, label: 'เวลานอน' },
      { key: index++, label: 'เที่ยงคืน' },
      { key: index++, label: 'อื่นๆ' },
    ];

    console.log('value 1');

    console.log(value);
    return (
      <>
        <View style={styles.fullScreenContainer}>
          {/* <View style={styles.bar}></View> */}
          {/* <View style={styles.titleContainer}>
          <Image style={styles.mealIcon} source={require('../../assets/icons/mealIcon.png')} />
          <Text style={styles.mainTxt}>Choose food</Text>
          <Text style={styles.secTxt}>Select your meal and your foods that you consume today</Text>
        </View> */}

          <TouchableWithoutFeedback>
            <View>
              <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={4}
                data={this.state.meal}
                renderItem={this.renderMeal}
                extraData={this.state}
                keyExtractor={item => `${item.id}`}
                listKey={0}
              />
            </View>
          </TouchableWithoutFeedback>

          {/*
        <Form style={{marginTop: 0}} onPress={this.showDateTimePicker}>
          <Item floatingLabel onKeyPress={this.showDateTimePicker}>

            <Input caretHidden   value={value ? moment(value).format(displayFormat) : ''} onFocus={this.showDateTimePicker} />
          <Label>{label}</Label>
          </Item>

          </Form> */}
          {/*
        <TouchableHighlight
        style={styles.btnContainer}
         onPress={() => this.showDatePicker}
         >
          Select Time
        </TouchableHighlight> */}

          {/* <TouchableWithoutFeedback> */}
          <FlatList
            ListHeaderComponent={
              <View style={{ marginTop: 0 }} style={styles.timeCardContainer}>
                <View style={styles.foodRowContainer}>
                  <Text style={styles.timeTitle}>เวลา</Text>
                  <TextInput
                    value={value ? moment(value).format(displayFormat) : label}
                    onFocus={this.showDateTimePicker}
                    style={styles.inputTime}
                  />
                  <Text style={{ paddingLeft: 0, color: 'green' }}>
                    <Icon name="chevron-down" />
                  </Text>
                </View>
                <DateTimePicker
                  headerTextIOS="Time"
                  locale="en_GB"
                  date={value}
                  isVisible={show}
                  display={'spinner'}
                  mode={mode}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  maximumDate={new Date()}
                  is24Hour={true}
                />

                <View style={{ paddingTop: 5, flexDirection: 'row' }}>
                  <Text style={styles.timeTitle2}>ช่วง</Text>
                  <View style={styles.inputPeriod} />
                  <ModalSelector
                    cancelText={'ยกเลิก'}
                    optionTextStyle={{ fontSize: 24 }}
                    touchableActiveOpacity={1}
                    touchableStyle={1}
                    optionContainerStyle={{
                      opacity: 1,
                      backgroundColor: 'white',
                    }}
                    data={data}
                    initValue="Select something yummy!"
                    supportedOrientations={['portrait']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={option => {
                      this.setState({ periodSelect: option.label });
                    }}
                    selectStyle={{ backgroundColor: 'white', color: 'green' }}
                    overlayStyle={{
                      flex: 1,
                      padding: '5%',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0)',
                    }}
                  >
                    <TextInput
                      placeholder={this.getGreetingTime(currentTime)}
                      placeholderTextColor="green"
                      value={this.state.periodSelect}
                      style={{ width: '100%', fontSize: 18, color: 'green' }}
                    />
                  </ModalSelector>
                  <Text
                    style={{
                      paddingLeft: 15,
                      alignSelf: 'center',
                      color: 'green',
                    }}
                  >
                    <Icon name="chevron-down" />
                  </Text>
                </View>
              </View>
            }
            ref={ref => (this.flatList = ref)}
            onContentSizeChange={() => this.flatList.scrollToEnd()}
            scrollEnabled={true}
            contentContainerStyle={{ paddingVertical: 10, paddingBottom: 200 }}
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={this.state.foods}
            renderItem={this.renderFood}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey={1}
            ListFooterComponent={
              <View>
                {this.state.meal[3].check === true && (
                  <View style={styles.cardContainer}>
                    {/* <Image
            style={styles.circle}
            source={
              item.check
                ? require('../../assets/icons/fullCircle.png')
                : require('../../assets/icons/emptyCircle.png')
            }
          /> */}

                    <View style={styles.titleRowContainer}>
                      <View style={{ flex: 1 }}>
                        <Image
                          style={styles.circle}
                          source={require('../../assets/icons/fullCircle.png')}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 18,
                            color: '#284F30',
                            marginBottom: 15,
                          }}
                        >
                          บันทึกการทานยา
                        </Text>
                      </View>
                    </View>

                    {this.state.selectedDrugs.map((item, index) => (
                      <View style={styles.drugList}>
                        <View style={{ paddingRight: 24, flex: 1 }}>
                          <Text style={{ fontSize: 16 }}>
                            {item.drugNondugName} - {item.medlblhlp3}
                          </Text>
                          <Text title1>
                            {item.meduseqty && item.meduseqty + 'จำนวน'}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{ marginLeft: 20, flex: 0.1 }}
                          onPress={() => {
                            this.removeOption(item._id);
                          }}
                        >
                          <Icon name="minus-circle" size={24} color="grey" />
                        </TouchableOpacity>
                      </View>
                    ))}

                    <View style={styles.iconRight}>
                      <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => {
                          this.openModal();
                        }}
                      >
                        <Icon name="plus-circle" size={24} color="green" />
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'green',
                            marginLeft: 10,
                          }}
                          title1
                        >
                          เพิ่มยา
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            }
          />
          {/* </TouchableWithoutFeedback> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: windowHeight - 70,
            height: 70,
            width: windowWidth,
            backgroundColor: 'white',
          }}
        >
          <TouchableOpacity
            // underlayColor="rgb(69, 183, 87)"
            // style={styles.btnContainerCancel}
            style={
              this.checkValidation()
                ? styles.btnContainerCancel
                : styles.btnContainerCancel
            }
            onPress={() => this.onPressCancel()}
          >
            <Text style={{ color: 'rgb(69, 183, 87)' }}>ยกเลิก</Text>
          </TouchableOpacity>
          <TouchableHighlight
            underlayColor="rgb(69, 183, 87)"
            style={styles.btnContainer}
            // style={this.checkValidation() ? styles.btnContainer : styles.btnContainerDisabled}
            onPress={() => this.onPressAdd()}
          >
            <Text style={styles.btnTxt}>เพิ่มรายการ</Text>
          </TouchableHighlight>

          <ModalSelectList
            headerTintColor={'#284F30'}
            ref={ref => (this.modalRef = ref)}
            placeholder={'ค้นหารายการยา'}
            closeButtonText={'ปิด'}
            options={this.state.mappedDrug}
            onSelectedOption={value => this.onSelectedOption(value)}
            disableTextSearch={false}
            // provider={modalOptionsProvider}
            numberOfLines={3}
          />
        </View>
      </>
    );
  }
}

// ModalAddDataScreen.propTypes = {
//   value: PropTypes.instanceOf(moment),
//   maximumDate: PropTypes.instanceOf(moment),
// };

function mapStateToProps(state) {
  return {
    nutrition: state.nutrition.nutrition,
    glucose: state.glucose.glucose,
    pressure: state.pressure.pressure,
    weight: state.weight.weight,
    diary: state.diary.diary,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMeal: meal => dispatch({ type: 'ADD_MEAL', meal }),
    addGlucose: glucose => dispatch({ type: 'ADD_PERIOD', glucose }),
    addPressure: pressure => dispatch({ type: 'ADD_PRESSURE', pressure }),
    addWeight: weight => dispatch({ type: 'ADD_WEIGHT', weight }),
    addDiary: diary => dispatch({ type: 'ADD_DIARY', diary }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddDataScreen);
