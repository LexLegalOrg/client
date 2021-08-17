<template>
  <div id="auth" class="auth-page">
    
    <h1 class="auth-page-welcome" v-if="isReg == undefined && afterReg == true">Ви успішно зареєстровані!</h1>

    <div class="card col-4" v-if="isReg && afterReg == false">
          <div class="card-header">
              <h5>Реєстрація</h5>
          </div>
          <div class="card-body">
              <div class="login-form mb-3">
              <label for="email-reg">Email:</label>
              <input type="email" class="form-control" name="email-reg" id="email-reg" v-model="register.email">
          </div>

          <div class="pass-form mb-3">
              <label for="password-reg">Пароль:</label>
              <input type="password" class="form-control" name="password-reg" id="password-reg" v-model="register.password">
          </div>

                    <div class="pass-form mb-3">
              <label for="password-reg">Назначити на:</label>
              <select class="form-select" name="" id="" v-model="register.assignTo">
                  <option v-for="i in userData" :key="i.user.id" :value="i.user.bitrix_id">{{`${i.user.name} ${i.user.midname}`}}</option>
              </select>
          </div>

          <button class="btn btn-primary" @click="registerMethod">Зареєструватись</button>
          <button class="btn btn-default" @click="isReg = !isReg">Увійти</button>
          </div>
      </div>

        <div class="card col-4" v-if="isReg == false && afterReg == false">
          <div class="card-header">
              <h5>Авторизація</h5>
          </div>
          <div class="card-body">
              <div class="login-form mb-3">
              <label for="email">Email:</label>
              <input type="email" class="form-control" name="email" id="email" v-model="login.email">
          </div>

          <div class="pass-form mb-3">
              <label for="password">Пароль:</label>
              <input type="password" class="form-control" name="password" id="password" v-model="login.password">
          </div>

          <button class="btn btn-primary" @click="loginMethod">Увійти</button>
          <button class="btn btn-default" @click="isReg = !isReg">Реєстрація</button>

          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            afterReg: false,
            isReg: false,
            login:{
                email:'',
                password: ''
            },
            register:{
                email:'',
                password:'',
                assignTo:''
            }
        }
    },
    computed:{
        ...mapGetters(["userData"])
    },
    methods:{
        registerMethod(){
            let options = {
                url: 'auth/register',
                method: 'post',
                data: this.register
            }

            this.$http(options)
            .then(res=>{
                console.log(res)

                 // Present screen 

                this.isReg = undefined 
                this.afterReg = true 

                setTimeout(()=>{
                    this.isReg = false 
                    this.afterReg = false
                }, 2000)
            })
            .catch(e=>alert(`Помилка авторизації! ERRDESCRIBE:${e}`))
        },
        loginMethod(){
            let options = {
                url: 'auth/login',
                method: 'post',
                data: this.login
            }

            let logData = undefined
            let userData = undefined
            this.$http(options)
            .then(async(res)=>{
                logData = res.data

                userData = await this.assignedData(res.data.user.assignTo)
                let compileData = {
                    data: logData,
                    user: userData
                }

                // Load assigned data
                this.$store.commit('SET_ACCOUNT',compileData)
                this.$router.push({name:'Profile'})
            })
            .catch(e=>alert(`Помилка авторизації! ERRDESCRIBE:${e}`))
        },
      async assignedData (id) {
            let options = {
                url: `users/get/id/${id}`,
                method: 'get'
            }
            let response = ''
           await this.$http(options)
            .then(res=>{
                response = res.data
            })
            .catch((e)=>{
                alert('Can not catch data!',e)
            })
        return response
        }
    }
}
</script>

<style>

</style>