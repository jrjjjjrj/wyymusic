<script setup>
import { getNewMusic } from '@/api/music'
import { getGoodMusicCard } from '@/api/musiccard'
import { getPeople } from '@/api/people'
import WrapperContainer from '@/components/WrapperContainer.vue'
import router from '@/router'
import { onMounted, ref } from 'vue'

//推荐歌单
const goodmusiccard = ref([])

const getmusiccard = async () => {
  const res = await getGoodMusicCard()
  console.log(res.result)
  goodmusiccard.value = res.result
  console.log(goodmusiccard.value)
}

//传入id进入对应歌单详情页
const getcardid = (id) => {
  router.push({
    path: '/musicintro',
    query: {
      id,
    },
  })
}

const newmusic = ref([])
//获取推荐新音乐
const getnewmusic = async () => {
  const res = await getNewMusic()
  console.log(res)
  newmusic.value = res.result
  console.log(newmusic.value)
}

//传入音乐id进入播放页面
const getmusicid = (id) => {
  router.push({
    path: '/myplayer',
    query: {
      id,
    },
  })
}

const peoplelist = ref([])
//获取歌手榜单
const getpeople = async () => {
  const res = await getPeople()
  console.log(res.list.artists)
  peoplelist.value = res.list.artists
}

//组件渲染后调用 推荐歌单渲染 推荐新音乐 歌手榜单
onMounted(() => {
  getmusiccard()
  getnewmusic()
  getpeople()
})
</script>
<template>
  <div class="good-music-card">
    <WrapperContainer>
      <template #default>
        <h2>精品歌单</h2>
        <div class="container">
          <div v-for="item in goodmusiccard" :key="item.id">
            <img :src="item.picUrl + '?param=250y250'" @click="getcardid(item.id)" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </template>
    </WrapperContainer>
  </div>
  <div class="new-music">
    <WrapperContainer>
      <template #default>
        <h2>推荐新音乐</h2>
        <div class="container">
          <div v-for="(item, index) in newmusic" :key="index" class="musicbox">
            <img
              :src="item.picUrl + '?param=200y200'"
              alt=""
              class="musicphoto"
              @click="getmusicid(item.id)"
            />
            <div class="text">
              <p class="musicname">{{ item.name }}</p>
              <p class="peopname">{{ item.song.artists[0].name }}</p>
            </div>
          </div>
        </div>
      </template>
    </WrapperContainer>
  </div>
  <div class="music-peop">
    <WrapperContainer>
      <template #default>
        <h2>歌手榜单</h2>
        <el-carousel
          :autoplay="false"
          type="card"
          height="200px"
          trigger="click"
          indicator-position="none"
        >
          <el-carousel-item
            v-for="item in peoplelist"
            :key="item"
            style="display: flex; align-items: center"
          >
            <img :src="item.picUrl + `?param=250y250`" alt="" />
            <p class="peopname">{{ item.name }}</p>
          </el-carousel-item>
        </el-carousel>
      </template>
    </WrapperContainer>
  </div>
</template>
<style scoped lang="scss">
.good-music-card h2 {
  margin-bottom: 10px;
}

.good-music-card .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.good-music-card .container img {
  border-radius: 10px;
}

.good-music-card .container img:hover {
  cursor: pointer;
}

.good-music-card .container p {
  color: gray;
  text-align: center;
  white-space: nowrap; /* 强制不换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 溢出显示省略号 */
  width: 250px; /* 必须限制宽度，否则文字会一直撑开 */
}

.new-music h2 {
  margin: 10px 0;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.new-music .musicbox {
  display: flex;
  align-items: center;
  min-width: 50%;
  margin-bottom: 35px;
}

.new-music .musicphoto {
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

.new-music .peopname {
  color: #aaa;
}

.music-peop {
  margin-bottom: 40px;
}

.music-peop h2 {
  text-align: center;
  margin: 15px 0;
}

.el-carousel__item {
  border-radius: 50%;
}

.el-carousel__item .peopname {
  font-family:
    'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 1.2px;
  color: #ffffff;
  font-size: 40px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-left: 70px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
