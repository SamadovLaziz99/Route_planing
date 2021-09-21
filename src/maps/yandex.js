import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '1abe9aa1-66ec-4c7f-8b93-a4e0bc25319e',
  // apiKey: '8fb635ed-f033-4166-8286-a5388bb7d9a9',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}

Vue.use(YmapPlugin, settings)
