<script setup>
import { getCardAllMusic, getCardDetail } from '@/api/musiccard'
import WrapperContainer from '@/components/WrapperContainer.vue'
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

//获取歌单id
const route = useRoute()
const cardid = route.query.id
console.log(cardid)

//获取歌单名
const cardname = ref('')
// 获取歌单名
const getcarddetail = async () => {
  const res = await getCardDetail(cardid)
  console.log(res)
  cardname.value = res.playlist.name
}

//获取歌单所有歌曲
const allsong = ref([])
//获取歌单所有歌曲
const getcardmusic = async () => {
  const res = await getCardAllMusic(cardid)
  console.log(res)
  allsong.value = res.songs
  console.log(allsong.value)
}

//加载状态
const loading = ref(true)

// 格式化毫秒为 mm:ss
const formatDuration = (ms) => {
  if (!ms) return '00:00'
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
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

//组件渲染后调用
onMounted(() => {
  getcarddetail()
  getcardmusic()
  loading.value = false
})
</script>
<template>
  <div class="music-intro">
    <WrapperContainer>
      <template #default>
        <h2>{{ cardname }}</h2>
        <el-card style="max-width: 1280px" v-loading="loading">
          <div
            class="card"
            v-for="(item, index) in allsong"
            :key="item.id"
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
  margin: 10px 0;
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
