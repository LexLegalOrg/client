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
    console.log('got data')

    },10*1000)

  }
},
mounted(){
  this.packageData()
}
}
</script>

<style>

</style>