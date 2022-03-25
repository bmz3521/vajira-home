import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  AutoSuggest,
  ProcedureGroupItem,
  ProcedurePackageListItem,
} from '@components';
import styles from './styles';
import { useHooks } from './hooks';

function SelectProcedure(props) {
  const { navigation } = props;
  const { clinic } = navigation.state.params;
  const { timeFormat, selectedProcedures, procedureGroup, events } = useHooks(
    props,
  );

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="Please Select Procedure"
        renderLeft={() => {
          return (
            <Icon name="chevron-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor>
              Reset
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
        style={{ marginVertical: 20 }}
      />
      <View style={[styles.resultContainer]}>
        <View style={[styles.result]}>
          <Text body2>{timeFormat}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={[BaseStyle.bodyPaddingDefault, { marginBottom: 20 }]}>
          <Text headline semibold style={{ margin: 10 }}>
            All Clinic Procedure
          </Text>
          <AutoSuggest
            data={clinic.Procedures.filter(
              s => !selectedProcedures.some(p => p.id === s.id),
            )}
            filter={(item, text) =>
              item.name.toLowerCase().includes(text.toLowerCase())
            }
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => <Text>{item.name}</Text>}
            onPress={events.onSuggest()}
          />
          {/* <View>
                        <FlatList
                            data={clinic.ClinicPackages}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item }) => (
                                <ProcedurePackageListItem
                                    {...item}
                                />
                            )}
                        />
                    </View> */}
          <View style={{ marginVertical: 20 }}>
            <FlatList
              data={Object.keys(procedureGroup)}
              keyExtractor={(item, index) => item}
              renderItem={({ item }) => (
                <ProcedureGroupItem
                  {...procedureGroup[item]}
                  selectedProcedures={selectedProcedures.filter(p1 =>
                    procedureGroup[item].procedures.some(p2 => p1.id === p2.id),
                  )}
                  onChildPress={events.onSelectedItem()}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={[styles.footer]}>
        {/* <View style={[ styles.resultContainer ]}>
                    <FlatList
                        data={selectedProcedures}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => (
                            <ProcedureListItem
                                {...item}
                                freeze
                                selected
                                onPress={events.onSelectedItem()}
                            />
                        )}
                    />
                </View> */}
        <Button
          disabled={selectedProcedures.length === 0}
          full
          flat
          onPress={events.onNext()}
          style={{ backgroundColor: '#284F30' }}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default SelectProcedure;
