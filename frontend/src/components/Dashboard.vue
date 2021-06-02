<template>
  <div class="row q-py-xs q-px-none" style="flex-wrap: initial">
    <display v-for="(item, index) in displays" :key="index" :display="item" />
  </div>
</template>

<script>
import Display from "./Display.vue";
export default {
  name: "Dashboard",
  components: { Display },
  data() {
    return {
      displays: [
        {
          name: "1",
          size: {
            width: 1920,
            height: 948,
          },
          grid: {
            col: 9,
            row: 6,
          },
        },
        {
          name: "2",
          size: {
            width: 2560,
            height: 948,
          },
          grid: {
            col: 9,
            row: 6,
          },
        },
        {
          name: "3",
          size: {
            width: 2560,
            height: 948,
          },
          grid: {
            col: 9,
            row: 6,
          },
        },
      ],
    };
  },
};
</script>

<style>
</style>