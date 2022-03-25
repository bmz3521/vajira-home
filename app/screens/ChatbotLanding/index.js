import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';

function ChatbotLanding({ navigation }) {
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="สอบถาม - Chatbots"
        textStyle={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        }}
        renderLeft={() => {
          return <Icon name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.box, { marginTop: 10 }]}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Chatbot2')}
        >
          <View style={styles.banner}>
            <Image style={styles.pic} source={Images.ajmason} />
            <Text style={styles.txt}>สอบถามเรื่องโรคกระดูก</Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 10,
              }}
            >
              <Icon name="chevron-right" size={20} color="#0575E6" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Chatbot1')}
        >
          <View style={styles.banner}>
            <Image style={styles.pic} source={Images.ajswangjit} />
            <Text style={styles.txt}>สอบถามเรื่องโรคเบาหวาน</Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 10,
              }}
            >
              <Icon name="chevron-right" size={20} color="#0575E6" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  box: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  pic: {
    width: 60,
    height: 60,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
  },
  txt: {
    fontSize: 18,
    color: '#000',
  },
});

export default ChatbotLanding;
