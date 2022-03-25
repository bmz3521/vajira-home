import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';
import _ from 'lodash';
import { Header, SafeAreaView, Text, Icon, Button } from '@components';
import { BaseStyle, Images } from '@config';
import Fetch from '@components/Fetch';
import authClient from '@utils/authClient';
import CheackIcon from '@assets/images/check-circle-icon.png';
import { getAccessTeleToken } from '@utils/asyncStorage';
import Loading from '@components/Loading';
import { getCreditIcon } from '@utils/getValue';
import PaymentAddModal from './components/PaymentAddModal';
import DoctorCard from './components/DoctorCard';
import PatientCard from './components/DoctorCard/patient-card.js';
import moment from 'moment';
import config from '@_config';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card } from './components/DoctorCard/style';
import { Container, Image, Total, ItemRow, Selete } from './style';
import axios from 'axios';
import styles from './style';

const TelePayment = ({ navigation, route }) => {
  const telemedicine = useSelector(state => state.telemedicine);
  const [bookingId, setBookingId] = useState('');
  const [credit, setCredit] = useState();
  // const [modalVisible, setModalVisible] = useState(false);
  const [creditList, setCreditList] = useState([]);
  const [teleUserId, setTeleUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const [loadDataError, setLoadDataError] = useState(false);
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState();
  const [otherType, setOtherType] = useState('');
  const [otherTypeName, setOtherTypeName] = useState('');
  const user = useSelector(state => state.user);
  const [prescription, setPrescription] = useState(false);
  const [logistic, setLogistic] = useState();
  const [selectItem, setSelectItem] = useState();
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [storeName, setStoreName] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [iconsTop, setIcon] = useState([
    {
      icon: Images.delivery1,
      image: 'delivery1',
      name: 'รับยาทางไปรษณีย์',
      route: 'DeliveryOptions',
      notAuthenticated: 'PharmacyList',
    },
    {
      icon: Images.delivery2,
      image: 'delivery2',
      name: 'รับยาที่ร้านยาใกล้บ้าน',
      route: 'DeliveryOptions',
      notAuthenticated: 'PharmacyList',
    },
    {
      icon: Images.delivery3,
      image: 'delivery3',
      name: 'รับยาที่โรงพยาบาล',
      route: 'DeliveryOptions',
      notAuthenticated: 'PharmacyList',
    },
  ]);

  function easyHTTP() {
    this.http = new XMLHttpRequest();
  }

  const http = new easyHTTP();

  const logistics = [
    {
      name: 'รับยาที่ร้านยาคุณภาพ',
      price: 0,
      id: 1,
    },
    {
      name: 'รับยาที่บ้านทางไปรษณีย์',
      price: 0,
      id: 2,
    },
    {
      name: 'รับยาเองที่โรงพยาบาล',
      price: 0,
      id: 3,
    },
  ];

  const deliveryOptions = option => {
    var value;

    switch (option) {
      case 1:
        value = {
          key: 1,
          status: 'รับยาที่ร้านยาคุณภาพ',
          price: 100,
        };
        break;
      case 2:
        value = {
          key: 1,
          status: 'รับยาที่บ้านผ่านไปรษณีย์',
          price: 100,
        };
        break;
      case 3:
        value = {
          key: 1,
          status: 'รับยาที่โรงพยาบาลวชิรพยาบาล',
          price: 0,
        };
        break;
      default:
        break;
    }

    return value;
  };

  easyHTTP.prototype.post = function(url, data, callback) {
    this.http.open('POST', url, true);
    this.http.setRequestHeader('Content-type', 'application/json');

    let self = this;
    this.http.onload = function() {
      callback(null, self.http.responseText);
    };

    this.http.send(JSON.stringify(data));
  };

  const {
    description,
    duration,
    image,
    fullname,
    symptom,
    consultCaseType,
  } = telemedicine.data;

  let bookingChecked = 0;
  const pharmacyId = route.pharmacyId;

  // Create Data

  useEffect(() => {
    if (route.params && route.params.bookingId) {
      setBookingId(route.params.bookingId);
    }
  }, []);

  useEffect(() => {
    if (route.params.prescription) {
      setPrescription(route.params.prescription);
      if (route.params.prescription.logisticId) {
        setSelectItem(route.params.prescription.logisticId);
      } else if (route.params.logisticId) {
        setSelectItem(route.params.logisticId);
      }
    }
    if (route.params.store) setStoreName(route.params.store.name);
  }, [route.params.prescription, route.params.store]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${config.VA_API_URL}/Bookings/${bookingId}?filter[include]=doctor&filter[include]=prescription`,
        );
        setPrescription(data.prescription);
        if (data.prescription.logisticId) {
          setSelectItem(data.prescription.logisticId);
          if (data.prescription.logisticId == 1) {
            await fetchNameStore(data.prescription.pharmacyStoreId);
          }
        }
        setDoctor(data.doctor);
        setStatus(data.status);
        var date = moment(data.admitTime).format('Do MMM');
        var time = moment()
          .startOf('isoWeek')
          .add(data.bookingTime, 'minutes')
          .format('HH:mm');
        setDate(date);
        setTime(time);
        setLoadData(false);
      } catch (error) {
        setLoadData(false);
        setLoadDataError(true);
        console.log('error fetching user info', error);
      }
    };

    setOtherType(telemedicine?.data?.doctor?.roles[0]?.name || '');
    setOtherTypeName(telemedicine?.data?.doctor?.roles[0]?.description || '');
    if (bookingId) {
      fetchUser();
    }
  }, [bookingId]);

  const fetchNameStore = async storeId => {
    try {
      const { data } = await axios.get(
        `${config.VA_API_URL}/pharmacyStoreInfos/${storeId}`,
      );
      if (data) {
        setStoreName(data.name);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const addCredit = value => {
    setCreditList([...creditList, value]);
  };

  const onApply = async () => {
    setLoading(true);
    const { userId } = await getAccessTeleToken();
    await setTeleUserId(userId);
    const data = {
      description,
      duration,
      image,
      fullname,
      consultCaseType,
      patientConsultId: userId,
      doctorConsultId:
        doctor && doctor.id ? doctor.id : telemedicine.data.doctor.id,
    };
    afterSubmit();
  };

  const patchPrescription = async logisticId => {
    const {
      data,
    } = await axios.patch(
      `${config.VA_API_URL}/prescriptions/${prescription.id}`,
      { logisticId },
    );
    setPrescription(data);
  };

  const afterSubmit = async () => {
    setLoading(false);
    navigation.navigate('VideoCall', {
      bookingId: bookingId,
      otherType,
      otherTypeName,
    });
  };

  const renderLogistics = () => {
    return logistics.map(item => (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          if (item.id === 1) {
            navigation.navigate('Logistic', {
              prescription,
              logisticSelected: item,
              bookingId,
              logisticId: item.id,
            });
          } else if (item.id === 2) {
            navigation.navigate('Logistic', {
              prescription,
              logisticSelected: item,
              bookingId,
              logisticId: item.id,
            });
          } else {
            Alert.alert(
              'การจัดส่ง',
              'ต้องการรับยาเองที่โรงพยาบาลใช่หรือไม่',
              [
                {
                  text: 'ไม่ใช่',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'ใช่',
                  onPress: () => {
                    setSelectItem(item.id);
                    patchPrescription(item.id);
                  },
                },
              ],
              { cancelable: false },
            );
          }
        }}
      >
        {item.id === selectItem ? (
          <>
            <View style={styles.selectOptions}>
              <Text style={styles.selectOptionText}>{item.name}</Text>
            </View>
            {item.id === 1 && storeName ? (
              <Text style={{ marginLeft: 20, color: '#0A7C53' }}>
                <Text bold style={{ color: '#0A7C53' }}>
                  ชื่อร้าน:
                </Text>{' '}
                {storeName}
              </Text>
            ) : null}
          </>
        ) : (
          <View style={styles.options}>
            <Text style={styles.optionText}>{item.name}</Text>
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  if (loadData) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="โทรคุย"
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{}}>
            <ActivityIndicator size="large" color="0A7C53" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (loadDataError) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="โทรคุย"
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{}}>
            <Text>
              เกิดข้อผิดพลาด ไม่สามารถปรึกษา
              {otherTypeName
                ? otherTypeName
                : otherType === 'physiotherapist'
                ? 'นักกายภาพบำบัด'
                : otherType === 'nurse'
                ? 'พยาบาล'
                : 'แพทย์'}
              ได้ในขณะนี้
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const renderIconTop = () => {
    return (
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {iconsTop.map((icon, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate(icon.route, {
                  name: icon.name,
                  image: icon.image,
                })
              }
              style={styles.iconTopParent}
            >
              <ImageBackground
                source={icon.icon}
                style={styles.mainIconContainer}
              >
                <LinearGradient
                  colors={['#76C8AA', '#0A7C53', '#086C48']}
                  style={styles.mainGradient}
                >
                  <Text style={styles.mainTextContainer}>{icon.name}</Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title={`ปรึกษา${
          otherTypeName
            ? otherTypeName
            : otherType === 'physiotherapist'
            ? 'นักกายภาพบำบัด'
            : otherType === 'nurse'
            ? 'พยาบาล'
            : 'แพทย์'
        }`}
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {/* <PaymentAddModal
        isVisible={modalVisible}
        setModalVisible={() => setModalVisible(pre => !pre)}
        addCredit={addCredit}
      /> */}
      <Loading isVisible={loading} />
      <ScrollView scrollEventThrottle={8}>
        <Container>
          <View style={styles.patientContainer}>
            <PatientCard data={user} patientImage={user?.data?.HIEimage} />

            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>

            <View style={styles.makeRow}>
              <Icon name="calendar" style={styles.timeIcon} />

              <Text style={styles.timeText}>วันและเวลาที่นัดหมาย:</Text>
              {status && status == 'DOCTOR_CONFIRM' ? (
                <View style={styles.status}>
                  <View
                    style={[styles.statusIcon, { backgroundColor: '#1AB87B' }]}
                  />
                  <Text style={[styles.statusText, { color: '#00A83A' }]}>
                    ได้รับการอนุมัติ
                  </Text>
                </View>
              ) : null}
            </View>

            {date && time ? (
              <View style={styles.appointmentContainer}>
                <Text style={styles.appoitnmentText}>
                  วันที่ {date} เวลา {time} น.
                </Text>
              </View>
            ) : null}

            <View style={styles.makeRow}>
              <Icon name="notes-medical" style={styles.timeIcon} />
              <Text style={styles.timeText}>แผนก:</Text>
            </View>

            {doctor ? (
              <View style={styles.appointmentContainer}>
                <Text style={styles.appoitnmentText}>
                  {doctor && doctor.detail && doctor.detail.department}
                </Text>
              </View>
            ) : null}

            <View style={styles.makeRow}>
              <Icon name="map-marker-alt" style={styles.timeIcon} />
              <Text style={styles.timeText}>ห้องตรวจ:</Text>
            </View>

            <View style={styles.appointmentContainer}>
              <Text style={styles.appoitnmentText}>
                โทรเวชกรรมผ่าน VAJIRA@HOME
              </Text>
            </View>
          </View>

          <View style={styles.serviceContainer}>
            <View style={styles.makeRow}>
              <Icon name="list-alt" style={styles.serviceIcon} />
              <Text style={styles.serviceText}>ข้อมูลการรับบริการ</Text>
            </View>

            <DoctorCard
              otherType={otherType}
              otherTypeName={otherTypeName}
              data={telemedicine.data.doctor}
            />
            <View style={{ paddingBottom: 5 }} />
            {otherType === 'physiotherapist' || otherType === 'nurse' ? null : (
              <>
                <View
                  style={{
                    paddingTop: 15,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowOptions(prev => !prev);
                    }}
                  >
                    <View style={styles.containerFAQ}>
                      <Text
                        style={{
                          fontSize: 16,
                          flex: 1,
                          fontWeight: 'bold',
                          color: '#333',
                        }}
                      >
                        อ่านรายละเอียดการรับยา
                      </Text>
                      <MaterialIcons
                        name={showOptions ? 'expand-less' : 'expand-more'}
                        size={24}
                      />
                    </View>
                  </TouchableOpacity>
                  {showOptions && renderIconTop()}
                </View>

                <Card>
                  <View style={styles.makeRow}>
                    <Icon name="pills" style={styles.timeIcon} />
                    <Text style={styles.timeText}>ช่องทางการรับยา</Text>
                  </View>
                  {renderLogistics()}
                </Card>
                <View style={{ padding: 15 }}>
                  <View>
                    {logistic == 2 ? (
                      <View style={{ marginBottom: 10 }}>
                        <Text>ใส่สถานที่ที่ต้องการรับพัสดุ</Text>
                        <TextInput
                          style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                          }}
                          onChangeText={text => setAddress(text)}
                          value={address}
                        />
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>
              </>
            )}
          </View>
        </Container>
      </ScrollView>
      {otherType !== 'physiotherapist' &&
        otherType !== 'nurse' &&
        prescription &&
        (prescription.address ||
          prescription.pharmacyStoreId ||
          prescription.logisticId) && (
          <View style={styles.readyToCallContainer}>
            <View style={styles.readyToCallRow}>
              <Total grayColor semibold>
                รวม
              </Total>
              <Text title3 bold>
                ช่วงทดสอบไม่มีค่าใช้จ่าย
              </Text>
            </View>
            <LinearGradient
              style={{
                height: 50,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={['#0A905F', '#095C3E']}
            >
              <TouchableOpacity
                underlayColor="grey"
                style={{ width: '100%', alignItems: 'center' }}
                onPress={onApply}
              >
                <View style={styles.callContainer}>
                  <Icon name="video" style={styles.callIcon} />
                  <Text style={styles.callText}>
                    โทรคุยกับ
                    {otherTypeName
                      ? otherTypeName
                      : otherType === 'physiotherapist'
                      ? 'นักกายภาพบำบัด'
                      : otherType === 'nurse'
                      ? 'พยาบาล'
                      : 'แพทย์'}
                  </Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      {(otherType === 'physiotherapist' || otherType === 'nurse') && (
        <View style={styles.readyToCallContainer}>
          <View style={styles.readyToCallRow}>
            <Total grayColor semibold>
              รวม
            </Total>
            <Text title3 bold>
              ช่วงทดสอบไม่มีค่าใช้จ่าย
            </Text>
          </View>
          <LinearGradient
            style={{
              height: 50,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            colors={['#0A905F', '#095C3E']}
          >
            <TouchableOpacity
              underlayColor="grey"
              style={{ width: '100%', alignItems: 'center' }}
              onPress={onApply}
            >
              <View style={styles.callContainer}>
                <Icon name="video" style={styles.callIcon} />
                <Text style={styles.callText}>
                  โทรคุยกับ
                  {otherTypeName
                    ? otherTypeName
                    : otherType === 'physiotherapist'
                    ? 'นักกายภาพบำบัด'
                    : otherType === 'nurse'
                    ? 'พยาบาล'
                    : 'แพทย์'}
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    userTele: state.userTele,
    user: state.user,
  };
};

export default connect(mapStateToProps)(TelePayment);
