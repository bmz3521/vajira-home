import i18n from 'i18next';

// import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-locize-backend';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

const locizeOptions = {
  projectId: 'e1eb9316-2ae6-44a9-be1b-582e6f5e4b79',
  apiKey: '',
  // YOU should not expose your apps API key to production!!!
  referenceLng: 'en-US',
};

i18n
  // i18next-locize-backend
  // loads translations from your project, saves new keys to it (saveMissing: true)
  // https://github.com/locize/i18next-locize-backend
  .use(Backend)
  // locize-lastused
  // sets a timestamp of last access on every translation segment on locize
  // -> safely remove the ones not being touched for weeks/months
  // https://github.com/locize/locize-lastused
  // .use(LastUsed)
  // locize-editor
  // InContext Editor of locize ?locize=true to show it
  // https://github.com/locize/locize-editor
  // .use(Editor)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(languageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    ns: ['mobile-app'],
    fallbackLng: 'en-US',
    debug: true,
    saveMissing: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: locizeOptions,

    // locizeLastUsed: locizeOptions,
    // editor: {
    //   ...locizeOptions,
    //   onEditorSaved: async (lng, ns) => {
    //     // reload that namespace in given language
    //     await i18n.reloadResources(lng, ns);
    //     // trigger an event on i18n which triggers a rerender
    //     // based on bindI18n below in react options
    //     i18n.emit('editorSaved');
    //   },
    // },
    react: {
      bindI18n: 'languageChanged editorSaved',
    },
  });

export default i18n;
