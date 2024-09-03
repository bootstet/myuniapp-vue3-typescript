<template>
  <view class="flex_row">
    <view class="p-r" @click="onSelect('province')" c-click>
      <u-input
        disabled
        :value="value.province"
        placeholder="省份"
        :input-align="inputAlign"
        :custom-style="inputCustomStyle"
        class="custom-input"
      />
      <view class="input-icon p-a">
        <u-icon
          :size="iconSize"
          :color="iconColor"
          :name="iconName"
        >
        </u-icon>
      </view>
    </view>
    <view class="p-r" @click="onSelect('city')" c-click>
      <u-input
        disabled
        :value="value.city"
        placeholder="城市"
        :input-align="inputAlign"
        :custom-style="inputCustomStyle"
        class="custom-input"
      />
      <view class="input-icon p-a">
        <u-icon
          :size="iconSize"
          :color="iconColor"
          :name="iconName"
        >
        </u-icon>
      </view>
    </view>
    <view class="p-r" @click="onSelect('area')" c-click>
      <u-input
        disabled
        :value="value.area"
        placeholder="区域"
        :input-align="inputAlign"
        :custom-style="inputCustomStyle"
        class="custom-input"
      />
      <view class="input-icon p-a">
        <u-icon
          :size="iconSize"
          :color="iconColor"
          :name="iconName"
        >
        </u-icon>
      </view>
    </view>
    <!-- 省市区选择 -->
    <u-select
      :disabled="disabled"
      v-model="show"
      :list="currentList"
      @confirm="onConfirm"
      value-name="value"
      label-name="name"
      mode="single-column"
    >
    </u-select>
  </view>
</template>
<script>
import { getSysArea } from "@/api/vaccinator.js";

export default {
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: {
      type: Object, 
      default: () => ({
        province: '',
        provinceCode: '',
        city: '',
        cityCode: '',
        area: '',
        areaCode: '',
        
      })
    },
    inputAlign: {
      type: String,
      default: 'right'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 下拉列图标颜色
    iconColor: {
      type: String,
      default: '#CBCBCB',
    },
    // 下拉列图标类别
    iconName: {
      type: String,
      default: 'arrow-right',
    },
    // 下拉列图标尺寸
    iconSize: {
      type: Number,
      default: 20
    },
    // 输入框的自定义样式
    inputCustomStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data () {
    return {
      listMp: {
        province: [],
        city: [],
        area: []
      },
      show: false,
      currentSelectType: 'province',
      currentList: [],
    }
  },
  watch: {
    show (val) {
      if (!val) return
      
    },
    listMp: {
      handler: function(val) {
        if(val) this.currentList = this.listMp[this.currentSelectType] || []
      },
      deep: true,
    },
  },
  mounted () {
    this.bootstrap()
  },
  methods: {
    async bootstrap () {
      const res = await this.getArea('province')
      this.listMp.province  = res.map(v => Object.assign(v, { value: v.provinceCode}))
    },
    async onSelect( type = 'province') {
       if (this.disabled) {
        return
       }
       if (type === 'city' ) {
         if (!this.value.province) {
            this.$u.toast("请先选择省份");
            return
          }
       }
       else if (type === 'area' ) {
         if (!this.value.province )  {
            this.$u.toast("请先选择省份");
            return 
          }
          else if (!this.value.city) {
            this.$u.toast("请先选择城市");
            return 
          }
       }
      this.currentSelectType = type
      const codeType = `${type}Code`
      try {
        const data = await this.getArea(type, this.value)
        this.listMp[type] = data.map(v => Object.assign(v, {value: v[codeType]}))
        this.$set(this.listMp, type, this.listMp[type])
        this.$forceUpdate()
      } catch (error) {
        console.error('error==', error)
      }
      this.show = true
    },
    async getArea(type = 'province' , value) {
      // if (this.currentSelectType === true) {
      //   this.show = true
      //   return
      // }
      const params = {
          level: 1,
          provinceCode: 0,
          cityCode: 0
        };
        if ( type === 'province') {
          Object.assign(params, {
            level: 1
          })
          delete params.provinceCode
          delete params.cityCode
        }
        if (type === 'city' ) {
          Object.assign(params, {
            level: 2,
            provinceCode: value.provinceCode
          })
          delete params.cityCode
        }
        else if (type === 'area' ) {

          Object.assign(params, {
            level: 3,
            provinceCode: value.provinceCode,
            cityCode: value.cityCode
          })
        }

        const res = await getSysArea(params)
        return res

    },
    async onConfirm (val) {
      const data = {... this.value}
      const [item  = {}] = val
      const { label, value } = item
      console.log(label, value, item);
      this.show = false
      if (this.currentSelectType === 'province') {
        if (label !== this.value.province) {
            this.getArea('city', { provinceCode: value}).then((data) => {
              this.listMp.city = data.map(v => Object.assign(v, {value: v.cityCode}))
          })
          this.listMp.area = []
        }
        this.$emit('change', Object.assign(data, {province: label, provinceCode:value, city: '', cityCode: '', area: '', areaCode: '' }))
      }
      else if (this.currentSelectType === 'city') {
         
        if (label !== this.value.city) {
          this.getArea('area', { provinceCode: this.value.provinceCode, cityCode: value}).then((data) => {
            this.listMp.area = data.map(v => Object.assign(v, {value: v.areaCode}))
          })
        }
        this.$emit('change', Object.assign(data, {city: label, cityCode:value,  area: '', areaCode: '' }))
      }
      else if (this.currentSelectType === 'area') {
        this.$emit('change', Object.assign(data, { area: label, areaCode: value }))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.flex_row {
  .custom-input {
    width: calc(100% - 50rpx);
    overflow-x: auto;
  }
  .input-icon {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    right: 20rpx;
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
  }
  .u-input {
    &:not(:first-of-type) {
      margin-left: 20rpx;
    }
  }
}
</style>