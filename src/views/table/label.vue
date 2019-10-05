<!-- 模板模块-->
<template>
      <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="活动ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="获取名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="活动地址">
      </el-table-column>
    </el-table>
</template>


<!-- 逻辑区 -->
<script>
import labelAPI from '@/api/label'
export default {

   
    // 
    data() {
        return {
            list:[]
        }
    },

    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            // 用ES6箭头函数，箭头方法可以和父方法共享变量
            labelAPI.getList().then(response => {          
                       this.list=response.data        
                    }); 

        }
    }
    
}
</script>