import React from 'react';
import moment from 'moment';
import { getTimeText } from '@utils/shared';

const useHooks = props => {
  const { navigation } = props;
  const { clinic, quotation } = navigation.state.params;

  const [startTime, setStartTime] = React.useState([]);
  const [endTime, setEndTime] = React.useState([]);
  const [markTime, setMarkTime] = React.useState({});
  const [minDate, setMinDate] = React.useState(new Date());
  const [typeTime, setTypeTime] = React.useState('START_DATE');
  const [timeFormat, setTimeFormat] = React.useState(
    'Please select time slot first',
  );

  const onChangeDate = React.useCallback(
    () => date => {
      const formatedDate = moment(date.dateString);
      if (typeTime === 'END_DATE') {
        let result = '';

        if (moment(startTime).diff(formatedDate, 'days') === 0) {
          result = getTimeText(formatedDate);

          setMarkTime({
            [getTimeText(formatedDate, 'YYYY-MM-DD')]: {
              startingDay: true,
              endingDay: true,
              color: '#284F30',
              selected: true,
            },
          });
        } else {
          result = `${getTimeText(startTime)} ⇒ ${getTimeText(formatedDate)}`;
          let start = moment(startTime)
            .startOf('day')
            .add(1, 'days');
          const end = moment(formatedDate).startOf('day');
          const dateRange = {};
          while (end.isAfter(start)) {
            Object.assign(dateRange, {
              [start.format('YYYY-MM-DD')]: {
                color: '#284F30',
                selected: true,
              },
            });
            start = start.add(1, 'days');
          }

          setMarkTime(
            Object.assign({}, markTime, dateRange, {
              [getTimeText(formatedDate, 'YYYY-MM-DD')]: {
                endingDay: true,
                color: '#284F30',
                selected: true,
              },
            }),
          );
        }

        setMinDate(new Date());
        setEndTime(formatedDate);
        setTimeFormat(result);
        setTypeTime('DONE');
      } else {
        setMinDate(new Date(formatedDate));
        setStartTime(formatedDate);
        setEndTime(null);
        setTimeFormat('Please select end time');
        setTypeTime('END_DATE');
        setMarkTime({
          [getTimeText(formatedDate, 'YYYY-MM-DD')]: {
            startingDay: true,
            color: '#284F30',
            selected: true,
          },
        });
      }
    },
    [startTime, typeTime, markTime],
  );

  const onNext = React.useCallback(
    () => () => {
      navigation.navigate('SelectProcedure', {
        clinic: clinic,
        quotation: Object.assign({}, quotation, {
          startTime: startTime,
          endTime: endTime,
          timeFormat: timeFormat,
        }),
      });
    },
    [navigation, clinic, quotation, startTime, endTime, timeFormat],
  );

  const reset = () => {
    setMinDate(new Date());
    setStartTime(null);
    setEndTime(null);
    setTimeFormat('Please select time slot first');
    setTypeTime('START_DATE');
    setMarkTime({});
  };

  return {
    ready: typeTime === 'DONE',
    timeFormat,
    markTime,
    minDate,
    events: {
      onChangeDate,
      onNext,
      reset,
    },
  };
};

export { useHooks };
