<template>
    <q-bar class="header-app bg-primary text-white q-pr-none">
      <q-icon name="laptop_chromebook" />
      <div>{{ title }}</div>
      <q-space />
      <q-btn dense flat icon="close" class="q-px-sm" @click="close"/>
    </q-bar>
</template>

<script>
export default {
  name: "GridHeader",
  props: {
    title: String,
  },
  methods:{
    close(){
      console.log('teste close')
    }
  }
};
</script>

<style>
</style>