<template>
    <div class="box flex-center">
        <div style="width:400px">
            <!-- <span class="title" style="font-weight: bold; font-size:medium">Register</span><br> -->
            <h2 class="title">Register</h2>
            <div class="describe"> Create your account </div>
            <el-form :model="registerForm" ref="form" label-width="60px">

                <el-form-item>
                    <el-input placeholder="Username" v-model="registerForm.username" prefix-icon="User"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="Email" v-model="registerForm.email" prefix-icon="Compass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="Password" v-model="registerForm.password" type="password" prefix-icon="Lock">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="Repeat Password" v-model="repeat_password" type="password"
                        prefix-icon="Lock">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary rounded" @click="register">Register</el-button>
                    <el-button type="primary rounded" @click="back">Back to Login</el-button>
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
const registerForm = reactive({
    username: '',
    email: '',
    password: ''
})
const repeat_password = ref('')
const isEmpty_register = ref(false)
const isMatched = ref(true)

const register = function () {
    if (
        (registerForm.username.length === 0) ||
        (registerForm.email.length === 0) ||
        (registerForm.password.length === 0) ||
        (repeat_password.value.length === 0)
    ) {
        isEmpty_register.value = true
    } else {
        isEmpty_register.value = false
        if (registerForm.password !== repeat_password.value) {
            isMatched.value = false
        } else {
            isMatched.value = true
        }
    }
    if (!isEmpty_register && isMatched) {
        axios.post('/api/register', registerForm).then((res) => {
            console.log(res.data)
            if ('id' in res.data) {
                alert('Register successfully')
                router.push('/login')
            } else {
                alert(res.data.msg)
            }
        })
    }
}

const back = function () {
    router.push('/login')
}
</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    /* width:500px; */
}

.describe {
    font-size: small;
    margin: 7px;
}

.title {
    margin: 7px
}
</style>