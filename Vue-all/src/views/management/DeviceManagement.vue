<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="Devices" name="first">
      <div style="margin: 20px 0 0 0"></div>
      <el-input
        v-model="search"
        class="w-auto"
        placeholder="Type to search"
        :prefix-icon="Search"
      >
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
      <div style="margin: 20px 0 0 0"></div>

      <el-table
        :data="filterDevicesData"
        :default-sort="{ prop: 'name', order: 'ascending' }"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column label="Name" prop="name" />
        <el-table-column label="Owner" prop="owner.username" />
        <el-table-column label="Relay SN" prop="relay.sn" />
        <el-table-column label="Reset OUT" prop="reset" />
        <el-table-column label="Power OUT" prop="power" />
        <el-table-column label="Operations" width="260">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleAssign(scope.$index, scope.row)"
              >Assign</el-button
            >
            <el-button
              v-if="role == 'superadmin'"
              type="warning"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              v-if="role == 'superadmin'"
              type="danger"
              size="small"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-button class="add-button" type="primary">Add Device</el-button>
      <el-pagination
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        background
      />
      <!-- <div style="margin: 20px 0 0 0"></div> -->
    </el-tab-pane>
    <el-tab-pane label="Relays" name="second">Relay</el-tab-pane>
  </el-tabs>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
const axios = require('axios').default

export default {
  name: 'UserManagement',
  setup() {
    const activeName = ref('first')
    const role = ref(localStorage.getItem('currentRole'))
    const config = {
      headers: {
        token: localStorage.getItem('token'),
        'Cache-Control': 'no-cache',
      },
    }
    let devicesData = ref([])
    const search = ref('')
    let currentPage = ref(1)
    const pageSize = ref(10)

    onMounted(async () => {
      const res = await axios.get('/api/devicelist', config)
      devicesData.value = res.data
      console.log('devicesData', devicesData.value)
    })
    const filterDevicesData = computed(() =>
      devicesData.value
        .filter(
          (filterData) =>
            !search.value ||
            filterData.name.toLowerCase().includes(search.value.toLowerCase()),
        )
        .sort(compare())
        .slice(
          (currentPage.value - 1) * pageSize.value,
          currentPage.value * pageSize.value,
        ),
    )
    const total = computed(
      () =>
        devicesData.value.filter(
          (filterData) =>
            !search.value ||
            filterData.name.toLowerCase().includes(search.value.toLowerCase()),
        ).length,
    )
    const compare = () => {
      return function (a, b) {
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      }
    }
    const handleClick = (tab, event) => {
      console.log('tab', tab)
      console.log('event', event)
    }

    return {
      activeName,
      role,
      filterDevicesData,
      total,
      search,
      currentPage,
      pageSize,
      handleClick,
    }
  },
}
</script>
<style scoped>
.el-pagination {
  text-align: right;
  justify-content: right;
  margin-top: 30px;
  margin-bottom: 30px;
}
.add-button {
  text-align: left;
  justify-content: left;
  margin-top: 30px;
}
</style>
