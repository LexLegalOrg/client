<template>
  <div id="stats" class="page page-stats">
      <navbar-regular />
      <slot></slot>
  </div>
</template>

<script>
import NavbarRegular from '../navbar-regular.vue'
export default {
    components:{
        NavbarRegular
    }
}
</script>

<style>

</style>
NavbarRegular