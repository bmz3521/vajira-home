import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { BookingsActions } from '@actions';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, ListThumbCircle } from '@components';
import styles from './styles';
import { useHooks } from './hooks';

const getLatestContent = data => {
  const patientMessage = data.metapatient && data.metapatient.message && data.metapatient.message.text;
  const firstMessage = (data.inquiry && data.inquiry.message) || data.message;
  return patientMessage || data.message || firstMessage;
};

function ChatMessenger(props) {
  const { bookings, navigation } = props;
  const { ready } = useHooks(props);

  if (bookings.error) return <Text>Fetch error: {bookings.error}</Text>;
  if (!ready || bookings.loading) return <Text>Loading . . .</Text>;

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="Messenger"
        renderLeft={() => {
          return (
            <Icon name="chevron-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={bookings.data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => (
          <ListThumbCircle
            onPress={() => {
              navigation.navigate('ChatMessages', {
                bookingId: item.id, 
                firstMessage: {
                  text: (item.inquiry && item.inquiry.message) || item.message,
                  timestamp: (item.inquiry && item.inquiry.timestamp) || item.timestamp,
                },
              });
            }}
            image={{ uri: item.clinic.featureImageM }}
            txtLeftTitle={item.clinic.name}
            txtContent={getLatestContent(item)}
            txtRight={moment(item.startTime).format('L')}
          />
        )}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    bookings: state.bookings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(BookingsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessenger);
