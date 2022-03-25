import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, Button } from '@components';
import { BookingActions } from '@actions';
import { getPriceText, getStatusText, getTimeText } from '@utils/shared';
import styles from './styles';
import { useHooks } from './hooks';

function MyBookingDetail(props) {
  const { booking, navigation } = props;
  const { ready } = useHooks(props);

  if (booking.error) return <Text>Fetch error: {booking.error.message}</Text>;
  if (!ready || booking.loading) return <Text>Loading . . .</Text>;

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: 'always' }}
    >
      <Header
        title="Booking Detail"
        subTitle={booking.data.clinic.name}
        style={{ marginBottom: 10 }}
        renderLeft={() => {
          return (
            <Icon name="chevron-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.imageBlockView}>
          <Image
            style={styles.fullImage}
            source={{ uri: booking.data.clinic.featureImageM }}
          />
        </View>

        <View style={styles.blockView}>
          <View style={styles.stretch}>
            <Text body1 bold>
              {booking.data.clinic.name}
            </Text>
            <Text caption thin grayColor>
              {booking.data.clinic.address}
            </Text>
          </View>
        </View>

        <View style={styles.blockView}>
          <View style={styles.stretch}>
            <Text body1>contact property</Text>
          </View>
        </View>

        <View style={styles.blockView}>
          <View style={styles.stretch}>
            <Text body1>{getStatusText(booking.data.status)}</Text>
            <Text body2>Booking ID: {booking.data.id}</Text>
          </View>
        </View>

        <View style={styles.blockView}>
          <View style={styles.colFirstChild}>
            <Text style={{ textAlign: 'center' }} body2>
              From
            </Text>
            <Text style={{ textAlign: 'center' }} body2 semibold>
              {getTimeText(booking.data.startTime)}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={{ textAlign: 'center' }} body2>
              To
            </Text>
            <Text style={{ textAlign: 'center' }} body2 semibold>
              {getTimeText(booking.data.endTime)}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={{ textAlign: 'center' }} body2>
              Admit
            </Text>
            <Text style={{ textAlign: 'center' }} body2 semibold>
              {getTimeText(booking.data.admitTime)}
            </Text>
          </View>
        </View>

        <View style={styles.blockView}>
          <View style={styles.stretch}>
            <Text body2>Guest name</Text>
            <Text body1 semibold style={{ marginBottom: 10 }}>
              {booking.data.formInfo.name}
            </Text>
          </View>
        </View>

        <View style={styles.blockView}>
          <View style={styles.stretch}>
            <Text body2>Email</Text>
            <Text body1 semibold>
              {booking.data.formInfo.email || booking.data.patient.email}
            </Text>
          </View>
        </View>

        <View style={styles.blockView}>
          <View style={styles.stretch}>
            <Text body1 style={{ marginBottom: 10 }}>
              Treatments
            </Text>
            {booking.data.procedures.map(procedure => (
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.leftView}>
                  <Text body2>{procedure.name}</Text>
                </View>
                <View style={styles.rightView}>
                  <Text body2 grayColor>
                    {`(${getPriceText(procedure)})`}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {booking.data.clinic.cancellationPolicy &&
          booking.data.clinic.cancellationPolicy.length > 0 && (
            <View style={styles.blockView}>
              <View style={styles.stretch}>
                <Text body1 style={{ marginBottom: 10 }}>
                  Booking conditions
                </Text>
                {booking.data.clinic.cancellationPolicy.map(cancel => (
                  <Text>{cancel}</Text>
                ))}
              </View>
            </View>
          )}

        <View style={styles.messageBlockView}>
          <View style={styles.stretch}>
            <Text body1 style={{ marginBottom: 10 }}>
              Message to Doctor
            </Text>
            <Text body2>{(booking.data.inquiry && booking.data.inquiry.message) || booking.data.message}</Text>
          </View>
        </View>

        <View style={styles.buttonBlockView}>
          <View style={styles.stretch}>
            <Button
              onPress={() =>
                navigation.navigate('ChatMessages', {
                  bookingId: booking.data.id,
                  firstMessage: {
                    text: (booking.data.inquiry && booking.data.inquiry.message) || booking.data.message,
                    timestamp: (booking.data.inquiry && booking.data.inquiry.timestamp) || booking.data.timestamp,
                  },
                })
              }
            >
              Chat
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    booking: state.booking,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(BookingActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingDetail);
