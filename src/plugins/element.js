import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  DatePicker,
  Table,
  TableColumn,
  Pagination,
  Select,
  Option,
  Image,
  Switch,
  Link
} from 'element-ui'
// import ElementUI from 'element-ui'
// import 'element-ui'

Vue.use(Button)
.use(Form)
.use(FormItem)
.use(Input)
.use(DatePicker)
.use(Table)
.use(TableColumn)
.use(Pagination)
.use(Select)
.use(Option)
.use(Image)
.use(Switch)
.use(Link)
// .use(DateTimePicker)

Vue.prototype.$message = Message
// Vue.use(ElementUI)