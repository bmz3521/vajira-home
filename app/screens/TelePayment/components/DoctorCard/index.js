import React from 'react';
import { View, TouchableHighlight, Dimensions } from 'react-native';
import _ from 'lodash';
import { Text, Icon } from '@components';
import LocationIcon from '@assets/images/location.png';
import MedicalSchoolIcon from '@assets/images/medical-school.png';
import LikeIcon from '@assets/images/like.png';
import { getImage } from '@utils/uploadImageHelper';
import styles from './style';

import { Card, ProfileImage, LeftCard, Tag, Image, TopCard } from './style';

const DoctorCard = ({ otherType, otherTypeName, data, handle, status }) => {
  console.log('DoctorCard');
  console.log(data);
  return (
    <TouchableHighlight
      underlayColor="transparent"
      disabled={true}
      onPress={() => handle({ ...data, price: 500 })}
    >
      <Card>
        <View style={styles.makeRow}>
          <Icon name="stethoscope" style={styles.timeIcon} />
          <Text style={styles.timeText}>
            เกี่ยวกับ
            {otherTypeName
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
          <Text style={styles.timeText}>
            {otherTypeName
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
            <ProfileImage
              style={styles.userAva}
              source={{
                uri: _.get(data, 'profileImage'),
              }}
            />
            <View style={styles.userProfile}>
              <View style={styles.wrapName}>
                <Text title3 bold style={styles.doctorName}>
                  {_.get(data, 'fullname')}
                </Text>
              </View>
              <View style={styles.doctorProfile}>
                <View style={styles.wrapName}>
                  <View>
                    <Icon name="hospital" style={styles.timeIcon} />
                  </View>
                  <Text style={styles.doctorText}>
                    คณะแพทยศาสตร์{' '}
                    {data && data.detail ? _.get(data.detail, 'hospital') : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.doctorProfile}>
                <View style={styles.wrapName}>
                  <View>
                    <Icon name="notes-medical" style={styles.timeIcon} />
                  </View>
                  <Text style={styles.doctorText}>
                    {data && data.detail
                      ? _.get(data.detail, 'specialist')
                      : ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>

          <View style={styles.consultContainer}>
            <View style={styles.costContainer}>
              <Text style={styles.timeText}>การให้คำปรึกษา</Text>
            </View>
            <View style={styles.costContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.costTitle}>ค่าบริการ</Text>
              </View>
              <Text style={styles.cost}>0.00 บาท</Text>
            </View>
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.specialMessage}>
              ขณะนี้ไม่มีการคิดค่าใช้จ่าย เนื่องจากอยู่ระหว่างการทดสอบระบบ
            </Text>
          </View>
        </TopCard>
      </Card>
    </TouchableHighlight>
  );
};

export default DoctorCard;
