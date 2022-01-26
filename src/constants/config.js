import { UserRole } from "../utils/auth.roles";

export const defaultMenuType = 'menu-sub-hidden' // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const adminRoot = '/app';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`
export const buyUrl = 'https://1.envato.market/nEyZa'
export const apiUrl = 'https://api.coloredstrategies.com';

export const subHiddenBreakpoint = 1440
export const menuHiddenBreakpoint = 768

export const defaultLocale = 'ru'
export const defaultDirection = 'ltr'
export const localeOptions = [
  // { id: 'en', name: 'English' },
  { id: 'ru', name: 'Русский' },
  { id: 'uz', name: "O'zbekcha" },
]
export const defaultMap = {
  api: 'https://api-maps.yandex.ru/2.1/?apikey=8fb635ed-f033-4166-8286-a5388bb7d9a9&lang=ru_RU',
  // apiKey: '8fb635ed-f033-4166-8286-a5388bb7d9a9',
  // invalid key:    1abe9aa1-66ec-4c7f-8b93-a4e0bc25319e
  // new key:        d9e61f31-6b9b-4dfc-a43b-47dd38917a17
  center: [41.312947, 69.280204],
  home: [41.324174, 69.290130]
}
export const firebaseConfig = {
  apiKey: "AIzaSyDe94G7L-3soXVSpVbsYlB5DfYH2L91aTU",
  authDomain: "piaf-vue-login.firebaseapp.com",
  databaseURL: "https://piaf-vue-login.firebaseio.com",
  projectId: "piaf-vue-login",
  storageBucket: "piaf-vue-login.appspot.com",
  messagingSenderId: "557576321564",
  appId: "1:557576321564:web:bc2ce73477aff5c2197dd9"
};




export const currentUser = {
  id: 1,
  title: 'John Doe',
  img: '/assets/img/profiles/l-3.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.Admin
}
export const whiteList = ['login', 'register', 'forgot-password', 'reset-password']
export const isAuthGuardActive = true
export const themeRadiusStorageKey = 'theme_radius'
export const themeSelectedColorStorageKey = 'theme_selected_color'
export const defaultColor = 'light.orangecarrot'
export const colors = ['bluenavy', 'blueyale', 'blueolympic', 'greenmoss', 'greenlime', 'purplemonster', 'orangecarrot', 'redruby', 'yellowgranola', 'greysteel']
