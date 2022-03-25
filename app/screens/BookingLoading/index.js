import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseStyle, Images } from '@config';
import { SafeAreaView, Header, Image, ProgressCircle } from '@components';
import { BookingActions } from '@actions';
import styles from './styles';
import { useHooks } from './hooks';

function BookingLoading(props) {
  const { clinic, progress } = useHooks(props);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header title="Booking" subTitle={clinic.name} />
      <View style={styles.centerView}>
        <ProgressCircle
          value={progress}
          size={148}
          thickness={16}
          color="#284F30"
          animationMethod="timing"
          animationConfig={{ speed: 4 }}
          shouldAnimateFirstValue
        >
          <Image style={styles.logo} source={Images.logo} />
        </ProgressCircle>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingLoading);
