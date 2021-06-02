import { mapActions, mapGetters } from "vuex";
import { GridLayout, GridItem } from "vue-grid-layout";
import { uid } from "quasar";
export default {
  data() {
    return {
      maxRows: 6,
      colNum: 8,
      modelItemGrid: {
        w: 1,
        h: 1,
        full: 0,
      },
    };
  },
  components: {
    GridLayout,
    GridItem,
  },
  methods: {
    ...mapActions("Layout", [
      "ActionSetLayout",
      "ActionSetDisplaySize",
      "ActionSetControllerSize",
      "ActionSetMaximize",
    ]),

    createGridInit() {
      let layout = [];
      for (let row = 0; row < this.maxRows; row++) {
        for (let col = 0; col <= this.colNum; col++) {
          layout.push({ x: col, y: row, h: 1, w: 1, i: uid() });
        }
      }
      return layout;
    },
    getPositionMouse(evt) {
      let positionGrid = this.$refs.grid.$el.getBoundingClientRect();
      let colWidth = Math.trunc(positionGrid.width / this.colNum);
      this.modelItemGrid.x = Math.trunc(
        (evt.clientX - positionGrid.x) / colWidth
      );
      this.modelItemGrid.y = Math.trunc(
        (evt.clientY - positionGrid.y) / this.rowHeight
      );
    },

    addItem() {
      this.layout.push({
        ...this.modelItemGrid,
        i: uid(),
      });
    },
    removeItem(val) {
      let index = this.layout.map((item) => item.i).indexOf(val);
      this.layout.splice(index, 1);
      this.ActionSetMaximize(false);
    },

    onResizeDisplay(size) {
      this.ActionSetDisplaySize(size);
    },
    onResizeControl(size) {
      this.ActionSetControllerSize(size);
    },

    layoutUpdatedEvent(newLayout) {
      this.sendMessage(newLayout);
    },
  },
  computed: {
    ...mapGetters("Grid", [
      "currentLayout",
      "displaySize",
      "controllerSize",
      "maximize",
    ]),
    decreaseMargin() {
      return (this.maxRows + 1) * 10;
    },
  },
};
