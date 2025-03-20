<template>
  <div class="calendar">
    <div class="week df_r">
      <div class="week_item" v-for="it in weeks" :key="it">{{ it }}</div>
    </div>
    <div class="days">
      <div class="day df_r" v-for="(item, index) in dateArr" :key="index">
        <template>
          <div
            :class="[
              it == '' ? 'cur' : 'date df_c',
              isCheck(it) ? 'active' : '',
            ]"
            v-for="(it, idx) in item"
            :key="idx"
          >
            <p :class="['day_txt']">
              {{ it }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listArr"],
  data() {
    return {
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      today: new Date(),
      year: "",
      month: "",
      day: "",
      date: "",
      dateArr: [],
    };
  },
  mounted() {
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth() + 1;
    this.day = this.today.getDay();
    this.date = this.today.getDate();
    this.getCalendar();
  },
  methods: {
    isLeap() {
      const year = this.year;
      if (year % 4 == 0 && year % 100 > 0) {
        return true;
      } else if (year % 400 == 0 && year % 3200 > 0) {
        return true;
      } else {
        return false;
      }
    },
    getLen() {
      const month = this.month;
      if (month == 2) {
        if (this.isLeap) {
          return 29;
        } else {
          return 28;
        }
      } else {
        if (month < 8) {
          if (month % 2 > 0) {
            return 31;
          } else {
            return 30;
          }
        } else {
          if (month % 2 > 0) {
            return 30;
          } else {
            return 31;
          }
        }
      }
    },
    getCalendarTime() {
      return this.year + "-" + this.month + "-" + this.date;
    },
    getCalendar() {
      var len = this.getLen();
      var d = new Date(this.year, this.month - 1, 1);
      var dfw = d.getDay();
      var arr = new Array();
      var tem = 0;
      for (var i = 0; i < 6; i++) {
        arr[i] = new Array();
        for (var j = 0; j < 7; j++) {
          tem++;
          if (tem - dfw > 0 && tem - dfw <= len) {
            arr[i][j] = (tem - dfw) * 1;
          } else {
            arr[i][j] = "";
          }
        }
      }
      this.dateArr = arr;
    },
    isCheck(item) {
      let checked = false;
      this.listArr.forEach((it) => {
        if (it.day * 1 === item) checked = it.signStatus;
      });
      // console.log("checked", checked);
      return checked;
    },
  },
};
</script>

<style lang="scss" scoped>
.week {
  justify-content: space-between;
  &_item {
    color: $font_color;
    font-size: 15px;
    width: halfSize(70px);
    text-align: center;
    font-weight: bold;
  }
}
.days {
  margin-top: 20px;
  .day {
    justify-content: space-between;
    margin-bottom: 10px;

    .date,
    .cur,
    .active {
      background: $bg_color;
      border-radius: 4px;
      width: halfSize(70px);
      height: halfSize(90px);
      justify-content: center;
      align-items: center;
      .day_txt {
        color: $font_color_b;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .cur {
      background: none;
      height: 0;
    }
    .active {
      background: $font_color_b;
      border-radius: 50%;
      width: halfSize(62px);
      height: halfSize(62px);
      line-height: halfSize(62px);
      .day_txt {
        color: $font_color_white !important;
      }
    }
  }
}
</style>
