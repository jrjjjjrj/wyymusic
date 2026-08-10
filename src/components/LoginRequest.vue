<script setup>
import { codeGetKey, codeGetPhoto, codeGetType } from '@/api/twocode'
import { ref } from 'vue'
const dialogVisible = ref(false)
const key = ref('')
const codeurl = ref('')
const getkeyandphoto = async () => {
  const reskey = await codeGetKey()
  key.value = reskey.data.unikey
  console.log(key.value)

  const resphoto = await codeGetPhoto(key.value)
  codeurl.value = resphoto.data.qrimg
  console.log(codeurl.value)
  dialogVisible.value = true

  const restype = await codeGetType(key.value)
  console.log(restype)
}

defineExpose({
  getkeyandphoto,
})
</script>
<template>
  <el-dialog v-model="dialogVisible" title="扫码登录网易云音乐" width="500">
    <p>使用网易云音乐扫码登陆,更安全更编辑</p>
    <div class="msg">
      <div class="left">
        <img :src="codeurl" alt="" />
        <p>打开网易云音乐APP,扫一扫登录</p>
      </div>
      <div class="right">
        <p>同步记录的歌单、歌曲和播放记录</p>
        <p>多端同步,随时随地畅听音乐</p>
        <p>更加安全的扫码登录方式</p>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss">
.msg {
  display: flex;
  justify-content: space-around;
}

.msg .right {
  width: 180px;
  padding-top: 20px;
}

.msg .right p {
  margin-bottom: 20px;
}
</style>
