import React, { useState } from 'react';
import { View, TextInput, Switch } from 'react-native';
import { BaseColor, BaseStyle } from '@config';
import { TextInputMask } from 'react-native-masked-text';
import { Text, Button, Image } from '@components';
import creditCardType from 'credit-card-type';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';

import { getCreditIcon } from '@utils/getValue';
import TextInputCustom from './TextInputCustom';

const PaymentAddForm = ({ onAddCredit, loading }) => {
  const [creditNumber, setCreditNumber] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const { control, handleSubmit, errors, getValues } = useForm();

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onSubmit = data => {
    onAddCredit({ ...data, number: creditNumber });
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInputCustom lable="Credit card number" errors={errors.number}>
        <View
          style={[
            BaseStyle.textInputBorderBottom,
            { flexDirection: 'row', alignItems: 'center' },
          ]}
        >
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={getCreditIcon(
              creditNumber !== '' &&
                _.get(creditCardType(creditNumber), '[0].type'),
            )}
          />
          <TextInputMask
            type={'credit-card'}
            options={{
              obfuscated: false,
            }}
            style={{ flex: 1, marginLeft: 20 }}
            placeholder="Credit card number"
            placeholderTextColor={BaseColor.grayColor}
            maxLength={19}
            onChangeText={text => setCreditNumber(text)}
            value={creditNumber}
          />
        </View>
      </TextInputCustom>
      <TextInputCustom lable="Name on card" errors={errors.name}>
        <Controller
          as={
            <TextInput
              style={[BaseStyle.textInputBorderBottom]}
              placeholder="Name on card"
              placeholderTextColor={BaseColor.grayColor}
            />
          }
          control={control}
          name="name"
          onChange={args => args[0].nativeEvent.text}
          rules={{ required: true }}
          defaultValue=""
        />
      </TextInputCustom>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <TextInputCustom lable="Expire date" errors={errors.expiration}>
            <Controller
              as={
                <TextInputMask
                  type={'datetime'}
                  options={{
                    format: 'MM/YY',
                  }}
                  style={[BaseStyle.textInputBorderBottom]}
                  placeholder="MM/YY"
                  placeholderTextColor={BaseColor.grayColor}
                />
              }
              control={control}
              name="expiration"
              onChange={args => args[0].nativeEvent.text}
              rules={{ required: true }}
              defaultValue=""
            />
          </TextInputCustom>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <TextInputCustom lable="CVC" errors={errors.cvc}>
            <Controller
              as={
                <TextInput
                  keyboardType="numeric"
                  style={[BaseStyle.textInputBorderBottom]}
                  secureTextEntry={true}
                  maxLength={3}
                  placeholder="CVC"
                  placeholderTextColor={BaseColor.grayColor}
                />
              }
              control={control}
              name="cvc"
              onChange={args => args[0].nativeEvent.text}
              rules={{ required: true }}
              defaultValue=""
            />
          </TextInputCustom>
        </View>
      </View>
      <View
        style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text caption1 grayColor style={{ flex: 1 }}>
          Set as primary
        </Text>
        <Switch
          trackColor={{ true: BaseColor.blueColor, false: 'grey' }}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button
          full
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
        >
          Add Card
        </Button>
      </View>
    </View>
  );
};

export default PaymentAddForm;
