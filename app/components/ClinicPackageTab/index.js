import React from 'react';
import { View, FlatList } from 'react-native';
import { ClinicPackageTabItem } from '@components';
import styles from './styles';

function ClinicPackageTab(props) {
  const { style, data } = props;

  return (
    <View style={[styles.content, style]}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ClinicPackageTabItem style={styles.item} {...item} />
        )}
      />
    </View>
  );
}

export default ClinicPackageTab;
