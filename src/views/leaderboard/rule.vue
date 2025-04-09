<template>
  <div class="page">
	  <div class="part_1">
	    <nav-bar title="" class="nav-top" />
	  </div>
	  
    <div class="part_2">
        <div class="count-list">
         <img :src="require('@/assets/img/rank-rule.png')" width="100%" />
        </div>
    </div>
    
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Team",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  computed: {},
  mounted() {}, 
  methods: {},
};
</script>

<style lang="scss" scoped>
::v-deep .nav-top .van-icon:before {
      background: #fff !important;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: -4px;  
    }


.page {
  .navbar {
    position: absolute;
    width: 100%;
    top: 0;
    background: $bg_liner_color_red;
  }


  .part_1 {
    width: 100%;
    z-index: 999;
  }
  .part_2 {
    margin-top:-44px;
    .data_box {
      .count-list{
        margin-top:280px;
        width: 95%;
        margin: 0px auto;
      }
    }
  }
}
</style>
