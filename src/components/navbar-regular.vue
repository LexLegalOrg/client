<template>
  <header class="navbar d-flex justify-content-between p-3">
      <div class="navbar-logo"></div>
      <button v-if="account.auth == false" @click="toAuth" class="btn btn-primary">Увійти в систему</button>
      <button v-if="account.auth == true" @click="toCabinet" class="btn btn-primary">Мій кабінет</button>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return{
      
    }
  },
  computed:{
    ...mapState(["account"])
  },
  methods:{
    toAuth(){
      this.$router.push({name: 'Login'})
    },
    toCabinet(){
      this.$router.push({name:'Profile'})
    }
  }
}
</script>

<style>

</style>