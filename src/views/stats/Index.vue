<template>
  <div id="index-stats">
<navbar-regular/>
<b-tabs>
  <b-tab @click="passRouter('SingleGraph')" title="Загальна дохідність компанії"></b-tab>
  <b-tab @click="passRouter('UsersGraph')" title="Активність партнерів"></b-tab>
</b-tabs>
      <router-view></router-view>
      <footer-stat />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FooterStat from '../../components/footer-stat.vue'
import NavbarRegular from '../../components/navbar-regular.vue'
export default {
    components:{FooterStat, NavbarRegular},
          data(){
        return{
          date:{
            from: '',
            to: ''
          }
        }
      },
    methods:{
        passRouter(name){
            this.$router.push({name: name}).catch(()=>{})
        },
        loadData(){
          if(this.date.from != '' && this.date.to != ''){
            this.$store.getters.getDataByDate(this.date)
            console.warn('loadData(): Fields are filled!')
          }
          else{
            console.error('loadData(): Fields can not be empty')
          }


          console.warn('INIT loadData()')
        }
    },
    computed:{
      ...mapState(["getDataByDate"])
    },
    mounted(){
    }
}
</script>

<style>

</style>