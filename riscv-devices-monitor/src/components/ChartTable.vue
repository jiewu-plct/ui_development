<template>
    <el-table :data="props.data">
        <el-table-column v-for="key in Object.keys(props.data[0])" :key="key" :prop="key" :label="key">
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps<{
    data: { NAME: string, VALUE: string }[]; // the type of VALUE is string since it appears with unit
}>();

onMounted(async () => {
    console.log('table', Object.keys(props.data))
})

</script>

<style scoped>
</style>