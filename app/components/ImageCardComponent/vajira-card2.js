/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/**
 *
 * ConfirmedMessageBox
 *
 */

import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// import 'containers/LandingWithUser/landing-with-user.css';
import styled from 'styled-components';
import { View, TouchableOpacity, Button } from "react-native";
import { Image, Text } from "@components";
// import styles from "./styles";
import PropTypes from "prop-types";
// import queryString from 'query-string';
// import landing_elderly_img from 'asset/images/landing_elderly_img.png';
// import landing_couple_img from 'asset/images/landing_couple_img.png';
// import landing_work_img from 'asset/images/landing_work_img.png';
// import landing_place_img2 from 'asset/images/landing_place_img2.png';
// import work from 'asset/images/work.png';
import vajiraImg from './vajira-img.png';
// import { Button } from '../../../../node_modules/antd';
import FastImage from 'react-native-fast-image';

/* eslint-disable react/prefer-stateless-function */
const CardImage2 = styled.View`
  display: flex !important;
  align-items: center !important;
  position: relative !important;
  min-height: 375px !important;
  border-radius: 3px !important;
  @media (max-width: 743px) {
    min-height: 350px !important;
    border-radius: 0px !important;
  }
  /* ... */
`;

const CardImage1 = styled.View`
  position: absolute !important;
  margin-left: 0px;
  width: 100% !important;
  height: 100% !important;
  top: 0px !important;
  left: 0px !important;
  display: flex;
  /* ... */
`;

const ImageView = styled.Image`
  width: 100%;
  height: 100%;

  border-radius: 10px !important;
  /* ... */

  @media (max-width: 744px) {
    object-position: ${props => props.position || '59%'};
  }
`;

const TextPlaceHolder = styled.View`
  margin-top: auto !important;
  margin-bottom: 30px !important;
  padding-top: 100px !important;
  padding-bottom: 100px !important;
  padding-left: 30px !important;
  left: 0px;
  position: absolute;
  display: flex;
  @media (min-width: 743px) {
    /* margin-left: 60px; */
  }
  @media (max-width: 743px) {
    margin-top: auto !important;
    padding: 24px !important;
  }
`;

const TitleText3 = styled.Text`
  color: ${props => props.color || '#5a5a5a'};
  max-width: 350px !important;

  @media (max-width: 743px) {
    max-width: 300px !important;
  }
`;

const TitleText2 = styled.Text`
  flex: 1;
  flex-wrap: wrap;
   font-size: 16px !important;
  font-weight: 800 !important;
  line-height: 22px!important;
  margin: 0px !important;
  display: flex;
`;

const TitleText1 = styled.Text`
flex-direction:row;
flex-wrap:wrap;  font-size: 30px !important;
  line-height: 34px !important;
  display: flex;

  @media (max-width: 743px) {
    font-size: 24px !important;
    line-height: 28px !important;
  }
`;

const SmallTitleText3 = styled.Text`
  color: ${props => props.color || '#5a5a5a'};
  max-width: 350px !important;

  @media (max-width: 743px) {
    max-width: 300px !important;
  }
`;

const SmallTitleText2 = styled.Text`
  flex: 1;
  flex-wrap: wrap;
    font-size: 16px !important;
  font-weight: 800 !important;
  line-height: 22px!important;
  margin: 0px !important;
  display: flex;
`;

const SmallTitleText1 = styled.Text`
flex-direction:row;
flex-wrap:wrap;  
font-size: 14px !important;
  line-height: 34px !important;
  display: flex;

  @media (max-width: 743px) {
    font-size: 14px !important;
    line-height: 28px !important;
  }
`;

const BodyText3 = styled.Text`
  color: ${props => props.color || '#5a5a5a'};
  max-width: 425px !important;
  @media (max-width: 743px) {
    max-width: 300px !important;
  }
`;

const BodyText2 = styled.Text`

  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 22px!important;
  margin: 0px !important;
`;

const BodyText1 = styled.Text`

font-size: 24px !important;
  line-height: 40px !important;
  @media (max-width: 743px) {
    font-size: 16px !important;
    line-height: 24px !important;
  }
`;

const Button3 = styled.View`
  color: rgb(255, 255, 255);
  max-width: 425px !important;
  margin-top: 4px !important;
  @media (max-width: 743px) {
    max-width: 300px !important;
  }
`;

const Button2 = styled.View`
  flex: 1;
  flex-wrap: wrap;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 22px!important;
  margin: 0px !important;
`;

const ButtonText = styled.Text`
    font-size: 15px;
    color: ${props => props.textColor};
    text-align: center;
    justify-content: center;
`;

const Button1 = styled.TouchableOpacity`
  padding: 10px 15px;
  width: 140px;
  font-size: 16px !important;
  line-height: 30px !important;
  border-radius: 10px;
  margin-top: 8px;
  background-color: ${props => props.buttonTextColor || 'transparent'};
  color: ${props => props.textColor || '#5c9cff'};
  border: 1px solid;
  border-color: ${props => props.color || '#5c9cff'};

  &:hover {
    background-color: ${props => props.color || '#5c9cff'};
    color: white;
    
  }
  &:active {
    background-color: ${props => props.color || '#5c9cff'};
    color: white;
    
  }
  &:focus {
    background-color: ${props => props.color || '#5c9cff'};
    color: white;
    
  }
`;

const ButtonNone = styled.Button`
flex-direction:row;
flex-wrap:wrap;  font-size: 16px !important;
  line-height: 30px !important;
  padding: 5px 30px;
  border-radius: 5px;
  max-width: 20px;

  
  margin-top: 8px;
  background-color: #5c9cff;
`;

const Divider = styled.View`
  margin-top: 10px;
`;

const BoxWhiteShadow = styled.View`
  @media (max-width: 768px) {
    display: ${props => props.show || 'none'};
  /* Here's the trick */
  box-shadow: inset 0 0 0 100vw rgba(255, 255, 255, 0.5);
  /* Here's the same styles we applied to our content-View earlier */
  color: white;
height: 100%;
width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

   position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%; 

      border-radius: 10px !important;
    }

`;

export default class VajiraCard2 extends Component {
  onClickEventHandler(procedure) {
    return () => {
      // console.log(this.props.country);
      if (this.props.country !== '') {
        //  return <Redirect to='/s/' />;
        this.props.history.push(
          `/s/all?query=${procedure.path}&location=${this.props.country}`,
        );
      }
    };
  }

  onClickEvent(props) {
    if (props !== '' || props !== undefined) {
      //  return <Redirect to='/s/' />;
      this.props.history.push(`/s/all?${props}`);
    } else {
      this.props.history.push(`/s/all?`);
    }
  }

  render() {

    const {
      procedures = [
        { procedureName: 'Orthopedics', path: 'orthopedics' },
        { procedureName: 'Cancer Care', path: 'cancer_care' },
        { procedureName: 'Cardiology', path: 'cardiology' },
        { procedureName: 'Aesthetic', path: 'aesthetic' },
        { procedureName: 'Dentistry', path: 'dentistry' },
        { procedureName: 'Reproductive', path: 'reproductive' },
        { procedureName: 'Regenerative', path: 'Regenerative' },
        { procedureName: 'Alternative', path: 'alternative' },
      ],
    } = this.props;
    return (
      <View>
        <View>
          
          <View/>
          <CardImage2>
            <CardImage1>
             <Image
                          source={vajiraImg}
             style={{marginLeft: '50%', marginTop: '-5%', width: '105%', height: '100%'}}
             />
          
            </CardImage1>
            <TextPlaceHolder>
              <Divider />

              <SmallTitleText3 color={this.props.smallTextColor}>
                <SmallTitleText2>
                  <SmallTitleText1>
                    {/* Bangkok */}
                    {this.props.titleTextSmall}
                  </SmallTitleText1>
                </SmallTitleText2>
              </SmallTitleText3>

              <Divider />

              <TitleText3 color={this.props.color}>
                <TitleText2>
                  <TitleText1>
                    {/* Bangkok */}
                    {this.props.titleText}
                  </TitleText1>
                </TitleText2>
              </TitleText3>

              <Divider />

              <BodyText3 color={this.props.bodyColor}>
                <BodyText2>
                  <BodyText1>
                    {/* JCI Accredited Thailand most in the world */}
                    {this.props.bodyText}
                  </BodyText1>
                </BodyText2>
              </BodyText3>

              <Divider />
              {this.props.buttonText !== '' && this.props.buttonText ? (
                <Button1
                  buttonTextColor={this.props.buttonTextColor}
                  color={this.props.smallTextColor}
                  textColor={this.props.textColor}
                  onClick={() => this.onClickEvent(this.props.searchUrl)}
                  title={this.props.buttonText}
                >
            <ButtonText textColor={this.props.textColor}>{this.props.buttonText}</ButtonText>
                </Button1>
              ) : (
                <ButtonNone 
                title="Press Me"
                />
              )}
            </TextPlaceHolder>
          </CardImage2>
        </View>
      </View>
    );
  }
}
