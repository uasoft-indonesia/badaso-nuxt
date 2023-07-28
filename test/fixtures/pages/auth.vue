<template>
   <div>
    <h1>@badaso/nuxt</h1>
    <h2>$badaso.state</h2>
    <pre>{{ $badaso.state }}</pre>
    <h2>options.url</h2>
    <pre>{{ $badaso.$axios.defaults.baseURL }}</pre>

    <h2>Email</h2>
    <pre>{{ email }}</pre>

    <h2>Register</h2>
    <pre id="register">{{ register.message }}</pre>

    <h2>Resend</h2>
    <pre id="resend">{{ resend.message }}</pre>

    <h2>Verify</h2>
    <input type="text" v-model="OTP">
    <button @click="ver">Verify</button>
    <pre>{{ verify.message }}</pre>

    <h2>Login</h2>
    <pre id="login">{{ login.message }}</pre>

    <h2>Refresh Token</h2>
    <pre id="refresh">{{ refreshToken.message }}</pre>

    <h2>Logout</h2>
    <pre id="logout">{{ logout.message }}</pre>

    <h2>Forgot Password</h2>
    <pre id="forgot">{{ forgot.message }}</pre>

    <h2>Verify Token</h2>
    <pre>{{ forgotVerify.message }}</pre>
    <input type="text" v-model="forgotPasswordToken">
    <button @click="verifyForgot">Verify</button>

    <h2>Reset Password</h2>
    <pre>{{ reset.message }}</pre>
    <label>Token</label>
    <input type="text" v-model="forgotPasswordToken">
    <label>New Password</label>
    <input type="text" v-model="newPassword">
    <button @click="resetPw">Reset Password</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {},
      register: {},
      resend: {},
      verify: {},
      refreshToken: {},
      logout: {},
      forgot: {},
      forgotVerify: {},
      reset: {},
      OTP: '',
      email: '',
      forgotPasswordToken: '',
      newPassword: ''
    }
  },
  async fetch() {
    this.email = await this.generateEmail();
    this.register = await this.$badaso.register({
      name: 'admin',
      email: this.email,
      password: '123456',
      passwordConfirmation: '123456',
    });
    this.resend = await this.$badaso.sendEmailConfirmation({
      email: this.email,
    });
    this.login = await this.$badaso.login({
      email: 'admin@gmail.com',
      password: 'admin'
    })
    this.refreshToken = await this.$badaso.refreshToken();
    this.logout = await this.$badaso.logout();
    this.forgot = await this.$badaso.forgotPassword({
      email: this.email
    });
  },
  methods: {
    async ver() {
      this.verify = await this.$badaso.verify({
        email: this.email,
        token: this.OTP
      })
    },
    async verifyForgot() {
      this.forgotVerify = await this.$badaso.verifyForgotPasswordToken({
        email: this.email,
        token: this.forgotPasswordToken
      })
    },
    async resetPw() {
      this.reset = await this.$badaso.resetPassword({
        email: this.email,
        token: this.forgotPasswordToken,
        password: this.newPassword
      })
    },
    generateEmail() {
      const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
      let string = '';
      for(let ii=0; ii<15; ii++){
          string += chars[Math.floor(Math.random() * chars.length)];
      }
      return string + '@gmail.com';
    }
  }
}
</script>
