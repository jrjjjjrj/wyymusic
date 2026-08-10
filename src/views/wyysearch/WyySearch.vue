<script setup>
import { getKeyMusic } from '@/api/music'
import WrapperContainer from '@/components/WrapperContainer.vue'
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// 格式化毫秒为 mm:ss
const formatDuration = (ms) => {
  if (!ms) return '00:00'
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const loading = ref(true)

const route = useRoute()
const keywords = route.query.keywords

//获取关键词歌曲
const keymusic = ref([])
const getkeymusic = async () => {
  const res = await getKeyMusic(keywords)
  console.log(res)
  keymusic.value = res.result.songs
  console.log(keymusic.value)
}

//获取音乐id
const getmusicid = (id) => {
  router.push({
    path: '/myplayer',
    query: {
      id,
    },
  })
}

onMounted(() => {
  getkeymusic()
  loading.value = false
})
</script>
<template>
  <div class="wyysearch">
    <WrapperContainer>
      <template #default>
        <h2>搜索结果</h2>
        <p>关键字:{{ keywords }}</p>
        <el-card style="max-width: 1280px" v-loading="loading">
          <div
            class="card"
            v-for="(item, index) in keymusic"
            :key="index"
            @click="getmusicid(item.id)"
          >
            <div class="left">
              <span class="index">{{ index + 1 }}</span>
              <div class="name">
                <span class="musicname">{{ item.name }}</span>
                <span class="peopnamne">{{ item.ar[0].name }}</span>
              </div>
            </div>
            <div class="right">
              <span class="musicname">{{ item.al.name }}</span>
              <span>{{ formatDuration(item.dt) }}</span>
            </div>
          </div>
        </el-card>
      </template>
    </WrapperContainer>
  </div>
</template>
<style scoped lang="scss">
h2 {
  margin: 15px 0;
}

p {
  margin-bottom: 15px;
  color: #aaa;
}

.card {
  height: 65px;
  border-bottom: 1px solid #aaa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card:hover {
  background-color: #fafafa;
}

.card .left {
  display: flex;
  align-items: center;
}

.card .left .name {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.card .right .musicname {
  margin-right: 10px;
}
</style>
