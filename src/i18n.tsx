import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: { whatsNew: "What's new" } },
        fr: { translation: { whatsNew: 'Quoi de neuf' } },
    },
    lng: 'en',
    fallbackLng: 'en',
});

export default i18n;
