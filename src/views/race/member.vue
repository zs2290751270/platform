<template>
  <div class="common-layout">
    <el-container>
      <el-header>Race</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              style="height: 100%"
          >
            <el-row class="tac" style="height: 100%">
              <el-col :span="24">
                <el-menu-item index="2" v-on:click="get_team_list">
                  <span>队伍</span>
                </el-menu-item>
                <el-menu-item index="1" v-on:click="get_member_list">
                  <span>选手</span>
                </el-menu-item>
              </el-col>
            </el-row>
          </el-menu>
        </el-aside>
        <el-main>
          <h2 style="text-align: left">
            {{ titleInfo }}信息
          </h2>
          <div class="dataDetail" v-show="showMember">
            <el-table :data="dataListInfo" empty-text="暂无参赛人员">
              <el-table-column prop="member_name" align="center" label="选手"/>
              <el-table-column prop="member_code" align="center" label="工号"/>
              <el-table-column prop="team_name" align="center" label="队伍"/>
              <el-table-column prop="id" label="操作">
                <template #default="scope">
                  <el-button type="primary" link v-on:click="test(scope.row.id)">
                    <span>删除</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="dataDetail" v-show="showTeam">
            <div>
              <el-button type="primary" class="createButton" @click="clickCreateTeamBtn">创建队伍</el-button>
            </div>
            <el-table :data="dataListInfo" empty-text="暂无参赛队伍">
              <el-table-column prop="team_name" align="center" label="队名"/>
              <el-table-column prop="team_win" align="center" label="胜场"/>
              <el-table-column prop="team_lose" align="center" label="败场"/>
              <el-table-column prop="id" label="操作">
                <template #default="scope">
                  <el-popconfirm
                      width="220"
                      confirm-button-text="删除"
                      cancel-button-text="取消"
                      icon-color="#626AEF"
                      title="确定删除该队伍吗？"
                      @confirm="deleteTeam(scope.row.id)"
                  >
                    <template #reference>
                      <el-button type="primary" link>
                        <span>删除</span>
                      </el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog v-model="showCreateTeamDialog" title="Shipping address">
            <el-form :model="form">
              <el-form-item label="Team name">
                <el-input v-model="form.team_name" autocomplete="off"/>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="showCreateTeamDialog = false">取消</el-button>
                <el-button type="primary" @click="confirmCreate">
                  确定
                </el-button>
              </span>
            </template>
          </el-dialog>
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {defineComponent, reactive} from "vue";
import axios from "../../api";

export default defineComponent({
  name: 'MemberView',
  data() {
    return {
      total: 0,
      dataListInfo: [],
      currentPage: 1,
      pageSize: 10,
      dataUlr: "",
      titleInfo: "队伍",
      showTeam: true,
      showMember: false,
      showCreateTeamDialog: false,
      form: reactive({
        team_name: ''
      })
    }
  },
  created() {
    this.get_team_list()
  },
  methods: {
    get_data_list() {
      axios.get(this.dataUlr, {
        params: {
          'limit': this.pageSize,
          'offset': (this.currentPage - 1) * this.pageSize
        }
      }).then(res => {
        this.total = res.data.count
        this.dataListInfo = res.data.results
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.get_data_list()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.get_data_list()
    },
    get_member_list() {
      this.dataUlr = '/api/race/member/'
      this.get_data_list()
      this.titleInfo = '选手'
      this.showMember = true
      this.showTeam = false
      this.pageSize = 10
    },
    get_team_list() {
      this.dataUlr = '/api/race/team/'
      this.get_data_list()
      this.titleInfo = '队伍'
      this.showMember = false
      this.showTeam = true
      this.pageSize = 10
    },
    test(con) {
      alert(con)
    },
    clickCreateTeamBtn() {
      this.showCreateTeamDialog = true
    },
    confirmCreate(){
      this.showCreateTeamDialog = false
      console.log(this.form)
      axios.post('/api/race/team/', this.form).then(res => {
        const resp = res.data.results
        console.log(resp)
      })
      this.get_team_list()
    },
    deleteTeam(id){
      const deleteUrl = '/api/race/team/' + id
      axios.delete(deleteUrl).then(res => {
        console.log(res.data)
        this.get_team_list()
      })
    }
  }
})
</script>

<style scoped>
.createButton {
  position: relative;
  float: left;
}

.pageFooter {
  position: relative;
  float: right;
}

.dataDetail {
  position: relative;
  float: right;
  width: 100%;
}
</style>