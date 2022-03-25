import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BaseColor } from '@config';
import { Icon, Text } from '@components';
import styles from "./styles";
import { useHooks } from './hooks';

function DetailTable(props) {
  const { icon, title, headers, hideHeader } = props;

  const { availableData, expand, events } = useHooks(props);

  return (
    <View style={styles.contain}>
      <View style={styles.contentHeadline}>
        <Icon name={icon} size={20} color={BaseColor.blueColor} style={styles.contentHeadlineIcon} />
        <Text body1 semibold>{title}</Text>
      </View>
      <TouchableOpacity onPress={events.onShowData(!expand)} >
        <View style={styles.contentTable}>
          {!hideHeader && (
            <View style={styles.contentHeaderRow}>
              {headers.map(header => {
                return (
                  <View style={styles.contentHeaderCol}>
                    <Text body2>{header.name}</Text>
                  </View>
                );
              })}
            </View>
          )}
          {availableData.map(((dataRow, index) => {
            return (
              <View style={[styles.contentRow, hideHeader && index == 0 && styles.contentFirstRow]}>
                {headers.map(header => {
                  return (
                    <View style={styles.contentCol}>
                      <Text caption grayColor>{dataRow[header.key]}</Text>
                    </View>
                  );
                })}
              </View>
            );
          }))}
        </View>
      </TouchableOpacity>
      {!expand && (
        <TouchableOpacity onPress={events.onShowData(true)} >
          <View style={styles.expandButton}>
            <Icon name="chevron-down" size={20} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default DetailTable;
