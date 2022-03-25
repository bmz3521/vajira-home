import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@components';
import { Images } from '@config';
import styles from './styles';

function ClinicVerification(props) {
  const { style } = props;
  return (
    <View style={[styles.contain, style]}>
      <View style={styles.content}>
        <Image style={styles.image} source={Images.verifiedClinic} />
        <View style={styles.text}>
          <Text body1 semibold>
            Verified Partner, Best Price Guaranteed.
          </Text>
          <Text body2>
            This clinic has been verified by a member of Ever Team and is on our
            "Best Price Agreement". The clinic passed Ever's standard criteria
            for Trust, Safety & Quality.
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Image style={styles.image} source={Images.verifiedSupport} />
        <View style={styles.text}>
          <Text body1 semibold>
            24/7 Care Support.
          </Text>
          <Text body2>
            This clinic is covered under our 24/7 care support policy. This
            means we can help answer any questions & guide you through any
            issues that may arise via Live Messaging or email, or call center.
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Image style={styles.image} source={Images.verifiedLocation} />
        <View style={styles.text}>
          <Text body1 semibold>
            Fully supported location.
          </Text>
          <Text body2>
            This clinic is located in Thailand, allowing our Care Team to be
            on-site and present with you in-case of emergencies and any required
            support.
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ClinicVerification;
