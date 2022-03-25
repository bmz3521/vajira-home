export const backPressHandler = text => {
  let backTo = 'main';
  const textCheck = text.split('-')[0];
  if (
    [
      'sports',
      'hand',
      'childs',
      'elbow',
      'feet',
      'backache',
      'neckpain',
      'oncology',
      'kneepain',
    ].includes(textCheck)
  ) {
    Object.keys(listOfMenu[textCheck]).forEach(e => {
      if (listOfMenu[textCheck][e].data?.includes(text)) {
        backTo = listOfMenu[textCheck][e].tag;
      }
    });
  }
  return backTo;
};

const listOfMenu = {
  /** NOTE Kneepain */
  kneepain: {
    mainPage: {
      tag: 'kneepain',
      data: ['kneepain-questions'],
    },
    teen: {
      tag: 'kneepain-cause-adult',
      data: [
        'kneepain-cause-adult-1',
        'kneepain-cause-adult-2',
        'kneepain-cause-adult-3',
        'kneepain-cause-adult-4',
      ],
    },
    adult: {
      tag: 'kneepain-cause-teen',
      data: [
        'kneepain-cause-teen-1',
        'kneepain-cause-teen-2',
        'kneepain-cause-teen-3',
      ],
    },
    subMain: {
      tag: 'kneepain-cause',
      data: ['kneepain-cause-main'],
    },
  },
  /** NOTE Neackpain */
  oncology: {
    mainPage: {
      tag: 'oncology',
      data: ['oncology-cause', 'oncology-question'],
    },
  },
  neckpain: {
    mainPage: {
      tag: 'neckpain',
      data: [
        'neckpain-cause',
        'neckpain-riskpoint',
        'neckpain-treatment',
        'neckpain-symptom',
      ],
    },
    symtom: {
      tag: 'neckpain-symptom',
      data: ['neckpain-symptom-normal', 'neckpain-symptom-bringhospital'],
    },
    mainSymtom: {
      tag: 'neckpain-symptom-bringhospital',
      data: [
        'neckpain-symptom-bringhospital-positive',
        'neckpain-symptom-bringhospital-negative',
      ],
    },
  },
  /** NOTE Backache */
  backache: {
    mainPage: {
      tag: 'backache',
      data: [
        'backache-cause',
        'backache-bringhospital',
        'backache-wayTreat',
        'backache-risk',
        'backache-withcase',
      ],
    },
    shouldToHospital: {
      tag: 'backache-bringhospital',
      data: [
        'backache-bringhospital-positive',
        'backache-bringhospital-negative',
      ],
    },
    wayTreat: {
      tag: 'backache-wayTreat',
      data: ['backache-heal1', 'backache-heal2'],
    },
    withCase: {
      tag: 'backache-withcase',
      data: [
        'backache-withcase-1',
        'backache-withcase-2',
        'backache-withcase-3',
      ],
    },
  },
  /** NOTE  Sports */
  sports: {
    sportMuscle: {
      tag: 'sports-muscle',
      data: [
        'sports-muscle-strain',
        'sports-muscle-soreness',
        'sports-muscle-contusion',
        'sports-muscle-cramp',
      ],
    },
    sportShoulder: {
      tag: 'sports-should',
      data: [
        'sports-should-dislocation',
        'sports-should-shFracture',
        'sports-should-shBicipitalTendinitis',
        'sports-should-shSubacromialBursitis',
        'sports-should-shGlenoidLabrumTear',
        'sports-should-shRotatorCuffTear',
      ],
    },
    sportKnee: {
      tag: 'sports-knee',
      data: [
        'sports-knee-knCruciateLigament',
        'sports-knee-knMeniscal',
        'sports-knee-knDislocation',
        'sports-knee-knTibiaOrFibulaFracture',
      ],
    },
    sportFoot: {
      tag: 'sports-foot',
      data: ['sports-foot-ftFracture', 'sports-foot-ftLisfranc'],
    },
    sportAnkle: {
      tag: 'sports-ankle',
      data: ['sports-ankle-anSprain', 'sports-ankle-anFracture'],
    },
  },
  /** NOTE Hand */
  hand: {
    handPainWrist: {
      tag: 'hand-pain-wrist',
      data: ['hand-pain-wrist-tenosynovitis', 'hand-pain-wrist-osteoarthritis'],
    },
    handMain: {
      tag: 'hand',
      data: ['hand-question'],
    },
    handCause: {
      tag: 'hand-cause',
      data: ['hand-sub-main'],
    },
    handPainHands: {
      tag: 'hand-pain-hands',
      data: ['hand-pain-hands-triggerfinger', 'hand-pain-hands-steoarthritis'],
    },
    handBeri: {
      tag: 'hand-beri',
      data: [
        'hand-beri-carpal',
        'hand-beri-cubital',
        'hand-beri-cervical',
        'hand-beri-guyoncanal',
        'hand-beri-pronator',
        'hand-beri-peripheralneuropathy',
      ],
    },
  },
  /** NOTE Childs */
  childs: {
    childImflam: {
      tag: 'childs-infected',
      data: ['childs-infected-inflam', 'childs-infected-joint'],
    },
    childNeck: {
      tag: 'childs-deformed',
      data: ['childs-deformed-neck'],
    },
    childBack: {
      tag: 'childs-deformed-back',
      data: [
        'childs-deformed-back-scoliosis',
        'childs-deformed-back-kyphosis',
        'childs-deformed-elbow-lordosis',
      ],
    },
    childElbow: {
      tag: 'childs-deformed',
      data: ['childs-deformed-elbow'],
    },
    childHip: {
      tag: 'childs-deformed-hip',
      data: ['childs-deformed-hip-dysplasia', 'childs-deformed-hip-epiphysis'],
    },
    childKnee: {
      tag: 'childs-deformed-knee',
      data: [
        'childs-deformed-knee-physiologicBowed',
        'childs-deformed-knee-tibiaVara',
        'childs-deformed-knee-physiologicBowedOther',
        'childs-deformed-knee-congenitalBowing',
      ],
    },
    childFoot: {
      tag: 'childs-deformed-foot',
      data: ['childs-deformed-foot-clubfoot', 'childs-deformed-foot-flatfoot'],
    },
    childFings: {
      tag: 'childs-deformed-finger',
      data: [
        'childs-deformed-finger-polydactyly',
        'childs-deformed-finger-syndactyly',
      ],
    },
  },
  /** NOTE Elbow */
  elbow: {
    elbowAnterior: {
      tag: 'elbow-anterior',
      data: ['elbow-anterior-distal', 'elbow-anterior-pronator'],
    },
    elbowPosterior: {
      tag: 'elbow-posterior',
      data: ['elbow-posterior-olecranon', 'elbow-posterior-triceps'],
    },
    elbowLateral: {
      tag: 'elbow-lateral',
      data: ['elbow-lateral-tennis'],
    },
    elbowMedial: {
      tag: 'elbow-medial',
      data: ['elbow-medial-golfer', 'elbow-medial-cubital'],
    },
  },
  feet: {
    feetCause: {
      tag: 'feet-cause',
      data: [
        'feet-cause-6',
        'feet-cause-7',
        'feet-cause-5-selfcare',
        'feet-cause-1',
        'feet-cause-2',
        'feet-cause-3',
        'feet-cause-4',
      ],
    },
  },
};
