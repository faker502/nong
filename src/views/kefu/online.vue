<template>
    <div class="iframe-kefu">
 
        <nav-bar title="在线客服" left-text="返回" left-arrow @click-left="onClickLeft" titleColor="#fff" leftIconColor="#fff" />
        <iframe style="margin-top:66px" id="mainIframe" class="mainIframe" :src="iframeUrl" frameborder="0"></iframe>
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
            getConfigKey({ key: "serviceUrl" }).then((res) => {
                this.iframeUrl = res.data.serviceUrl;
            });
        },
    },
};
</script>

<style scoped lang="scss">
.iframe-kefu {
    width: 100%;
    height: 90%;

    .mainIframe {
        position: absolute;
        width: 100%;
        height: 90%;
    }
    .van-nav-bar{
        background: #afb68e !important;
		box-shadow: 0 4px 8px 0 #9521230A !important;
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
