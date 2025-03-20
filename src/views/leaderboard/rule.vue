<template>
  <div class="page">
	  <div class="part_1">
	    <nav-bar title="排行奖励规则"  />
	  </div>
	  
    <div class="part_2">
        <div class="count-list">
         <img :src="require('@/assets/img/rank-rule.webp')" width="100%" />
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
    margin-top:66px;
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
