<template>
  <div>
	  <div class="select-date">
	    <div class="select-day">
	      <div
	        class="day"
	        v-for="(item,index) in deliveryTimeList"
	        :key="index"
	        :class="nowDay===index?'active':''"
	        @click="nowDay = index;"
	      >{{item.day}}</div>
	    </div>
	    <div class="select-time">
	      <!-- <div v-for="(item,index) in deliveryTimeList" :key="index"> -->
	      <div v-if="nowDay===0">
	        <div
	          @click="clickTime('60分钟')"
	          class="time"
	          :class="'60分钟'===selectTime&&nowDay===selectDay?'select':''"
	        >尽快送达|60分钟达
			
	        </div>
	        <div
	          class="time"
	          :class="i==selectTime&&nowDay===selectDay?'select':''"
	          v-for="(i,index) in deliveryTimeList[nowDay].timeList"
	          @click="clickTime(i)"
	          :key="index"
	        >
	          {{i}}
	          
	        </div>
	      </div>
	      <div v-if="nowDay!==0">
	        <div
	          class="time"
	          :class="i==selectTime&&nowDay===selectDay?'select':''"
	          v-for="(i,index) in deliveryTimeList[nowDay].timeList"
	          @click="clickTime(i)"
	          :key="index"
	        >
	          {{i}}
	          
	        </div>
	      </div>
	    </div>
	    <!-- </div> -->
	  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deliveryTime: "",
      showDelivery: false,
      deliveryTimeList: [{ day: "", timeList: "" }],
      nowDay: 0,
      selectTime: '60分钟达',
      selectDay: 0,
	 
    };
  },
  mounted() {
    this.getDliveryTime();
  },
  methods: {
	 
    clickTime(text) {
      this.selectTime = text;
      this.deliveryTime = this.deliveryTimeList[this.nowDay].day + text;
      this.selectDay = this.nowDay;
      //使用 this.$emit('input',data)改变父组件中v-model绑定的属性值
      this.$emit('sendmsg',this.deliveryTimeList[this.selectDay].day+text);
	  // conso
      this.$emit('select-time');
    },
    //计算配送时间
    getDliveryTime() {
      //获取星期几
      let date = new Date();
      let week = date.getDay();
      let today = "";
      let nextDay = "";
      let deliveryTimeList = [];
      if (week == 0) {
        today = "今天（周日）";
        nextDay = "明天（周一）";
      } else if (week == 1) {
        today = "今天（周一）";
        nextDay = "明天（周二）";
      } else if (week == 2) {
        today = "今天（周二）";
        nextDay = "明天（周三）";
      } else if (week == 3) {
        today = "今天（周三）";
        nextDay = "明天（周四）";
      } else if (week == 4) {
        today = "今天（周四）";
        nextDay = "明天（周五）";
      } else if (week == 5) {
        today = "今天（周五）";
        nextDay = "明天（周六）";
      } else if (week == 6) {
        today = "今天（周六）";
        nextDay = "明天（周日）";
      }

      //获取时间段
      let timeDate = new Date(date.getTime() + 3600000);
      let todayList = getTimeList(timeDate.getHours(), timeDate.getMinutes());
      deliveryTimeList.push({ day: today, timeList: todayList });
      let nextDayList = getTimeList(9, 0);
      deliveryTimeList.push({ day: nextDay, timeList: nextDayList });
      this.deliveryTime = "今天（周六）60分钟";
      this.$emit('input', this.deliveryTime);
      this.deliveryTimeList = [];
      this.deliveryTimeList = deliveryTimeList;
      function getTimeList(hour, minut) {
        let timeList = [];
        let startTime = hour < 9 ? 9 : hour;
        if (minut < 30) {
          for (let i = 0; i < 21 - startTime; i++) {
            for (let j = 0; j < 2; j++) {
              if (j % 2 === 0) {
                timeList.push(
                  startTime + i + ":00" + "-" + (startTime + i) + ":30"
                );
              } else {
                timeList.push(
                  startTime + i + ":30" + "-" + (startTime + i + 1) + ":00"
                );
              }
            }
          }
        } else {
          for (let i = 0; i < 21 - startTime; i++) {
            for (let j = 0; j < 2; j++) {
              if (j % 2) {
                if (i !== 20 - startTime) {
                  timeList.push(
                    startTime +
                      1 +
                      i +
                      ":00" +
                      "-" +
                      (startTime + 1 + i) +
                      ":30"
                  );
                }
              } else {
                timeList.push(
                  startTime + i + ":30" + "-" + (startTime + i + 1) + ":00"
                );
              }
            }
          }
        }
        return timeList;
      }
    }
  }
};
</script>

<style lang="less">
.select-date {
  height: 300px;
  position: absolute;
      width: 100%;
      bottom: 0.01rem;
  overflow: hidden;
  z-index: 1000;
  .select-day {
    height: 100%;
    float: left;
    width: 1.8rem;
	background: #ccc;
    .day {
      font-size: 0.12rem;
      line-height: 0.7rem;
      text-align: center;
      &.active {
        background-color: #fff;
      }
    }
  }
  .select-time {
    height: 100%;
    margin-left: 1.1rem;
    background-color: #fff;
    padding: 0 20px;
    overflow-y: auto;
    .time {
      font-size: 0.12rem;
      line-height: 0.8rem;
      border-bottom: 1px solid #eee;
      &.select {
        color: #ff4a00;
      }
      i {
        float: right;
        font-size: 0.12rem;
        color: #ff4a00;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>

