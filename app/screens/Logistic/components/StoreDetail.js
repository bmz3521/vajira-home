import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Icon } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../style';

function StoreDetail({ modal, store, onSelectedStore }) {
  return (
    <Modal animationType="slide" transparent={true} visible={modal}>
      <View style={[styles.centeredView, { marginTop: 20 }]}>
        <View style={styles.modalView}>
          <ScrollView>
            {store?.image ? (
              <Image source={{ uri: store.image }} style={styles.detailImage} />
            ) : (
              <View style={styles.illustration} />
            )}
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>{store.name}</Text>
              <Text style={styles.detailText}>
                {store.detail?.description || ''}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
              <View style={styles.line} />
            </View>

            <View style={styles.blockContainer}>
              <View>
                <Icon name="calendar" style={styles.blockIcon} />
              </View>
              <View>
                <Text style={styles.detailSubtitle}>เวลาทำการ</Text>
                <Text style={styles.detailText}>{store.detail?.time}</Text>
              </View>
            </View>

            <View style={styles.blockContainer}>
              <View>
                <Icon name="map-marker-alt" style={styles.blockIcon} />
              </View>
              <View>
                <Text style={styles.detailSubtitle}>ที่อยู่</Text>
                <Text style={styles.detailText}>{store.address}</Text>
              </View>
            </View>

            <View style={styles.mapContainer}>
              <TouchableOpacity
                underlayColor="grey"
                style={styles.mapButton}
                onPress={() => {
                  Linking.openURL(
                    `https://www.google.com/maps/place/${store.lat},${store.lng}`,
                  );
                }}
              >
                <View style={styles.map}>
                  <Icon name="map-marker-alt" style={styles.mapIcon} />
                  <Text style={styles.mapText}>แสดงที่ตั้งในกูเกิล</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.blockContainer}>
              <View>
                <Icon name="phone-alt" style={styles.blockIcon} />
              </View>
              <View>
                <Text style={styles.detailSubtitle}>เบอร์โทรศัพท์ติดต่อ</Text>
                <Text style={styles.detailText}>{store.detail?.phone}</Text>
              </View>
            </View>

            <View style={styles.blockContainer}>
              <View>
                <Icon name="envelope" style={styles.blockIcon} />
              </View>
              <View>
                <Text style={styles.detailSubtitle}>อีเมล</Text>
                <Text style={styles.detailText}>{store.detail?.email}</Text>
              </View>
            </View>

            <View style={styles.blockContainer}>
              <View>
                <Icon name="globe" style={styles.blockIcon} />
              </View>
              <View>
                <Text style={styles.detailSubtitle}>เว็บไซต์</Text>
                <Text style={styles.detailText}>{store.detail?.website}</Text>
              </View>
            </View>

            <LinearGradient
              style={{
                height: 50,
                margin: 15,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              colors={['#0A905F', '#095C3E']}
            >
              <TouchableOpacity
                style={{ width: '100%', alignItems: 'center' }}
                underlayColor="grey"
                onPress={() => onSelectedStore(store)}
              >
                <Text style={styles.continue}>เลือก</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default StoreDetail;
