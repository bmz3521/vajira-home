import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';
import { TelemedicineActions } from '@actions';
import _ from 'lodash';
import { Header, SafeAreaView, Text, Icon, Button } from '@components';
import { BaseStyle, BaseColor } from '@config';
import Fetch from '@components/Fetch';
import authClient from '@utils/authClient';
import CheackIcon from '@assets/images/check-circle-icon.png';
import { getAccessTeleToken } from '@utils/asyncStorage';
import Loading from '@components/Loading';
import { getCreditIcon } from '@utils/getValue';
import PaymentAddModal from './components/PaymentAddModal';
import DoctorCard from './components/DoctorCard';
import {
  Container,
  Image,
  ButtonAdd,
  Total,
  ItemRow,
  Selete,
  Card,
} from './style';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import config from '@_config';

function PharmacyPayment(props) {
  const { userTele, navigation, route } = props;
  const [credit, setCredit] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [creditList, setCreditList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const telemedicine = useSelector(state => state.telemedicine);
  const [selectItem, setSelectItem] = useState();
  const [selectPrice, setSelectPrice] = useState(0);
  const [dataBooking, setData] = useState();
  const [logistic, setLogistic] = useState();
  const [address, setAddress] = useState();

  function easyHTTP() {
    this.http = new XMLHttpRequest();
  }

  const http = new easyHTTP();

  easyHTTP.prototype.patch = function(url, data, callback) {
    this.http.open('patch', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    let self = this;
    this.http.onload = function() {
      callback(null, self.http.responseText);
    };

    this.http.send(JSON.stringify(data));
  };
  const logistics = [
    {
      name: 'รับยาที่บ้านทางไปรษณีย์ + 100 บาท',
      price: 100,
      id: 1,
    },
    {
      name: 'รับยาที่ร้านยาคุณภาพ + 50 บาท',
      price: 50,
      id: 2,
    },
    {
      name: 'รับยาที่โรงพยาบาลวชิรพยาบาล',
      price: 0,
      id: 3,
    },
  ];

  console.log('finaldata');
  // console.log(navigation.getParam('doctor'))
  // console.log(navigation.getParam('time'))
  // console.log(navigation.getParam('day'))
  // console.log(navigation.getParam('status'))
  // console.log(navigation.getParam('bookingId'))

  const bookingId = route.params.bookingId;
  const price = route.params.price;

  fetch = async () => {
    const { userId } = await getAccessTeleToken();
    const res = await authClient.client
      .get(`/Users/${userId}/cards`, {
        params: {
          provider: 'omise',
        },
      })
      .then(res => res.data);
    setCreditList(res);
    return res;
  };

  // var bookingId =

  const statusData = {
    id: bookingId,
    status: 'PATIENT_SUCCESS_PAYMENT',
  };

  const statusDecline = {
    id: bookingId,
    status: 'PATIENT_DECLINE',
  };

  const prescriptionDataStore = {
    logisticId: logistic,
    status: 'WAIT_FOR_PHARMACYSTORE_NOTIFY',
  };

  const prescriptionData = {
    logisticId: logistic,
    status: 'WAIT_FOR_PATIENT',
    address: address,
  };

  function changeStatus() {
    http.patch(`${config.VA_API_URL}/Bookings`, statusData, function(
      err,
      patch,
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log(patch);
      }
    });
  }

  function prescriptionStatusStore() {
    http.patch(
      `${config.VA_API_URL}/prescriptions/${userId}`,
      prescriptionDataStore,
      function(err, patch) {
        if (err) {
          console.log(err);
        } else {
          console.log(patch);
        }
      },
    );
  }

  function prescriptionStatus() {
    http.patch(
      `${config.VA_API_URL}/prescriptions/${userId}`,
      prescriptionData,
      function(err, patch) {
        if (err) {
          console.log(err);
        } else {
          console.log(patch);
        }
      },
    );
  }

  const addCredit = value => {
    setCreditList([...creditList, value]);
  };

  var totalPayment = selectPrice + 100;

  const doctor = telemedicine.data;

  const onApply = async () => {
    if (!credit) {
      Alert.alert('กรุณาเลือกบัตรเครดิตและวิธีการรับยา');
      return false;
    }
    setLoading(true);
    const payment = {
      provider: 'omise',
      payload: {
        card: credit.id,
        remember: true,
      },
    };
    onSubmit();
  };

  const onSubmit = async () => {
    try {
      changeStatus();
      prescriptionStatus();
    } catch (error) {
      return;
    } finally {
      afterSubmit();
      setLoading(false);
    }
  };

  const onClick = async () => {
    if (!credit) {
      Alert.alert('กรุณาเลือกบัตรเครดิตและวิธีการรับยา');
      return false;
    }
    setLoading(true);
    const payment = {
      provider: 'omise',
      payload: {
        card: credit.id,
        remember: true,
      },
    };
    onSubmitStore();
  };

  // const onDecline = () => {
  // 	Alert.alert(
  // 		'ยืนยันยกเลิกการปรึกษาแพทย์',
  // 		'หากคุณยกเลิกการจอง คุณต้องทำการจองใหม่ตั้งแต่ต้น',
  // 		[
  // 			{
  // 				text: 'ยกเลิก',
  // 				onPress: () => console.log('Cancle'),
  // 				style: 'cancel',
  // 			},
  // 			{
  // 				text: 'ตกลง',
  // 				onPress: () => navigation.navigate('PackageConsult')
  // 			},
  // 		],
  // 		{ cancelable: false },
  // 	);
  // }

  const onSubmitStore = async () => {
    try {
      changeStatus();
      prescriptionStatusStore();
    } catch (error) {
      return;
    } finally {
      afterSubmit();
      setLoading(false);
    }
  };

  const afterSubmit = async () => {
    navigation.navigate('MyBookingActivity');
  };

  const renderItem = (value, index) => {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => setCredit(value)}
      >
        <ItemRow key={index}>
          <Image
            style={{ width: 50, height: 30 }}
            source={getCreditIcon(value.brand)}
          />
          <Text semibold style={{ flex: 1, marginLeft: 25 }}>
            {value.last_digits}
          </Text>
          {_.includes(credit, value.id) && <Selete source={CheackIcon} />}
        </ItemRow>
      </TouchableHighlight>
    );
  };

  var userId = userTele.dataTele.userId || 1;
  console.log(userId);

  useEffect(() => {
    fetch(`${config.VA_API_URL}/Bookings/filterByPatientId?patientId=${userId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(data => {
        setData(data);
      });
  }, [setData]);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="ชำระเงินค่ายา"
        renderLeft={() => {
          return (
            <Icon
              name="chevron-left"
              size={20}
              color={BaseColor.primaryColor}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View>
          <PaymentAddModal
            isVisible={modalVisible}
            setModalVisible={() => setModalVisible(pre => !pre)}
            addCredit={addCredit}
          />
        </View>
        <Loading isVisible={loading} />
        <Fetch fetch={fetch} navigation={navigation}>
          {data => (
            <Container>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Total grayColor semibold>
                  ราคา
                </Total>
                <Text title1 bold blueColor>
                  {totalPayment} บาท
                </Text>
              </View>
              <Text
                title
                bold
                grayColor
                style={{ marginTop: 30, marginBottom: 5 }}
              >
                ช่องทางการชำระเงิน
              </Text>
              {creditList.map(renderItem)}
              <ButtonAdd
                ful
                styleText={{ color: BaseColor.blueColor, fontWeight: 'bold' }}
                onPress={() => setModalVisible(true)}
              >
                เพิ่มบัตรเครดิต
              </ButtonAdd>
            </Container>
          )}
        </Fetch>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 20,
            }}
          >
            <Text
              title
              bold
              grayColor
              style={{ marginTop: 30, marginBottom: 10 }}
            >
              ช่องทางการรับยา
            </Text>
          </View>
          <View
            style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}
          >
            <FlatList
              data={logistics}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectItem(item.name);
                    setSelectPrice(item.price);
                    setLogistic(item.id);
                  }}
                >
                  {item.name == selectItem ? (
                    <View style={{ height: 45 }}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 7,
                          borderColor: 'green',
                          alignItems: 'center',
                          padding: 10,
                        }}
                      >
                        <Text>{item.name}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{ height: 45 }}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 7,
                          borderColor: 'black',
                          alignItems: 'center',
                          padding: 10,
                        }}
                      >
                        <Text>{item.name}</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={{ padding: 15 }}>
          {logistic == 1 ? (
            <View style={{ marginBottom: 25 }}>
              <Text>ใส่สถานที่ที่ต้องการรับพัสดุ</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setAddress(text)}
                value={address}
              />
            </View>
          ) : (
            <View></View>
          )}
          {logistic == 2 ? (
            <Button
              full
              onPress={() => {
                onClick();
              }}
            >
              ชำระเงิน
            </Button>
          ) : (
            <Button
              full
              onPress={() => {
                onApply();
              }}
            >
              ชำระเงิน
            </Button>
          )}
        </View>
        {/* <View style={{ padding: 15 }}>
				   <Button full onPress={() => { onDecline() }}>ยกเลิกการปรึกษาแพทย์</Button>
				</View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    userTele: state.userTele,
    user: state.user,
  };
};

export default connect(mapStateToProps)(PharmacyPayment);
