<template>
  <div class="cal-date-box" :class="[isToday ? 'current' : '', isSelected ? 'selected' : '']" @click="dateClicked" >
    <div :style="{visibility: (index < 8) ? 'visible' : 'hidden'}" class="cal-date-day">{{day}}</div>
    <div class="cal-date-day-n" :class="isCurrMonth ? '' : 'oth-month'">{{day_val}}</div>
    <div class="cal-date-evt-cnt">
      <div v-for="meet in meetings" :key="meet.id" class="cal-date-evt" @click.stop="meetClicked(meet)" :class="(sel_id == meet.id) ? 'sel-evt' : ''">
        <span class="cal-date-evt-icn"></span>
        <span class="cal-date-evt-time">{{get12h(meet.time_from)}} - </span>
        <span class="cal-date-evt-txt">{{meet.title}}</span>
      </div>
      <div v-if="show_new" class="new-meet">
        New Meeting...
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
    meetings: Array,
    selected_date: Date
  },
  data () {
    return {
      show_new: false,
      sel_id: null
    }
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
      return this.date.toLocaleDateString(this.$parent.$parent.$data.lang, { weekday: "short" });
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
    },
    isSelected: function() {
      if (!this.selected_date) {
        return false
      }
      return this.date.toLocaleDateString() === this.selected_date.toLocaleDateString()
    }
  },
  methods: {
    dateClicked: function() {
      if (window.innerWidth > 600) {
        this.show_new = true;
        this.$emit("date-clicked", this.date);
      }
    },
    meetClicked: function(meet) {
      this.sel_id = meet.id;
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
    .new-meet {
      font-size: 8px;
      background: #eae8f3;
      color: $primary;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 2px;
      text-align: left;
    }
    .sel-evt {
      background: #fceaf0;
      padding-left: 3px;
      .cal-date-evt-icn {
        display: none;
      }
      .cal-date-evt-time,
      .cal-date-evt-txt {
        color: $secondary;
      }
    }
  }
  .oth-month {
    color: #999999;
  }
}

.current {
  border-top: 4px solid $secondary !important;
  .cal-date-day {
    color: $secondary !important;
  }
  .cal-date-day-n {
    background: $secondary;
    color: white !important;
  }
}

@media only screen and (max-width: 600px) {
    .cal-date-box {
      height: 50px;
      max-height: 50px;
      .cal-date-day-n {
        font-size: 16px;
        width: 23px;
        height: 23px;
      }
      .cal-date-evt-cnt {
        display: none;
      }
    }
    .selected {
      border: 4px solid $primary;
      .cal-date-evt-cnt {
        display: inline-block !important;
        position: fixed;
        top: 65vh;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        border-top: 2px solid #3333;
        padding: 10px !important;
        background: white;
        z-index: 5;
        .cal-date-evt {
          font-size: 18px !important;
        }
      }
    }
}
</style>
