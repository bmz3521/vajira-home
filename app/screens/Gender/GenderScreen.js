import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import ContinueButton from '../../components/ContinueButton/ContinueButton';
import styles from './styles';

class GenderScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: ''
    };
  }

  onPressButton = () => {
    this.props.navigation.navigate('Success');
    this.props.addUserGender(this.state.gender);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={styles.middleContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>Which one are you?</Text>
          </View>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              underlayColor="rgb(69, 183, 87)"
              style={styles.iconContainer}
              onPress={() => this.setState({ gender: 'male' })}
            >
              <View>
                <Image
                  style={styles.circle}
                  source={
                    this.state.gender == 'male'
                      ? require('../../assets/icons/fullCircle.png')
                      : require('../../assets/icons/emptyCircle.png')
                  }
                />
                <Image style={styles.icon} source={require('../../assets/images/male.png')} />
                <Text style={styles.genderText}>Male</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="rgb(69, 183, 87)"
              style={styles.iconContainer}
              onPress={() => this.setState({ gender: 'female' })}
            >
              <View>
                <Image
                  style={styles.circle}
                  source={
                    this.state.gender == 'female'
                      ? require('../../assets/icons/fullCircle.png')
                      : require('../../assets/icons/emptyCircle.png')
                  }
                />
                <Image style={styles.icon} source={require('../../assets/images/female.png')} />
                <Text style={styles.genderText}>Female</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.secText}>
              To give you a better experience we need to know your gender
            </Text>
          </View>
        </View>
        <ContinueButton
          onPress={() => {
            this.onPressButton();
          }}
        />
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addUserGender: gender => dispatch({ type: 'ADD_USERGENDER', gender })
  };
}

export default connect(
  null,
  mapDispatchToProps
)(GenderScreen);
