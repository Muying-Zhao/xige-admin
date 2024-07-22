import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import locale from 'element-plus/es/locale/lang/zh-cn'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import store from '@/store'
// 包含图标的全局注册
// import * as ElIcons from '@element-plus/icons-vue'

export default (app) => {
  // app.use(ElementPlus, { locale })
  app.use(ElementPlus, { locale: store.getters.language === 'en' ? en : zhCn })
  // 全局注册所有 Element Plus 图标
  // for (const [key, component] of Object.entries(ElIcons)) {
  //   app.component(key, component)
  // }
}
