import {
    debounce
} from "@/utils/index"
export default {
  props: ['sText'],
  data() {
      return {
          searchValue: '',
      }
  },
  created() {
      this.searchValue = '';
  },
  methods: {
      getInputValue(e) {
          this.searchValue = e.data;
      },
      triggerHandle: debounce(function() {
          this.$emit('getInfo', this.searchValue);
      }, 200),
  }
}