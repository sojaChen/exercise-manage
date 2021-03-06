import Vue from 'vue'
import App from './App.vue'
// 引入路由配置文件
import router from './router';
// 引入Vuex配置文件
import store from '@/store/index.js'
// 引入element-ui
import { Button, Container, Header, Main, Aside, Menu, Submenu, MenuItemGroup, MenuItem, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form, FormItem, Input, Dialog, DatePicker, Select, Option, Pagination, Popover, Image, Upload } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// 引入mockjs
import '@/mock/mockServer'
// 引入二次封装的axios
import axios from '@/api'
// 引入js-cookie
import Cookies from 'js-cookie'

Vue.config.productionTip = false

// 使用element-ui组件
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(Image);
Vue.use(Upload);

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if (to.path === '/') {
    token ? router.replace('/home') : router.replace('/login');
  } else if (to.path === '/login') {
    if (token) {
      router.replace('/home')
    } else {
      next();
    }
  } else {
    if (!store.state.tab.isAddRoutes) {
      axios
        .post("/userInfo", token)
        .then(({ data: userRes }) => {
          store.commit('user/setUserInfo', userRes.data);
          return axios.post("/menu", token);
        })
        .then(({ data: menuRes }) => {
          store.commit('tab/setMenuList', menuRes.data);
          store.commit('tab/setRoutes');
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
    token ? next() : router.replace('/login')
  }
})

// Vue实例
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
