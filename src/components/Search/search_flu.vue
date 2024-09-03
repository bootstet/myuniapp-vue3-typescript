<template>
    <view class="search-content">
        <view class="search-icon flex-row flex-center" @click="triggerHandle" c-click>
            <img src="https://static.zhil.cloud/pov-h51gopv6dqicon_search.png" alt="">
        </view>
        <form class="form" action="javascript: void(0);">
            <!-- confirm-type="search" -->
            <!-- @confirm="triggerHandle" -->
            <input 
            class="weui-input"
            v-model="searchValue" 
            :placeholder="sText"
            @blur="triggerHandle"/>
        </form>
    </view>
</template>
<script>
import mixins from "./mixins";
export default {
    mixins: [mixins]
}
</script>
<style scoped lang="less">
.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.flex-center {
    justify-content: center!important;
}
.search-content {
    position: relative;
    width: 100%;
    height: 80rpx;
}
.weui-input {
    background-color: #F2F3F5;
    color: #878D99;
    width: 100%;
    border-radius: 40rpx;
    padding: 20rpx 0;
    padding-left: 66rpx;
    border: none;
    outline: none;
    font-size: 28rpx;
    box-sizing: border-box;
    height: 80rpx;
}
.weui-input::placeholder {
    color: #878D99;
}
.weui-input::-webkit-search-cancel-button {
    display: none;
}
.weui-input::-webkit-search-cancel-button {
    display: none;
}
.weui-input[type="search"]{
    -webkit-appearance:none;
} 

.search-icon {
    position: absolute;
    left: 10rpx;
    top: 50%;
    transform: translateY(-50%);
    width: 56rpx;
    color: #ffffff;
    border-radius: 40rpx;
    height: 56rpx;
    z-index: 9;

    img {
        width: 28rpx;
        height: 28rpx;
        object-fit: fill;
    }

}

</style>