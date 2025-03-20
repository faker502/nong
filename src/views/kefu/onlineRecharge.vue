<template>
    <div class="iframe-kefu">
        <van-nav-bar title="银行卡充值专属客服" left-arrow @click-left="onClickLeft" />
        <iframe id="mainIframe" class="mainIframe" v-bind:src="iframeUrl" frameborder="0"></iframe>
    </div>
</template>
<script>
import { getConfigKey } from "@/api/index";

export default {
    name: "kefu",
    data() {
        return {
            iframeUrl: ''
        };
    },

    mounted() {
        this.getBill();
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        getBill() {
            getConfigKey({ key: "rechargeCustomerUrl" }).then((res) => {
                this.iframeUrl = res.data.rechargeCustomerUrl;
            });
        },
    },
};
</script>
<style scoped lang="scss">
.van-nav-bar {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    background: $bg_liner_color_red;
}
.van-nav-bar__left{
    font-size: 16px;
}
.van-nav-bar__title{
    font-size:18px;
}
.van-nav-bar__left{
    font-size: 16px;
}
::v-deep .van-nav-bar .van-icon{
    color: #666;
}
::v-deep .van-icon-arrow-left:before{
    font-size: 18px;
}
::v-deep .van-nav-bar__title,::v-deep .van-nav-bar__text{
    font-size: 18px;
    color: #666;
}
.iframe-kefu {
    width: 100%;
    height: 90%;

    .mainIframe {
        position: absolute;
        width: 100%;
        height: 90%;
    }
}

.shouyi-money {
    color: rgb(244, 61, 5);
    font-size: 18px;
}

.zhichu-money {
    color: rgb(5, 244, 41);
    font-size: 18px;
}
</style>
