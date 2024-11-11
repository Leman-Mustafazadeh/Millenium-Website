import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
          home: 'Home',
          about: 'About Us',
          contact: 'Contact Us',
          about_item1:'Our_company',
          about_item2:'Our_team',
          about_item3:'Awards_licenses',
          tours:'Tours',
          tour_incoming:'Incoming',
          tours_outgoing:'Outgoing',
        },
      },
      az: {
        translation: {
          home: 'Ev',
          about: 'Haqqımızda',
          contact: 'Əlaqə',
          // Digər azərbaycan dilindəki tərcümələri bura əlavə edin
        },
      },
      ru: {
        translation: {
          home: 'Главная',
          about: 'О нас',
          contact: 'Контакты',
          // Digər rus dilindəki tərcümələri bura əlavə edin
        },
      },
    },
    lng: 'en', // default dil
    fallbackLng: 'en', // fallback dil, əgər dil tapılmasa
    interpolation: {
      escapeValue: false, // react-də JSX istifadə ediriksə
    },
  });

export default i18n;
