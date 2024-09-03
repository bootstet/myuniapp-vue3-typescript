<template>
  <view class="container">
    <view class="page-body">
        <view
          class="address-top flex-row"
          @click="showPicker" c-click
        >
          <text class="city">{{ curCityValue ? curCityValue : adressText }}</text>
          <img
            class="icon-arrow-down"
            src="https://static.zhil.cloud/pov-h51gopv0a6icon_city_arrow_default.png"
            alt=""
          />
        </view>
        <u-select v-model="pickerShow" mode="mutil-column-auto" :list="arealist" @confirm="confirm" value-name="name" label-name="name" child-name="citys"></u-select>
    </view>
  </view>
</template>
<script>
import { getOrgVaccineMapAreaList } from "@/api/pageManagement";
import { getQueryString, isWeiXin } from "@/utils/index";
import cloneDeep from "lodash/cloneDeep";
import { javaWxConfig } from '@/api/common.js'
import wx from 'weixin-js-sdk'
import { mapGetters } from 'vuex'

export default {
  props: {
    share: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pickerShow: false,
      curProvinceValue: "",
      curCityValue: "",
      curAreaValue: "",
      arealist: [],
      adressText: '全国',
      isShare: false, // 是否分享
    };
  },
  watch: {
    share: {
      immediate: true,
      handler: function(newVal) {
        this.isShare = newVal || false
      }
    },
  },
  computed: {
    ...mapGetters(['pageTitle'])
  },
  created() {
    const pageId = getQueryString("pageid");
    if (pageId == 16941) {
      this.adressText = '全部'
    }
  },
  mounted() {
    let address = this.$store.state.location.address;
    if (address) {
      //设置当前选中城市
      this.curCityValue = address.city;
      this.$emit("getArea", {
        provinceValue: address.province,
        cityValue: address.city,
        areaName: address.areaName,
      });
    } else {
      this.getWxLocation()
    }
    this.getCityData();

  },
  methods: {
    /**
     * 分享页面至微信好友、朋友圈
     */
    handleShare() {
      const options = {
        title: this.pageTitle, // 分享标题
        link: location.href, // 分享链接
        imgUrl: 'https://static.zhil.cloud/zhil_web_h5/map/1hi5f6on00.jpg', // 分享图标
      }
      wx.updateAppMessageShareData(options)
      wx.updateTimelineShareData(options)
    },
    // 微信获取经纬度
    getWxLocation() {
      if (!isWeiXin()) {
        return this.getDefaultData()
      }
      const _this = this
      const source = getQueryString("source") ?? "";
      uni.showLoading()
      const pageId = getQueryString("pageId") ?? "";
      javaWxConfig({
        orgId: pageId == 16941 ? 9347 : (source || 921), // 平台端，没有souce使用我们自己的测试机构进行授权
        url: `${location.origin}/`, // 全域名  兼容 ios
      }).then(data => {
        let jsApiList = ["getLocation"] // 接口列表
        if (this.isShare) jsApiList = jsApiList.concat(['updateAppMessageShareData', 'updateTimelineShareData'])
        wx.config({
          debug: false, 
          appId: pageId == 16941 ? 'wx8d752eb22308b676' : data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名
          jsApiList,
          openTagList: []
        })
        wx.checkJsApi({
          jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
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
              console.log('res', r)
              uni.hideLoading()
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
              uni.hideLoading()
              console.error("未定位=", e)
              _this.getDefaultData()
            },
            cancel: (e) => {
              uni.hideLoading()
              console.error("取消定位=", e)
              _this.getDefaultData()
            }
          })
          _this.handleShare()
        })
      }).catch(err => {
        uni.hideLoading()
        _this.getDefaultData()
        console.log('Error: ', err) // 获取config出现异常，可根据实际情况选
      })
    },
    getDefaultData() {
      this.$emit("getArea", {
        provinceValue: '',
        cityValue: '',
        areaName: "",
        init: "isFirstRequest",
      });
    },
    getCityData() {
      let _this = this;
      const pageId = getQueryString("pageId") ?? "";
      getOrgVaccineMapAreaList({
        pageId: Number(pageId),
      }).then((res) => {
        _this.arealist = this.areaTrans(res);
      });
    },
    showPicker() {
      this.pickerShow = !this.pickerShow;
    },
    confirm(res) {
      console.log("res", res);
      const province = res[0].value;
      const city = res[1]?.value;
      const areas = res[2]?.value || "";
      this.curProvinceValue = province;
      this.curCityValue = city;
      this.curAreaValue = areas;
      const addressObj = {
        province:  province !== "全部" ? province : "" || "",
        city: city !== "全部" ? city : "" || "",
        areas: areas !== "全部" ? areas : "" || ""
      }
      this.$store.dispatch('location/setUserSelectAdress', addressObj)
      this.$emit("getArea", {
        provinceValue: province !== "全部" ? province : "" || "",
        cityValue: city !== "全部" ? city : "" || "",
        areaName: areas !== "全部" ? areas : "" || "",
        re: 1,
      });
    },
    // 省市区 中的市、区加上'全部'选项
    areaTrans(data) {
      const isAreas = this.isAreas(data);
      const cityAllObj = isAreas
        ? [
            {
              name: "全部",
              citys: [
                {
                  name: "全部",
                },
              ],
            },
          ]
        : [
            {
              name: "全部",
            },
          ];
      const areaAllObj = [{ name: "全部" }];
      const convert = (list) => {
        const obj = list.some((item) => item.citys) ? cityAllObj : areaAllObj;
        return list.some((item) => item.name !== "全部")
          ? obj.concat(list)
          : list;
      };
      const newData = cloneDeep(data).map((item) => ({
        ...item,
        citys: convert(
          item.citys.map((data) => ({
            ...data,
            citys: convert(data.citys),
          }))
        ),
      }));
      // 省加上全国
      newData.unshift({
        name: "全部",
        citys: [
          {
            name: "全部",
            citys: [
              {
                name: "全部",
              },
            ],
          },
        ],
      });
      return newData;
    },
    // 判断省市区有没有区的信息
    isAreas(data) {
      let result = false;
      data.map((item) => {
        if (item.citys) {
          item.citys.map((o) => {
            if (o.citys.length) {
              result = true;
            }
          });
        }
      });
      return result;
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
