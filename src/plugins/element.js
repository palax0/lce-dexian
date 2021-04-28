import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
// import ElementUI from 'element-ui'
// import 'element-ui'

Vue.use(Button)
Vue.use(Form).use(FormItem).use(Input)
Vue.prototype.$message = Message
// Vue.use(ElementUI)