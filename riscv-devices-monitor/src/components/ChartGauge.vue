<template>
    <div ref="chartContainer" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
import { ref } from "vue";
import { GaugeData } from "../types";

const props = defineProps<{
    data: GaugeData[]
}>();

const chartContainer = ref()

onMounted(() => {
    let chart = echarts.init(chartContainer.value);
    let data = props.data.map((item, index) => {
        return {
            name: item.name,
            value: item.value,
            title: {
                offsetCenter: ['0%', `${-30 + index * 30}%`],
                show: false 
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', `${-20 + index * 30}%`]
            }
        }
    })
    let option = {
        tooltip: {
            formatter: '{b} : {c}%'
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
                pointer: {
                    show: false
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false,
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#464646'
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 40
                    }
                },
                splitLine: {
                    show: false,
                    distance: 0,
                    length: 10
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    distance: 50
                },
                title: {
                    fontSize: 14
                },
                detail: {
                    width: 30,
                    height: 10,
                    fontSize: 11,
                    color: 'auto',
                    // borderColor: 'auto',
                    // borderRadius: 20,
                    // borderWidth: 1,
                    formatter: '{value}%'
                },
                data: data,
            }
        ]
    };

    chart.setOption(option)
})
</script>

<style scoped>
</style>