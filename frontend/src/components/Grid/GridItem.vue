<template>
  <div
    class="grid-stack-item"
    :gs-w="item.w"
    :gs-h="item.h"
    :gs-x="item.x"
    :gs-y="item.y"
    :id="item.id"
    :gs-min-w="item.minW || 1"
    :gs-min-h="item.minH || 1"
  >
    <q-card flat bordered class="fit">
      <grid-header :title="'toolbar'" />
      <q-separator />
      <div>{{ display.name }}</div>
    </q-card>
  </div>
</template>

<script>
import GridHeader from "./GridHeader.vue";
export default {
  name: "GridItem",
  props: {
    item: Object,
    display: Object,
    option: Object,
  },
  components: { GridHeader },
};
</script>

<style>
</style>