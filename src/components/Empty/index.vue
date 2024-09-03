<template>
    <view class="empty flex_c_center" :style="customStyle">
        <u-image
            :src='src'
            :width="width+'rpx'"
            :height="height+'rpx'"
            class="empty-img"
        >
        </u-image>
        <text
            class="empty-desc mt_40"
            :style="{fontSize: `${fontSize}rpx`, color, textAlign: align, fontWeight: bold}"
        >
            {{title}}
        </text>
        <view class="empty-btn mt_30" @click="returnToHomePage" v-show="hasHomeBtn" c-click>返回首页</view>
    </view>
</template>
<script>
import {
    mapGetters
} from 'vuex'
export default {
    props: {
        hasHomeBtn: {
            type: Boolean,
            default: true,
        },
        width: {
            type: Number | String,
            default: 267
        },
        height: {
            type: Number | String,
            default: 200
        },
        src: {
            type: String,
            default: 'https://static.zhil.cloud/zhil_web_h5/pov-h5/20220419/img_emptypages_material.png'
        },
        title: {
            type: String,
            default: '暂无数据'
        },
        fontSize: {
            type: Number | String,
            default: '30'
        },
        color: {
            type: String,
            default: '#878D99'
        },
        align: {
          type: String,
          default: 'left'
        },
        bold: {
          type: String,
          default: 'normal'
        },
        customStyle: {
            type: String,
            default: 'normal'
        },
    },
    computed: {
        ...mapGetters(['source'])
    },
    methods: {
        returnToHomePage() {
            // #ifdef  H5
            const homeUrl = uni.getStorageSync('indexUrl')
            if (homeUrl.includes('arcPage')) {
                uni.navigateTo({
                    url: `/${homeUrl}`
                })
            } else {
                const router = uni.getStorageSync('indexUrl') != 'pages/home/index' ? 'reLaunch' : 'switchTab'
                uni[router]({
                    url: '/' + uni.getStorageSync('indexUrl')
                })
            }
            // #endif
            // #ifdef MP-WEIXIN
            uni.switchTab({
                url: '/pages/home/index'
            })
            // #endif
        },
    }
}
</script>
<style lang="scss" scoped>
    .empty {
        position: fixed;
        top: calc(50% - 44px);
        left: 50%;
        transform: translate(-50%, -50%);
        .empty-desc {
            font-size: 30rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #878D99;
            display: block;
        }
        .empty-btn {
            width: 300rpx;
            height: 80rpx;
            line-height: 80rpx;
            background: #00A3FF;
            border-radius: 45rpx;
            font-size: 32rpx;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: 500;
            color: #FFFFFF;
            text-align: center;
        }
    }
</style>