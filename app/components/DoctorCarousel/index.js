import React from 'react';
import { DoctorEntry } from '@components';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

function DoctorCarousel(props) {
  const { data } = props;

  return (
    // <ScrollView horizontal={true}>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator
      data={data}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item }) => <DoctorEntry key={item.id} {...item} />}
      style={{ width: 365, marginVertical: 10 }}
    />
    // </ScrollView>
  );
}

export default DoctorCarousel;
