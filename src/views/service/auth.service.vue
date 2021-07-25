<template>
  <div id="auth-page">
      <input-regular :placeholder="'Введіть email'" :name="'login'" :type="'email'" :isLabel="true" :label="'Email'" />
      <input-regular :placeholder="'Введіть пароль'" :name="'password'" :type="'password'" :isLabel="true" :label="'Пароль'" />
      <button-regular @click="passTo" :btnClass="'button-default'">Auth</button-regular>
  </div>
</template>

<script>
import ButtonRegular from '../../components/button-regular.vue'
import InputRegular from '../../components/input-regular.vue'
export default {
    components:{
        ButtonRegular,
        InputRegular
    },
    methods:{
        passTo(){
            this.$router.push({name: 'Home'})
        }
    }
}
</script>

<style>

</style>
ButtonRegular