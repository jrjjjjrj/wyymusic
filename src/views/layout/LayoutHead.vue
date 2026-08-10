<script setup>
import LoginRequest from '@/components/LoginRequest.vue'
import WrapperContainer from '@/components/WrapperContainer.vue'
import router from '@/router'
import { ref } from 'vue'

//绑定子组件
const loginrequest = ref(null)

//拿到子组件暴露的方法
const open = () => loginrequest.value.getkeyandphoto()

//拿到搜索关键字
const keywords = ref('')
const goSearch = (keywords) => {
  router.push({
    path: '/wyysearch',
    query: {
      keywords,
    },
  })
}
</script>
<template>
  <div class="head">
    <WrapperContainer class="wrapper-containert">
      <template #default>
        <div class="logo-nav">
          <div class="logo">
            <img src="/src/assets/photos/网易云图标.jpg" alt="" />
            <span>网易云音乐</span>
          </div>
          <div class="nav">
            <router-link class="nav-link" to="/musichouse">音乐馆</router-link>
            <router-link class="nav-link" to="/mymusic">我的音乐</router-link>
          </div>
        </div>
        <div class="search-but">
          <input type="text" placeholder="请搜索歌曲/歌手/专辑" v-model="keywords" />
          <el-button type="success" class="search-btn" @click="goSearch(keywords)">搜索</el-button>
          <el-button @click="open" type="danger">登录</el-button>
        </div>
      </template>
    </WrapperContainer>
    <LoginRequest ref="loginrequest"></LoginRequest>
  </div>
  <router-view></router-view>
</template>
<style scoped lang="scss">
.head {
  color: #fff;
  background-color: #242424;
}
.wrapper-containert {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-nav {
  display: flex;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.nav {
  margin-left: 50px;
}

.nav .nav-link {
  color: #fff;
  margin-right: 20px;
  display: inline-block;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  background-color: #242424;
}
.nav .nav-link:hover {
  background-color: red;
}

.nav .nav-link.router-link-active {
  background-color: red;
}

input {
  height: 30px;
  border-radius: 10px;
  outline: none;
  padding: 10px;
  margin-right: 20px;
  border: 1px solid #000;
}

.search-btn {
  margin-right: 15px;
  margin-left: -15px;
}
</style>
