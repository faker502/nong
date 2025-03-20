<template>
  <div class="page">
    <div class="part_1">
      <nav-bar title="团队补助金"  />
    </div>


    <div class="part_2">
        <div class="count-list">
         <img :src="require('@/assets/img/team/bzb.webp')" width="100%" />
        </div>
    </div>
    
  </div>
</template>
<script>

import { mapActions,mapGetters } from "vuex";
import { getConfigKey} from "@/api/index";
export default {
  name: "Team",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
	  online: 'yes',
    };
  },
  created() {
	this.GetConfig();
	this.online = this.$store.getters.OnLine;  
  },
  computed: {
	  ...mapGetters(['OnLine'])
  },
  mounted() {}, 
  methods: {
	    ...mapActions(["GetConfig"])
  },
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
