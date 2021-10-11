import Vue from 'vue'
import en from './en.json'
import ru from './ru.json'
import uz from './uz.json'
import VueI18n from 'vue-i18n'
import { getCurrentLanguage } from "../utils";


Vue.use(VueI18n);
const messages = {
  en: en,
  ru: ru,
  uz: uz
};
const locale = getCurrentLanguage();

const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages
});

export default i18n
