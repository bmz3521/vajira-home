/**
 * Color Palette Define
 *
 * Check more how to use
 * @url http://passionui.com/docs/felix-travel/theming
 */

let orangeColor = {
  primaryColor: 'white',
  darkPrimaryColor: '#C31C0D',
  lightPrimaryColor: '#FF8A65',
  accentColor: '#4A90A4',
};

let blueColor = {
  primaryColor: '#1F1F1F',
  darkPrimaryColor: '#1281ac',
  lightPrimaryColor: '#68c9ef',
  accentColor: '#FF8A65',
};

let pinkColor = {
  primaryColor: '#E91E63',
  darkPrimaryColor: '#C2185B',
  lightPrimaryColor: '#F8BBD0',
  accentColor: '#8BC34A',
};

let greenColor = {
  primaryColor: '#4CAF50',
  darkPrimaryColor: '#388E3C',
  lightPrimaryColor: '#C8E6C9',
  accentColor: '#607D8B',
};

let yellowColor = {
  primaryColor: '#FFC107',
  darkPrimaryColor: '#FFA000',
  lightPrimaryColor: '#FFECB3',
  accentColor: '#795548',
};

export const BaseColor = {
  ...blueColor,
  ...{
    textPrimaryColor: '#212121',
    textSecondaryColor: '#E0E0E1',
    grayColor: '#9B9B9B',
    lightGrayColor: '#D5D5D5',
    darkBlueColor: '#24253D',
    dividerColor: '#BDBDBD',
    whiteColor: '#FFFFFF',
    fieldColor: '#F5F5F5',
    yellowColor: '#FDC60A',
    blueColor: '#5C9Cff',
    navyBlue: '#3C5A99',
    transparent: '#00000000',
  },
};
