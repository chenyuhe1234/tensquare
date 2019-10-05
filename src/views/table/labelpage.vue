<!-- 模板模块-->
<template>
  <div>
    <br />
    <el-form ref="form" :model="searchMap" label-width="80px" inline="true">
      <el-form-item label="活动名称">
        <el-input v-model="searchMap.name"></el-input>
      </el-form-item>

      <el-form-item label="活动时间">
        <el-col :span="8">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="searchMap.startTime"
            style="width:100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <!-- <label>-</label> -->
        <el-col :span="8">
          <el-date-picker placeholder="选择时间" v-model="searchMap.endTime" style="width:100%"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchData()">查询</el-button>
        <el-button type="text" @click="handEdit('')">点击打开 Dialog</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="活动ID" width="180"></el-table-column>
      <el-table-column prop="name" label="获取名称" width="180"></el-table-column>
      <el-table-column prop="address" label="活动地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handEdit(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteClick(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[10,20,30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 弹出窗口 -->
    <el-dialog title="新增/编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form label-width="80px">
        <!-- 活动名称 -->
        <el-form-item label="活动名称">
          <el-input v-model="pojo.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <!-- 基本地址 -->
        <el-form-item label="基本地址">
          <el-input v-model="pojo.address" placeholder="基本地址"></el-input>
        </el-form-item>
        <!-- 开始日期 截至日期 -->
        <el-form-item label="开始日期">
          <el-date-picker type="date" v-model="pojo.startTime" placeholder="开始日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="截至日期">
          <el-date-picker type="date" v-model="pojo.endTime" placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <!-- 报名截止日期 -->
        <el-form-item label="报名截止">
          <el-date-picker type="date" v-model="pojo.enrolltime" placeholder="报名截止日期"></el-date-picker>
        </el-form-item>
        <!-- 活动详情 -->
        <el-form-item label="活动详情">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="pojo.detail"></el-input>
        </el-form-item>

        <!-- 城市 -->
        <el-form-item label="城市">
          <el-select v-model="pojo.city" placeholder="请选择">
            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!-- 是否可见 -->
        <el-form-item label="是否可见">
          <el-switch
            v-model="pojo.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <!-- 保存 -->
        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>


<!-- 逻辑区 -->
<script>
import labelAPI from "@/api/label";
// 导入城市
import cityAPI from "@/api/city2";
export default {
  //
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页
      pageSize: 10, // 每页大小
      searchMap: {}, // 查询表单绑定的变量
      dialogVisible: false,
      pojo: {}, // 编辑表单绑定的实体对象
      cityList: [],
      id: "" // 当前用户修改的id
    };
  },

  // 钩子函数页面打开的时候进行操作
  created() {
    this.fetchData();
    cityAPI.getCitys().then(response => {
      this.cityList = response.data;
    });
  },
  methods: {
    fetchData() {
      // 用ES6箭头函数，箭头方法可以和父方法共享变量
      labelAPI
        .getPageSearch(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;
        });
    },
    handleSave() {
      if (this.id == "") {
        labelAPI.save(this.pojo).then(response => {
          // alert(response.message);  新增成功

          // if (this.flag) {
          //   this.$message({
          //     message: response.message,
          //     type: "success"
          //   });
          // } else {
          //   this.$message({
          //     message: response.message,
          //     type: "error"
          //   });
          // }

          this.$message({
            message: response.message,
            type: response.flag ? "success" : "error"
          });

          if (response.flag) {
            this.fetchData(); // 刷新列表
          }
        });
      } else {
        labelAPI.update(this.id, this.pojo).then(response => {
          // alert(response.message); 修改成功

          // if (this.flag) {
          //   this.$message({
          //     message: response.message,
          //     type: "success"
          //   });
          // } else {
          //   this.$message({
          //     message: response.message,
          //     type: "error"
          //   });
          // }

          this.$message({
            message: response.message,
            type: response.flag ? "success" : "error"
          });

          if (response.flag) {
            this.fetchData();
          }
        });
      }

      this.dialogVisible = false; // 关闭窗口
    },
    handEdit(id) {
      this.dialogVisible = true; // 打开窗口
      this.id = id;
      // 调用查询接口

      if (id != "") {
        labelAPI.findById(id).then(response => {
          if (response.flag) {
            this.pojo = response.data;
          }
        });
      } else {
        this.pojo = {}; // 清空数据
      }
    },
    handClick(row) {
      console.log(row);
    },
    deleteClick(id) {
      labelAPI.delete().then(response => {
        // this.$message({
        //   message: response.message,
        //   type: response.flag ? "success" : "error"
        // });

        this.$confirm("确定要删除此条记录吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          // 确定要删除后执行的操作
          .then(() => {
            this.$message({
              message: response.message,
              type: response.flag ? "success" : "error"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    }
  }
};
</script>