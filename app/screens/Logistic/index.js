import React, { useEffect, useState, Fragment } from 'react';
import * as yup from 'yup';
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Picker,
  TextInput,
  Platform,
  Image,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import { Header, SafeAreaView, Text, Icon, Button } from '@components';
import { Field, Form, Formik, FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { BaseStyle, BaseColor } from '@config';
import { Container } from './style';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import config from '@_config';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import raw from '../../assets/raw_database.json';
import { uniq } from 'lodash';
import StoreDetail from './components/StoreDetail';

const Logistic = ({ navigation, route }) => {
  const user = useSelector(state => state.user);
  const uniqRaw = uniq(raw.map(r => r.province));
  const [provinces, setProvinces] = useState(uniqRaw);
  const [mobileNumber, setMobileNumber] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newAmphoe, setNewAmphoe] = useState('');
  const [newDistrict, setNewDistrict] = useState('');
  const [newProvince, setNewProvince] = useState('');
  const [newPostalCode, setNewPostalCode] = useState(false);
  const [note, setNote] = useState('');
  const [areas, setAreas] = useState(false);
  const [districts, setDistricts] = useState(false);
  const [selectList, setSelectList] = useState(false);
  const [address, setAddress] = useState(false);
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState();
  const [pharmacyStoreId, setPharmacyStoreId] = useState(false);
  const [modal, setModal] = useState(false);
  const {
    logisticSelected,
    bookingId,
    prescription,
    logisticId,
  } = route.params;
  let userAddress;
  if (!!user.data?.userInformation?.address?.address) {
    let info = user.data.userInformation.address;
    userAddress = `${info.address} ${info.address2} ${info.area} ${info.province} ${info.postalCode}`;
  }

  useEffect(() => {
    console.log('ADDRESS', address);
    console.log('NEWADDRESS', newAddress);
  }, [address, newAddress]);

  useEffect(() => {
    const fetchPharmacyStore = async () => {
      const { data } = await axios.get(
        `${config.VA_API_URL}/pharmacyStoreInfos`,
      );
      setStores(data);
    };
    if (logisticId === 1) {
      fetchPharmacyStore();
    }
  }, [logisticId]);

  const onChangeProvince = value => {
    let filterProvinces = raw.filter(r => r.province === value);
    let uniqAmphoes = uniq(
      filterProvinces.map(filterProvince => filterProvince.amphoe),
    );
    setAreas(uniqAmphoes);
    setNewAmphoe(uniqAmphoes[0]);
    onChangeArea(uniqAmphoes[0]);
  };

  const onChangeArea = value => {
    let filterAreas = raw.filter(r => r.amphoe === value);
    let uniqDistricts = uniq(
      filterAreas.map(filterArea => filterArea.district),
    );
    setDistricts(uniqDistricts);
    setNewDistrict(uniqDistricts[0]);
    onChangeDistrict(uniqDistricts[0]);
  };

  const onChangeDistrict = value => {
    let filterDistricts = raw.filter(r => r.district === value);
    let uniqZipcodes = uniq(
      filterDistricts.map(filterDistrict => filterDistrict.zipcode),
    );
    setNewPostalCode(uniqZipcodes[0].toString());
    setNewPostalCode(uniqZipcodes[0].toString());
  };

  const patchPrescription = async () => {
    let detail = {};
    let validateMobileNumber = mobileNumber;
    if (!!!mobileNumber) {
      validateMobileNumber = user.data?.userInformation?.mobileNumber;
    }
    if (logisticId === 1) {
      detail = {
        address,
        logisticId,
        pharmacyStoreId,
        mobileNumber: validateMobileNumber,
      };
    } else if (logisticId === 2) {
      let filterAddress;
      if (selectList === 1) {
        filterAddress = userAddress;
      } else {
        filterAddress = `${newAddress} ${newDistrict} ${newAmphoe} ${newProvince} ${newPostalCode}`;
      }
      detail = {
        address: filterAddress,
        logisticId,
        mobileNumber: validateMobileNumber,
        note: note,
      };
    }
    const { data } = await axios.patch(
      `${config.VA_API_URL}/prescriptions/${prescription.id}`,
      detail,
    );
    if (data) {
      navigation.navigate('TelePayment', {
        prescription: data,
        logisticId,
        store,
      });
    }
  };

  const onSelectedStore = store => {
    setModal(false);
    setPharmacyStoreId(store.id);
    setAddress(store.address);
    setSelectList(store.id);
  };

  if (logisticId === 1) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title={logisticId === 1 ? 'ร้านยาคุณภาพ' : 'เลือกที่อยู่ในการจัดส่ง'}
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        {address ||
        (newAddress &&
          newDistrict &&
          newAmphoe &&
          newProvince &&
          newPostalCode) ? (
          <LinearGradient
            style={{
              height: 50,
              margin: 15,
              borderRadius: 20,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            colors={['#0A905F', '#095C3E']}
          >
            <TouchableOpacity
              underlayColor="grey"
              style={{ width: '100%', alignItems: 'center' }}
              onPress={patchPrescription}
            >
              <Text style={styles.continue}>บันทึก</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : null}
        <FlatList
          data={stores}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: store }) => (
            <TouchableOpacity
              pressDuration={0.1}
              onPress={() => {
                setStore(store);
                setModal(true);
              }}
            >
              <View
                style={[
                  styles.card,
                  selectList === store.id
                    ? { borderColor: '#0A7C53', borderWidth: 4 }
                    : null,
                ]}
              >
                {store?.image ? (
                  <Image
                    source={{ uri: store.image }}
                    style={styles.illustration}
                  />
                ) : (
                  <View style={styles.illustration} />
                )}

                <View style={styles.contentContainer}>
                  <Text style={styles.contentTitle}>{store.name}</Text>
                  <View style={styles.makeRow}>
                    <Icon name="calendar" style={styles.titleIcon} />
                    <Text style={styles.contentDetail}>
                      {store.detail?.time || ''}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {modal && (
          <StoreDetail
            modal={modal}
            store={store}
            onSelectedStore={onSelectedStore}
          />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : ''}
        style={{ flex: 1 }}
      >
        <Header
          title={logisticId === 1 ? 'ร้านยาคุณภาพ' : 'เลือกที่อยู่ในการจัดส่ง'}
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
          renderLeft={() => {
            return <Icon name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        <ScrollView>
          <Container>
            <View>
              <View style={{ marginHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    setAddress(userAddress);
                    setSelectList(1);
                  }}
                >
                  {selectList === 1 ? (
                    <View style={{ height: 85 }}>
                      <View
                        style={{
                          borderWidth: 3,
                          borderRadius: 12,
                          borderColor: 'green',
                          alignItems: 'center',
                          padding: 20,
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>{userAddress}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{ height: 85 }}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 12,
                          borderColor: 'black',
                          alignItems: 'center',
                          padding: 20,
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>
                          ที่อยู่ที่ใช้ในการสมัคร
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSelectList(2);
                    setAddress(false);
                  }}
                >
                  {selectList === 2 ? (
                    <View style={{ height: 85 }}>
                      <View
                        style={{
                          borderWidth: 3,
                          borderRadius: 12,
                          borderColor: 'green',
                          alignItems: 'center',
                          padding: 20,
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>ที่อยู่อื่น</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={{ height: 85 }}>
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 12,
                          borderColor: 'black',
                          alignItems: 'center',
                          padding: 20,
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>ที่อยู่อื่น</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>

                {selectList === 2 && (
                  <View>
                    <View style={{ marginBottom: 10 }}>
                      <View style={{ marginBottom: 10 }}>
                        <Text style={styles.addressInput}>เบอร์ติดต่อ</Text>
                        <TextInput
                          style={{
                            height: 50,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 12,
                            padding: 10,
                          }}
                          onChangeText={text => setMobileNumber(text)}
                          value={mobileNumber}
                        />
                      </View>
                      <View style={{ marginBottom: 10 }}>
                        <Text style={styles.addressInput}>ที่อยู่</Text>
                        <TextInput
                          style={{
                            height: 50,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 12,
                            padding: 10,
                          }}
                          onChangeText={text => setNewAddress(text)}
                          value={newAddress}
                        />
                      </View>
                      {provinces ? (
                        <View style={{ marginBottom: 10 }}>
                          <Text style={styles.addressInput}>จังหวัด</Text>
                          <View
                            style={[
                              Platform.OS === 'android'
                                ? styles.pickerContainer
                                : {},
                            ]}
                          >
                            <Picker
                              selectedValue={newProvince}
                              style={[
                                Platform.OS === 'android'
                                  ? { width: '100%' }
                                  : { height: 200, width: '70%' },
                              ]}
                              onValueChange={(itemValue, itemIndex) => {
                                setNewProvince(itemValue);
                                onChangeProvince(itemValue);
                              }}
                            >
                              {provinces.map(province => (
                                <Picker.Item
                                  key={province}
                                  label={province}
                                  value={province}
                                />
                              ))}
                            </Picker>
                          </View>
                        </View>
                      ) : null}
                      {areas ? (
                        <View style={{ marginBottom: 10 }}>
                          <Text style={styles.addressInput}>เขต / อำเภอ</Text>
                          <View
                            style={[
                              Platform.OS === 'android'
                                ? styles.pickerContainer
                                : {},
                            ]}
                          >
                            <Picker
                              selectedValue={newAmphoe}
                              style={[
                                Platform.OS === 'android'
                                  ? { width: '100%' }
                                  : { height: 200, width: '70%' },
                              ]}
                              onValueChange={(itemValue, itemIndex) => {
                                setNewAmphoe(itemValue);
                                onChangeArea(itemValue);
                              }}
                            >
                              {areas.map(area => (
                                <Picker.Item
                                  key={area}
                                  label={area}
                                  value={area}
                                />
                              ))}
                            </Picker>
                          </View>
                        </View>
                      ) : null}
                      {districts ? (
                        <View style={{ marginBottom: 10 }}>
                          <Text style={styles.addressInput}>แขวง / ตำบล</Text>
                          <View
                            style={[
                              Platform.OS === 'android'
                                ? styles.pickerContainer
                                : {},
                            ]}
                          >
                            <Picker
                              selectedValue={newDistrict}
                              style={[
                                Platform.OS === 'android'
                                  ? { width: '100%' }
                                  : { height: 200, width: '70%' },
                              ]}
                              onValueChange={(itemValue, itemIndex) => {
                                setNewDistrict(itemValue);
                                onChangeDistrict(itemValue);
                              }}
                            >
                              {districts.map(district => (
                                <Picker.Item
                                  key={district}
                                  label={district}
                                  value={district}
                                />
                              ))}
                            </Picker>
                          </View>
                        </View>
                      ) : null}
                      {newPostalCode ? (
                        <View style={{ marginBottom: 10 }}>
                          <Text style={styles.addressInput}>รหัสไปรษณีย์</Text>
                          <TextInput
                            defaultValue={newPostalCode}
                            style={{
                              height: 50,
                              width: '100%',
                              fontSize: 16,
                              paddingHorizontal: 10,
                              ...styles.pickerContainer,
                            }}
                            onChange={text => setNewPostalCode(text)}
                          />
                        </View>
                      ) : null}
                      <View style={{ marginBottom: 10 }}>
                        <Text style={styles.addressInput}>
                          หมายเหตุ (ไม่จำเป็นต้องระบุ)
                        </Text>
                        <TextInput
                          defaultValue=""
                          style={{
                            height: 50,
                            padding: 10,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 12,
                          }}
                          onChangeText={text => setNote(text)}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {address ||
              (newAddress &&
                newDistrict &&
                newAmphoe &&
                newProvince &&
                newPostalCode) ? (
                <LinearGradient
                  style={{
                    height: 50,
                    margin: 15,
                    borderRadius: 20,
                    marginBottom: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  colors={['#0A905F', '#095C3E']}
                >
                  <TouchableOpacity
                    underlayColor="grey"
                    style={{ width: '100%', alignItems: 'center' }}
                    onPress={patchPrescription}
                  >
                    <Text style={styles.continue}>บันทึก</Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : null}
            </View>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Logistic;
