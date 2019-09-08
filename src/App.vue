<template>
  <div id="app">
    <div id="title-bar">
      <div class="left-bar">
        <span class="logo"></span>
        <span class="title"><b>OPEX ANALYTICS</b> MEETING SCHEDULER</span>
      </div>
      <div class="right-bar">
        <span class="lang">Language</span>
        <span class="lang-icon">天</span>
      </div>
    </div>
    <div id="content">
      <calendar></calendar>
      <div class="new-evt-btn"></div>
      <meeting></meeting>
    </div>
  </div>
</template>

<script>
import calendar from './components/Calendar'
import meeting from './components/Meeting'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    'calendar': calendar,
    'meeting': meeting
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .lang {
      font-size: 14px;
      vertical-align: middle;
      margin-right: 5px;
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
  }
}

#content {
  background: #f4f5f7;
  height: calc(100vh - 45px);
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
</style>
