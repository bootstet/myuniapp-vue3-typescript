<template>
  <view class="container">
    <view class="page-body">
        <view
          class="address-top flex-row"
          @click="showPicker" c-click
        >
          <text class="city">{{ areaValue || '全部区域' }}</text>
          <img
            class="icon-arrow-down"
            src="https://static.zhil.cloud/pov-h51gopv0a6icon_city_arrow_default.png"
            alt=""
          />
        </view>
		    <u-select v-model="pickerShow" mode="single-column" :list="arealist"   @confirm="confirm"></u-select>
      </view>
    </view>
  </view>
</template>
<script>
import { getAreaNameByOrgId } from '@/api/orgList.js'
import { getQueryString } from "@/utils/index";
import cloneDeep from "lodash/cloneDeep";
import { javaWxConfig } from '@/api/common.js'
import store from '@/store'
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      pickerShow: false,
      arealist: [],
      areaValue: '全部区域'
    };
  },
  mounted() {
    let address = this.$store.state.location.address;
    if (address) {
      //设置当前选中城市
      this.$emit("getArea", {
        provinceValue: address.province,
        cityValue: address.city,
        areaName: address.areaName,
      });
    } else {
      this.getWxLocation()
    }
    this.getAreaData();
  },
  methods: {
    // 微信获取经纬度
    getWxLocation() {
      const _this = this
      const source = getQueryString("source") ?? "";
      javaWxConfig({
        orgId: source || 8, // 平台端，没有souce使用我们自己的测试机构进行授权
        url: `${location.origin}/`, 
      }).then(data => {
        console.log('data', data)
        wx.config({
          debug: false, 
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名
          jsApiList: ["getLocation"],
          openTagList: []
        })
        wx.checkJsApi({
          jsApiList: ['getLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function(res) {
            console.log('check---res', res)
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          },
          fail: (e) => {
            console.error('checkJsApi', e)
          }
        });
        wx.ready(function() {
          wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: (r) => {
              const longitude = r.longitude // 经度
              const latitude = r.latitude // 纬度
              // 直接从微信拿到的坐标需要转换一下格式，才能在百度地图中用,使用百度地图javaScript Api。服务类convertor类进行转换
              // 文档链接：  JavaScript API: https://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/coorinfo
              //            https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_reference_3_0.html#a7b55
              //            Web服务API=> https://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition  
              var convertor = new BMap.Convertor();
              var ggPoint = new BMap.Point(longitude,latitude);
              var pointArr = [];
              pointArr.push(ggPoint);
              convertor.translate(pointArr, 3, 5,  function(status, points) {
                const newLng = status.points[0].lng
                const newLat = status.points[0].lat
                sessionStorage.setItem("location", newLng + "," + newLat); //当前地址
                _this.$store.dispatch("location/setMapAddress", r.address);
                _this.$store.dispatch(
                  "location/setUserLongAndLati",
                  newLng + "," + newLat
                );
                _this.$emit("getArea", {
                  provinceValue: '',
                  cityValue: '',
                  areaName: "",
                  init: "isFirstRequest",
                });
              })
            },
            fail: (e) => {
              console.error("未定位=", e)
              _this.$emit("getArea", {
                provinceValue: '',
                cityValue: '',
                areaName: "",
                init: "isFirstRequest",
              });
            },
            cancel: (e) => {
              console.error("取消定位=", e)
              _this.$emit("getArea", {
                provinceValue: '',
                cityValue: '',
                areaName: "",
                init: "isFirstRequest",
              });
            }
          })
         
        })
        
        
      }).catch(err => console.log('Error: ', err)) // 获取config出现异常，可根据实际情况选
      
    },
    getAreaData() {
      const source = getQueryString("source") ?? "";
      getAreaNameByOrgId({
        orgId: Number(source),
      }).then((res) => {
        const areaArr = res.map(item => ({ label: item, value: item }))
        this.arealist = [{ label: '全部区域', value: '' }].concat(areaArr)
      }).catch(err => {
        console.warn(err)
      });
    },
    showPicker() {
      this.pickerShow = !this.pickerShow;
    },
    confirm(e) {
      console.log(e);
      this.areaValue = e[e.length - 1].value
      this.$emit("getArea", {
        areaName: this.areaValue,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  position: relative;
  z-index: 9999;
}
.scroll {
  width: 100%;
  overflow-y: auto;
  height: 100%;
}
.page-body {
  // position: relative;
}
.url-box {
  background-color: #ffffff;
  text-align: left;
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100000;
}
.url-box.show {
  position: fixed;
}
.address-top {
  font-size: 30rpx;
  font-weight: bold;
  color: #000000;
  text-align: left;
  // padding-right: 25rpx;
  width: 100%;
  line-height: 42rpx;
  box-sizing: border-box;

  .city {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .icon-arrow-down {
    width: 15px;
    height: 15px;
    object-fit: fill;
    margin-left: 8rpx;
  }
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.scroll-container {
  background-color: #ffffff;
  justify-content: space-between;
  align-items: flex-start;
  height: 300px;
  display: none;
  margin-top: 10px;
}
.scrollList {
  padding: 15px;
  font-size: 14px;
  color: #040404;
  text-align: left;
}
.scroll-left {
  background-color: #f4f4f4;
  height: 100%;
}
.scroll-center {
  height: 100%;
}
.scroll-right {
  height: 100%;
}
.scroll-right .scrollList,
.scroll-center .scrollList {
  color: #777777;
}
.select {
  background-color: #ffffff;
}
.scroll-right .select,
.scroll-center .select {
  color: #040404;
}
.mask-opacity {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}
.mask-opacity.show {
  display: block;
}
// .scroll-container.show {
//   display: flex;
// }
// .left-width {
//   padding: 15px 0 0 15px;
// }
</style>
