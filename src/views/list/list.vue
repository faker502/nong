<template>
  <div class="page">
    <div class="part_1"></div>
    <div class="part_2"></div>
    <div class="wrap">
      <div class="tabs df_r">
        <div
          class="tab df_r"
          :class="tabIdx === index ? 'tab_active' : ''"
          v-for="(item, index) in tabs"
          :key="index"
          @click="handleTabs(index)"
          :style="{
            borderRadius:
              tabIdx === 0 ? style1.borderRadius : style2.borderRadius,
          }"
        >
          {{ item }}
        </div>
      </div>
      <div v-if="tabIdx === 0">
        <div class="list" v-if="list.length > 0">
          <div
            class="list_item df_r"
            v-for="it in list"
            :key="it.id"
            @click="handleJump(it)"
          >
            <div class="item_it img_it">
              <van-image :src="it.img" fit="contain" width="113" />
            </div>
            <div class="item_it df_c ml_10">
              <p class="t1">日收益10-12元</p>
              <p class="t2"><span>88</span> <span>188</span></p>
              <p class="t3">今日剩余1000份</p>
            </div>
            <div class="item_it t4">
              <van-button
                @click="handleJump(it)"
                color="linear-gradient(180deg, #5DB1FF 0%, #0070D9  100%)"
                >立即助力</van-button
              >
            </div>
          </div>
        </div>
        <van-empty description="暂无数据" v-else />
      </div>
      <div class="mine" v-else>
        <div class="mine_income">今日总收益：30元</div>
        <div class="list2" v-if="list2.length > 0">
          <div
            class="list2_item df_c"
            v-for="it in list2"
            :key="it.id"
            @click="handleJump(it)"
          >
            <div class="item_box df_r">
              <div class="item_it img_it">
                <van-image :src="it.img" fit="contain" width="113" />
              </div>
              <div class="item_it df_c ml_10">
                <p class="t10 mt_5">已助力</p>
                <p class="t12 mt_20"><span>88元</span></p>
              </div>
              <div class="item_it t4">
                <p class="t10">今日收益：10元</p>
                <p class="t10 mt_25">剩余收益：30天</p>
              </div>
            </div>
            <div class="time">助力时间：2023-05-15 23:15:30</div>
          </div>
        </div>
        <van-empty description="暂无数据" v-else />
      </div>
    </div>
    <tab-bar />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { uniqBy } from "lodash-es";
import { getToken } from "@/utils/auth";

export default {
  name: "list",
  components: {},
  data() {
    return {
      list: [
        {
          id: 1,
          img: require("@/assets/images/mm.png"),
          dayIncome: 999,
          express: 1,
          total: 1460,
          reward: 1,
          price: 88,
          stock: 15000,
          value: 13,
        },
        {
          id: 2,
          img: require("@/assets/images/mm.png"),
          dayIncome: 4,
          express: 1,
          total: 328500,
          reward: 10,
          price: 88,
          stock: 15000,
          value: 13,
        },
      ],
      list2: [
        {
          id: 1,
          img: require("@/assets/images/mm.png"),
          dayIncome: 999,
          express: 1,
          total: 1460,
          reward: 1,
          price: 88,
          stock: 15000,
          value: 13,
        },
        {
          id: 2,
          img: require("@/assets/images/mm.png"),
          dayIncome: 4,
          express: 1,
          total: 328500,
          reward: 10,
          price: 88,
          stock: 15000,
          value: 13,
        },
      ],
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tabs: ["", "我的助力"],
      tabIdx: 0,
      style1: {
        borderRadius: " 10px 0 0 10px",
      },
      style2: {
        borderRadius: " 0px 10px 10px 0px",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {},
  methods: {
    handleTabs(index) {
      this.tabIdx = index;
    },

    /**买入 */
    handleJump(it) {
      this.$router.push("/subscribe/" + it.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  font-family: PingFang SC;
  position: relative;

  .part_1 {
    background: $bg_liner_color;
    height: halfSize(280px);
    padding: 70px 10px 0;
  }
  .part_2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    height: calc(100% - 50px);
    background: $bg_liner_color2;
  }
  .wrap {
    position: absolute;
    top: 10px;
    left: 0;
    width: calc(100% - 20px);
    height: calc(100% - 90px);
    overflow-y: auto;
    padding: 15px 10px 0rem;
    color: $font_color;

    .tabs {
      width: 100%;
      height: halfSize(82px);
      background: $bg_color;
      border-radius: 10px;
      justify-content: space-between;
      transition: all 3s;
      .tab {
        flex: 1;
        justify-content: center;
        font-size: 15px;
        color: $base_color;
        height: 100%;
        // border-radius: 10px 0 0 10px;
      }
      .tab_active {
        background: $base_color;
        color: $font_color_white;
        // border-radius: 0 10px 10px 0;
      }
    }
    .list {
      margin-top: 20px;
      &_item {
        height: halfSize(280px);
        padding: 0px 15px 0;
        margin-bottom: 10px;
        background: $bg_color;
        box-shadow: 0px 1px 3px #00000029;
        border: 1px solid #409df4;
        border-radius: halfSize(19px);
        justify-content: space-between;
      }
      .item_it {
        flex: 1;
        align-items: flex-start;
        // height: 100%;
        .t1 {
          font-size: 15px;
          color: $font_color;
        }
        .t2 {
          font-size: 20px;
          font-weight: bold;
          color: $font_color_red;
          margin: 30px 0;
        }
        .t3 {
          color: $font_color1;
          font-size: 13px;
        }
      }
      .t4 {
        flex: none;
        text-align: center;
      }
    }
    .img_it {
      flex: none;
    }
    .mine {
      .mine_income {
        margin: 20px 0;
        font-size: 18px;
        font-weight: bold;
        color: $font_color;
      }
      .list2 {
        &_item {
          height: halfSize(280px);
          padding: 10px 10px 0;
          margin-bottom: 10px;
          background: $bg_color;
          box-shadow: 0px 1px 3px #00000029;
          border: 1px solid #409df4;
          border-radius: halfSize(19px);
          align-items: flex-start;
        }
        .item_box {
          width: 100%;
        }
        .item_it {
          flex: 1;
          align-items: flex-start;
          .t10 {
            font-size: 14px;
            color: $font_color;
          }
          .t12 {
            font-size: 20px;
            color: $font_color_red;
            font-weight: bold;
          }
        }
        .time {
          font-size: 14px;
          color: $font_color1;
          margin-top: 10px;
        }
      }
    }
  }
}
.mt_25 {
  margin-top: 25px;
}
.color_red {
  color: #ff2626;
}
::v-deep .item_it {
  .van-button {
    padding: 0;
    border: none;
    border-radius: halfSize(38px);
    font-size: 14px;
    width: halfSize(177px);
    height: halfSize(72px);
    letter-spacing: 1px;
    color: $font_color_white !important;
  }
}
</style>
