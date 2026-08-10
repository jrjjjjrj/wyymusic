<script setup>
import LoginRequest from '@/components/LoginRequest.vue'
import WrapperContainer from '@/components/WrapperContainer.vue'
import { ref } from 'vue'

const loginRef = ref('')

const open = () => loginRef.value.getkeyandphoto()
</script>
<template>
  <div class="mymusic">
    <WrapperContainer>
      <template #default>
        <h2>我的音乐</h2>
        <el-card>
          <p>你还未登录,请先登录后查看个人歌单</p>
          <el-button type="danger" @click="open">去登陆</el-button>
        </el-card>
        <LoginRequest ref="loginRef"></LoginRequest>
      </template>
    </WrapperContainer>
  </div>
</template>
<style scoped lang="scss">
.mymusic h2 {
  margin: 15px 0;
}

.mymusic p {
  margin-bottom: 15px;
  color: #aaa;
}
</style>
