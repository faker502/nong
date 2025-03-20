<template>
  <div class="page">
    <div class="part_1">
      <nav-bar title="用户等级" titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    </div>


    <div class="part_2" style="height:auto;">
        <div class="count-list" style="height:auto;">
         <img :src="require('@/assets/photo/lv.webp')" width="100%" />
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
    background: #abb187 !important;
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
