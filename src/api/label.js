// 需要与后端交互 需要发送ajax请求
import request from "@/utils/request"



// 方式1导出
export default {

  // 查找
  getList() {

    return request({
      url: "/info/label",
      method: 'get'
    });
  },

  // 分页查找
  getPageSearch(page, size, searchMap) {

    return request({

      url: `label/search/${page}/${size}`,
      method: 'post',
      data: searchMap

    });
  },

  // 保存/添加
  save(pojo) {

    return request({

      url: `/label/add`,
      method: 'post',
      data: pojo
    })
  },
  // 修改
  findById(id) {

    return request({
      url: `/lable/modify/${id}`,
      method: 'get'

    })
  },
  // 保存修改
  update(id, pojo) {


    return request({

      url: `/lable/savemodify/${id}`,
      method: 'put',
      data: pojo

    })
  },
  // 删除
  delete(id) {
    return request({

      url: `/lable/delete/${id}`,
      method: 'delete'

    })
  }

}
// 方式1引入
// import 变量名 from '@/api/label'
// 变量名.getList()





// 方式2
// export function getList() {

//     return request({
//         url:"/info/label",
//         method:'get'
//     });
// }
