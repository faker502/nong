<template>
    <transition name="slide-fade">
        <div class="my-notify" v-if="notifyFlag">
            <div class="notify success" v-if="type == 'success'">
                <!-- <i class="el-icon-success"></i> -->
                <van-icon name="checked" />
                <div class="content"> {{ content }}</div>
                <div v-if="noNotifyBtn" class="noNotifyAgain">
                    <span @click="noAgainFun">{{ noRemind }}</span>
                </div>
            </div>
            <div class="notify message" v-else-if="type == 'message'">
                <van-icon name="warning" />
                <div class="content">{{ content }}</div>
                <div v-if="noNotifyBtn" class="noNotifyAgain">
                    <span @click="noAgainFun">{{ noRemind }}</span>
                </div>
            </div>
            <div class="notify error" v-else-if="type == 'error'">
                <!-- <i class="el-icon-error"></i> -->
                <van-icon name="clear" />
                <div class="content">{{ content }}</div>
                <div v-if="noNotifyBtn" class="noNotifyAgain">
                    <span @click="noAgainFun">{{ noRemind }}</span>
                </div>
            </div>
            <div class="notify warning" v-else-if="type == 'warning'">
                <!-- <i class="el-icon-warning"></i> -->
                <van-icon name="fail" />
                <span class="content">{{ content }}</span>
                <div v-if="noNotifyBtn" class="noNotifyAgain">
                    <span @click="noAgainFun">{{ noRemind }}</span>
                </div>
            </div>
            <div v-else-if="type == 'customize'">
                <div class="van-overlay" style="z-index: 2001;"></div>
                <div class="notify customize">
                    <!-- <i class="el-icon-warning"></i> -->
                    <img :src="require('@/assets/img/icon-success.png')" width="80%">
                    <div class="content" v-html="content"></div>
                    <div v-if="noNotifyBtn" class="noNotifyAgain">
                        <span @click="noAgainFun">{{ noRemind }}</span>
                    </div>
                </div>
            </div>
            <!-- 可以简写如下 -->
            <!-- <div class="notify"
           :class="[type === 'success' ? 'success' : (type === 'error' ? 'error' : (type === 'warning' ? 'warning' : 'message')), noNotifyBtn ? 'notifyPadding' : '']">
        <i :class="[type === 'success' ? 'el-icon-success' : (type === 'error' ? 'el-icon-error' : (type === 'warning' ? 'el-icon-warning' : 'el-icon-info'))]"></i>
        <span class="content"> {{content}}</span>
        <div v-if="noNotifyBtn"
             class="noNotifyAgain">
          <span @click="noAgainFun">{{noRemind}}</span>
        </div>
      </div> -->
        </div>
    </transition>
</template>
<script>
export default {
    name: 'NotifyMessage',
    props: {},
    components: {},
    data() {
        return {
            noRemind: '确定'
        }
    },
    created() { },
    mounted() { },
    watch: {},
    computed: {},
    methods: {
        noAgainFun() {
            sessionStorage.setItem('dontRemindAgain', '1')
        }
    }
}
</script>
<style lang="scss" scoped>
.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
.notify-wrap {
    background-color: #edf2fc;
}
.my-notify {
    margin: 10px;
    width: auto;
}
.notify {
    padding: 15px 15px;
    border-radius: 4px;
    background-color: rgb(255, 244, 224);
    box-shadow: 0 5px 12px 0 rgba(204, 204, 204, 0.8);
    animation: show cubic-bezier(0.18, 0.89, 0.32, 1.28) 0.4s;
    .van-icon:before{
        font-size: 60px;
    }
}
.notify i{
    font-size: 16px;
    font-weight: 600;
    margin-right: 5px;
}
.notify .content{
    font-size: 18px;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 20px;
    padding: 20px 0 10px;
}
.notifyPadding {
    padding: 15px 15px 10px 15px;
}
.message {
    background-color: #ffffff;
    text-align: center;
}
.message i,.message .content{
    color: #e6a23c;
}
.success {
    background-color: #ffffff;
    text-align: center;
}
.success i,.success .content{
    color: #DA403B; //#67c23a;
}
.error {
    background-color: #ffffff;
    text-align: center;
}
.error i,.error .content {
    color: #DA403B;
    font-weight: 600;
}
.warning {
    background-color: #fdf6ec;
    text-align: center;
}
.warning i,.warning .content {
    color: #e6a23c;
    font-size: 18px;
}
.customize {
    position: relative;
    z-index: 2002;
    background-color: #ffffff;
    text-align: center;
}
.customize i,.customize .content {
    color: #333333;
    padding: 10px 0;
    line-height: 30px;
}
.noNotifyAgain {
    width: 100%;
    text-align: center;
    border: 1px solid #AC2023;
    border-radius: 10px;
    padding: 15px 0;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: #AC2023;
}
.noNotifyAgain span{
    font-size: 12px;
    color: #ffffff;
    border-bottom: 1px solid rgb(204, 201, 201);
    cursor: pointer;
}
.noNotifyAgain span:hover{
    color: #001a70;
    border-bottom: 1px solid #001a70;
}
@keyframes show {
    0% {
        right: -350px;
    }

    100% {
        right: 10px;
    }
}
</style>
