<template>
  <div id="cal-wrapper">
      <div id="cal-nav">
          <div id="cal-date-nav">
            <span id="cal-left-nav" @click="move_prev"></span>
            <span id="cal-date">
                <span id="cal-mon">{{month_pointer}}</span>&nbsp;<span id="cal-yr">{{year_pointer}}</span>
            </span>
            <span id="cal-right-nav" @click="move_next"></span>
          </div>
          <div id="cal-search"></div>
      </div>
      <div id="cal-container">
          <date-box v-for="n in (1,35)" @date-clicked="dateClicked" @meet-clicked="meetClicked" :date="getNthDate(n)" :meetings="getMeetings(getNthDate(n))" :index="n" :pointer="date_pointer" :selected_date="selected_date" :key="n"></date-box>
      </div>
  </div>
</template>

<script>
import date_box from './DateBox';

export default {
  name: 'calendar',
  props: {
    meetings: Array
  },
  data () {
    return {
        date_pointer: new Date(),
        selected_date: null
    }
  },
  computed: {
    month_pointer: function () {
        return this.date_pointer.toLocaleDateString(this.$parent.$data.lang, { month: 'long' });
    },
    year_pointer: function () {
        return this.date_pointer.getFullYear()
    }
  },
  methods: {
      move_next: function () {
          this.date_pointer = new Date(this.date_pointer.setMonth(this.date_pointer.getMonth() + 1));
      },
      move_prev: function () {
          this.date_pointer = new Date(this.date_pointer.setMonth(this.date_pointer.getMonth() - 1));
      },
      getNthDate: function(n) {
          let firstDate = new Date(this.year_pointer, this.date_pointer.getMonth());
          return new Date(firstDate.setDate(firstDate.getDate() - firstDate.getDay() + (n - 1)));
      },
      dateClicked: function(date) {
          this.selected_date = date;
          if (window.innerWidth > 600) {
              this.$emit('date-clicked', date);
          }
      },
      meetClicked: function(meet) {
          this.$emit('meet-clicked', meet);
      },
      getMeetings(date) {
          let meetingsInDate = this.meetings.filter((meeting) => {
              let mDateObj = new Date(meeting.date)
              if (date.toLocaleDateString() === mDateObj.toLocaleDateString()) {
                  return true;
              }

              return false;
          });
          return meetingsInDate.sort((a, b) => {
              // 24hr format, hence 1st 2 chars will be checked internally
              return (a.time_from > b.time_from) ? 1 : -1; 
          });
      }
  },
  components: {
      'date-box': date_box
  }
}
</script>

<style lang="scss">
@import "../global";

#cal-wrapper {
    max-width: 70vw;
    margin: auto;
    margin-top: 5px;
    #cal-nav {
        padding: 10px;
        background: white;
        #cal-date-nav {
            color: $primary;
            text-align: center;
            #cal-left-nav, #cal-right-nav {
                height: 15px;
                width: 15px;
                display: inline-block;
                background: url('../assets/back.png') no-repeat;
                background-size: contain;
                vertical-align: middle;
                cursor: pointer;
                margin: 0 5px;
            }
            #cal-right-nav {
                transform: rotate(180deg);
            }
            #cal-date {
                width: 140px;
                display: inline-block;
                text-transform: uppercase;
                cursor: pointer;
                font-weight: bold;
            }
            #cal-mon, #cal-yr {
                vertical-align: middle;
                position: relative;
                top: -1px;
            }
        }
    }
    #cal-container {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        grid-template-rows: repeat(5, minmax(0, 1fr));
        grid-gap: 10px;
        margin-top: 5px;
    }
}

@media only screen and (max-width: 600px) {
    #cal-wrapper {
        max-width: 90vw;
    }
}
</style>
