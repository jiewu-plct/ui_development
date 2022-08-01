<template>
    <div class="box flex-center">
        <div style="width: 400px;">
            <h2 class="title">Login</h2>
            <div class="describe"> Login your account </div>
            <el-form :model="loginForm" ref="form" label-width="60px">
                <el-form-item>
                    <el-input placeholder="Username" v-model="loginForm.username" prefix-icon="User"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="Password" v-model="loginForm.password" type="password" prefix-icon="Lock">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary rounded" @click="login">Login</el-button>
                    <el-button type="primary rounded" @click="toRegister">Register</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'

const router = useRouter()
const loginForm = reactive({
    username: '',
    password: '',
})
const isEmpty_login = ref(false)

const login = function () {
    if (
        (loginForm.username.length === 0) ||
        (loginForm.password.length === 0)
    ) {
        isEmpty_login.value = true
    } else {
        isEmpty_login.value = false
    }

    if (!isEmpty_login.value) {
        axios.post('/api/login', loginForm).then((res) => {
            console.log(res.data)
            if ('token' in res.data) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('currentUser', loginForm.username)
                localStorage.setItem('currentRole', res.data.role)
                // this.$store.commit('setUser', this.loginForm.username)
                router.push('/dashboard')
            } else {
                alert(res.data.msg)
            }
        })
    }
}
const toRegister = function () {
    router.push('/register')
}

</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
}

.describe {
    font-size: small;
    margin: 7px;
}

.title {
    margin: 7px
}
</style>