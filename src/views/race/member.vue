<template>
  <el-container>
    <el-aside width="20%">
      <div>
        <span>
          选手
        </span>
      </div>
    </el-aside>
    <el-main>
      <div class="memberDetail">
        <div>
          <el-table :data="memberListInfo" empty-text="暂无参赛人员" style="background-color: #00aa2a" width="190%">
            <el-table-column prop="member_name" align="center" label="选手"/>
            <el-table-column prop="member_code" align="center" label="工号"/>
            <el-table-column prop="team_name" align="center" label="队伍"/>
            <el-table-column label="操作">
              <div class="flex justify-space-between mb-4 flex-wrap gap-4">
                <el-button type="primary" link>删除</el-button>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <div class="pageFooter">
          <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                v-model:current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {defineComponent} from "vue";
import axios from "../../api";

export default defineComponent({
  name: 'MemberView',
  data() {
    return {
      total: 0,
      memberListInfo: [],
      currentPage: 1,
      pageSize: 10,
      url: '/api/race/member/'
    }
  },
  created() {
    this.get_member_list()
  },
  methods: {
    get_member_list() {
      axios.get(this.url, {
        params: {
          'limit': this.pageSize,
          'offset': (this.currentPage - 1) * this.pageSize
        }
      }).then(res => {
        this.total = res.data.count
        this.memberListInfo = res.data.results
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.get_member_list()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.get_member_list()
    },
  }
})
</script>

<style scoped>

.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

body .el-table th.gutter{
  display: table-cell!important;
}

.pageFooter {
  position: relative;
  float: right;
}
.memberDetail {
  width: 100%;
  //background-color: #00aa2a;
}
</style>