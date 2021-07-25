<template>
  <div class="form-controller" :class="`${col != undefined ? 'col-'+col : '', form_class != undefined ? form_class : ''}`">
          <label :for="name" v-if="isLabel == true">{{label}}</label>
          <input :type="type" :id="name" :name="name" :placeholder="placeholder" v-on:input="$emit('input', $event.target.value)">
        </div>
</template>

<script>
export default {
    name:'Input',
    props:{
        name: String,
        type: String,
        placeholder: String,
        isLabel: Boolean,
        label: String,
        col: Number,
        form_class: String
    }
}
</script>

<style>
</style>