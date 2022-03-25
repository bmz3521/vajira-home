import React from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';

class EmailAdressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  onPressButton = () => {
    this.props.addUserEmail(this.state.email);
    this.props.navigation.navigate('Password');
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <LogoHeader
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />

          <Text style={styles.title}>What is your email address?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
          </View>

          <ContinueButton onPress={() => this.onPressButton()} />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addUserEmail: email => dispatch({ type: 'ADD_USEREMAIL', email })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(EmailAdressScreen);
