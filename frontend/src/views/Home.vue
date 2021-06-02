<template>
  <q-page class="no-scroll">
    <dashboard />
  </q-page>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Dashboard,
  },
  methods: {},
};
</script>
