<template>
  <div class="page">
    <div class="part_1">
	  <nav-bar title="团队规则"    titleColor='#fff' leftIconColor="#fff" class="nav-top"/>
    </div>
	
	
	<div class="part_2">
	    <div class="count-list">
	     <img src="" width="100%" />
	    </div>
	</div>
	
    
    
  </div>
</template>
<script>
import { getAccountApi } from "@/api/member";
export default {
  data() {
    return {

      accountTitle: '',
      active: 7,
      billList: [],
      account: [],
      loading: false,
      finished: false,
      pageNum: 1,
      totalPage: 0,
      total: 0,
      tips: false
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getAccountApi().then((res) => {
        this.account = res.data.account;
      });
    },
  }
    
};
</script>

<style lang="scss" scoped>

.page {
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 100%;
  background: url('@/assets/photo/top2.webp') no-repeat top left;
//background-color: #a9ae8a;
  background-size: 100% 168px;
	
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

