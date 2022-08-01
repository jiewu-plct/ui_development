<template>
    <!-- <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick"> -->
    <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="Devices" name="Devices">
            <div style="margin: 10px 0 0 0;display: flex;justify-content:space-between; align-items: center;">
                <el-input v-model="search" style="width: 20%;" placeholder="Type to search">
                    <template #prefix>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
                <el-button class="add-button" type="primary">Add Device</el-button>
            </div>
            <div style="margin: 20px 0 0 0"></div>

            <el-table :data="filterDevicesData" :default-sort="{ prop: 'name', order: 'ascending' }" stripe border
                style="width: 100%">
                <el-table-column label="Name" prop="name" />
                <el-table-column label="Owner" prop="owner.username" />
                <el-table-column label="Relay SN" prop="relay.sn" />
                <el-table-column label="Reset OUT" prop="reset" />
                <el-table-column label="Power OUT" prop="power" />
                <el-table-column label="Operations" width="260">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="handleAssign(scope.$index, scope.row)">Assign
                        </el-button>
                        <el-button v-if="role == 'superadmin'" type="warning" size="small"
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button v-if="role == 'superadmin'" type="danger" size="small"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;">
                
            </div>

            <el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-size="pageSize" :total="total" background />
        </el-tab-pane>
        <el-tab-pane label="Relays" name="Relays">Relay</el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios';

interface DeviceItem {
    name: string,
    owner: string[],
    relay_sn: string,
    reset: number,
    power: number
}

const activeName = ref('Devices')
const role = ref(localStorage.getItem('currentRole'))
const config = {
    headers: {
        token: localStorage.getItem('token'),
        'Cache-Control': 'no-cache',
    },
}
let devicesData = ref<DeviceItem[]>([])
const search = ref('')
let currentPage = ref(1)
const pageSize = ref(10)

onMounted(async () => {
    const res = await axios.get('/api/devicelist', config as any)
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
    return function (a: DeviceItem, b: DeviceItem) {
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
const handleClick = (pane: any, ev: Event) => {
    console.log('tab', pane)
    console.log('event', ev)
}

const handleAssign = (_: any, row: DeviceItem) => {

}

const handleEdit = (_: any, row: DeviceItem) => {

}

const handleDelete = (_: any, row: DeviceItem) => {

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
    margin-bottom: 30px;
}
</style>