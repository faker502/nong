<template>
  <div class="page">
    <div class="part_1">
      <nav-bar title="团队规则"  />
    </div>


    <div class="part_2">
        <div class="panel">
			<div class="title">奖励制度</div>
			<div class="s-title">1. 奖励规则</div>
			<div class="detail">问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答</div>
			<div class="s-title">2. 奖励规则</div>
			<div class="detail">问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答</div>
       
		</div>
		
		<div class="panel">
			<div class="title">会员级别奖励</div>
			<div class="s-title">1. 邀请规则</div>
			<div class="detail">问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答，问题回答</div>
			
		       
		</div>
    </div>
    
  </div>
</template>
<script>

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
	background: #fff;
	margin-top: -30px;
  .navbar {
    position: absolute;
    width: 100%;
    top: 0;
  }

  .part_1 {
    width: 100%;
    z-index: 999;
  }
  .part_2 {
    margin-top:80px;
	text-align: center;
	position: relative;
	width: 100%;
	margin: 0 auto;
	margin-top: 100px;
	background: #fcfcfc;
	.panel {
		text-align: left;
		width: 90%;
		margin: 20px auto 20px auto;
		font-size: 16px;
		line-height: 22px;
		color: #3F3D38;
		background: #fff;
		padding: 10px 25px;
		box-sizing: border-box;
		border-radius: 5px;
		.title {
			font-family: PingFang SC;
			font-size: 16px;
			font-weight: 600;
			line-height: 22px;
			letter-spacing: 0em;
			text-align: left;	
			padding: 10px 0;	
			border-bottom: solid 1px #AC20230F;
		}
		.s-title {
			font-family: PingFang SC;
			font-size: 14px;
			font-weight: 600;
			line-height: 20px;
			letter-spacing: 0em;
			text-align: left;
			padding: 10px 0;

		}
		.detail {
			font-family: PingFang SC;
			font-size: 14px;
			font-weight: 400;
			line-height: 20px;
			letter-spacing: 0em;
			text-align: left;
			color: #626571;
			line-height: 25px;

		}
	}
  }
}
</style>
