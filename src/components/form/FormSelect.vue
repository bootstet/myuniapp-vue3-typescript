<template>
  <view>
    <u-input :value="value" type="select" :placeholder="placeholder" @click="show = true" :select-open="show"  />
    <u-select v-model="show" @confirm="onConfirm" :list="options"  />
  </view>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, String],
    },
    placeholder: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      default: 80
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    onConfirm (val) {
      const [ index ] = val ?? []
      const item = this.options[index] ?? {}
      const {value } = item
      this.$emit('change', value)
    }
  }
}
</script>