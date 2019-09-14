<template>
  <div class="cal-date-box" :class="isToday ? 'current' : ''" @click="dateClicked">
    <div :style="{visibility: (index < 8) ? 'visible' : 'hidden'}" class="cal-date-day">{{day}}</div>
    <div class="cal-date-day-n" :class="isCurrMonth ? '' : 'oth-month'">{{day_val}}</div>
    <div class="cal-date-evt-cnt">
      <div v-for="meet in meetings" :key="meet.id" class="cal-date-evt" @click.stop="meetClicked(meet)">
        <span class="cal-date-evt-icn"></span>
        <span class="cal-date-evt-time">{{get12h(meet.time_from)}} - </span>
        <span class="cal-date-evt-txt">{{meet.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "date_box",
  props: {
    date: Date,
    index: Number,
    pointer: Date,
    meetings: Array
  },
  data() {
    return {};
  },
  computed: {
    isToday: function() {
      if (!this.date) {
        return false;
      }
      const today = new Date();
      return (
        this.date.getDate() == today.getDate() &&
        this.date.getMonth() == today.getMonth() &&
        this.date.getFullYear() == today.getFullYear()
      );
    },
    day: function() {
      if (!this.date) {
        return "Mon";
      }
      return this.date.toLocaleDateString("en-us", { weekday: "short" });
    },
    day_val: function() {
      if (!this.date) {
        return "1";
      }
      return this.date.getDate();
    },
    isCurrMonth: function() {
      if (!this.date) {
        return true;
      }
      return this.date.getMonth() === this.pointer.getMonth();
    }
  },
  methods: {
    dateClicked: function() {
      this.$emit("date-clicked", this.date);
    },
    meetClicked: function(meet) {
      this.$emit("meet-clicked", meet);
    },
    get12h(time) {
      let H = time.substr(0, 2);
      let h = H % 12 || 12;
      let ampm = H < 12 || H === 24 ? "AM" : "PM";

      return h + time.substr(2, 3) + " " + ampm;
    }
  }
}
</script>

<style lang="scss">
@import "../global";

.cal-date-box {
  background: white;
  text-align: center;
  border-top: 4px solid transparent;
  height: 15.5vh;
  max-height: 15.5vh;
  position: relative;
  cursor: pointer;
  .cal-date-day {
    color: $primary;
    margin-bottom: 5px;
    font-size: 10px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .cal-date-day-n {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    color: #333333;
    vertical-align: middle;
    line-height: 1.4;
    margin: auto;
    margin-bottom: 10px;
    font-size: 10px;
    text-align: center;
  }
  .cal-date-evt-cnt {
    padding: 0 5px 5px 5px;
    overflow-y: auto;
    height: 60%;
    .cal-date-evt {
      font-size: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      cursor: pointer;
      margin-bottom: 5px;
      .cal-date-evt-icn {
        background: $secondary;
        height: 8px;
        width: 8px;
        display: inline-block;
        vertical-align: middle;
      }
      .cal-date-evt-time,
      .cal-date-evt-txt {
        color: #333333;
        vertical-align: middle;
      }
    }
  }
  .oth-month {
    color: #999999;
  }
}

.current {
  border-top: 4px solid $secondary;
  .cal-date-day {
    color: $secondary !important;
  }
  .cal-date-day-n {
    background: $secondary;
    color: white !important;
  }
}
</style>
