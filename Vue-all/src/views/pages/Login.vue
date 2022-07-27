<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="loginForm.username"
                      placeholder="Username"
                      autocomplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="loginForm.password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CRow v-if="isEmpty_login"
                    ><p style="color: red">
                      Username and password are required
                    </p></CRow
                  >
                  <CRow>
                    <CCol :xs="6">
                      <CButton
                        color="primary"
                        class="px-4"
                        @click.prevent="login"
                      >
                        Login
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton
                        color="link"
                        class="px-0"
                        @click.prevent="jumpToRegister"
                      >
                        Rigister Now!
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <!-- <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard> -->
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
const axios = require('axios').default
// import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      isEmpty_login: false,
    }
  },
  methods: {
    login() {
      console.log(this.loginForm)
      if (
        (this.loginForm.username.length === 0) |
        (this.loginForm.password.length === 0)
      ) {
        this.isEmpty_login = true
      } else {
        this.isEmpty_login = false
      }
      console.log('isEmpty_login', this.isEmpty_login)
      console.log('loginForm', this.loginForm)
      if (!this.isEmpty_login) {
        axios.post('/api/login', this.loginForm).then((res) => {
          console.log(res.data)
          if ('token' in res.data) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('currentUser', this.loginForm.username)
            localStorage.setItem('currentRole', res.data.role)
            // this.$store.commit('setUser', this.loginForm.username)
            this.$router.push('/dashboard')
          } else {
            alert(res.data.msg)
          }
        })
      }
    },
    jumpToRegister() {
      console.log('register')
      this.$router.push('/register')
    },
  },
}
</script>
