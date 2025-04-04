<template>
  <div class="page">
    <div class="part_1">
      <nav-bar
        title="添加收款账号"
        titleColor="#313231"
        leftIconColor="#313231"
        class="nav-top"
      />
    </div>
    <div class="part_2">
      <div class="data_box">
        <div class="data_tabs df_r">
          <div
            class="data_tab"
            :class="it.id === activeIndex ? 'tab_active' : ''"
            v-for="it in tabs"
            :key="it.id"
            @click="handleTab(it)"
          >
            <svg-icon :iconClass="it.icon" :size="20" />
            <span>{{ it.title }}</span>
          </div>
        </div>
        <div class="container">
          <div class="wrap">
            <van-form ref="rform" class="rform" :show-error-message="true">
              <div v-if="form.type != 1">
                <div class="itme df_r">
                  <!-- <div class="label">真实姓名</div> -->
                  <van-field
                    v-model="form.bankUserName"
                    placeholder="请输入真实姓名"
                    autosize
                    autocomplete="off"
                    :border="false"
                    :readonly="true"
                  >
                  </van-field>
                </div>

                <div class="itme df_r">
                  <!-- <div class="label">支付宝账户</div> -->
                  <van-field
                    v-model="form.bankNumber"
                    placeholder="请输入您的支付宝账户"
                    autosize
                    autocomplete="off"
                    :border="false"
                    :readonly="alipayOk"
                  />
                </div>

                <div class="tips">
                  <van-icon name="info" />
                  <span> 注：请必须绑定实名认证人的支付宝账户 </span>
                </div>
              </div>

              <div v-else>
                <div class="itme df_r" v-if="activeIndex === 0">
                  <van-field
                    v-model="form.bankName"
                    readonly
                    placeholder="请选择银行"
                    :border="false"
                  >
                    <template #input>
                      <div class="bank-select">
                        <van-dropdown-menu>
                          <van-dropdown-item
                            v-model="form.bankName"
                            :options="banklist"
                          />
                        </van-dropdown-menu>
                      </div>
                    </template>
                  </van-field>
                </div>

                <div class="itme df_r">
                  <van-field
                    v-model="form.bankUserName"
                    placeholder="请输入真实姓名"
                    autosize
                    autocomplete="off"
                    :border="false"
                    :readonly="true"
                  >
                  </van-field>
                </div>

                <div class="itme df_r">
                  <van-field
                    v-model="form.bankNumber"
                    :placeholder="activeIndex === 0 ? '请输入银行卡卡号' : '请输入您的支付宝账户'"
                    :readonly="activeIndex === 0 ? bankOk : alipayOk"
                    autosize
                    autocomplete="off"
                    :border="false"
                    :rules="[{ required: true }]"
                    @keyup="activeIndex === 0 ? getBankName() : null"
                  />
                </div>

                <div class="tips">
                  <van-icon name="info" />
                  <span>
                    {{ activeIndex === 0 ? '注：请必须绑定实名认证人的银行卡账户' : '注：请必须绑定实名认证人的支付宝账户' }}
                  </span>
                </div>

                <div class="itme df_r" v-if="activeIndex === 0">
                  <van-field
                    v-model="form.bankBranch"
                    placeholder="请输入银行开户分行"
                    :readonly="bankOk"
                    autosize
                    autocomplete="off"
                    :border="false"
                    :rules="[{ required: true }]"
                  />
                </div>
              </div>
            </van-form>
          </div>

          <div class="part_3" v-if="isSubmit">
            <van-button block :loading="!submit" @click="bindBank">
              {{ submit ? "添加" : "添加中..." }}
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  bankListApi,
  bindBankApi,
  getUserAndOneBankApi,
  bankCardAttribution,
} from "@/api/member";
export default {
  name: "Team",
  data() {
    return {
      title: "添加收款账号",
      bankList: [],
      tabs: [
        //{ title: "微信支付", id: 2, icon: 'wechat' },
        { title: "银行卡", id: 0, icon: "bankpay" },
        { title: "支付宝", id: 1, icon: "alipay" },
      ],
      form: {
        bankNumber: "",
        bankUserName: "",
        bankName: "",
        type: 1,
      },
      tabCurrent: 1,
      submit: true,
      isSubmit: true,
      activeIndex: 0,

      alipayOk: false,
      bankOk: false,

      banklist: [
        { text: "请选择银行", value: "" },
        { text: "三河蒙银", value: "三河蒙银" },
        { text: "上海农商银行", value: "上海农商银行" },
        { text: "上海银行", value: "上海银行" },
        { text: "上饶银行", value: "上饶银行" },
        { text: "东亚银行", value: "东亚银行" },
        { text: "东海村镇银行", value: "东海村镇银行" },
        { text: "东莞农商银行", value: "东莞农商银行" },
        { text: "东莞银行", value: "东莞银行" },
        { text: "东营银行", value: "东营银行" },
        { text: "中信银行", value: "中信银行" },
        { text: "中原银行", value: "中原银行" },
        { text: "中国银行", value: "中国银行" },
        { text: "中银富登", value: "中银富登" },
        { text: "临商银行", value: "临商银行" },
        { text: "丹东银行", value: "丹东银行" },
        { text: "乌海银行", value: "乌海银行" },
        { text: "乌鲁木齐银行", value: "乌鲁木齐银行" },
        { text: "九江银行", value: "九江银行" },
        { text: "云南农信", value: "云南农信" },
        { text: "云南省农村信用社", value: "云南省农村信用社" },
        { text: "云南红塔银行", value: "云南红塔银行" },
        { text: "交通银行", value: "交通银行" },
        { text: "众邦银行", value: "众邦银行" },
        { text: "保定银行", value: "保定银行" },
        { text: "光大银行", value: "光大银行" },
        { text: "兰州银行", value: "兰州银行" },
        { text: "兴业银行", value: "兴业银行" },
        { text: "内蒙古农村信用社联合社", value: "内蒙古农村信用社联合社" },
        { text: "内蒙古银行", value: "内蒙古银行" },
        { text: "农业银行", value: "农业银行" },
        { text: "包商银行", value: "包商银行" },
        { text: "北京农商行", value: "北京农商行" },
        { text: "北京农商银行", value: "北京农商银行" },
        { text: "北京银行", value: "北京银行" },
        { text: "北京顺义银座村镇银行", value: "北京顺义银座村镇银行" },
        { text: "华夏银行", value: "华夏银行" },
        { text: "华融湘江银行", value: "华融湘江银行" },
        { text: "卓资蒙银", value: "卓资蒙银" },
        { text: "南京银行", value: "南京银行" },
        { text: "南昌银行", value: "南昌银行" },
        { text: "厦门银行", value: "厦门银行" },
        { text: "友利银行", value: "友利银行" },
        { text: "台州银行", value: "台州银行" },
        { text: "吉林农信", value: "吉林农信" },
        { text: "吉林省农村信用社联合社", value: "吉林省农村信用社联合社" },
        { text: "吉林银行", value: "吉林银行" },
        { text: "哈尔滨农村商业银行", value: "哈尔滨农村商业银行" },
        { text: "哈尔滨银行", value: "哈尔滨银行" },
        { text: "唐山银行", value: "唐山银行" },
        { text: "嘉兴银行", value: "嘉兴银行" },
        { text: "四川农信", value: "四川农信" },
        { text: "四川天府银行", value: "四川天府银行" },
        { text: "四川省农村信用社联合社", value: "四川省农村信用社联合社" },
        { text: "国民村镇银行", value: "国民村镇银行" },
        { text: "外换银行", value: "外换银行" },
        { text: "大连银行", value: "大连银行" },
        { text: "天津农商银行", value: "天津农商银行" },
        { text: "天津滨海农商银行", value: "天津滨海农商银行" },
        { text: "天津银行", value: "天津银行" },
        { text: "太仓农商行", value: "太仓农商行" },
        { text: "威海商业银行", value: "威海商业银行" },
        { text: "威海市商业银行", value: "威海市商业银行" },
        { text: "宁夏农村信用社", value: "宁夏农村信用社" },
        { text: "宁夏银行", value: "宁夏银行" },
        { text: "宁波通商银行", value: "宁波通商银行" },
        { text: "宁波银行", value: "宁波银行" },
        { text: "安徽农金", value: "安徽农金" },
        { text: "安徽省农村信用社", value: "安徽省农村信用社" },
        { text: "安源富民村镇银行", value: "安源富民村镇银行" },
        { text: "富滇银行", value: "富滇银行" },
        { text: "富邦华一银行", value: "富邦华一银行" },
        { text: "察右前旗蒙银", value: "察右前旗蒙银" },
        { text: "山东农商银行", value: "山东农商银行" },
        { text: "山东省农村信用社联合社", value: "山东省农村信用社联合社" },
        { text: "山西省农村信用社", value: "山西省农村信用社" },
        { text: "山西银行", value: "山西银行" },
        { text: "工商银行", value: "工商银行" },
        { text: "常熟农商银行", value: "常熟农商银行" },
        { text: "常熟农村商业银行", value: "常熟农村商业银行" },
        { text: "平安银行", value: "平安银行" },
        { text: "平顶山银行", value: "平顶山银行" },
        { text: "广东农信", value: "广东农信" },
        { text: "广东华兴银行", value: "广东华兴银行" },
        { text: "广东南海农村商业银行", value: "广东南海农村商业银行" },
        { text: "广东南粤银行", value: "广东南粤银行" },
        { text: "广东省农村信用社联合社", value: "广东省农村信用社联合社" },
        { text: "广东顺德农村商业银行", value: "广东顺德农村商业银行" },
        { text: "广发银行", value: "广发银行" },
        { text: "广州农商银行", value: "广州农商银行" },
        { text: "广州银行", value: "广州银行" },
        { text: "广西农信", value: "广西农信" },
        { text: "广西农村信用社联合社", value: "广西农村信用社联合社" },
        { text: "广西北部湾银行", value: "广西北部湾银行" },
        {
          text: "广西壮族自治区农村信用社联合社",
          value: "广西壮族自治区农村信用社联合社",
        },
        { text: "廊坊银行", value: "廊坊银行" },
        { text: "建设银行", value: "建设银行" },
        { text: "张家口银行", value: "张家口银行" },
        { text: "张家港农商银行", value: "张家港农商银行" },
        { text: "德州银行", value: "德州银行" },
        { text: "徽商银行", value: "徽商银行" },
        { text: "恒丰银行", value: "恒丰银行" },
        { text: "成都农商银行", value: "成都农商银行" },
        {
          text: "成都农村商业银行股份有限公司",
          value: "成都农村商业银行股份有限公司",
        },
        { text: "成都银行", value: "成都银行" },
        { text: "承德银行", value: "承德银行" },
        { text: "招商银行", value: "招商银行" },
        { text: "攀枝花市商业银行", value: "攀枝花市商业银行" },
        { text: "文安惠民银行", value: "文安惠民银行" },
        { text: "新疆农信", value: "新疆农信" },
        { text: "新韩银行", value: "新韩银行" },
        { text: "方城凤裕村镇银行", value: "方城凤裕村镇银行" },
        { text: "无锡农商行", value: "无锡农商行" },
        { text: "日照银行", value: "日照银行" },
        { text: "昆仑银行", value: "昆仑银行" },
        { text: "昆山农商银行", value: "昆山农商银行" },
        { text: "昆明农联社", value: "昆明农联社" },
        { text: "晋中银行", value: "晋中银行" },
        { text: "晋商银行", value: "晋商银行" },
        { text: "晋城银行", value: "晋城银行" },
        { text: "朝阳银行", value: "朝阳银行" },
        { text: "杭州银行", value: "杭州银行" },
        { text: "枣庄银行", value: "枣庄银行" },
        { text: "柳州银行", value: "柳州银行" },
        { text: "桂林国民村镇银行", value: "桂林国民村镇银行" },
        { text: "桂林银行", value: "桂林银行" },
        { text: "武汉农商行", value: "武汉农商行" },
        { text: "民生银行", value: "民生银行" },
        { text: "汇丰银行", value: "汇丰银行" },
        { text: "汉口银行", value: "汉口银行" },
        { text: "江南银行", value: "江南银行" },
        { text: "江苏农信", value: "江苏农信" },
        { text: "江苏省农村信用社联合社行", value: "江苏省农村信用社联合社行" },
        { text: "江苏银行", value: "江苏银行" },
        { text: "江西农商银行", value: "江西农商银行" },
        { text: "江西省农村信用社", value: "江西省农村信用社" },
        { text: "江西裕民银行", value: "江西裕民银行" },
        { text: "江西银行", value: "江西银行" },
        { text: "沧州银行", value: "沧州银行" },
        { text: "河北农信", value: "河北农信" },
        { text: "河北省农村信用社", value: "河北省农村信用社" },
        { text: "河北银行", value: "河北银行" },
        { text: "河南农信", value: "河南农信" },
        { text: "河南省农村信用社", value: "河南省农村信用社" },
        { text: "泉州银行", value: "泉州银行" },
        { text: "泰安银行", value: "泰安银行" },
        { text: "洛阳银行", value: "洛阳银行" },
        { text: "济宁银行", value: "济宁银行" },
        { text: "浙信村镇银行", value: "浙信村镇银行" },
        { text: "浙商银行", value: "浙商银行" },
        { text: "浙江农信", value: "浙江农信" },
        { text: "浙江农商银行", value: "浙江农商银行" },
        { text: "浙江民泰商业银行", value: "浙江民泰商业银行" },
        { text: "浙江泰隆银行", value: "浙江泰隆银行" },
        { text: "浙江省农村信用社联合社", value: "浙江省农村信用社联合社" },
        { text: "浙江稠州商业银行", value: "浙江稠州商业银行" },
        { text: "浦发银行", value: "浦发银行" },
        { text: "海丰农商银行", value: "海丰农商银行" },
        { text: "海南农信社", value: "海南农信社" },
        { text: "海南省农村信用社", value: "海南省农村信用社" },
        { text: "海南银行", value: "海南银行" },
        { text: "深圳农商行", value: "深圳农商行" },
        { text: "渤海银行", value: "渤海银行" },
        { text: "温州银行", value: "温州银行" },
        { text: "湖北省农村信用社", value: "湖北省农村信用社" },
        { text: "湖北银行", value: "湖北银行" },
        { text: "湖南农信", value: "湖南农信" },
        { text: "湖商村镇银行", value: "湖商村镇银行" },
        { text: "湖州银行", value: "湖州银行" },
        { text: "漯河银行", value: "漯河银行" },
        { text: "潍坊银行", value: "潍坊银行" },
        { text: "烟台银行", value: "烟台银行" },
        { text: "焦作中旅银行", value: "焦作中旅银行" },
        { text: "珠江村镇银行", value: "珠江村镇银行" },
        { text: "珠海华润银行", value: "珠海华润银行" },
        { text: "甘肃信合", value: "甘肃信合" },
        { text: "甘肃省农村信用社", value: "甘肃省农村信用社" },
        { text: "甘肃省农村信用社联合社", value: "甘肃省农村信用社联合社" },
        { text: "甘肃银行", value: "甘肃银行" },
        { text: "盘锦银行", value: "盘锦银行" },
        { text: "盛京银行", value: "盛京银行" },
        { text: "石嘴山银行", value: "石嘴山银行" },
        { text: "福建农信", value: "福建农信" },
        { text: "福建农商银行", value: "福建农商银行" },
        { text: "福建海峡银行", value: "福建海峡银行" },
        { text: "福建省农村信用社联合社", value: "福建省农村信用社联合社" },
        { text: "稠州银行", value: "稠州银行" },
        { text: "绍兴银行", value: "绍兴银行" },
        { text: "网商银行", value: "网商银行" },
        { text: "自贡银行", value: "自贡银行" },
        { text: "花旗银行", value: "花旗银行" },
        { text: "苏州农商银行", value: "苏州农商银行" },
        { text: "苏州银行", value: "苏州银行" },
        { text: "莱商银行", value: "莱商银行" },
        { text: "莱阳胶东村镇银行", value: "莱阳胶东村镇银行" },
        { text: "营口银行", value: "营口银行" },
        { text: "葫芦岛银行", value: "葫芦岛银行" },
        { text: "蒙商银行", value: "蒙商银行" },
        { text: "西安银行", value: "西安银行" },
        { text: "贵州农信", value: "贵州农信" },
        { text: "贵州省农村信用社联合社", value: "贵州省农村信用社联合社" },
        { text: "贵州银行", value: "贵州银行" },
        { text: "贵阳农商银行", value: "贵阳农商银行" },
        { text: "贵阳银行", value: "贵阳银行" },
        { text: "赣州银行", value: "赣州银行" },
        { text: "辽宁农信", value: "辽宁农信" },
        { text: "辽宁省农村信用社", value: "辽宁省农村信用社" },
        { text: "辽阳银行", value: "辽阳银行" },
        { text: "达州银行", value: "达州银行" },
        { text: "遂宁银行", value: "遂宁银行" },
        { text: "邢台银行", value: "邢台银行" },
        { text: "邮政银行", value: "邮政银行" },
        { text: "邯郸银行", value: "邯郸银行" },
        { text: "郑州银行", value: "郑州银行" },
        { text: "鄂尔多斯银行", value: "鄂尔多斯银行" },
        { text: "鄞州银行", value: "鄞州银行" },
        { text: "重庆三峡银行", value: "重庆三峡银行" },
        { text: "重庆农村商业银行", value: "重庆农村商业银行" },
        { text: "重庆银行", value: "重庆银行" },
        { text: "金华银行", value: "金华银行" },
        { text: "银座银行", value: "银座银行" },
        { text: "锦州银行", value: "锦州银行" },
        { text: "长城华西银行", value: "长城华西银行" },
        { text: "长安银行", value: "长安银行" },
        { text: "长江银行", value: "长江银行" },
        { text: "长沙银行", value: "长沙银行" },
        { text: "阜新银行", value: "阜新银行" },
        { text: "陕西信合", value: "陕西信合" },
        { text: "陕西省农村信用社联合社", value: "陕西省农村信用社联合社" },
        { text: "霸州舜丰村镇银行", value: "霸州舜丰村镇银行" },
        { text: "青岛银行", value: "青岛银行" },
        { text: "青海省农村信用社联合社", value: "青海省农村信用社联合社" },
        { text: "青海银行", value: "青海银行" },
        { text: "鞍山银行", value: "鞍山银行" },
        { text: "韶关农商银行", value: "韶关农商银行" },
        { text: "顺德农商银行", value: "顺德农商银行" },
        { text: "黑龙江农信", value: "黑龙江农信" },
        { text: "齐商银行", value: "齐商银行" },
        { text: "齐鲁银行", value: "齐鲁银行" },
        { text: "龙江银行", value: "龙江银行" },
      ],
    };
  },
  computed: {},
  created() {
    this.getRealName();
  },
  mounted() {},
  methods: {
    handleTab(it) {
      if (it.id != this.activeIndex) {
        this.activeIndex = it.id;
        this.setBankList();
      }
      if (it.id == 1) {
        this.form.type = 2;
      } else {
        this.form.type = 1;
      }
    },
    getRealName() {
      getUserAndOneBankApi({ bank: -1 }).then((res) => {
        if (res.data.user.isReal == 2) {
          this.$dialog({
            message: "请您完成实名认证",
            className: "dialog-error",
          }).then(() => {
            this.$router.push("/set/cert");
          });
          return false;
        }
        this.form.bankUserName = res.data.user.name;
        this.bankList = res.data.bank;
        this.setBankList();
      });
    },
    setBankList() {
      if (this.bankList.length > 1) {
        for (var i = 0, len = this.bankList.length; i < len; i++) {
          if (this.activeIndex == 0 && this.bankList[i].type == 1) {
            this.form.bankNumber = this.bankList[i].number;
            this.form.bankUserName = this.bankList[i].name;
            this.alipayOk = true;
            break;
          } else if (this.activeIndex == 1 && this.bankList[i].type == 2) {
            this.form.bankName = this.bankList[i].bankName;
            this.form.bankNumber = this.bankList[i].number;
            this.bankOk = true;
            break;
          }
        }

        /*if (this.activeIndex == 1) {
          if (this.bankList[1].type == 2) {
            this.form.bankName = this.bankList[1].bankName;
            this.form.bankNumber = this.bankList[1].number;
          } else { 
            this.form.bankName = this.bankList[0].bankName;
            this.form.bankNumber = this.bankList[0].number;
          }
        } else {
          if (this.bankList[0].type == 1) {
            this.form.bankNumber = this.bankList[0].number;
          } else { 
            this.form.bankNumber = this.bankList[1].number;
          }
        }*/

        this.isSubmit = false;
      } else if (this.bankList.length == 1) {
        this.form.bankNumber = "";
        for (var i = 0, len = this.bankList.length; i < len; i++) {
          console.log(this.activeIndex);
          console.log(this.bankList[i].bankName);

          if (this.activeIndex == 0 && this.bankList[i].type == 1) {
            this.form.bankNumber = this.bankList[i].number;
            this.form.bankUserName = this.bankList[i].name;
            this.form.bankName = "";
            this.alipayOk = true;
            this.isSubmit = false;
            break;
          } else if (this.activeIndex == 1 && this.bankList[i].type == 2) {
            this.form.bankName = this.bankList[i].bankName;
            this.form.bankNumber = this.bankList[i].number;
            this.bankOk = true;
            this.isSubmit = false;
            break;
          } else {
            this.isSubmit = true;
          }
        }

        /*if (this.activeIndex == 1 && this.bankList[0].type == 2) {
          this.isSubmit = false;
            this.form.bankName = this.bankList[0].bankName;
            this.form.bankNumber = this.bankList[0].number;
        } else if (this.activeIndex == 0 && this.bankList[0].type == 1) {
          this.isSubmit = false;
            this.form.bankNumber = this.bankList[0].number;
        } else {
          this.isSubmit = true;
            this.form.bankNumber = '';
        }*/
      } else {
        this.form.bankName = "";
        this.form.bankNumber = "";
      }
    },
    getBankName() {
      var res = bankCardAttribution({ cardNo: this.form.bankNumber });
      if (res) {
        this.form.bankName = res == "error" ? "" : res.bankName;
      }
    },
    bindBank() {
      if (this.form.type != 1) {
        if (
          this.form.bankNumber == undefined ||
          this.form.bankNumber.length <= 0
        ) {
          this.$myMsg.notify({
            content: "请填写支付宝账户",
            type: "error",
            time: 1000,
          });
          return false;
        }

        var msg = "支付宝账号";
      } else if (this.form.type == 0) {
        if (
          this.form.bankNumber == undefined ||
          this.form.bankNumber.length <= 0
        ) {
          this.$myMsg.notify({
            content: "请填写银行卡卡号",
            type: "error",
            time: 1000,
          });
          return false;
        }
        if (this.form.bankName == undefined || this.form.bankName.length <= 0) {
          this.$myMsg.notify({
            content: "请填写开户银行",
            type: "error",
            time: 1000,
          });
          return false;
        }
        var msg = "银行账号";
      } else {
      }
      bindBankApi(this.form).then((res) => {
        if (res.code == 200) {
          this.$dialog({
            message: msg + "绑定成功",
            className: "dialog-error",
          });
          this.$router.push("/withdraw");
        } else {
          this.$dialog({ message: res.msg, className: "dialog-error" });
        }
      });
    },
    onLoad() {
      this.getTeam();
    },
    see(index, title) {
      if (index != this.activeIndex) {
        this.activeIndex = index;
        this.pageSize = 1;
        this.finished = false;
        this.onLoad();
      }
      //console.log('index1：'+this.activeIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f8f8f8;

  .part_1 {
    width: 100%;
    height: 165px;
    background: #ffffff;
    background: linear-gradient(
      180deg,
      #f2f6d4 0%,
      rgba(255, 254, 252, 0) 100%
    );
  }
  .part_2 {
    width: 100%;
    // border: 1px solid blue;
    margin-top: -90px;
  }

  ::v-deep .van-icon:before {
    background: #fff !important;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrap {
    padding: 16px;
    background: #ffffff6b;
    margin: 0 12px;
    // margin-top: -90px;
    border-radius: 8px;

    .tabs {
      display: flex;
      background: #fff;
      border-radius: 12px;
      padding: 8px;
      margin-bottom: 12px;

      .tab-item {
        flex: 1;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        color: #313231;
        font-size: 14px;
        cursor: pointer;

        svg {
          margin-right: 4px;
        }

        &.active {
          background: #4b594a;
          color: #fff;

          svg {
            color: #fff;
          }
        }
      }
    }

    .rform {
      .van-field {
        height: 44px;
        background: #ffffff;
        border-radius: 4px;
        margin-bottom: 24px;
        padding: 0 16px;
        border: none;
        display: flex;
        align-items: center;

        .bank-select {
          width: 100%;
          height: 100%;

          ::v-deep .van-dropdown-menu {
            width: 100%;
            height: 100%;

            .van-dropdown-menu__bar {
              height: 100%;
              box-shadow: none;
              background: transparent;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0;
            }

            .van-dropdown-menu__title {
              color: #999999;
              font-size: 15px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              margin: 0;

              &::after {
                position: static;
                transform: none;
                border-color: #999999 #999999 transparent transparent;
                border-style: solid;
                border-width: 4px;
                margin-left: auto;
                transform: rotate(135deg);
                transition: transform 0.2s;
              }
            }

            &--opened {
              .van-dropdown-menu__title {
                &::after {
                  transform: rotate(-45deg);
                }
              }
            }
          }
        }

        &::deep(.van-field__body) {
          width: 100%;
          height: 100%;
        }

        &::deep(.van-field__control) {
          height: 44px;
          line-height: 44px;
          font-size: 15px;
          color: #333333;
          padding: 0;
        }

        &::deep(.van-field__right-icon) {
          height: 44px;
          line-height: 44px;
          display: flex;
          align-items: center;
          color: #999999;
          font-size: 16px;
          padding-left: 12px;
        }

        &::deep(.van-field__placeholder) {
          color: #999999;
        }
      }
    }

    .tips {
      display: flex;
      align-items: center;
      padding: 12px 0;
      color: #ff4d4f;
      font-size: 12px;
      margin-top: -24px;

      .van-icon {
        margin-right: 4px;
        font-size: 14px;
        color: #ff4d4f;
      }
    }

    .btns {
      margin-top: 32px;

      .van-button {
        width: 100%;
        height: 44px;
        background: #4b594a;
        border: none;
        border-radius: 22px;
        color: #ffffff;
        font-size: 16px;
        font-weight: 500;

        &:active {
          opacity: 0.9;
        }
      }
    }
  }

  .part_3 {
    padding: 24px 0;
    margin: 0 12px;

    .van-button {
      width: 100%;
      height: 44px;
      background: #4b594a;
      border: none;
      border-radius: 22px;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;

      &:active {
        opacity: 0.9;
      }

      &.van-button--loading {
        opacity: 0.8;
      }
    }
  }

  .data_tabs {
    height: 44px;
    background: #ffffff6b;
    border: 1px solid #ffffff;
    border-radius: 22px;
    margin: 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    .data_tab {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4b594a;
      font-size: 14px;
      cursor: pointer;

      svg {
        margin-right: 4px;
      }
    }

    .tab_active {
      background: radial-gradient(
        202.91% 100% at 50% 0%,
        #7e963c 0%,
        #455117 100%
      );
      color: #fff;
      border-radius: 22px;
      height: 36px;
      svg {
        color: #fff;
      }
    }
  }

  .list-news {
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    margin-bottom: 12px;
    padding: 8px;
    border-radius: 8px;
    min-height: 100px;
    position: relative;

    .left {
      width: 100%;
      img {
        width: 100%;
        height: 160px;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100px;
      padding: 8px 0;
    }

    .item1 {
      text-align: right;
      margin-top: auto;
      padding-top: 8px;
      .year {
        font-size: 12px;
        color: #999;
      }
    }

    .item2 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 8px;
    }

    .item3 {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 8px;
    }
  }
}
</style>
