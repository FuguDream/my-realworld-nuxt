import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('dateFilter', (value, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(formatter)
})