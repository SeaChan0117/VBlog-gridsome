// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import dayjs from "dayjs"

function copy (message) {
  let doc = document.createElement('input')
  doc.value = message
  document.body.appendChild(doc)
  doc.select()
  let status
  try {
    status = document.execCommand('copy')
  } catch (e) { }
  document.body.removeChild(doc)
  return status
}
export default function (Vue, { router, head, isClient }) {
  Vue.mixin({
    data() {
      return {
        GITHUB_OWNER_URL: 'https://github.com/users/seachan0117'
      }
    }
  })

  Vue.use(ElementUI)
  Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(value).format(format)
  })
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.prototype.$share = function (message) {
    if (!message) {
      message = window.location
    } else {
      let arr = (window.location + '').split('#')
      message = arr[0] + '#' + message
    }
    if (copy(message)) {
      Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'success'
      })
    } else {
      Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'warning'
      })
    }
  }
}
