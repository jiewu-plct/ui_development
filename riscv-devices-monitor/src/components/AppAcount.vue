<template>
    <el-dropdown @command="handleCommand">
        <span class="flex-center">
            <el-icon>
                <User />
            </el-icon>
            <el-icon>
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-item style="background-color: #eeeeee">
                Sign in as {{store.role}}
            </el-dropdown-item>
            <el-dropdown-item v-for="role in roles" :command="role">
                {{ role }}
            </el-dropdown-item>
            <el-dropdown-item v-for="operation in operations" :command="operation">
                {{ operation }}
            </el-dropdown-item>
            
        </template>
    </el-dropdown>

</template>

<script setup lang="ts">
import { useStore } from '../store';
import { Role } from '../types'

const store = useStore()

const roles = ['Tester', 'Admin', 'Super Admin']
const operations = ['Profile', 'Logout']
const handleCommand = (command: string) => {
    if (roles.includes(command) && command !== store.role) {
        store.changeRole(command as Role)
        return
    }

    switch (command) {
        case 'Profile':

            break;

        case 'Logout':
            break;
    }

}

</script>

<style scoped>

</style>