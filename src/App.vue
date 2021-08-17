<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
mounted(){
  this.$store.dispatch('getUsers')
  this.$store.dispatch('getLeads')
  this.$store.dispatch('getDeals')
  this.$store.dispatch('getBonus')
}
}
</script>

<style>

</style>