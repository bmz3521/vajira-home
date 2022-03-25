import firestore from '@react-native-firebase/firestore';

const botAvatar = require('../../../assets/images/vajira-logo.png');

const BOT_USER = {
  _id: 2,
  name: 'Vajira Bot',
  avatar: botAvatar,
};

const getTypeDoctors = async keyword => {
  var result;

  if (keyword == 'back_doctors') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('doctors')
      .get()
      .then(snapshot => {
        result = snapshot.data().back_doctors.map(e => {
          const title = e.title;
          const cv = e.cv;
          const table = e.table;
          const cvType = e.cvType;
          const tableType = e.tableType;
          const image = e.image;

          return { title, cv, table, cvType, tableType, image };
        });
      });
  } else if (keyword == 'shoulder_doctors') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('doctors')
      .get()
      .then(snapshot => {
        result = snapshot.data().shoulder_doctors.map(e => {
          const title = e.title;
          const cv = e.cv;
          const table = e.table;
          const cvType = e.cvType;
          const tableType = e.tableType;
          const image = e.image;

          return { title, cv, table, cvType, tableType, image };
        });
      });
  } else if (keyword == 'wrist_doctors') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('doctors')
      .get()
      .then(snapshot => {
        result = snapshot.data().wrist_doctors.map(e => {
          const title = e.title;
          const cv = e.cv;
          const table = e.table;
          const cvType = e.cvType;
          const tableType = e.tableType;
          const image = e.image;

          return { title, cv, table, cvType, tableType, image };
        });
      });
  } else if (keyword == 'hip_doctors') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('doctors')
      .get()
      .then(snapshot => {
        result = snapshot.data().hip_doctors.map(e => {
          const title = e.title;
          const cv = e.cv;
          const table = e.table;
          const cvType = e.cvType;
          const tableType = e.tableType;
          const image = e.image;

          return { title, cv, table, cvType, tableType, image };
        });
      });
  } else if (keyword == 'foot_doctors') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('doctors')
      .get()
      .then(snapshot => {
        result = snapshot.data().wrist_doctors.map(e => {
          const title = e.title;
          const cv = e.cv;
          const table = e.table;
          const cvType = e.cvType;
          const tableType = e.tableType;
          const image = e.image;

          return { title, cv, table, cvType, tableType, image };
        });
      });
  } else if (keyword == 'bone_doctors') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('doctors')
      .get()
      .then(snapshot => {
        result = snapshot.data().bone_doctors.map(e => {
          const title = e.title;
          const cv = e.cv;
          const table = e.table;
          const cvType = e.cvType;
          const tableType = e.tableType;
          const image = e.image;

          return { title, cv, table, cvType, tableType, image };
        });
      });
  } else if (keyword == 'sport_doctors') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('doctors')
      .get()
      .then(snapshot => {
        result = snapshot.data().sport_doctors.map(e => {
          const title = e.title;
          const cv = e.cv;
          const table = e.table;
          const cvType = e.cvType;
          const tableType = e.tableType;
          const image = e.image;

          return { title, cv, table, cvType, tableType, image };
        });
      });
  } else if (keyword == 'children_doctors') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('doctors')
      .get()
      .then(snapshot => {
        result = snapshot.data().children_doctors.map(e => {
          const title = e.title;
          const cv = e.cv;
          const table = e.table;
          const cvType = e.cvType;
          const tableType = e.tableType;
          const image = e.image;

          return { title, cv, table, cvType, tableType, image };
        });
      });
  } else if (keyword == 'tumor_doctors') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('doctors')
      .get()
      .then(snapshot => {
        result = snapshot.data().tumor_doctors.map(e => {
          const title = e.title;
          const cv = e.cv;
          const table = e.table;
          const cvType = e.cvType;
          const tableType = e.tableType;
          const image = e.image;

          return { title, cv, table, cvType, tableType, image };
        });
      });
  }

  return result;
};

export async function getDoctors(currentLength, text) {
  var doctors = await getTypeDoctors(text);

  return {
    _id: currentLength,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isDoctorCarousel: true,
    data: doctors,
  };
}

const getTypeCVs = async keyword => {
  var result;

  if (keyword == 'back_cv') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('cv')
      .get()
      .then(snapshot => {
        result = snapshot.data().back_cv.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'shoulder_cv') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('cv')
      .get()
      .then(snapshot => {
        result = snapshot.data().shoulder_cv.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'wrist_cv') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('cv')
      .get()
      .then(snapshot => {
        result = snapshot.data().wrist_cv.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'hip_cv') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('cv')
      .get()
      .then(snapshot => {
        result = snapshot.data().hip_cv.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'foot_cv') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('cv')
      .get()
      .then(snapshot => {
        result = snapshot.data().foot_cv.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'bone_cv') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('cv')
      .get()
      .then(snapshot => {
        result = snapshot.data().bone_cv.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'sport_cv') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('cv')
      .get()
      .then(snapshot => {
        result = snapshot.data().sport_cv.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'children_cv') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('cv')
      .get()
      .then(snapshot => {
        result = snapshot.data().children_cv.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'tumor_cv') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('cv')
      .get()
      .then(snapshot => {
        result = snapshot.data().tumor_cv.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  }

  return result;
};

const getTypeTables = async keyword => {
  var result;

  if (keyword == 'back_table') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('table')
      .get()
      .then(snapshot => {
        result = snapshot.data().back_table.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'shoulder_table') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('table')
      .get()
      .then(snapshot => {
        result = snapshot.data().shoulder_table.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'hip_table') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('table')
      .get()
      .then(snapshot => {
        result = snapshot.data().hip_table.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'wrist_table') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('table')
      .get()
      .then(snapshot => {
        result = snapshot.data().wrist_table.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'foot_table') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('table')
      .get()
      .then(snapshot => {
        result = snapshot.data().foot_table.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'bone_table') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('table')
      .get()
      .then(snapshot => {
        result = snapshot.data().bone_table.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'sport_table') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('table')
      .get()
      .then(snapshot => {
        result = snapshot.data().sport_table.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'children_table') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('table')
      .get()
      .then(snapshot => {
        result = snapshot.data().children_table.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  } else if (keyword == 'tumor_table') {
    await firestore()
      .collection('CHATBOT_DATA')
      .doc('table')
      .get()
      .then(snapshot => {
        result = snapshot.data().tumor_table.map(e => {
          const image = e.image;
          const text = e.text;
          return { image, text };
        });
      });
  }

  return result;
};

export async function getCVs(currentLength, keyword, value) {
  var cvs = await getTypeCVs(keyword);

  var result = cvs.filter(e => value == e.text);

  return {
    _id: currentLength,
    text: value,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    image: result[0].image,
  };
}

export async function getTables(currentLength, keyword, value) {
  var tables = await getTypeTables(keyword);

  var result = tables.filter(e => value == e.text);

  return {
    _id: currentLength,
    text: value,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    image: result[0].image,
  };
}
