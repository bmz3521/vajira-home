import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { BaseColor, useTheme, useFont, Images } from '@config';
import { useTranslation } from 'react-i18next';
import { Icon, Image } from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
/* Stack Screen */

/* Bottom Screen */
import Survey from '@screens/Survey';
import PostSurvey from '@screens/PostSurvey';
// import Booking from '@screens/Booking';
import Doctor from '@screens/Doctor';
/* Modal Screen only affect iOS */
/* Stack Screen */
import Home from '@screens/Home';
import HomeDoctor from '@screens/HomeDoctor';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import HealthMonitorDashboard from '@screens/HealthMonitorDashboard';
import HealthActivity from '@screens/HealthActivity';
import EmergencyBeacon from '@screens/EmergencyBeacon';
import Profile from '@screens/Profile';
import Messenger from '@screens/Messenger';
import Review from '@screens/Review';
import Feedback from '@screens/Feedback';
import Messages from '@screens/Messages';
import AppointmentList from '@screens/AppointmentList';
import AppointmentDetail from '@screens/AppointmentDetail';
import DocumentDisplay from '@screens/DocumentDisplay';
import Notification from '@screens/Notification';
import Notifications from '@screens/Notifications';
import Walkthrough from '@screens/Walkthrough';
import SignUp from '@screens/SignUp';
import SignIn from '@screens/SignIn';
import ResetPassword from '@screens/ResetPassword';
import ChangePassword from '@screens/ChangePassword';
import PaymentPayouts from '@screens/PaymentPayouts';
import ChangeLanguage from '@screens/ChangeLanguage';
import Currency from '@screens/Currency';
import Coupons from '@screens/Coupons';
import ContactUs from '@screens/ContactUs';
import PreviewBooking from '@screens/PreviewBooking';
import PricingTable from '@screens/PricingTable';
import PricingTableIcon from '@screens/PricingTableIcon';
import BookingDetail from '@screens/BookingDetail';
import PostDetail from '@screens/PostDetail';
import Post from '@screens/Post';
import BookingHistory from '@screens/Booking';
import PatientHIEBookingHistory from '@screens/PatientHIEBookingHistory';
import PatientHIEBookingDetail from '@screens/PatientHIEBookingDetail';
import PackageDetail from '@screens/PackageDetail';
import PharmacyList from '@screens/PharmacyList';
import DoctorDetail from '@screens/DoctorDetail';
import AboutUs from '@screens/AboutUs';
import OurService from '@screens/OurService';
import FlightSearch from '@screens/FlightSearch';
import SelectFlight from '@screens/SelectFlight';
import FlightResult from '@screens/FlightResult';
import FlightSummary from '@screens/FlightSummary';
import FlightTicket from '@screens/FlightTicket';
import CruiseSearch from '@screens/CruiseSearch';
import Cruise from '@screens/Cruise';
import CruiseDetail from '@screens/CruiseDetail';
import Medication from '@screens/Medication';
import Allergy from '@screens/Allergy';
import InfoPermission from '@screens/InfoPermission';
import CompletePage from '@screens/CompletePage';
import SelectProcedure from '@screens/SelectProcedure';
import SelectTreatmentTimeSlot from '@screens/SelectTreatmentTimeSlot';
import MedicalQueryForm from '@screens/MedicalQueryForm';
import BookingOverview from '@screens/BookingOverview';
import BookingLoading from '@screens/BookingLoading';
import MyBookings from '@screens/MyBookings';
import MyBookingsUI from '@screens/MyBookingsUI';
import MyBookingActivity from '@screens/MyBookingActivity';
import MyHealthHistory from '@screens/MyHealthHistory';
import MyBookingDetail from '@screens/MyBookingDetail';
import AmenityList from '@screens/AmenityList';
import ReviewList from '@screens/ReviewList';
import ChatMessenger from '@screens/ChatMessenger';
import travelforHealth from '@screens/travelforHealth';
import ListYourSpace from '@screens/ListYourSpace';
import InviteFriends from '@screens/InviteFriends';
import ReferaHost from '@screens/ReferaHost';
import SafetyCenter from '@screens/SafetyCenter';
import ContactSupport from '@screens/ContactSupport';
import GetHelp from '@screens/GetHelp';
import GiveUsFeedback from '@screens/GiveUsFeedback';
import TermsofService from '@screens/TermsofService';
import SwitchAccount from '@screens/SwitchAccount';
import SignIn2 from '@screens/SignIn2';
import Telemedicine from '@screens/Telemedicine';
import TelePayment from '@screens/TelePayment';
import TeleSymptom from '@screens/TeleSymptom';
import ChatbotLanding from '@screens/ChatbotLanding';
import Chatbot1 from '@screens/Chatbot1';
import Chatbot2 from '@screens/Chatbot2';
import DeliveryOptions from '@screens/DeliveryOptions';
import FaqMain from '@screens/FaqMain';
import TeleDoctor from '@screens/TeleDoctor';
import TeleDoctorProfile from '@screens/TeleDoctorProfile';
import TelePharmacyProfile from '@screens/TelePharmacyProfile';
import Telepending from '@screens/Telepending';
import Telechat from '@screens/Telechat';
import Teleincoming from '@screens/Teleincoming';
import VideoCall from '@screens/VideoCall';
import Appointment from '@screens/Appointment';
import PackageConsult from '@screens/PackageConsult';
import TelePharmacist from '@screens/TelePharmacist';
import News from '@screens/News';
import NewsDetail from '@screens/NewsDetail';
import Logistic from '@screens/Logistic';
import Prescription from '@screens/Prescription';
import SettingInfo from '@screens/SettingInfo';
import MonitorAddGlucose from '@screens/MonitorAddGlucose';
import MonitorConnect from '@screens/MonitorConnect';
import KnowledgeVideo from '@screens/KnowledgeVideo';
// import UserRegistation from '@screens/UserRegistation';

// HealthSync
import CheckPasswordOtp from '../screens/CheckPasswordOtp';
import EmailAdressScreen from '../screens/EmailAdress/EmailAdressScreen';
import FingerPrintScreen from '../screens/FingerPrint/FingerPrintScreen';
import PasswordScreen from '../screens/Password/PasswordScreen';
import HelpScreen from '../screens/Help/HelpScreen';
import GenderScreen from '../screens/Gender/GenderScreen';
import InterestsScreen from '../screens/Interests/InterestsScreen';
import WaterScreen from '../screens/Water/WaterScreen';
import CommuityScreen from '../screens/Community/CommunityScreen';
import CommentScreen from '../screens/Comment/CommentScreen';
import CreatePostScreen from '../screens/CreatePost/CreatePostScreen';
import CreateCommentScreen from '../screens/CreateComment/CreateCommentScreen';
import GoalAchievedScreen from '../screens/GoalAchieved/GoalAchievedScreen';
import NutritionScreen from '../screens/Nutrition/NutritionScreen';
import StepsScreen from '../screens/Steps/StepsScreen';
import PremiumScreen from '../screens/Premium/PremiumScreen';
import UserRegistation from '@screens/UserRegistation';
import UserRegistrationFail from '@screens/UserRegistation/UserRegistrationFail.js';
import UserRegistrationCompliance from '@screens/UserRegistrationCompliance';
import SecondStep from '@screens/UserRegistrationCompliance/SecondStep.js';
import ThirdStep from '@screens/UserRegistrationCompliance/ThirdStep.js';
import FourthStep from '@screens/UserRegistrationCompliance/FourthStep.js';
import PharmacyPayment from '@screens/PharmacyPayment';
import PreAssessment from '@screens/PreAssessment';
import PostAssessment from '@screens/PostAssessment';
import PharmacyAppointment from '@screens/PharmacyAppointment';
import MonitorBloodGlucose from '@screens/MonitorBloodGlucose';
import MonitorBloodPressure from '@screens/MonitorBloodPressure';
import MonitorWeight from '@screens/MonitorWeight';
import MonitorTemperature from '@screens/MonitorTemperature';
import MonitorOxygen from '@screens/MonitorOxygen';
import MonitorFullList from '@screens/MonitorFullList';
import MonitorAddData from '@screens/MonitorAddData';
import MonitorDrugCompliance1 from '@screens/MonitorDrugCompliance1';
import MonitorDrugCompliance2 from '@screens/MonitorDrugCompliance2';
import MonitorDrugCompliance3 from '@screens/MonitorDrugCompliance3';
import MonitorDrugCompliance4 from '@screens/MonitorDrugCompliance4';

import SetTime from '@screens/SetTime';
import WaitingScreen from '@screens/WaitingScreen';

import ModalAddDataScreen from '@screens/ModalMeal/ModalAddDataScreen.js';
import TestCall from '@screens/TestCall';
const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Main() {
  const typeOfUser = useSelector(state => state.auth.typeUser);
  // const [typeOfUser, setTypeOfUser] = useState(type);
  // getUserType().then(response => setTypeOfUser(response));
  // console.log('fffffffeeeeee---------- -----',typeOfUser)
  return typeOfUser !== 'DOCTOR' ? (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="BottomTabNavigator"
    >
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <MainStack.Screen name="Doctor" component={Doctor} />
      <MainStack.Screen name="Logistic" component={Logistic} />

      <MainStack.Screen
        name="HealthMonitorDashboard"
        component={HealthMonitorDashboard}
      />
      <MainStack.Screen name="HealthActivity" component={HealthActivity} />

      <MainStack.Screen name="EmergencyBeacon" component={EmergencyBeacon} />
      <MainStack.Screen name="Profile" component={Profile} />

      <MainStack.Screen name="Messenger" component={Messenger} />
      <MainStack.Screen name="Review" component={Review} />
      <MainStack.Screen name="Feedback" component={Feedback} />
      <MainStack.Screen name="Messages" component={Messages} />
      <MainStack.Screen name="AppointmentList" component={AppointmentList} />
      <MainStack.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
      />
      <MainStack.Screen name="DocumentDisplay" component={DocumentDisplay} />
      <MainStack.Screen name="Notification" component={Notification} />
      <MainStack.Screen name="Notifications" component={Notifications} />
      <MainStack.Screen name="Walkthrough" component={Walkthrough} />
      <MainStack.Screen name="SignUp" component={SignUp} />
      <MainStack.Screen name="SignIn" component={SignIn} />
      <MainStack.Screen name="ResetPassword" component={ResetPassword} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="CheckPasswordOtp" component={CheckPasswordOtp} />
      <MainStack.Screen name="PaymentPayouts" component={PaymentPayouts} />
      <MainStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <MainStack.Screen name="Currency" component={Currency} />
      <MainStack.Screen name="Coupons" component={Coupons} />
      <MainStack.Screen name="ContactUs" component={ContactUs} />
      {/* <MainStack.Screen name="Booking" component={Booking} />   */}
      <MainStack.Screen name="PreviewBooking" component={PreviewBooking} />
      <MainStack.Screen name="PricingTable" component={PricingTable} />
      <MainStack.Screen name="PricingTableIcon" component={PricingTableIcon} />
      <MainStack.Screen name="BookingDetail" component={BookingDetail} />
      <MainStack.Screen name="PostDetail" component={PostDetail} />
      <MainStack.Screen
        name="PatientHIEBookingHistory"
        component={PatientHIEBookingHistory}
      />
      <MainStack.Screen
        name="PatientHIEBookingDetail"
        component={PatientHIEBookingDetail}
      />
      <MainStack.Screen name="PackageDetail" component={PackageDetail} />
      <MainStack.Screen name="PharmacyList" component={PharmacyList} />
      <MainStack.Screen name="DoctorDetail" component={DoctorDetail} />
      <MainStack.Screen name="AboutUs" component={AboutUs} />
      <MainStack.Screen name="OurService" component={OurService} />
      <MainStack.Screen name="FlightSearch" component={FlightSearch} />
      <MainStack.Screen name="SelectFlight" component={SelectFlight} />
      <MainStack.Screen name="FlightResult" component={FlightResult} />
      <MainStack.Screen name="FlightSummary" component={FlightSummary} />
      <MainStack.Screen name="FlightTicket" component={FlightTicket} />
      <MainStack.Screen name="CruiseSearch" component={CruiseSearch} />
      <MainStack.Screen name="Cruise" component={Cruise} />
      <MainStack.Screen name="CruiseDetail" component={CruiseDetail} />
      <MainStack.Screen name="Medication" component={Medication} />
      <MainStack.Screen name="Allergy" component={Allergy} />
      <MainStack.Screen name="InfoPermission" component={InfoPermission} />
      <MainStack.Screen name="CompletePage" component={CompletePage} />
      <MainStack.Screen name="SelectProcedure" component={SelectProcedure} />
      <MainStack.Screen
        name="SelectTreatmentTimeSlot"
        component={SelectTreatmentTimeSlot}
      />
      <MainStack.Screen name="MedicalQueryForm" component={MedicalQueryForm} />
      <MainStack.Screen name="BookingOverview" component={BookingOverview} />
      <MainStack.Screen name="BookingLoading" component={BookingLoading} />
      <MainStack.Screen name="MyBookings" component={MyBookings} />
      <MainStack.Screen name="MyBookingsUI" component={MyBookingsUI} />
      <MainStack.Screen
        name="MyBookingActivity"
        component={MyBookingActivity}
      />
      <MainStack.Screen name="KnowledgeVideo" component={KnowledgeVideo} />
      <MainStack.Screen name="MyHealthHistory" component={MyHealthHistory} />
      <MainStack.Screen name="MyBookingDetail" component={MyBookingDetail} />
      <MainStack.Screen name="AmenityList" component={AmenityList} />
      <MainStack.Screen name="ReviewList" component={ReviewList} />
      {/* <MainStack.Screen name="ChatMessages" component={ChatMessages} />
			<MainStack.Screen name="ChatMessenger" component={ChatMessenger} /> */}
      <MainStack.Screen name="travelforHealth" component={travelforHealth} />
      <MainStack.Screen name="Prescription" component={Prescription} />
      <MainStack.Screen name="ListYourSpace" component={ListYourSpace} />
      <MainStack.Screen name="InviteFriends" component={InviteFriends} />
      <MainStack.Screen name="ReferaHost" component={ReferaHost} />
      <MainStack.Screen name="SafetyCenter" component={SafetyCenter} />
      <MainStack.Screen name="ContactSupport" component={ContactSupport} />
      <MainStack.Screen name="GetHelp" component={GetHelp} />
      <MainStack.Screen name="GiveUsFeedback" component={GiveUsFeedback} />
      <MainStack.Screen name="TermsofService" component={TermsofService} />
      <MainStack.Screen name="SwitchAccount" component={SwitchAccount} />
      <MainStack.Screen name="SignIn2" component={SignIn2} />
      <MainStack.Screen name="Telemedicine" component={Telemedicine} />
      <MainStack.Screen name="TelePayment" component={TelePayment} />
      <MainStack.Screen name="TeleSymptom" component={TeleSymptom} />
      <MainStack.Screen name="TeleDoctor" component={TeleDoctor} />
      <MainStack.Screen name="ChatbotLanding" component={ChatbotLanding} />
      <MainStack.Screen name="Chatbot1" component={Chatbot1} />
      <MainStack.Screen name="Chatbot2" component={Chatbot2} />

      <MainStack.Screen name="DeliveryOptions" component={DeliveryOptions} />
      <MainStack.Screen name="FaqMain" component={FaqMain} />
      <MainStack.Screen
        name="TeleDoctorProfile"
        component={TeleDoctorProfile}
      />
      <MainStack.Screen
        name="TelePharmacyProfile"
        component={TelePharmacyProfile}
      />
      <MainStack.Screen name="Telepending" component={Telepending} />
      <MainStack.Screen name="Telechat" component={Telechat} />
      <MainStack.Screen name="Teleincoming" component={Teleincoming} />
      <MainStack.Screen name="VideoCall" component={VideoCall} />
      <MainStack.Screen name="Appointment" component={Appointment} />
      <MainStack.Screen name="PackageConsult" component={PackageConsult} />
      <MainStack.Screen name="TelePharmacist" component={TelePharmacist} />

      <MainStack.Screen
        name="EmailAdressScreen"
        component={EmailAdressScreen}
      />
      <MainStack.Screen
        name="FingerPrintScreen"
        component={FingerPrintScreen}
      />
      <MainStack.Screen name="PasswordScreen" component={PasswordScreen} />
      <MainStack.Screen name="HelpScreen" component={HelpScreen} />
      <MainStack.Screen name="GenderScreen" component={GenderScreen} />
      <MainStack.Screen name="InterestsScreen" component={InterestsScreen} />
      <MainStack.Screen name="WaterScreen" component={WaterScreen} />
      <MainStack.Screen name="CommuityScreen" component={CommuityScreen} />
      <MainStack.Screen name="CommentScreen" component={CommentScreen} />
      <MainStack.Screen name="SettingInfo" component={SettingInfo} />
      <MainStack.Screen
        name="MonitorAddGlucose"
        component={MonitorAddGlucose}
      />
      <MainStack.Screen name="MonitorConnect" component={MonitorConnect} />
      <MainStack.Screen name="CreatePostScreen" component={CreatePostScreen} />
      <MainStack.Screen
        name="CreateCommentScreen"
        component={CreateCommentScreen}
      />
      <MainStack.Screen
        name="GoalAchievedScreen"
        component={GoalAchievedScreen}
      />
      <MainStack.Screen name="NutritionScreen" component={NutritionScreen} />
      <MainStack.Screen name="StepsScreen" component={StepsScreen} />
      <MainStack.Screen name="PremiumScreen" component={PremiumScreen} />
      <MainStack.Screen name="UserRegistation" component={UserRegistation} />
      <MainStack.Screen
        name="UserRegistrationFail"
        component={UserRegistrationFail}
      />
      <MainStack.Screen
        name="UserRegistrationCompliance"
        component={UserRegistrationCompliance}
      />
      <MainStack.Screen name="SecondStep" component={SecondStep} />
      <MainStack.Screen name="ThirdStep" component={ThirdStep} />
      <MainStack.Screen name="FourthStep" component={FourthStep} />
      <MainStack.Screen name="PharmacyPayment" component={PharmacyPayment} />
      <MainStack.Screen name="PreAssessment" component={PreAssessment} />
      <MainStack.Screen name="PostAssessment" component={PostAssessment} />
      <MainStack.Screen
        name="PharmacyAppointment"
        component={PharmacyAppointment}
      />
      <MainStack.Screen name="WaitingScreen" component={WaitingScreen} />
      <MainStack.Screen
        name="ModalAddDataScreen"
        component={ModalAddDataScreen}
      />
      <MainStack.Screen
        name="MonitorBloodPressure"
        component={MonitorBloodPressure}
      />
      <MainStack.Screen
        name="MonitorBloodGlucose"
        component={MonitorBloodGlucose}
      />
      <MainStack.Screen name="Survey" component={Survey} />
      <MainStack.Screen name="PostSurvey" component={PostSurvey} />
      <MainStack.Screen name="MonitorWeight" component={MonitorWeight} />
      <MainStack.Screen
        name="MonitorTemperature"
        component={MonitorTemperature}
      />
      <MainStack.Screen name="MonitorOxygen" component={MonitorOxygen} />
      <MainStack.Screen name="MonitorFullList" component={MonitorFullList} />
      <MainStack.Screen name="MonitorAddData" component={MonitorAddData} />
      <MainStack.Screen
        name="MonitorDrugCompliance1"
        component={MonitorDrugCompliance1}
      />
      <MainStack.Screen
        name="MonitorDrugCompliance2"
        component={MonitorDrugCompliance2}
      />
      <MainStack.Screen
        name="MonitorDrugCompliance3"
        component={MonitorDrugCompliance3}
      />
      <MainStack.Screen
        name="MonitorDrugCompliance4"
        component={MonitorDrugCompliance4}
      />
      <MainStack.Screen name="SetTime" component={SetTime} />

      <MainStack.Screen name="News" component={News} />
      <MainStack.Screen name="NewsDetail" component={NewsDetail} />

      <MainStack.Screen name="TestCall" component={TestCall} />
    </MainStack.Navigator>
  ) : (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="BottomTabNavigator"
    >
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <MainStack.Screen name="TestCall" component={TestCall} />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator(props) {
  const typeOfUser = useSelector(state => state.auth.typeUser);
  // const [typeOfUser, setTypeOfUser] = useState(type);
  // getUserType().then(response => setTypeOfUser(response));
  // console.log('ffffff -------',typeOfUser)
  //   const {t} = useTranslation();
  //   const {colors} = useTheme();
  const color = 'black';
  //   const font = useFont();
  //   const auth = useSelector(state => state.auth);
  //   const login = auth.login.success;
  return typeOfUser === 'DOCTOR' ? (
    <BottomTab.Navigator
      initialRouteName="Home"
      headerMode="none"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: '#1FAD10',
        inactiveTintColor: '#535353',
        style: { borderTopWidth: 1 },
        labelStyle: {
          fontSize: 12,
          //   fontFamily: font,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        headerMode="none"
        component={HomeDoctor}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onLogOut(props.navigation)}
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={Images.setting13}
                />
                <Text
                  style={{
                    width: 100,
                  }}
                >
                  ออกจากระบบ
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  ) : (
    <BottomTab.Navigator
      initialRouteName="Home"
      headerMode="none"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: '#1FAD10',
        inactiveTintColor: '#535353',
        style: { borderTopWidth: 1 },
        labelStyle: {
          fontSize: 12,
          //   fontFamily: font,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        headerMode="none"
        component={Home}
        options={{
          title: 'หน้าหลัก',
          tabBarIcon: ({ color, size }) => {
            return <Icon color={color} name="home" size={size} solid />;
          },
        }}
      />
      <BottomTab.Screen
        name="Booking"
        component={MyBookingsUI}
        options={{
          title: 'รายการ',
          tabBarIcon: ({ color, size }) => {
            return <Icon color={color} name="bookmark" size={size} solid />;
          },
        }}
      />
      <BottomTab.Screen
        name="History"
        component={PatientHIEBookingHistory}
        options={{
          title: 'ประวัติ',
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                solid
                color={color}
                name="notes-medical"
                size={size}
                solid
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'บัญชีผู้ใช้',
          tabBarIcon: ({ color, size }) => {
            return <Icon solid color={color} name="user-circle" size={size} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

async function getUserType() {
  const type = await AsyncStorage.getItem('USER_TYPE');
  return type;
}

const onLogOut = async navigation => {
  navigation.navigate('Loading', { logout: 'DOCTOR' });
};
// <BottomTab.Screen
//   name="Post"
//   component={Post}
//   options={{
//     title: 'ข่าว',
//     tabBarIcon: ({ color }) => {
//       return <Icon color={'black'} name="copy" size={20} solid />;
//     },
//   }}
// />
