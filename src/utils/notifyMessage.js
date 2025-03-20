import vue from 'vue'
import myNotify from '@/components/NotifyMessage'
// 创建vue组件实例
const NOTIFY = vue.extend(myNotify)
// 添加通知节点(用来存放通知的元素)
let notifyWrap = document.createElement('div')
notifyWrap.className = 'notify-wrap'
notifyWrap.style = 'position:fixed;left:0;right:0;bottom:30%;width:90%;margin:0 auto;transition-duration:.5s;z-index: 9999;'
document.body.appendChild(notifyWrap)
let myMsg = {
    /**
     * 通知框
     * @content 提示内容;
     * @type 提示框类型，parameter： message，success，error，warning
     * @time 显示时长
     * @noNotifyBtn 是否显示 不再提示 的按钮
     */
    notify: ({
        content,
        type,
        time,
        noNotifyBtn
    }) => {
        if (sessionStorage.getItem('dontRemindAgain')) {
            return
        }
        // 创建一个存放通知的div
        const NOTIFYDOM = new NOTIFY({
            el: document.createElement('div'),
            data() {
                return {
                    notifyFlag: true, // 是否显示
                    time: time || 3000, // 取消按钮是否显示
                    content: content, // 文本内容
                    type: type || 'message', // 类型
                    noNotifyBtn: noNotifyBtn, // 不再提示的按钮是否显示
                    timer: '',
                    timeFlag: false
                }
            },
            watch: {
                timeFlag() {
                    if (this.timeFlag) {
                        this.notifyFlag = false // 销毁div渲染
                        window.clearTimeout(this.timer) // 清除计时器
                    }
                }
            },
            created() {
                this.timer = setTimeout(() => {
                    this.timeFlag = true // 时间到了，就变为true
                }, this.time)
            },
            beforeDestroy() {
                window.clearTimeout(this.timer)
            }
        })
        // 往notifyWrap里面添加通知
        notifyWrap.appendChild(NOTIFYDOM.$el)
    }
}
// 注册
function register() {
    vue.prototype.$myMsg = myMsg  // 暴露出去的方法名
}
export default {
    myMsg,
    register
}
