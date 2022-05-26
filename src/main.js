import Vue from 'vue'
import App from './App.vue'
// 引入路由配置文件
import router from './router';
// 引入Vuex配置文件
import store from '@/store/index.js'
// 引入element-ui
import { Button, Container, Header, Main, Aside, Menu, Submenu, MenuItemGroup, MenuItem, Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form, FormItem, Input, Dialog, DatePicker, Select, Option, Pagination } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// 引入mockjs
import '@/mock/mockServer'

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

router.beforeEach((to,from,next)=>{
  if (to.path !== '/login' && Object.keys(store.state.user.userInfo).length === 0) {
    router.replace('/login')
  }else{
    next();
  }
})

// Vue实例
new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('tab/setMenuList')
  }
}).$mount('#app')
