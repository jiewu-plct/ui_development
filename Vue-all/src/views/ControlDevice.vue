<template>
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
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button
          v-if="scope.row.reset != 0"
          type="primary"
          size="small"
          @click="handleReset(scope.$index, scope.row)"
          >Reset</el-button
        >
        <el-button
          v-if="scope.row.power != 0"
          type="primary"
          size="small"
          @click="handlePowerOn(scope.$index, scope.row)"
          >PowerOn</el-button
        >
        <el-button
          v-if="scope.row.power != 0"
          type="primary"
          size="small"
          @click="handlePowerOff(scope.$index, scope.row)"
          >PowerOff</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    layout="total, prev, pager, next, jumper"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    background
  />
</template>

<script>
import { ref, onMounted, computed } from 'vue'
// import { Search } from '@element-plus/icons-vue'
// import { ref, computed } from 'vue'
// import qs from 'qs'
const axios = require('axios')

export default {
  name: 'ControlDevice',
  setup() {
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
    const handlePowerOn = (index, row) => {
      const params = { device: row.name }
      axios.post('/api/poweron', params, config).then((res) => {
        console.log(res.data)
        alert(res.data.msg)
      })
    }
    const handlePowerOff = (index, row) => {
      // const config = {
      //   headers: { token: localStorage.getItem('token') },
      // }
      const params = { device: row.name }
      axios.post('/api/poweroff', params, config).then((res) => {
        console.log(res.data)
        alert(res.data.msg)
      })
    }
    const handleReset = (index, row) => {
      // console.log('row', row)
      // console.log('index', index)
      // const config = {
      //   headers: { token: localStorage.getItem('token') },
      // }
      const params = { device: row.name }
      axios.post('/api/reset', params, config).then((res) => {
        console.log(res.data)
        alert(res.data.msg)
      })
    }
    const handleCurrentChange = (newPage) => {
      currentPage.value = newPage
    }
    return {
      filterDevicesData,
      total,
      search,
      currentPage,
      pageSize,
      handleCurrentChange,
      handleReset,
      handlePowerOn,
      handlePowerOff,
    }
  },
}
</script>
<style scoped>
.el-pagination {
  text-align: right;
  justify-content: right;
  margin-top: 30px;
}
</style>
