<template>
  <div id="app">
    <div id="title-bar">
      <div class="left-bar">
        <span class="logo"></span>
        <span class="title"><b>{{word('app_title')}}</b></span>
      </div>
      <div class="right-bar">
        <div class="search" @click="showSearchBar = !showSearchBar; find = ''"></div>
        <div @click="showLangBox = !showLangBox">
          <span class="lang">{{word('lang')}}</span>
          <span class="lang-icon">天</span>
          <!-- TODO - Move as component -->
          <div class="lang-box" v-if="showLangBox">
            <div class="lang-box-title">{{word('change')}}</div>
            <div class="lang-box-opt" @click="changeLang('en-us')">
              <div>
                <div class="lang-box-opt-icn lg-eng"></div>
                <div class="lang-box-opt-txt">English</div>
              </div>
              <div class="lang-box-opt-ck" :class="(lang == 'en-us') ? 'sel' : ''"></div>
            </div>
            <div class="lang-box-opt" @click="changeLang('zh')">
              <div>
                <div class="lang-box-opt-icn lg-ch"></div>
                <div class="lang-box-opt-txt">Chinese</div>
              </div>
              <div class="lang-box-opt-ck" :class="(lang == 'zh') ? 'sel' : ''"></div>
            </div>
            <div class="lang-box-opt" @click="changeLang('ru-ru')">
              <div>
                <div class="lang-box-opt-icn lg-ru"></div>
                <div class="lang-box-opt-txt">Russian</div>
              </div>
              <div class="lang-box-opt-ck" :class="(lang == 'ru-ru') ? 'sel' : ''"></div>
            </div>
          </div>
          <!-- TODO - Move as component -->
        </div>
      </div>
    </div>
    <div id="content">
      <!-- TODO - Move as component -->
      <div class="search-bar" v-if="showSearchBar">
        <span class="sc-wrap">
          <input type="text" :placeholder="word('search')+'...'" v-model="find" />
          <span v-if="find" class="sc-close" @click="find=''">x</span>
          <div class="search-results">
            <div v-for="result in search_results" :key="result.id" @click="meetClicked(result)" class="search-result-item">
              <div class="result-item">
                <div class="result-icon"></div>
                <div class="result-text" v-html="getFormatedTitle(result.title)"></div>
              </div>
              <div class="result-date">
                <div class="result-time">{{get12h(result.time_from)}} - {{get12h(result.time_to)}}</div>
                <div class="result-day">{{getRelDay(result.date)}}</div>
              </div>
            </div>
          </div>
        </span>
      </div>
      <!-- TODO - Move as component -->
      <calendar @date-clicked="dateClicked" @meet-clicked="meetClicked" :meetings="meetings" :key="renderKey"></calendar>
      <div class="new-evt-btn" @click="$refs.meeting.show = true"></div>
      <meeting ref="meeting" @save="save" @update="update" @delete="deleteM" @close="refreshUI"></meeting>
    </div>
  </div>
</template>

<script>
import calendar from './components/Calendar'
import meeting from './components/Meeting'
import sample from './assets/sample-data'
import i18n from './langKeys'

export default {
  name: 'app',
  data () {
    return {
      lang: 'en-us',
      showLangBox: false,
      showSearchBar: false,
      meetings: [],
      find: '',
      renderKey: 0
    }
  },
  created: function () {
    // This piece of code is only required for pre-populating sample data
    let meetings = window.localStorage.getItem('meetings');
    meetings = JSON.parse(meetings);
    if (!meetings) {
      window.localStorage.setItem("meetings", JSON.stringify(sample));
    }
    // This piece of code is only required for pre-populating sample data
  },
  mounted: function () {
    this.meetings = JSON.parse(window.localStorage.getItem('meetings'));
    this.meetings.map((item, index) => {
      item.id = index
    });
  },
  components: {
    'calendar': calendar,
    'meeting': meeting
  },
  methods: {
    dateClicked: function(date) {
      this.$refs.meeting.show = true;
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }

      let dateS = [year, month, day].join('-'); 
      this.$refs.meeting.date = dateS;
    },
    meetClicked: function(meet) {
      this.$refs.meeting.edit = true;
      this.$refs.meeting.show = true;
      this.$refs.meeting.id = meet.id;
      this.$refs.meeting.title = meet.title;
      this.$refs.meeting.date = meet.date;
      this.$refs.meeting.time_from = meet.time_from;
      this.$refs.meeting.time_to = meet.time_to;
      this.$refs.meeting.desc = meet.desc;
    },
    changeLang(num) {
      this.lang = num
    },
    get12h(time) {
      let H = time.substr(0, 2);
      let h = H % 12 || 12;
      let ampm = (H < 12 || H === 24) ? "AM" : "PM";
      
      return (h + time.substr(2, 3) + " " + ampm);
    },
    getRelDay(date) {
      let dateObj = new Date(date)
      let today = new Date()
      let yest = new Date()
      yest.setDate(yest.getDate() - 1)
      let weekFromToday = new Date()
      weekFromToday.setDate(weekFromToday.getDate() + 7)

      if (dateObj.toLocaleDateString() == today.toLocaleDateString()) {
        return "Today"
      } else if (dateObj.toLocaleDateString() == yest.toLocaleDateString()) {
        return "Yesterday"
      } else if (dateObj > today && dateObj < weekFromToday) {
        return dateObj.toLocaleString('en-us', { weekday: 'long' });
      }

      return dateObj.toLocaleDateString()
    },
    getFormatedTitle(title) {
      let searchPos = title.toLowerCase().indexOf(this.find.toLowerCase());
      let searchEndPos = searchPos + this.find.length + 1;
      let titleArr = title.split('');
      titleArr.splice(searchPos, 0, '<b>');
      titleArr.splice(searchEndPos, 0, '</b>');
      return titleArr.join('');
    },
    getMaxId() {
      let maxIndex = 0;
      this.meetings.map((elm) => { if (elm.id > maxIndex) { maxIndex = elm.id }});
      return maxIndex;
    },
    putLocalStorage() {
      let meetings = JSON.parse(JSON.stringify(this.meetings))
      meetings = meetings.map((meet) => { delete meet.id; return meet; });
      console.log(meetings);
      window.localStorage.setItem("meetings", JSON.stringify(meetings));
    },
    save(meetObj) {
      meetObj.id = (this.getMaxId() + 1)
      this.meetings.push(meetObj);
      this.putLocalStorage();
    },
    update(meetObj) {
      this.meetings = this.meetings.map((meet) => {
        if (meet.id === meetObj.id) {
          return meetObj;
        } else {
          return meet;
        }
      });
      this.putLocalStorage();
    },
    deleteM(id) {
      this.meetings = this.meetings.filter((meet) => {
        if (meet.id !== id) {
          return true;
        } else {
          return false;
        }
      })
      this.putLocalStorage();
    },
    refreshUI() {
      // This is a hack to reset/rerender components under calendar, mainly to reset new meeting/edit meeting indicators
      this.renderKey++;
    },
    word(key) {
      return i18n[this.lang][key]
    }
  },
  computed: {
    search_results: function () {
      return this.meetings.filter((item) => {
        if (this.find &&
            ((item.title && item.title.toLowerCase().indexOf(this.find.toLowerCase()) > -1) ||
             (item.desc && item.desc.toLowerCase().indexOf(this.find.toLowerCase()) > -1))
           ) {
          return true
        }

        return false
      })
    }
  }
}
</script>

<style lang="scss">
@import "global";

#app {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
}

#title-bar {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 10px;
  .left-bar {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 60%;
    .logo {
      display: inline-block;
      background: url('assets/logo.png') no-repeat;
      background-size: contain;
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    .title {
      color: $primary;
      vertical-align: middle;
      font-size: 16px;
    }
  }
  .right-bar {
    display: flex;
    flex-direction: row;
    .lang {
      font-size: 14px;
      vertical-align: middle;
      margin-right: 5px;
      cursor: pointer;
    }
    .lang-icon {
      width: 30px;
      height: 30px;
      display: inline-block;
      border-radius: 50%;
      vertical-align: middle;
      background: $secondary;
      color: white;
      font-size: 14px;
      text-align: center;
      font-weight: bolder;
      line-height: 2;
      cursor: pointer;
    }
    .lang-icon:hover,
    .lang-icon:focus,
    .lang-icon:active {
      filter: brightness(120%);
    }

    .lang-box {
      position: absolute;
      right: 0;
      top: 35px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #dfdfdf;
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
      z-index: 6;
      background: white;
      .lang-box-title {
        color: $primary;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .lang-box-opt {
        color: #666666;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        >div {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin-bottom: 10px;
        }
        .lg-ru {
          background: url('./assets/russia.png') no-repeat;
          background-size: 200%;
        }
        .lg-ch {
          background: url('./assets/china.png') no-repeat;
          background-size: 210%;
        }
        .lg-eng {
          background: url('./assets/english.png') no-repeat;
          background-size: 220%;
        }
        .lang-box-opt-icn {
          width: 25px;
          height: 20px;
          margin-right: 10px;
          background-position: center;
        }
        .lang-box-opt-ck {
          width: 20px;
          height: 20px;
          background: url('./assets/uncheck.png') no-repeat;
          background-size: 150%;
          background-position: center;
        }
        .sel {
          background: url('./assets/check.png') no-repeat;
          background-size: 172%;
          background-position: center;
        }
      }
      .lang-box-opt:hover,
      .lang-box-opt:active,
      .lang-box-opt:focus {
        filter: brightness(120%);
      }
    }
  }
}

.search {
  border-radius: 50%;
  border: 1px solid #b3b1b1;
  width: 30px;
  height: 30px;
  background: url('./assets/glass.png') no-repeat;
  background-size: 75%;
  background-position: center;
  margin-right: 10px;
  cursor: pointer;
}

.search-bar {
  background: white;
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 5;
  .sc-wrap {
    display: inline-block;
    position: relative;
    width: 50%;
    margin: 10px;
    &::before {
      content: '';
      position: absolute;
      pointer-events: none;
      height: 30px;
      width: 30px;
      background: url('./assets/glass.png') no-repeat;
      background-size: 75%;
      background-position: 2px 12px;
    }
    input {
      -webkit-appearance: none;
      appearance: none;
      border: 1px solid #eae7f3;
      width: 100%;
      padding: 10px;
      padding-left: 30px;
      font-size: 16px;
      border-radius: 5px;
      outline: none !important;
      margin: auto;
      box-sizing: border-box;
    }
    .sc-close {
      position: absolute;
      z-index: 5;
      right: 10px;
      top: 8px;
      color:#666666;
      cursor: pointer;
    }

    .search-results {
      position: absolute;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      z-index: 5;
      top: 40px;
      box-shadow:  5px 5px 10px rgba(0, 0, 0, 0.2);
      border-radius: 0 0 5px 5px;
      max-height: 53vh;
      overflow: scroll;

      .search-result-item {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border: 1px solid #eae7f3;
        background: white;
        cursor: pointer;
        position: relative;

        .result-item {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .result-icon {
          width: 25px;
          height: 25px;
          background: url('./assets/logo.png') no-repeat;
          background-size: contain;
          margin-right: 5px;
        }
        .result-text {
          color: rgba($primary, 0.6);
          font-size: 18px;
          font-weight: thinner;
          b {
            color: $primary;
          }
        }
        .result-date {
          font-size: 12px;
          font-weight: bold;
          min-width: 115px;
          .result-time {
            color: $primary;
          }
          .result-day {
            color: #666666;
          }
        }
      }

      .search-result-item:last-child {
        border-radius: 0 0 5px 5px;
      }
    }
  }
}
// TODO - Move as single class for all buttons
.search:hover,
.search:focus,
.search:active {
  filter: brightness(120%);
}

#content {
  background: #f4f5f7;
  height: calc(100vh - 45px);
  overflow-y: auto;
}

.new-evt-btn {
  position: fixed;
  right: 8vw;
  bottom: 80px;
  z-index: 999;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  background: url('./assets/icon.png') no-repeat;
  background-color: $primary;
  background-size: 60%;
  background-position: center center;
  box-shadow:  3px 3px 10px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

// TODO - Move as single class for all buttons
.new-evt-btn:hover,
.new-evt-btn:focus,
.new-evt-btn:active {
  filter: brightness(120%);
}

@media only screen and (max-width: 600px) {
  .sc-wrap {
    width: 95% !important;
  }
  .search-results {
    .result-item {
      .result-text {
        font-size: 14px !important;
      }
    }
    .result-date {
      font-size: 10px !important;
      min-width: 85px !important;
    }
  }
  #mt-wrapper {
    width: 100vw !important;
    left: 0 !important;
  }
  .new-evt-btn {
    bottom: 25px;
    right: 4vw;
  }
  #title-bar .left-bar .title {
    font-size: 9px;
  }
}
</style>
