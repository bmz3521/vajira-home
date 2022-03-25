import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Card } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageViewerModal from '../ImageViewerModal';

const CardChatbot = props => {
  return (
    <Card
      containerStyle={[
        styles.card,
        {
          backgroundColor: props.cardBg,
          width: 260,
          paddingTop: props.title ? 0 : 15,
        },
        props.cardStyle,
      ]}
    >
      {props.title && (
        <>
          <View style={{ backgroundColor: props.titleBg, paddingTop: 10 }}>
            <Card.Title style={[styles.cardTitle, props.titleStyle]}>
              {props.title}
            </Card.Title>
          </View>
          <Card.Divider
            style={[styles.divider, { borderBottomColor: props.titleDv }]}
          />
        </>
      )}
      <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 320 }}>
        {props.content.map((item, index) => (
          <View style={{ paddingHorizontal: 5 }} key={index}>
            <View
              style={[
                !props.image && props.bullet && { flexDirection: 'row' },
                { paddingBottom: 15 },
                { paddingHorizontal: props.bullet ? 3 : 7 },
              ]}
            >
              {!props.image && props.bullet && (
                <Entypo name="dot-single" size={18} color="#000" />
              )}
              {props.image ? (
                <View style={{ width: '100%' }}>
                  <ImageViewerModal images={item}>
                    <Image source={item} style={styles.thunbnailImage} />
                    <Text style={styles.imageDesc}>กดเพื่อดูรายละเอียด</Text>
                  </ImageViewerModal>
                </View>
              ) : (
                <Text
                  style={{
                    ...styles.cardSubtitle,
                    color: '#222',
                    flex: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  {item}
                </Text>
              )}
            </View>
            {props.inlineImg && index == props.content.length - 1 && (
              <View style={{ width: '95%', alignSelf: 'center' }}>
                <ImageViewerModal images={props.inlineImg}>
                  <Image
                    source={props.inlineImg}
                    style={styles.thunbnailInlineImage}
                  />
                  <Text style={styles.imageDesc}>กดเพื่อดูรายละเอียด</Text>
                </ImageViewerModal>
              </View>
            )}
            {props.divContent && (
              <Card.Divider
                style={
                  index != props.content.length - 1
                    ? {
                        borderBottomWidth: 1,
                        borderBottomColor: props.contentDv,
                      }
                    : { borderBottomWidth: 0 }
                }
              />
            )}
          </View>
        ))}
      </ScrollView>
    </Card>
  );
};

export default CardChatbot;

CardChatbot.propTypes = {
  cardStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  content: PropTypes.array,
  title: PropTypes.string,
  cardBg: PropTypes.string,
  titleBg: PropTypes.string,
  titleDv: PropTypes.string,
  contentDv: PropTypes.string,
  bullet: PropTypes.bool,
  divContent: PropTypes.bool,
};

CardChatbot.defaultProps = {
  cardStyle: {},
  titleStyle: {},
  cardBg: '#ede8fc',
  titleBg: '#c9c1df',
  titleDv: '#c9c1df',
  contentDv: '#c9c1df',
  bullet: false,
  divContent: true,
};

const styles = StyleSheet.create({
  card: {
    padding: 2,
    borderRadius: 15,
    overflow: 'hidden',
    width: 220,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  cardTitle: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 16,
    paddingLeft: 5,
    textAlign: 'left',
    color: '#000',
    fontWeight: 'bold',
  },
  imageDesc: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
    marginTop: 5,
    marginHorizontal: 5,
  },
  thunbnailImage: {
    maxWidth: 230,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  thunbnailInlineImage: {
    height: 140,
    width: '100%',
    marginTop: 15,
    resizeMode: 'cover',
    borderColor: '#e3e3e3',
    borderWidth: 1,
  },
  divider: { borderBottomWidth: 2, borderBottomColor: '#ee7488' },
});
