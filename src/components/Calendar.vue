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
          <date-box v-for="n in (1,35)" :date="getNthDate(n)" :index="n" :pointer="date_pointer" :key="n"></date-box>
      </div>
  </div>
</template>

<script>
import date_box from './DateBox';

export default {
  name: 'calendar',
  data () {
    return {
        date_pointer: new Date()
    }
  },
  computed: {
    month_pointer: function () {
        return this.date_pointer.toLocaleDateString('en-us', { month: 'long' });
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
          let firstDate = new Date(this.year_pointer, this.date_pointer.getMonth())
          return new Date(firstDate.setDate(firstDate.getDate() - firstDate.getDay() + (n - 1)));
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
            }
            #cal-mon, #cal-yr {
                text-transform: uppercase;
                vertical-align: middle;
                position: relative;
                top: -1px;
                cursor: pointer;
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
