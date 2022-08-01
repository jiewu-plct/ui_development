<template>
    <div class="container">
        Last Updated {{devicesReceiver.last_update}}
        <div class="devices-info">
            <DeviceInfoVis v-for="deviceData in devicesDataFiltered" v-if="devicesReceiver.last_update"
                :data="deviceData" />
        </div>
    </div>

    <el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-size="pageSize" :total="total" background />

    this is Dashboard
</template>

<script setup lang="ts">
import { fetchData } from '../utils';
import DeviceInfoVis from '../components/DeviceInfoVis.vue';
import { onMounted, reactive, ref } from 'vue';
import { DevicesReceiver, DeviceData } from "../types";
import { computed } from '@vue/reactivity';

const devicesReceiver = reactive<DevicesReceiver>({
    data: [],
    last_update: ''
})

let currentPage = ref(1)
const pageSize = ref(12)
const total = computed(() => devicesReceiver.data.length) 

const devicesDataFiltered = computed(() => devicesReceiver.data
    .sort(compare)
    .slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
)

onMounted(async () => {
    await fetchData('/api/mockDevices', devicesReceiver)
    console.log(devicesReceiver.data);

})

const handleCurrentChange = (newPage: number) => {
    currentPage.value = newPage
}

const compare = function (a: DeviceData, b: DeviceData) {
    let nameA = a.hostname.toUpperCase()
    let nameB = b.hostname.toUpperCase()
    if (nameA < nameB) {
        return -1
    }
    if (nameA > nameB) {
        return 1
    }
    return 0
}

</script>

<style scoped>
.devices-info {
    display: flex;
    flex-wrap: wrap;
}

.el-scrollbar {
    height: 300px;
}
</style>