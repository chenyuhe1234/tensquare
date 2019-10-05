import request from '@/utils/request'
export default {
  getCitys() {
    return request({
      url: '/base/city',
      method: 'get'
    });
  }
}
