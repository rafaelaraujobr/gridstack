<template>
  <div
    :id="`grid-${_uid}`"
    class="grid-stack"
    :class="`grid-stack-${display.grid.col}`"
    :style="`min-height:${display.size.height}px;  max-height:${display.size.height}px; height:${display.size.height}px; background-size: calc(100% / ${display.grid.col}) calc(100% / ${display.grid.row});`"
    @click="getEvent($event)"
  >
    <grid-item
      v-for="item in items"
      :key="item.i"
      :item="item"
      :option="option"
      :display="display"
    />
  </div>
</template>

<script>
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.css";
import { GridStack } from "gridstack";
import "gridstack/dist/h5/gridstack-dd-native";
import { uid } from "quasar";
import GridItem from "./GridItem.vue";
export default {
  name: "GridLayout",
  components: { GridItem },
  props: {
    display: Object,
  },
  data() {
    return {
      items: [
        { x: 0, y: 0, w: 2, h: 2 },
        { x: 3, y: 1, h: 2 },
        { x: 4, y: 1 },
        { x: 2, y: 3, w: 3, maxW: 3, id: "special", content: "has maxW=3" },
        { x: 2, y: 5 },
      ],
      grid: null,
      margin: 5,
    };
  },
  methods: {
    getEvent(event) {
      console.log(event);
      // const el = {
      //   id: uid(),
      //   x: 0,
      //   y: 0,
      //   w: 1,
      //   h: 1,
      // };
      // this.addGrid(el);
    },
    async addGrid(el) {
      await this.items.push(el);
      await this.grid.batchUpdate();
      await this.grid.makeWidget(document.getElementById(el.id));
      await this.grid.commit();
    },
    listenEventGrid() {
      this.grid.on("added", (event, itens) => {
        console.log("added ===>", event, itens);
      });

      this.grid.on("removed", (event, item) => {
        console.log("removed ===>", event, item);
      });

      this.grid.on("dropped", (event, previousWidget, newWidget) => {
        console.log("dropped ===>", event);
        console.log("Removed ", previousWidget);
        console.log("newWidget", newWidget);
        newWidget.id = uid();
        this.addGrid(newWidget);
      });

      this.grid.on("change", (event, itens) => {
        console.log("change ===>", event, itens);
        console.log(this.grid.cellWidth());
      });

      this.grid.on("dragstart", (event, item) => {
        console.log("dragstart ===>", event, item);
      });

      this.grid.on("dragstop", (event, item) => {
        console.log("dragstop ===>", event, item);
      });

      this.grid.on("resizestart", (event, item) => {
        console.log("resizestart ===>", event, item);
      });

      this.grid.on("resizestop", (event, item) => {
        console.log("resizestop ===>", event, item);
      });
    },
  },
  computed: {
    option() {
      return {
        acceptWidgets: true,
        column: this.display.grid.col,
        handleClass: "header-app",
        maxRow: this.display.grid.row,
        cellHeight: this.cellHeight,
        disableOneColumnMode: true,
        margin: this.margin,
        float: true,
      };
    },
    cellHeight() {
      return this.display.size.height / this.display.grid.row;
    },
  },
  watch: {
    "$q.fullscreen.isActive"() {
      this.display.size.height += 50;
      this.grid.cellHeight(this.cellHeight);
    },
  },
  mounted() {
    this.grid = GridStack.init(this.option, this.$el);
    this.listenEventGrid();
  },
};
</script>

<style>
.grid-stack {
  background-image: linear-gradient(#e0e0e0 1px, transparent 1px),
    linear-gradient(90deg, #e0e0e0 1px, transparent 0px);
  background-position: 0 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
