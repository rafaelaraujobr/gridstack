<template>
  <q-bar class="bg-primary text-white q-pr-none q-py-none">
    <div class="fit q-pt-xs" style="-webkit-app-region: drag">
      <div>name</div>
    </div>
    <q-space />
    <q-btn-group style="-webkit-user-select: none" unelevated flat>
      <q-btn
        dense
        flat
        unelevated
        icon="mdi-minus"
        class="q-px-sm"
        @click="minimize()"
      />
      <q-btn
        dense
        flat
        unelevated
        :icon="isMaximize ? 'mdi-window-restore' : 'mdi-window-maximize'"
        class="q-px-sm"
        @click="maximize()"
      />
      <q-btn
        dense
        flat
        unelevated
        icon="mdi-window-close"
        @click="close()"
        class="q-px-sm"
      />
    </q-btn-group>
  </q-bar>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "TitleBarElectron",
  data() {
    return {
      isMaximize: null,
    };
  },
  methods: {
    maximize() {
      ipcRenderer.send("maximizeApp");
    },
    minimize() {
      ipcRenderer.send("minimizeApp");
    },
    close() {
      ipcRenderer.send("closeApp");
    },
  },
  created() {
    ipcRenderer.on("isMaximized", () => {
      this.isMaximize = true;
    });
    ipcRenderer.on("isRestored", () => {
      this.isMaximize = false;
    });
  },
};
</script>

<style>
</style>