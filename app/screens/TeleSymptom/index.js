import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import Loading from './loading';
import config from '@_config';
import {
  Header,
  SafeAreaView,
  Text,
  Icon,
  Button,
  EventCard,
} from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { TelemedicineActions } from '@actions';
import authClient from '@utils/authClient';
import Fetch from '@components/Fetch';
import UploadImageRow from './components/UploadImageRow';
import Slider from './components/Slider';
import Dropdown from './components/Dropdown';
import styles, { Container, TextArea } from './style';

const TeleSymptom = ({ navigation }) => {
  const [symptom, setSymptom] = useState();
  const [description, setDescription] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [duration, setDuration] = useState(1);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const [doctorTypes, setDoctorTypes] = useState();
  const [otherTypes, setOtherTypes] = useState();

  const [loading, setLoading] = useState(true);

  const renderIconTop = () => {
    const iconsTop = [
      {
        icon: Images.homeicon6,
        name: 'สั่งยา',
        route: 'TelePharmacist',
        notAuthenticated: 'TelePharmacist',
      },
      {
        icon: Images.homeicon7,
        name: 'คุยกับหมอ',
        route: 'TeleSymptom',
        notAuthenticated: 'TeleSymptom',
      },
    ];
    // navigation.navigate('SignIn2');
    iconsTop.map((icon, i) => {
      return (
        <TouchableOpacity
          key={i}
          // style={{ alignItems: "center" }}
          activeOpacity={0.9}
          onPress={() => this.routeAuth(icon)}
          style={styles.iconTopParent}
        >
          <View>
            <Image
              source={icon.icon}
              // color={BaseColor.primaryColor}
              // solid
              style={{ width: 60, height: 60, marginBottom: 10 }}
            />
          </View>
          <Text style={{ color: 'black' }} caption1 grayColor>
            {icon.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  // const fetch = async () => {
  //   const res = await newClient.client
  //     .get('/DoctorTypes')
  //     .then(res => res.data);
  //   console.log('test new route ');
  //   return res;
  // };

  // const fetchDoctor = async () => {
  //   const resSpecialities = await authClient.client
  //     .get('/DoctorTypes')
  //     .then(res => res.data);

  //   console.log('resSpecialities');
  //   console.log(resSpecialities);

  //   const resSymptom = await authClient.client
  //     .get('/Symptoms')
  //     .then(res => res.data);
  //   console.log('resSymptom');
  //   console.log(resSymptom);

  //   const res = {
  //     resSpecialities: resSpecialities,
  //     resSymptom: resSymptom,
  //   };
  //   console.log('res');
  //   console.log(res);

  //   return res;
  // };

  useEffect(() => {
    axios
      .get(`${config.VA_API_URL}/doctorTypes`)
      .then(response => {
        console.log('getting doctorTypes', response.data);
        setLoading(false);
        setDoctorTypes(response.data);
      }, 1000)
      .catch(error => {
        console.log('error fetching doctorTypes', error);
      });

    axios
      .get(`${config.VA_API_URL}/OtherTypes`)
      .then(response => {
        console.log('getting other types', response.data);
        setLoading(false);
        setOtherTypes(response.data);
      }, 1000)
      .catch(error => {
        console.log('error fetching otherTypes', error);
      });
  }, [setDoctorTypes]);

  const onApply = value => {
    // setSymptom(value);
    console.log('value');
    console.log(value);

    const data = {
      symptom: value,
    };
    dispatch(TelemedicineActions.setTelemedicine(data));
    navigation.navigate('TeleDoctor');
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="ปรึกษาแพทย์"
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {loading ? (
        <View style={{ alignItems: 'center', marginTop: 355 }}>
          <Loading></Loading>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
            scrollEventThrottle={8}
          >
            {/* <View
              style={{
                alignContent: 'center',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {renderIconTop()}
            </View> */}
            <Dropdown
              options={doctorTypes}
              options2={otherTypes}
              onSelect={value => onApply(value)}
              // selects={symptom}
            />
          </ScrollView>
        </View>
      )}

      {/* <Fetch fetch={fetchDoctor} checkAuth>
        {data => (
          <View style={{ flex: 1 }}>
            <ScrollView scrollEnabled={scrollEnabled} scrollEventThrottle={8}>
              <Dropdown
                options={data}
                onSelect={value => onApply(value)}
                selects={symptom}
              />
            </ScrollView>
          </View>
        )}
      </Fetch> */}
    </SafeAreaView>
  );
};

export default TeleSymptom;
