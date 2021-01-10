export default {
  props: {
    id: {
      require: true,
      type: Number
    },
    show: {
      require: true,
      type: Boolean
    }
  },
  computed: {
    showVal: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  }
}
