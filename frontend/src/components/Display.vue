<template>
  <q-card
    flat
    bordered
    class="no-scroll"
    :style="
      'max-height:' +
      display.size.height +
      'px ; min-height:' +
      display.size.height +
      'px ; max-width:' +
      display.size.width +
      'px ; min-width:' +
      display.size.width +
      'px '
    "
  >
    <grid-layout :display="display" />
  </q-card>
</template>

<script>
import GridLayout from "./Grid/GridLayout.vue";
export default {
  name: "Display",
  props: {
    display: Object,
  },
  components: { GridLayout },
  data() {
    return {};
  },
};
</script>

<style>
</style>