<template>
  <button @click="callback($event)" class="button" :class="btnClass">
      <slot></slot>
  </button>
</template>

<script>
export default {
    props:{
        btnClass:{
            type:String,
            required:true
        }
    },
    methods:{
        callback(event){
            this.$emit('click',event)
        }
    }
}
</script>

<style>

</style>