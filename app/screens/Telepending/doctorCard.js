import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import { Images } from '@config';
import { Text, Icon } from '@components';
import LocationIcon from '@assets/images/location.png';
import { getImage } from '@utils/uploadImageHelper';

import { Card2, ProfileImage, TopCard } from './style';
import styles from './styles';

const OfficerCard = ({
  data,
  officerType,
  otherTypeName,
  otherType,
  handleCard,
}) => {
  return (
    <TouchableHighlight
      disabled={true}
      underlayColor="transparent"
      onPress={() => handleCard({ ...data })}
    >
      <Card2>
        <View style={styles.makeRow}>
          <Icon name="stethoscope" style={styles.officerIcon} />
          <Text style={styles.officerText}>
            เกี่ยวกับ
            {officerType === 'pharmacy'
              ? 'เกี่ยวกับเภสัชกร'
              : otherTypeName
              ? otherTypeName
              : otherType === 'physiotherapist'
              ? 'นักกายภาพบำบัด'
              : otherType === 'nurse'
              ? 'พยาบาล'
              : 'แพทย์'}
          </Text>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.officerText}>
            {officerType === 'pharmacy'
              ? 'เกี่ยวกับเภสัชกร'
              : otherTypeName
              ? otherTypeName
              : otherType === 'physiotherapist'
              ? 'นักกายภาพบำบัด'
              : otherType === 'nurse'
              ? 'พยาบาล'
              : 'แพทย์'}
            ผู้ให้คำปรึกษา
          </Text>
        </View>

        <TopCard>
          <View style={styles.makeRow}>
            {officerType === 'pharmacy' ? (
              <ProfileImage
                style={styles.userAva}
                source={Images.pharmacy_logo}
              />
            ) : (
              <ProfileImage
                style={styles.userAva}
                source={{
                  uri: getImage(_.get(data, 'profileImage')),
                }}
              />
            )}

            <View style={styles.userProfile}>
              {officerType !== 'pharmacy' && (
                <View style={styles.wrapName}>
                  <Text title3 bold style={styles.doctorName}>
                    {_.get(data, 'fullname')}
                  </Text>
                </View>
              )}

              <View style={styles.doctorProfile}>
                {officerType === 'pharmacy' ? (
                  <View style={styles.wrapName}>
                    <View>
                      <Icon name="notes-medical" style={styles.officerIcon} />
                    </View>
                    <Text style={styles.doctorText}>
                      หน่วยจ่ายยา Telepharmacy
                    </Text>
                  </View>
                ) : (
                  <View style={styles.wrapName}>
                    <View>
                      <Icon name="hospital" style={styles.officerIcon} />
                    </View>
                    <Text style={styles.doctorText}>
                      คณะแพทยศาสตร์
                      {data && data.detail
                        ? _.get(data?.detail, 'hospital')
                        : ''}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.doctorProfile}>
                {officerType === 'pharmacy' ? (
                  <View style={styles.wrapName}>
                    <View>
                      <Icon name="hospital" style={styles.officerIcon} />
                    </View>
                    <Text style={styles.doctorText}>
                      โรงพยาบาลวชิรพยาบาล คณะแพทยศาสตร์วชิรพยาบาล
                    </Text>
                  </View>
                ) : (
                  <View style={styles.wrapName}>
                    <View>
                      <Icon name="notes-medical" style={styles.officerIcon} />
                    </View>
                    <Text style={styles.doctorText}>
                      {data && data.detail
                        ? _.get(data?.detail, 'specialist')
                        : ''}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </TopCard>
      </Card2>
    </TouchableHighlight>
  );
};

export default OfficerCard;
