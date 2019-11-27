// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import Mint from 'mint-ui';
Vue.use(Mint);

import Vant from 'vant';
import 'vant/lib/index.css';
import { Icon } from 'vant';
Vue.use(Icon);
Vue.use(Vant);
import {Tabbar, TabbarItem} from 'vant';
Vue.use(Tabbar).use(TabbarItem);
import {AddressEdit} from 'vant';
Vue.use(AddressEdit);
import { Toast } from 'vant';
Vue.use(Toast);
import {Area} from 'vant';
Vue.use(Area);
import {SubmitBar} from 'vant';
Vue.use(SubmitBar);
import {Checkbox, CheckboxGroup} from 'vant';
Vue.use(Checkbox).use(CheckboxGroup);
import { Dialog } from 'vant';
Vue.use(Dialog);
import { Popup } from 'vant';
Vue.use(Popup);
import { ImagePreview } from 'vant';

Vue.use(ImagePreview);
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

import {Step, Steps} from 'vant';
Vue.use(Step).use(Steps);
import "swiper/dist/css/swiper.min.css"
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import request from '../src/components/utils/request'
Vue.prototype.request = request
Vue.config.productionTip = true
//引入store
import store from '@/store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //让状态管理生效
  store,
  components: { App },
  template: '<App/>'
})
