<template>
  <div class="box">
    <div class="box-container">
      <form action="/">
        <van-search
          @cancel="onCancel"
          @keydown="addList($event)"
          @search="onSearch(todo)"
          placeholder="搜索"
          shape="round"
          show-action
          v-model="todo"
        />
      </form>
      <p class="search">历史搜索
        <van-icon @click="del(todo)" class="search-right" name="delete" size="0.4rem"/>
      </p>
      <div class="footer">
        <div :key="index" class="footer-div" v-for="(item,index) in list" @click="sousuo(item)">
          <span>{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import storage from "../../storage/storage";
  import request from "../utils/request"
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);
  export default {
    name: "seek",
    data() {
      return {
        todo: "",
        list: [],
        token: ''
      }
    },
    methods: {
      addList(e) {
        var keys = this.todo;
        if (keys == "" || keys.split(" ").join("").length == 0) {
          this.todo = "";
        } else if (e.keyCode == 13) {
          this.list.push(keys);
          storage.set("key", this.list);
        }
      },
      del(todo) {
        // this.list.splice(todo,1);
        this.list.splice(todo);
        /**删除所有的选项 */
        storage.set("key", this.list);
      },
      onSearch() {
        request({
          url: "api/goods/search",
          method: "post",
          data: {
            goods_name: this.todo
          }
        }).then(res => {
          if (res.data.code == 200) {
            //console.log(res)
            if (res.data.data.length == 0) {
              Toast("暂无此商品")

            } else {
              this.$router.push({
                name: 'ssxqy',
                query: {
                  List: res.data.data,
                  LIst: res.data.data
                }
              })

            }
          }

        })


        // this.$router.push({
        //   name: 'ssxqy',
        // })
      },
      onCancel() {
        if (this.token == 1) {
          this.$router.push({
            name: 'mar',
          })
        } else {
          this.$router.push({
            name: 'home',
          })
        }
      },
      sousuo(i) {
        request({
          url: "api/goods/search",
          method: "post",
          data: {
            goods_name: i
          }
        }).then(res => {
          if (res.data.code == 200) {
            //console.log(res)
            if (res.data.data.length == 0) {
              Toast("暂无此商品")

            } else {
              this.$router.push({
                name: 'ssxqy',
                query: {
                  List: res.data.data,
                  LIst: res.data.data
                }
              })

            }
          }

        })
      }
    },
    mounted() {
      /*生命周期函数， vue页面刷新就会触发的方法*/
      var list = storage.get("key");
      if (list) {
        this.list = list;
      }
      this.token = this.$route.query.token
    }
  }
</script>

<style scoped>
  .search {
    font-size: 0.28rem;
    color: #999999;
    height: 0.8rem;
    line-height: 0.8rem;
    width: 6.9rem;
    text-align: left;
    margin: 0 auto;
  }

  .search-right {
    float: right;
    position: relative;
    top: 0.2rem;
  }

  .footer {
    width: 6.9rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;


  }

  .footer-div {
    min-width: 1rem;
    max-width: 2.5rem;
    font-size: 0.28rem;
    margin: 0rem 0.1rem;
    background: rgba(247, 247, 247, 1);
    border-radius: 30px;
    padding: 0.1rem 0.2rem;
    margin-bottom: 0.2rem;
    white-space: nowrap; /*不允许换行*/
    word-break: keep-all; /*不允许换行*/
    text-overflow: ellipsis; /*超过行数省略...*/
    overflow: hidden;
  }

  /deep/ .van-search__action {
    font-size: 0.28rem;
  }

  /deep/ .van-field__control {
    color: #CCCCCC;
    font-size: 0.29rem;
    position: relative;
    bottom: -0.03rem;
  }
</style>
