<template>
    <div style="display: flex;">
        <el-input v-model="search" style="width: 20%;" placeholder="Type to search" :prefix-icon="Search">
        </el-input>
    </div>
    <div style="margin: 20px 0 0 0"></div>

    <el-table :data="filterDevicesData" :default-sort="{ prop: 'name', order: 'ascending' }" stripe border
        style="width: 100%">
        <el-table-column label="Name" prop="name" />
        <el-table-column label="Operations">
            <template #default="scope">
                <el-button v-if="scope.row.reset != 0" type="primary" size="small"
                    @click="handleReset(scope.$index, scope.row)">Reset</el-button>
                <el-button v-if="scope.row.power != 0" type="primary" size="small"
                    @click="handlePowerOn(scope.$index, scope.row)">PowerOn</el-button>
                <el-button v-if="scope.row.power != 0" type="primary" size="small"
                    @click="handlePowerOff(scope.$index, scope.row)">PowerOff</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-size="pageSize" :total="total" background />
</template> 

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'
import { computed } from '@vue/reactivity';
import { Search } from '@element-plus/icons-vue' // this line is necessary if you want to use :prefix-icon="Search"

interface DeviceItem {
    name: string,
    reset: number,
    power: number,
}

const search = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const config = {
    headers: {
        token: localStorage.getItem('token'),
        'Cache-Control': 'no-cache', // ?
    }
}
const devicesData = ref<DeviceItem[]>([{ name: '', reset: 0, power: 0 }])

const filterDevicesData = computed(() =>
    devicesData.value.filter((filterData) =>
        !search.value ||
        filterData.name.toLowerCase().includes(search.value.toLowerCase()),
    ).sort(compare())
        .slice(
            (currentPage.value - 1) * pageSize.value,
            currentPage.value * pageSize.value,
        ),
)
const total = computed(() =>
    devicesData.value.filter(
        (filterData) =>
            !search.value ||
            filterData.name.toLowerCase().includes(search.value.toLowerCase()),
    ).length,
)

const compare = () => {
    return function (a: DeviceItem, b: DeviceItem) {
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
    }
}

const handlePowerOn = (_: number, row: DeviceItem) => {
    const params = { device: row.name }
    axios.post('/api/poweron', params, config as any).then((res) => {
        console.log(res.data)
        alert(res.data.msg)
    })
}
const handlePowerOff = (_: number, row: DeviceItem) => {
    const params = { device: row.name }
    axios.post('/api/poweroff', params, config as any).then((res) => {
        console.log(res.data)
        alert(res.data.msg)
    })
}
const handleReset = (_: number, row: DeviceItem) => {
    const params = { device: row.name }
    axios.post('/api/reset', params, config as any).then((res) => {
        console.log(res.data)
        alert(res.data.msg)
    })
}

const handleCurrentChange = (newPage: number) => {
    currentPage.value = newPage
}
</script>

<style scoped>
.el-pagination {
    text-align: right;
    justify-content: right;
    margin-top: 30px;
}
</style>