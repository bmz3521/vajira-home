import React from 'react';
import { View, Image, Text, ScrollView, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';

import Lightbox from 'react-native-lightbox';

import { Button } from '@components';

export const UriLink = props => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Card
        containerStyle={{
          padding: 0,
          borderRadius: 15,
          overflow: 'hidden',
          paddingBottom: 7,
          marginLeft: 0,
        }}
      >
        <Image
          style={{ width: 220, height: 210 }}
          resizeMode="cover"
          source={{ uri: props.image }}
        />
        <Card.Divider
          style={{
            marginBottom: 0,
            marginTop: 6,
          }}
        />
        <Button
          style={{
            marginLeft: 5,
            marginRight: 5,
            height: 35,
          }}
          onPress={props.onPressMe}
        >
          {props.message}
        </Button>
      </Card>
    </View>
  );
};

export const Danger = props => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Card
        containerStyle={{
          padding: 0,
          borderRadius: 15,
          overflow: 'hidden',
          paddingBottom: 7,
          marginLeft: 0,
        }}
      >
        <Card.Image
          style={{ width: 240, height: 210 }}
          resizeMode="cover"
          source={{ uri: props.image }}
        />
        {props.suggestion && (
          <Card.Title style={{ fontSize: 12, marginBottom: 5 }}>
            {props.suggestion}
          </Card.Title>
        )}
        <Card.Divider />
        {props.ambulance && (
          <Button
            style={{
              marginLeft: 5,
              marginRight: 5,
              height: 38,
              backgroundColor: 'red',
            }}
            onPress={props.onPressAmbulance}
          >
            {props.ambulance}
          </Button>
        )}

        {props.hotline && (
          <Button
            style={{
              marginTop: 10,
              marginLeft: 5,
              marginRight: 5,
              height: 38,
              backgroundColor: 'green',
            }}
            onPress={props.onPressHotline}
          >
            {props.hotline}
          </Button>
        )}

        {props.hospital && (
          <Button
            style={{
              marginTop: 10,
              marginLeft: 5,
              marginRight: 5,
              height: 38,
            }}
            onPress={props.onPressHospital}
          >
            {props.hospital}
          </Button>
        )}
      </Card>
    </View>
  );
};

export const GoodCarousel = props => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginRight: 45,
      }}
    >
      <ScrollView
        style={{ backgroundColor: 'white', marginBottom: 10 }}
        horizontal={true}
      >
        {props.data.map(item => (
          <Card
            key={item.id}
            containerStyle={{
              padding: 0,
              borderRadius: 15,
              overflow: 'hidden',
              paddingBottom: 7,
              marginLeft: 0,
            }}
          >
            <Image
              style={{ width: 230, height: 220 }}
              resizeMode="cover"
              source={{ uri: item.image }}
            />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export const Appointment = props => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Card
        containerStyle={{
          padding: 0,
          borderRadius: 15,
          overflow: 'hidden',
          paddingBottom: 7,
          marginLeft: 0,
        }}
      >
        <Image
          style={{ width: 240, height: 210 }}
          resizeMode="cover"
          source={{ uri: props.image }}
        />
        {props.suggestion && (
          <Card.Title style={{ fontSize: 12, marginBottom: 5 }}>
            {props.suggestion}
          </Card.Title>
        )}
        <Button
          style={{
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            height: 38,
          }}
          onPress={props.onPressAppointment}
        >
          {props.appointment}
        </Button>
      </Card>
    </View>
  );
};

export const SugarWarning = props => {
  return (
    <View style={{ marginBottom: 20 }}>
      {props.text !== 'x' && (
        <View style={{ marginTop: 20, paddingLeft: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>{props.text}</Text>
        </View>
      )}

      <Card
        containerStyle={{
          width: 310,
          marginTop: 5,
          marginLeft: 0,
          borderWidth: 0,
          paddingLeft: 0,
          elevation: 0,
          shadowColor: 'rgba(0,0,0, .2)',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0, //default is 1
          shadowRadius: 0, //default is 1
        }}
      >
        <Lightbox
          springConfig={{ tension: 20, friction: 7 }}
          activeProps={{
            style: {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            },
            resizeMode: 'contain',
          }}
        >
          <Image
            style={{
              height: 360,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
            resizeMode="cover"
            source={{ uri: props.image }}
          />
        </Lightbox>
        <Button
          style={{
            height: 35,
            marginTop: 10,
          }}
          onPress={() => props.onPressMe(props.reply)}
        >
          {props.replyText}
        </Button>
        {props.reply2 && props.reply2.length > 0 ? (
          <>
            <Card.Divider />
            <Button
              style={{
                marginLeft: 5,
                marginRight: 5,
                height: 35,
                backgroundColor: '#8B0000',
              }}
              onPress={() => props.onPressMe(props.reply2)}
            >
              {props.reply2Text}
            </Button>
          </>
        ) : null}
      </Card>
    </View>
  );
};

export const DiabetesCarousel = props => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginRight: 45,
      }}
    >
      <ScrollView
        style={{ backgroundColor: 'white', marginBottom: 10 }}
        horizontal={true}
      >
        {props.data.map(item => (
          <Card
            key={item.id}
            containerStyle={{
              padding: 0,
              borderRadius: 15,
              overflow: 'hidden',
              paddingBottom: 7,
              marginLeft: 0,
            }}
          >
            <Image
              style={{
                width: 220,
                height: props.cardHeight ? props.cardHeight : 110,
              }}
              resizeMode="cover"
              source={{ uri: item.image }}
            />
            {item.title && <Card.Title>{item.title}</Card.Title>}
            {props.noButton ? null : (
              <Button
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  marginRight: 5,
                  height: 35,
                }}
                onPress={() => props.onPressMe(item.option)}
              >
                เลือก
              </Button>
            )}
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export const SugarCarousel = props => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginRight: 45,
      }}
    >
      <View style={{ marginTop: 20, paddingLeft: 12 }}>
        <Text style={{ fontWeight: 'bold' }}>{props.message}</Text>
      </View>
      <ScrollView
        style={{ backgroundColor: 'white', marginBottom: 10 }}
        horizontal={true}
      >
        {props.data.map(item => (
          <Card
            key={item.id}
            containerStyle={{
              padding: 0,
              borderRadius: 15,
              overflow: 'hidden',
              paddingBottom: 7,
              marginLeft: 0,
            }}
          >
            <Image
              style={{ width: 230, height: 235 }}
              resizeMode="cover"
              source={{ uri: item.image }}
            />

            {item.option && (
              <Button
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  marginRight: 5,
                  height: 35,
                }}
                onPress={() => props.onPressMe(item.option)}
              >
                เลือก
              </Button>
            )}
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export const SugarWait = props => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ marginTop: 20, paddingLeft: 12 }}>
        <Text style={{ fontWeight: 'bold' }}>{props.text}</Text>
      </View>
      <Card
        containerStyle={{
          padding: 0,
          borderRadius: 15,
          overflow: 'hidden',
          paddingBottom: 7,
          marginLeft: 0,
        }}
      >
        <Image
          style={{ height: 395 }}
          resizeMode="cover"
          source={{ uri: props.image }}
        />

        <Button
          style={{
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            // height: 35,
          }}
          noOfLines={2}
          onPress={() => props.onPressMe(props.replyText)}
        >
          {props.reply}
        </Button>
      </Card>
    </View>
  );
};

export const DiabetesShakyCarousel = props => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginRight: 45,
      }}
    >
      <ScrollView
        style={{ backgroundColor: 'white', marginBottom: 10 }}
        horizontal={true}
      >
        {props.data.map(item => (
          <Card
            key={item.id}
            containerStyle={{
              padding: 0,
              borderRadius: 15,
              overflow: 'hidden',
              paddingBottom: 7,
              marginLeft: 0,
            }}
          >
            <Image
              style={{ width: 220, height: 320 }}
              resizeMode="contain"
              source={{ uri: item.image }}
            />
            <Card.Divider />
            <Card.Title>{item.title}</Card.Title>
            <Button
              style={{
                marginLeft: 5,
                marginRight: 5,
                height: 35,
              }}
              onPress={() => props.onPressMe(item.title)}
            >
              เลือก
            </Button>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};
