<template>
  <div class="page">
    <div class="part_1">
      <nav-bar title="银行账户" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    </div>
    <div class="container">
      <div class="wrap">
        <van-form ref="rform" class="rform" :show-error-message="false">
          <div class="itme df_r">
            <div class="label">真实姓名</div>
            <van-field v-model="form.bankUserName" placeholder="请输入真实姓名" autosize autocomplete="off" :border="false"
              :readonly="true">
            </van-field>
          </div>
          <div class="itme df_r">
            <div class="label">银行卡卡号</div>
            <van-field v-model="form.bankNumber"  placeholder="请输入银行卡卡号" autosize autocomplete="off" :border="false" :rules="[{ required: true }]" :readonly="bindOk" @keyup="getBankName"/>
          </div>
          <div class="itme df_r">
              <div class="label" style="width:200px">银行名称 <span style="color:#ccc;">(无须填写支行)</span></div>
              <van-field v-model="form.bankName"  placeholder="请输入银行名称" autosize autocomplete="off" :border="false" :rules="[{ required: true }]" :readonly="bindOk" />


              <!--<van-dropdown-menu active-color="">
                  <van-dropdown-item v-model="form.bankName"  laceholder="请输入开户银行" :border="false" :options="banklist"   />
              </van-dropdown-menu>-->

          </div>
          <div class="tips">
            <p>
              注：请必须绑定实名认证人的银行卡账户
            </p>
          </div>
        </van-form>
        <div class="bottom" v-if="isSubmit">
          <div class="btns df_r">
            <van-button v-if="submit" @click="bindBank" 
              class="btn" :disabled="form.status === 1">
              添加
            </van-button>
            <van-button v-else  class="btn"
              :disabled="form.status === 1">
              添加...
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bindBankApi, getUserAndOneBankApi, bankCardAttribution } from "@/api/member";
export default {
  name: "Cert",
  data() {
    return {
      form: {
        bankNumber: "",
        bankName: "",
        bankUserName: "",
        type: 2
      },
      forntImage: "",
      reverseImage: "",
      submit: true,
      isSubmit: true,
	  bindOk: false,	  

         banklist: [
      { text: '请选择银行', value: ''},
      { text: '三河蒙银', value: '三河蒙银'},
{ text: '上海农商银行', value: '上海农商银行'},
{ text: '上海银行', value: '上海银行'},
{ text: '上饶银行', value: '上饶银行'},
{ text: '东亚银行', value: '东亚银行'},
{ text: '东海村镇银行', value: '东海村镇银行'},
{ text: '东莞农商银行', value: '东莞农商银行'},
{ text: '东莞银行', value: '东莞银行'},
{ text: '东营银行', value: '东营银行'},
{ text: '中信银行', value: '中信银行'},
{ text: '中原银行', value: '中原银行'},
{ text: '中国银行', value: '中国银行'},
{ text: '中银富登', value: '中银富登'},
{ text: '临商银行', value: '临商银行'},
{ text: '丹东银行', value: '丹东银行'},
{ text: '乌海银行', value: '乌海银行'},
{ text: '乌鲁木齐银行', value: '乌鲁木齐银行'},
{ text: '九江银行', value: '九江银行'},
{ text: '云南农信', value: '云南农信'},
{ text: '云南省农村信用社', value: '云南省农村信用社'},
{ text: '云南红塔银行', value: '云南红塔银行'},
{ text: '交通银行', value: '交通银行'},
{ text: '众邦银行', value: '众邦银行'},
{ text: '保定银行', value: '保定银行'},
{ text: '光大银行', value: '光大银行'},
{ text: '兰州银行', value: '兰州银行'},
{ text: '兴业银行', value: '兴业银行'},
{ text: '内蒙古农村信用社联合社', value: '内蒙古农村信用社联合社'},
{ text: '内蒙古银行', value: '内蒙古银行'},
{ text: '农业银行', value: '农业银行'},
{ text: '包商银行', value: '包商银行'},
{ text: '北京农商行', value: '北京农商行'},
{ text: '北京农商银行', value: '北京农商银行'},
{ text: '北京银行', value: '北京银行'},
{ text: '北京顺义银座村镇银行', value: '北京顺义银座村镇银行'},
{ text: '华夏银行', value: '华夏银行'},
{ text: '华融湘江银行', value: '华融湘江银行'},
{ text: '卓资蒙银', value: '卓资蒙银'},
{ text: '南京银行', value: '南京银行'},
{ text: '南昌银行', value: '南昌银行'},
{ text: '厦门银行', value: '厦门银行'},
{ text: '友利银行', value: '友利银行'},
{ text: '台州银行', value: '台州银行'},
{ text: '吉林农信', value: '吉林农信'},
{ text: '吉林省农村信用社联合社', value: '吉林省农村信用社联合社'},
{ text: '吉林银行', value: '吉林银行'},
{ text: '哈尔滨农村商业银行', value: '哈尔滨农村商业银行'},
{ text: '哈尔滨银行', value: '哈尔滨银行'},
{ text: '唐山银行', value: '唐山银行'},
{ text: '嘉兴银行', value: '嘉兴银行'},
{ text: '四川农信', value: '四川农信'},
{ text: '四川天府银行', value: '四川天府银行'},
{ text: '四川省农村信用社联合社', value: '四川省农村信用社联合社'},
{ text: '国民村镇银行', value: '国民村镇银行'},
{ text: '外换银行', value: '外换银行'},
{ text: '大连银行', value: '大连银行'},
{ text: '天津农商银行', value: '天津农商银行'},
{ text: '天津滨海农商银行', value: '天津滨海农商银行'},
{ text: '天津银行', value: '天津银行'},
{ text: '太仓农商行', value: '太仓农商行'},
{ text: '威海商业银行', value: '威海商业银行', },
{ text: '威海市商业银行', value: '威海市商业银行'},
{ text: '宁夏农村信用社', value: '宁夏农村信用社'},
{ text: '宁夏银行', value: '宁夏银行'},
{ text: '宁波通商银行', value: '宁波通商银行'},
{ text: '宁波银行', value: '宁波银行'},
{ text: '安徽农金', value: '安徽农金'},
{ text: '安徽省农村信用社', value: '安徽省农村信用社'},
{ text: '安源富民村镇银行', value: '安源富民村镇银行'},
{ text: '富滇银行', value: '富滇银行'},
{ text: '富邦华一银行', value: '富邦华一银行'},
{ text: '察右前旗蒙银', value: '察右前旗蒙银'},
{ text: '山东农商银行', value: '山东农商银行'},
{ text: '山东省农村信用社联合社', value: '山东省农村信用社联合社'},
{ text: '山西省农村信用社', value: '山西省农村信用社'},
{ text: '山西银行', value: '山西银行'},
{ text: '工商银行', value: '工商银行'},
{ text: '常熟农商银行', value: '常熟农商银行'},
{ text: '常熟农村商业银行', value: '常熟农村商业银行'},
{ text: '平安银行', value: '平安银行'},
{ text: '平顶山银行', value: '平顶山银行'},
{ text: '广东农信', value: '广东农信'},
{ text: '广东华兴银行', value: '广东华兴银行'},
{ text: '广东南海农村商业银行', value: '广东南海农村商业银行'},
{ text: '广东南粤银行', value: '广东南粤银行'},
{ text: '广东省农村信用社联合社', value: '广东省农村信用社联合社'},
{ text: '广东顺德农村商业银行', value: '广东顺德农村商业银行'},
{ text: '广发银行', value: '广发银行'},
{ text: '广州农商银行', value: '广州农商银行'},
{ text: '广州银行', value: '广州银行'},
{ text: '广西农信', value: '广西农信'},
{ text: '广西农村信用社联合社', value: '广西农村信用社联合社'},
{ text: '广西北部湾银行', value: '广西北部湾银行'},
{ text: '广西壮族自治区农村信用社联合社', value: '广西壮族自治区农村信用社联合社'},
{ text: '廊坊银行', value: '廊坊银行'},
{ text: '建设银行', value: '建设银行'},
{ text: '张家口银行', value: '张家口银行'},
{ text: '张家港农商银行', value: '张家港农商银行'},
{ text: '德州银行', value: '德州银行'},
{ text: '徽商银行', value: '徽商银行'},
{ text: '恒丰银行', value: '恒丰银行'},
{ text: '成都农商银行', value: '成都农商银行'},
{ text: '成都农村商业银行股份有限公司', value: '成都农村商业银行股份有限公司'},
{ text: '成都银行', value: '成都银行'},
{ text: '承德银行', value: '承德银行'},
{ text: '招商银行', value: '招商银行'},
{ text: '攀枝花市商业银行', value: '攀枝花市商业银行'},
{ text: '文安惠民银行', value: '文安惠民银行', },
{ text: '新疆农信', value: '新疆农信'},
{ text: '新韩银行', value: '新韩银行'},
{ text: '方城凤裕村镇银行', value: '方城凤裕村镇银行'},
{ text: '无锡农商行', value: '无锡农商行'},
{ text: '日照银行', value: '日照银行'},
{ text: '昆仑银行', value: '昆仑银行'},
{ text: '昆山农商银行', value: '昆山农商银行'},
{ text: '昆明农联社', value: '昆明农联社'},
{ text: '晋中银行', value: '晋中银行'},
{ text: '晋商银行', value: '晋商银行'},
{ text: '晋城银行', value: '晋城银行'},
{ text: '朝阳银行', value: '朝阳银行'},
{ text: '杭州银行', value: '杭州银行'},
{ text: '枣庄银行', value: '枣庄银行'},
{ text: '柳州银行', value: '柳州银行'},
{ text: '桂林国民村镇银行', value: '桂林国民村镇银行'},
{ text: '桂林银行', value: '桂林银行'},
{ text: '武汉农商行', value: '武汉农商行'},
{ text: '民生银行', value: '民生银行'},
{ text: '汇丰银行', value: '汇丰银行'},
{ text: '汉口银行', value: '汉口银行'},
{ text: '江南银行', value: '江南银行'},
{ text: '江苏农信', value: '江苏农信'},
{ text: '江苏省农村信用社联合社行', value: '江苏省农村信用社联合社行'},
{ text: '江苏银行', value: '江苏银行'},
{ text: '江西农商银行', value: '江西农商银行'},
{ text: '江西省农村信用社', value: '江西省农村信用社'},
{ text: '江西裕民银行', value: '江西裕民银行'},
{ text: '江西银行', value: '江西银行'},
{ text: '沧州银行', value: '沧州银行'},
{ text: '河北农信', value: '河北农信'},
{ text: '河北省农村信用社', value: '河北省农村信用社'},
{ text: '河北银行', value: '河北银行'},
{ text: '河南农信', value: '河南农信'},
{ text: '河南省农村信用社', value: '河南省农村信用社'},
{ text: '泉州银行', value: '泉州银行'},
{ text: '泰安银行', value: '泰安银行'},
{ text: '洛阳银行', value: '洛阳银行'},
{ text: '济宁银行', value: '济宁银行'},
{ text: '浙信村镇银行', value: '浙信村镇银行'},
{ text: '浙商银行', value: '浙商银行'},
{ text: '浙江农信', value: '浙江农信'},
{ text: '浙江农商银行', value: '浙江农商银行'},
{ text: '浙江民泰商业银行', value: '浙江民泰商业银行'},
{ text: '浙江泰隆银行', value: '浙江泰隆银行'},
{ text: '浙江省农村信用社联合社', value: '浙江省农村信用社联合社'},
{ text: '浙江稠州商业银行', value: '浙江稠州商业银行'},
{ text: '浦发银行', value: '浦发银行'},
{ text: '海丰农商银行', value: '海丰农商银行'},
{ text: '海南农信社', value: '海南农信社'},
{ text: '海南省农村信用社', value: '海南省农村信用社'},
{ text: '海南银行', value: '海南银行'},
{ text: '深圳农商行', value: '深圳农商行'},
{ text: '渤海银行', value: '渤海银行'},
{ text: '温州银行', value: '温州银行'},
{ text: '湖北省农村信用社', value: '湖北省农村信用社'},
{ text: '湖北银行', value: '湖北银行'},
{ text: '湖南农信', value: '湖南农信'},
{ text: '湖商村镇银行', value: '湖商村镇银行'},
{ text: '湖州银行', value: '湖州银行'},
{ text: '漯河银行', value: '漯河银行'},
{ text: '潍坊银行', value: '潍坊银行'},
{ text: '烟台银行', value: '烟台银行'},
{ text: '焦作中旅银行', value: '焦作中旅银行'},
{ text: '珠江村镇银行', value: '珠江村镇银行'},
{ text: '珠海华润银行', value: '珠海华润银行'},
{ text: '甘肃信合', value: '甘肃信合'},
{ text: '甘肃省农村信用社', value: '甘肃省农村信用社'},
{ text: '甘肃省农村信用社联合社', value: '甘肃省农村信用社联合社'},
{ text: '甘肃银行', value: '甘肃银行'},
{ text: '盘锦银行', value: '盘锦银行'},
{ text: '盛京银行', value: '盛京银行'},
{ text: '石嘴山银行', value: '石嘴山银行'},
{ text: '福建农信', value: '福建农信'},
{ text: '福建农商银行', value: '福建农商银行'},
{ text: '福建海峡银行', value: '福建海峡银行'},
{ text: '福建省农村信用社联合社', value: '福建省农村信用社联合社'},
{ text: '稠州银行', value: '稠州银行'},
{ text: '绍兴银行', value: '绍兴银行'},
{ text: '网商银行', value: '网商银行'},
{ text: '自贡银行', value: '自贡银行'},
{ text: '花旗银行', value: '花旗银行'},
{ text: '苏州农商银行', value: '苏州农商银行'},
{ text: '苏州银行', value: '苏州银行'},
{ text: '莱商银行', value: '莱商银行'},
{ text: '莱阳胶东村镇银行', value: '莱阳胶东村镇银行'},
{ text: '营口银行', value: '营口银行'},
{ text: '葫芦岛银行', value: '葫芦岛银行'},
{ text: '蒙商银行', value: '蒙商银行'},
{ text: '西安银行', value: '西安银行'},
{ text: '贵州农信', value: '贵州农信'},
{ text: '贵州省农村信用社联合社', value: '贵州省农村信用社联合社'},
{ text: '贵州银行', value: '贵州银行'},
{ text: '贵阳农商银行', value: '贵阳农商银行'},
{ text: '贵阳银行', value: '贵阳银行'},
{ text: '赣州银行', value: '赣州银行'},
{ text: '辽宁农信', value: '辽宁农信'},
{ text: '辽宁省农村信用社', value: '辽宁省农村信用社'},
{ text: '辽阳银行', value: '辽阳银行'},
{ text: '达州银行', value: '达州银行'},
{ text: '遂宁银行', value: '遂宁银行'},
{ text: '邢台银行', value: '邢台银行'},
{ text: '邮政银行', value: '邮政银行'},
{ text: '邯郸银行', value: '邯郸银行'},
{ text: '郑州银行', value: '郑州银行'},
{ text: '鄂尔多斯银行', value: '鄂尔多斯银行'},
{ text: '鄞州银行', value: '鄞州银行'},
{ text: '重庆三峡银行', value: '重庆三峡银行'},
{ text: '重庆农村商业银行', value: '重庆农村商业银行'},
{ text: '重庆银行', value: '重庆银行'},
{ text: '金华银行', value: '金华银行'},
{ text: '银座银行', value: '银座银行'},
{ text: '锦州银行', value: '锦州银行'},
{ text: '长城华西银行', value: '长城华西银行'},
{ text: '长安银行', value: '长安银行'},
{ text: '长江银行', value: '长江银行'},
{ text: '长沙银行', value: '长沙银行'},
{ text: '阜新银行', value: '阜新银行'},
{ text: '陕西信合', value: '陕西信合'},
{ text: '陕西省农村信用社联合社', value: '陕西省农村信用社联合社'},
{ text: '霸州舜丰村镇银行', value: '霸州舜丰村镇银行'},
{ text: '青岛银行', value: '青岛银行'},
{ text: '青海省农村信用社联合社', value: '青海省农村信用社联合社'},
{ text: '青海银行', value: '青海银行'},
{ text: '鞍山银行', value: '鞍山银行'},
{ text: '韶关农商银行', value: '韶关农商银行'},
{ text: '顺德农商银行', value: '顺德农商银行' },
{ text: '黑龙江农信', value: '黑龙江农信'},
{ text: '齐商银行', value: '齐商银行'},
{ text: '齐鲁银行', value: '齐鲁银行'},
{ text: '龙江银行', value: '龙江银行'},
      ],
    };
  },
  watch: {
    // 'form.bankNumber':{ 
    //   handler(newValue, oldValue){ 
    //     console.log('被修改了', newValue, oldValue)
    //     bankNameApi({cardNo :newValue }).then((res) => {
    //       console.log(res);
    //     });
    //   }
    // }
  },
  mounted() {
    this.getRealName();
  },
  methods: {
    getRealName() {
      getUserAndOneBankApi({'bank': 2}).then((res) => {
        if (res.data.user.isReal == 2) {
          this.$dialog({ message: '请您完成实名认证', className: 'dialog-error' }).then(() => {
            this.$router.push('/set/cert');
          });
          return false;
        }

         var b  = res.data.bank

          if (b.length == 1) {
       
               if (res.data.user.name && res.data.bank[0].number && res.data.bank[0].bankName) {
                  this.isSubmit = false;
               }

               this.form.bankNumber = res.data.bank[0].number;
               this.form.bankName = res.data.bank[0].bankName;
			   this.bindOk = true;
           }
        

        this.form.bankUserName = res.data.user.name;
       
      });
    },
    getBankName() { 
     var res = bankCardAttribution({ cardNo: this.form.bankNumber });
     if (res) {
       this.form.bankName = res == 'error' ? '' : res.bankName;
     }
    },
    bindBank() {
      if (this.form.bankNumber == undefined || this.form.bankNumber.length <= 0) {
        this.$dialog({ message: '请填写银行卡卡号', className: 'dialog-error' });
        return false;
      }
      if (this.form.bankName == undefined || this.form.bankName.length <= 0) {
        this.$dialog({ message: '请填写开户银行', className: 'dialog-error' });
        return false;
      }
      this.submit = false;
      bindBankApi(this.form).then((res) => {
        this.submit = true;
        if (res.code == 200) {
          this.$dialog({ message: '银行卡账户绑定成功', className: 'dialog-error' });
          this.$router.push("/withdraw");
        } else {
          this.$dialog({ message: res.msg, className: 'dialog-error' });
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-dialog .van-button__text {
  background: radial-gradient(#F4F9FE, #D7E8FA);
  border-radius: 6px;
}

.page {
  height: 100%;
  position: relative;
    background: url('@/assets/photo/top2.webp') top left no-repeat;
    //background-color: #a9ae8a;
    background-size: 100% 168px;

  .part_1 {
    padding: 70px 10px 0;
  }

  .container {
    height: calc(100% - 48px);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: 0 auto;
    width: 100%;

    .wrap {
      padding: 10px 10px;

      .title {
        font-size: 16px;
        color: $font_color_dark;
        // font-weight: bold;
      }
      .rform {
        background: $bg_color;
        padding: 5px 10px 40px;
        border-radius: 5px;
        .itme {
          justify-content: flex-start;
          margin-bottom: 20px;
          margin-top: 10px;
          display: block;
        }

        .label {
          width: 130px;
          font-size: 15px;
          color: #A7AF78;
          margin: 16px 15px;
        }

        .tips {
          color: #D20B0B;
          line-height: 1.5;
          font-size: 14px;
        }
      }

      .bottom {
        //margin-top: 3rem;
        .pro {
          justify-content: center;

          &_text {
            margin-left: 5px;
          }

          &_txt {
            color: #3198ff;
          }
        }
      }
      .btns {
        margin-top: 20px;
        justify-content: center;
      }
    }
  }
}

::v-deep .van-form {
  .van-cell {
    font-size: 13px;
    padding: 10px 5px;
    background-color: $base_bg_color;
    border-bottom: 1px solid #c6c6c6;
  }

  .van-field__body {
    height: 30px;
  }

  .van-field__label {
    color: #A7AF78;
    display: flex;
    align-items: center;
  }

  input.van-field__control {
    color: $font_color_dark;
    height: 100%;
    padding-left: 10px;
    font-size: 16px;
  }

  input.van-field__control::-webkit-input-placeholder {
    color: #bebebe !important;
  }
}

::v-deep .btns {
  .van-button {
    padding: 0;
    //border: none;
    border-radius: 5px;
    font-size: 18px;
    width: 95%;
    height: halfSize(96px);
    letter-spacing: 1px;

    color: #A7AF78 !important;
	border: 1.5px solid #AAB086;
	background: rgba(157, 164, 112, 0.12);
  }
}
</style>
