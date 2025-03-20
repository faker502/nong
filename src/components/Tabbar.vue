<template>
  <van-tabbar
    v-model="active"
    fixed
    safe-area-inset-bottom
    route
    z-index="2000"
    class="tabbar"
    active-color="#419DF4"
    inactive-color="#AAAAAA"
  >
    <van-tabbar-item
      v-for="(item, index) in tabList"
      :key="index"
      :name="item.name"
      :to="item.path"
    >
      <template #icon="props">
        <img :src="props.active ? item.active : item.inactive" class="i_img" />
      </template>
      <span class="title">{{ item.title }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      active: "home",
      tabList: [
        {
          active: require("@/assets/images/tabbar/home.png"),
          inactive: require("@/assets/images/tabbar/home1.png"),
          title: "首页",
          path: "/home",
          name: "home",
        },
        {
          active: require("@/assets/images/tabbar/list.png"),
          inactive: require("@/assets/images/tabbar/list1.png"),
          title: "助力",
          path: "/list",
          name: "list",
        },
        {
          active: require("@/assets/images/tabbar/kefu.png"),
          inactive: require("@/assets/images/tabbar/kefu1.png"),
          title: "客服",
          path: "",
          name: "kefu",
        },
        {
          active: require("@/assets/images/tabbar/position.png"),
          inactive: require("@/assets/images/tabbar/position1.png"),
          title: "持仓",
          path: "/position",
          name: "position",
        },
        {
          active: require("@/assets/images/tabbar/user.png"),
          inactive: require("@/assets/images/tabbar/user1.png"),
          title: "我的",
          path: "/user",
          name: "user",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["baseData"]),
  },

  mounted() {
    // this.getList();
  },
  methods: {
    ...mapActions({
      getBaseConfig: "common/getBaseConfig",
    }),
    async getList() {
      await this.getBaseConfig();
    },
  },
};
</script>
<style lang="scss" scoped>
.tabbar {
  background: $bg_color;
  // border-top: 1px solid #29c2c3;
  box-shadow: 0px -1px 3px #6493ff;
  padding: 5px 0;
  .van-tabbar-item--active {
    background-color: transparent !important;
  }
  .title {
    display: block;
    margin-top: 3px;
    font-size: 0.3rem;
  }
}
</style>
