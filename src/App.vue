<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
methods:{
  packageData(){
    setInterval(()=>{
  this.$store.dispatch('getUsers')
  this.$store.dispatch('getLeads')
  this.$store.dispatch('getDeals')
  this.$store.dispatch('getBonus')
    },15*1000)
  }
},
mounted(){
  this.packageData()
}
}
</script>

<style>

</style>