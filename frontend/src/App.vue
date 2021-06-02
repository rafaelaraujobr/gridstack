<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="bg-white text-dark" bordered>
      <title-bar-electron
        v-if="$q.platform.is.electron && !$q.fullscreen.isActive"
      />
      <q-toolbar>
        <q-toolbar-title>
          <img
            :src="require('./assets/logo.svg')"
            height="37"
            class="q-pt-sm"
          />
        </q-toolbar-title>
        <q-btn
          flat
          dense
          @click="rightDrawer = !rightDrawer"
          class="q-mr-xs"
          :icon="!rightDrawer ? 'menu' : 'mdi-close'"
        />
        <q-separator spaced vertical />
        <q-btn
          flat
          dense
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          aria-label="Menu"
          class="q-ml-xs"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawer" side="right" bordered> </q-drawer>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TitleBarElectron from "./widgets/TitleBarElectron.vue";
export default {
  name: "LayoutDefault",
  components: {
    TitleBarElectron,
  },
  data() {
    return {
      rightDrawer: false,
    };
  },
};
</script>

<style>
</style>
