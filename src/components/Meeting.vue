<template>
    <div v-if="show" id="mt-wrapper">
        <div class="mt-header">{{edit ? 'Edit Meeting' : 'New Meeting'}}<div @click="closeBox" class="mt-close"></div></div>
        <div class="mt-title">
            <span class="mt-title-icn"></span>
            <input type="text" v-model="title" placeholder="Add meeting title..."/>
        </div>
        <div class="mt-time">
            <span class="mt-time-icn"></span>
            <input class="mt-hf" v-model="date" type="date" />&nbsp;-&nbsp;<input class="mt-tr" v-model="time_from" type="time" />&nbsp;-&nbsp;<input v-model="time_to" class="mt-tr" type="time" />
        </div>
        <div class="mt-desc">
            <span class="mt-desc-icn"></span>
            <textarea v-model="desc" placeholder="Meeting description..."/>
        </div>
        <div class="mt-btns">
            <div :style="{visibility: edit ? 'visible' : 'hidden'}" @click="deleteM" class="mt-trash">
                <div class="mt-trash-icon"></div>
                <div>Delete Meeting</div>
            </div>
            <div class="mt-right-btns">
                <div class="mt-mr-btn">More Options</div>
                <div class="mt-sav-btn" @click="persist">{{edit ? 'Update' : 'Save'}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'meeting',
  data () {
    return {
        show: false,
        edit: false,
        id: null,
        title: '',
        date: null,
        time_from: null,
        time_to: null,
        desc: ''
    }
  },
  methods: {
      closeBox: function () {
        this.show = false;
        this.edit = false;
        this.id = null;
        this.title = '';
        this.date = null;
        this.time_from = null;
        this.time_to = null;
        this.desc = null;
      },
      persist: function () {
          let meetingObj = {
              "id": this.id,
              "title": this.title,
              "date": this.date,
              "time_from": this.time_from,
              "time_to": this.time_to,
              "desc": this.desc
          };
          if (!this.edit) {
              this.$emit('save', meetingObj);
          } else {
              this.$emit('update', meetingObj);
          }
          this.closeBox();
      },
      deleteM: function () {
          this.$emit('delete', this.id);
          this.closeBox();
      }
  }
}
</script>

<style lang="scss">
@import "../global";

#mt-wrapper {
    position: fixed;
    top: calc(50vh - 150px);
    left: calc(50vw - 200px);
    background: white;
    width: 400px;
    box-shadow:  5px 5px 15px rgba(0, 0, 0, 0.6);
    .mt-header {
        background: $primary;
        font-size: 18px;
        font-weight: bold;
        color: white;
        padding: 15px 20px;
        position: relative;
    }
    .mt-close {
        display: inline-block;
        background: url('../assets/close.png') no-repeat;
        background-size: contain;
        height: 15px;
        width: 15px;
        position: absolute;
        right: 10px;
        top: 18px;
        filter: brightness(200%);
        cursor: pointer;
    }
    .mt-close:focus,
    .mt-close:active,
    .mt-close:hover {
        filter: brightness(300%);
    }
    .mt-title,
    .mt-time,
    .mt-desc,
    .mt-btns {
        padding: 10px 15px;
        border-bottom: 1px solid #eeeeee;
        border-left: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;
        position: relative;
        display: flex;
        justify-content: space-between;
        input,textarea {
            padding-left: 30px;
            border: transparent;
            resize: none;
            width: 90%;
            outline: none !important;
            font-size: 12px;
            -webkit-appearance: none;
            appearance: none;
        }
        .mt-hf {
            width: 35%;
        }
        .mt-tr {
            width: 23%;
            padding-left: 0;
        }
    }
    .mt-title .mt-title-icn {
        background: url('../assets/title.png') no-repeat;   
    }
    .mt-time .mt-time-icn {
        background: url('../assets/time.png') no-repeat;   
    }
    .mt-desc .mt-desc-icn {
        background: url('../assets/desc.png') no-repeat;   
    }
    .mt-title .mt-title-icn,
    .mt-time .mt-time-icn,
    .mt-desc .mt-desc-icn {
        background-size: contain;
        display: inline-block;
        height: 20px;
        width: 20px;
        position: absolute;
        left: 10px;
        top: 10px;
    }
    .mt-btns {
        justify-content: space-between;
    }
    .mt-right-btns {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .mt-mr-btn {
        font-size: 10px;
        color: $primary;
        line-height: 3;
        margin: 0 20px;
        cursor: pointer;
    }
    .mt-sav-btn {
        color: white;
        background: $secondary;
        font-weight: bold;
        padding: 7px 15px;
        font-size: 12px;
        text-transform: uppercase;
        cursor: pointer;
    }
    .mt-trash {
        font-size: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        color: #333333;
        cursor: pointer;
        .mt-trash-icon {
            background: url('../assets/trash.png') no-repeat;
            border-radius: 50%;
            background-color: #dfdfdf;
            background-size: 75%;
            background-position: center;
            display: inline-block;
            height: 25px;
            width: 25px;
            margin-right: 10px;
        }
    }
    .mt-trash:hover,
    .mt-trash:active,
    .mt-trash:focus,
    .mt-mr-btn:hover,
    .mt-mr-btn:active,
    .mt-mr-btn:focus,
    .mt-sav-btn:hover,
    .mt-sav-btn:focus,
    .mt-sav-btn:active {
        filter: brightness(120%);
    }
}
</style>
