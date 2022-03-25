import ImagePicker from 'react-native-image-picker';

export const ImagePickerManager = (type, option) => {
  if (type === 'camera') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        ImagePicker.launchCamera(option, response => {
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.error) {
            reject('ImagePicker Error: ', response.error);
          } else if (response.camera) {
            reject('User tapped custom button: ', response.camera);
          } else {
            const source = response;
            resolve(source);
          }
        });
      }, 400); //wait 400ms
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        ImagePicker.launchImageLibrary(option, response => {
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.error) {
            reject('ImagePicker Error: ', response.error);
          } else if (response.camera) {
            reject('User tapped custom button: ', response.camera);
          } else {
            const source = response;
            resolve(source);
          }
        });
      }, 400);
    });
  }
};
