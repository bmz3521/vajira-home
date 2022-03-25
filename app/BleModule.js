import { BleManager, BleErrorCode } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

export default class BleModule {
  constructor() {
    this.isConnecting = false;
    this.manager = new BleManager();
  }

  /**
   * Stop searching for Bluetooth
   * */
  stopScan() {
    this.manager.stopDeviceScan();
    console.log('stopDeviceScan');
  }

  /**
   * Connect Bluetooth
   * */
  connect(id) {
    console.log('isConneting:', id);
    this.isConnecting = true;
    return new Promise((resolve, reject) => {
      this.manager
        .connectToDevice(id)
        .then(device => {
          console.log('connect success:', device.name, device.id);
          this.peripheralId = device.id;
          // resolve(device);
          return device.discoverAllServicesAndCharacteristics();
        })
        .then(device => {
          return device.services();
        })
        .then(services => {
          // console.log('fetchServicesAndCharacteristicsForDevice', services);
          this.isConnecting = false;
          resolve();
        })
        .catch(err => {
          this.isConnecting = false;
          console.log('connect fail: ', err);
          reject(err);
        });
    });
  }

  /**
   * Disconnect Bluetooth
   * */
  disconnect() {
    return new Promise((resolve, reject) => {
      this.manager
        .cancelDeviceConnection(this.peripheralId)
        .then(res => {
          // console.log('disconnect success', res);
          console.log('disconnect success');
          resolve(res);
        })
        .catch(err => {
          reject(err);
          console.log('disconnect fail', err);
        });
    });
  }

  /**
   * Write data
   * */
  write(value) {
    //   console.log('value....');
    //   console.log(value);

    let formatValue;
    let transactionId = 'write';

    const dataMostSignificantByte = (value >> 8) & 0xff;
    const dataLeastSignificantByte = value & 0xff;

    const dataByteArrayInLittleEndian = [
      dataLeastSignificantByte,
      dataMostSignificantByte,
    ];
    formatValue = Buffer.from(dataByteArrayInLittleEndian).toString('base64');

    //     console.log(value);
    //     console.log(dataMostSignificantByte);
    //     console.log(dataLeastSignificantByte);
    //     console.log(dataByteArrayInLittleEndian);

    return new Promise((resolve, reject) => {
      this.manager
        .writeCharacteristicWithResponseForDevice(
          this.peripheralId,
          '00001808-0000-1000-8000-00805f9b34fb',
          '00002a52-0000-1000-8000-00805f9b34fb',
          formatValue,
          transactionId,
        )
        .then(
          characteristic => {
            //   console.log('write success', value);
            resolve(characteristic);
          },
          error => {
            console.log('write fail: ', error);
            // this.alert('write fail: ', error.reason);

            reject(error);
          },
        );
    });

    // return new Promise((resolve, reject) => {
    //   this.manager
    //     .writeCharacteristicWithResponseForDevice(
    //       this.peripheralId,
    //       '00001808-0000-1000-8000-00805f9b34fb',
    //       '00002a52-0000-1000-8000-00805f9b34fb',
    //       formatValue,
    //       transactionId,
    //     )
    //     .then(
    //       characteristic => {
    //         //   console.log('write success', value);
    //         resolve(characteristic);
    //       },
    //       error => {
    //         console.log('write fail: ', error);
    //         // this.alert('write fail: ', error.reason);

    //         reject(error);
    //       },
    //     );
    // });
  }

  /**
   * Uninstall Bluetooth Manager
   * */
  destroy() {
    this.manager.destroy();
  }

  /**
   * Convert string to byte array
   */
  stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10ffff) {
        bytes.push(((c >> 18) & 0x07) | 0xf0);
        bytes.push(((c >> 12) & 0x3f) | 0x80);
        bytes.push(((c >> 6) & 0x3f) | 0x80);
        bytes.push((c & 0x3f) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00ffff) {
        bytes.push(((c >> 12) & 0x0f) | 0xe0);
        bytes.push(((c >> 6) & 0x3f) | 0x80);
        bytes.push((c & 0x3f) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007ff) {
        bytes.push(((c >> 6) & 0x1f) | 0xc0);
        bytes.push((c & 0x3f) | 0x80);
      } else {
        bytes.push(c & 0xff);
      }
    }
    return bytes;
  }

  /**
   * Convert byte array to string
   */
  byteToString(arr) {
    if (typeof arr === 'string') {
      return arr;
    }
    var str = '',
      _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
      if (v && one.length == 8) {
        var bytesLength = v[0].length;
        var store = _arr[i].toString(2).slice(7 - bytesLength);
        for (var st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2);
        }
        str += String.fromCharCode(parseInt(store, 2));
        i += bytesLength - 1;
      } else {
        str += String.fromCharCode(_arr[i]);
      }
    }
    return str;
  }
}
