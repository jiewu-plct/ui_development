<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    autocomplete="username"
                    v-model="registerForm.username"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    autocomplete="email"
                    v-model="registerForm.email"
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                    v-model="registerForm.password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                    v-model="repeat_password"
                  />
                </CInputGroup>
                <CRow v-if="isEmpty_register">
                  <p style="color: red">
                    Username, email and password are required
                  </p>
                </CRow>
                <CRow v-if="!isMatched">
                  <p style="color: red">
                    The two passwords you entered do not match
                  </p>
                </CRow>
                <div class="d-grid">
                  <CButton color="success" @click.prevent="register"
                    >Create Account</CButton
                  >
                </div>
              </CForm>
              <CButton color="link" class="px-0" @click="backToLogin">
                Back to Login
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
      },
      repeat_password: '',
      isEmpty_register: false,
      isMatched: true,
    }
  },
  methods: {
    register() {
      console.log('registerForm', this.registerForm)
      if (
        (this.registerForm.username.length === 0) |
        (this.registerForm.email.length === 0) |
        (this.registerForm.password.length === 0) |
        (this.repeat_password.length === 0)
      ) {
        this.isEmpty_register = true
      } else {
        this.isEmpty_register = false
        if (this.registerForm.password !== this.repeat_password) {
          this.isMatched = false
        } else {
          this.isMatched = true
        }
      }
      if (!this.isEmpty_register && this.isMatched) {
        axios.post('/api/register', this.registerForm).then((res) => {
          console.log(res.data)
          if ('id' in res.data) {
            alert('Register successfully')
            this.$router.push('/login')
          } else {
            alert(res.data.msg)
          }
        })
      }
    },
    backToLogin() {
      console.log('back to login')
      this.$router.push('/login')
    },
  },
}
</script>
