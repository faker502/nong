<template>
  <div id="video_player" class="video_player"></div>
</template>

<script>
import Player from "xgplayer";
export default {
  props: {
    url: String,
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.initPlayer();
  },
  methods: {
    initPlayer() {
      const config = {
        id: "video_player",
        poster: require("@/assets/img/video-bg.jpg"),
        url: '',
        fluid: true,
        autoplay: true,
        loop: true,
        muted: true,
        playsinline: this.isAppleDevice(),
        "x5-video-player-type": "h5",
        "x5-video-orientation": "portraint",
        controls: false,
      };
      this.player = new Player(config);
    },
    // IOS设备设置，防止被浏览器劫持
    isAppleDevice() {
      const ua = navigator.userAgent.toLowerCase();
      return /iphone|ipad|phone|Mac/i.test(ua);
    },
  },
};
</script>

<style lang="scss" scoped>
.video_player {
  width: 100%;
  height: 100%;
}
::v-deep .xgplayer-skin-default{
  background: #fff;
}
::v-veep .xgplayer-skin-default .xgplayer-poster{
  background: #fff;
}
::v-deep .xgplayer-poster{
  background-color: #fff !important;
}
::v-deep .xgplayer-skin-default{
  background-color: #fff !important;
  background: #fff !important;
}
::v-deep .xgplayer-skin-default video{
  border-radius: 20px;
}
::v-deep .xgplayer-skin-default.xgplayer-nostart .xgplayer-poster{
  border-radius: 20px;
}
::v-deep .xgplayer-skin-default video{
  border-radius: 20px;
}
.xgplayer-skin-default video {
  border-radius: 20px;
}
</style>
