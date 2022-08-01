<template>
    <el-card class="device-info" :body-style="{ width: '100%', height: '80%', padding: '0px' }">
        <template #header>
            <div class="card-header">
                <span>
                    <p style="font-size: small;font-weight: bold;">{{ props.data.hostname }}</p>
                    <p style="font-size: x-small">{{ props.data.ip }}</p>
                </span>
                <el-button type="primary" @click="change" size="small" >{{ view }}</el-button>
            </div>
        </template>
        <ChartGauge :data="[gaugeData_CPU, gaugeData_memory]" v-if="view === 'Gauge'" />
        <div class="flex-center">
            <ChartTable :data="tableData" v-if="view === 'Detail'" />
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { DeviceData } from "../types";
import { ref } from 'vue'

import ChartGauge from "./ChartGauge.vue";
import ChartTable from "./ChartTable.vue"

type View = 'Detail' | 'Gauge'

const props = defineProps<{
    data: DeviceData
}>();

const view = ref<View>('Gauge')

const gaugeData_CPU = computed(() => {
    return {
        min: 0,
        max: 100,
        value: props.data.cpu_load,
        name: 'CPU LOAD',
    }
})

const gaugeData_memory = computed(() => {
    return {
        min: 0,
        max: props.data.memory_total,
        value: Math.floor(props.data.memory_used / 1024 * 100) / 100,
        name: 'Memory USED'
    }
})

const names = ['CPU LOAD', 'CPU TEMP', 'MEMORY USED', 'MEMORY TOTAL']
const units = ['%', '℃', 'G', 'G']
const tableData = computed(() => [props.data.cpu_load, props.data.cpu_temp, Math.floor(props.data.memory_used / 1024 * 100) / 100, props.data.memory_total].map((val, i) => {
    return {
        NAME: names[i],
        VALUE: `${val}${units[i]}`
    }
})
)

const change = () => {
    if (view.value === 'Detail') view.value = 'Gauge'
    else view.value = 'Detail'
}

</script>

<style scoped>
.device-info {
    width: 270px;
    height: 247px;
    border-radius: 10px;
    margin: 10px;
    flex-shrink: 0;
    
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10px;
}
.flex-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
p {
    margin: 2px;
}
</style>