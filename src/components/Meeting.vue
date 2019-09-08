<template>
    <div id="mt-wrapper">
        <div class="mt-header">{{'New Meeting'}}</div>
        <div class="mt-title">
            <span class="mt-title-icn"></span>
            <input type="text" placeholder="Add meeting title..."/>
        </div>
        <div class="mt-time">
            <span class="mt-time-icn"></span>
            <input type="date" placeholder="Add meeting title..."/>
        </div>
        <div class="mt-desc">
            <span class="mt-desc-icn"></span>
            <textarea placeholder="Meeting description..."/>
        </div>
        <div class="mt-btns">
            <button>More Options</button>
            <button>Save</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'meeting',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import "../global";

#mt-wrapper {
    position: fixed;
    top: calc(50vh - 200px);
    left: calc(50vw - 150px);
    background: white;
    min-width: 350px;
    .mt-header {
        background: $primary;
        font-size: 18px;
        font-weight: bold;
        color: white;
        padding: 15px 20px;
    }
    .mt-title, .mt-time, .mt-desc, .mt-btns {
        padding: 10px 15px;
        border-bottom: 1px solid #eeeeee;
        border-left: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;
    }
    .mt-btns {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    input, textarea {
        -webkit-appearance: none;
        appearance: none;
    }
}
</style>
