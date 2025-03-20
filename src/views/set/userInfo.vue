<template>
  <div class="page">
    <nav-bar title="个人信息" />
    <div class="container">
      <div class="wrap">
        <CellList
          v-for="(it, index) in infoList"
          :key="index"
          :title="it.title"
          :show="it.show"
          :rightText="it.text"
          @handleCell="handleCellClick(it)"
        />
      </div>
    </div>

    <van-popup
      class="card-pop"
      v-model="showCard"
      round
      position="bottom"
      :safe-area-inset-bottom="true"
    >
      <van-picker
        ref="picker"
        :show-toolbar="true"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import CellList from "@/components/CellList.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserInfo",
  components: {
    CellList,
  },
  data() {
    return {
      infoList: [
        {
          name: "username",
          title: "账号",
          path: "",
          show: false,
          text: "",
        },
        {
          name: "pwd",
          title: "密码",
          path: "/set/login_pwd",
          show: true,
          text: "修改",
        },
        {
          name: "sex",
          title: "性别",
          path: "",
          text: "",
          show: false,
        },
        {
          name: "phone",
          title: "手机号",
          path: "",
          show: false,
          text: "",
        },
      ],
      isShow: false,
      showCard: false,
      columns: [
        { text: "男", value: 1 },
        { text: "女", value: 2 },
      ],
      sexObj: {
        1: "男",
        2: "女",
        0: "未知",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.infoList = this.infoList.map((it) => {
      if (it.name === "username") it.text = this.userInfo.userAccount;
      if (it.name === "sex") it.text = this.sexObj[this.userInfo.gender] || "";
      if (it.name === "phone")
        it.text = this.$options.filters.formatPhone(this.userInfo.mobilePhone);
      return it;
    });
  },
  methods: {
    ...mapActions({ userInfoFn: "user/userInfoFn" }),
    handleCellClick(it) {
      if (it.fix) {
        this.isShow = true;
        return;
      }
      this.$router.push(it.path);
    },

    /**修改性别 start */
    onConfirm(val, index) {
      console.log(val, index, "666");
      this.showCard = false;
    },

    onCancel() {
      this.showCard = false;
    },
    /**修改性别 end */
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  width: 100%;
  .container {
    position: relative;
    top: 60px;
    .wrap {
      padding: 0 10px;
    }
  }
  .c_avatar {
    .list {
      border-top: 3px solid $base_color;
      height: 100%;
      justify-content: space-evenly;
      &_item {
        align-items: center;
        .text {
          color: $font_color1;
          font-size: 14px;
          margin-top: 10px;
          text-align: center;
        }
      }
    }
  }
  ::v-deep .card-pop {
    .van-picker__confirm {
      color: $base_color !important;
    }
  }
}
</style>
