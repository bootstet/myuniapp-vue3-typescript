<template>
	<view class="replace-top fs_28 c_f">
		<view class="flex_center ptb_20">
            <view class="flex flex_x_between w_100 plr_30">
                <view class="flex">
                    <image 
                        class="person-img flex_self_y_center"
                        src="https://static.zhil.cloud/zhil_web_h5/his/personAdmin/icon_pay_user.png" 
                    >
                    </image>
                    <view class="ml_10 mr_20 flex_self_y_center">{{patientInfo.name}}</view>
                    <view v-if="patientInfo.patientIdCard && hisOrgInfo.hisType == 1" class="flex_self_y_center jz">{{patientInfo.patientIdCard}}</view>
                </view>
                
                <view class="pb-btn edt-btn flex_self_y_center">
                    <image 
                        class="edt-switch mr_10"
                        src="https://static.zhil.cloud/zhil_web_h5/his/home/icon_home_switch.png" 
                    >
                    </image>
                    <view class="fs_26 c_f" @click="goJump" c-click>更换就诊人</view>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
    import { mapGetters } from 'vuex'
    import store from '@/store'
	export default {
		data() {
			return {
                redirectUrl: ''
            }
		},
        computed: {
            ...mapGetters(['patientInfo', 'hisOrgInfo']),
        },
		props: {
			current: {
				type: [Number, String],
				default: 0,
			},
            url: {
                type: String,
                default: '',
            }
		},
        watch: {
            url(newVal) {
                console.log('newVal', newVal)
            }
        },
        mounted() {
            if (!this.patientInfo.id) {
                this.goJump()
            }
        },
		methods: {
			goJump() {
                let locationUrl = ''
                // #ifdef MP-WEIXIN
                locationUrl = `/hisPage/home/index?source=${this.source}`
                // #endif
                // #ifdef H5
                locationUrl = encodeURIComponent(window.location.href.split('#')[1])
                // #endif
                const goUrl = `hisPage/personAdmin/index?redirect=${locationUrl}`
                this.$uni.navigateTo({
                    url: `/${goUrl}`
                })
            }
		}
	}
</script>

<style scoped lang="scss">
	.replace-top{
        background-image: linear-gradient(to right,#008BFF, #31B5FF);
        .person-img{
            width: 40rpx;
            height: 40rpx;
        }
        .edt-btn{
            width: 220rpx;
            height: 60rpx;
            .edt-switch{
                width: 30rpx;
                height: 30rpx;
            }
        }
        .jz{
            margin-right: 152rpx;
        }
    }
</style>
