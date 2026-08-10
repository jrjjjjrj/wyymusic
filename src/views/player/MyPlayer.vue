<script setup>
import { getMusicDetali, getMusicUrl, getMusicWord } from '@/api/music'
import WrapperContainer from '@/components/WrapperContainer.vue'
import { parseLyric } from '@/utils/wordexplan'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

//获取歌曲id
const route = useRoute()
const musicid = route.query.id
console.log(musicid)

const picUrl = ref('')
const musicname = ref('')
const peopname = ref('')
const alname = ref('')
//获取歌曲详情
const getmusicdetali = async () => {
  const res = await getMusicDetali(musicid)
  console.log(res.songs[0])
  picUrl.value = res.songs[0].al.picUrl
  musicname.value = res.songs[0].name
  peopname.value = res.songs[0].ar[0].name
  alname.value = res.songs[0].al.name
}

const lyricInfo = ref({ 作词: '', 作曲: '', 编曲: '', 制作人: '' })
const pureLyrics = ref([])
//获取歌词
const getmusicword = async () => {
  const res = await getMusicWord(musicid)
  console.log(res.lrc.lyric)

  //贴的那段文本
  const rawText = res.lrc.lyric
  //传入解析函数，自动拆分成 元信息 + 纯歌词
  const parsed = parseLyric(rawText)
  //   赋值给响应式变量
  lyricInfo.value = parsed.info // { 作词: '蔡健雅', 作曲: '蔡健雅', 编曲: 'Adam Lee', 制作人: '' }
  pureLyrics.value = parsed.lyrics // ['该怎么去形容你最贴切', '拿什么跟你作比较才算特别', ...]
}

const musicurl = ref('')
const end = ref('')
//获取音乐url
const getmusicurl = async () => {
  const res = await getMusicUrl(musicid)
  console.log(res.data[0].url)
  console.log(res.data[0])
  musicurl.value = res.data[0].url
  console.log(musicurl.value)
  //?.为可选链（若前者为null或者undefined直接返回undefined
  // ??为空值合并 若前面的值为 undefined 或 null，则使用 res.data[0].time 作为后备值。
  end.value = res.data[0].freeTrialInfo?.end ?? res.data[0].time / 1000
  console.log(end)
}

/**
 * 将秒数格式化为 MM:SS
 * @param {number} seconds - 秒数（如 30、30040 等）
 * @returns {string} 格式化后的字符串，如 "00:30" 或 "300:40"
 */
const formatTime = (seconds) => {
  if (!seconds && seconds !== 0) return '00:00'

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

//播放开关
const isPlaying = ref(false)
const audioRef = ref(null)
const currentTime = ref(0)
const musicplay = () => {
  const audio = audioRef.value
  if (audio.paused) {
    audio.play()
    isPlaying.value = true
  } else {
    audio.pause()
    isPlaying.value = false
  }
}
//监听当前播放进度
const onTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
  }
}

//更新audio的currentTime
const onChangeTime = (value) => {
  audioRef.value.currentTime = value
}

onMounted(() => {
  //获取歌曲详情
  getmusicdetali()
  //获取歌词
  getmusicword()
  //获取音乐url
  getmusicurl()
})
</script>

<template>
  <div class="my-player">
    <WrapperContainer class="wrapper-container">
      <template #default>
        <div class="top">
          <div class="left">
            <img :src="picUrl + `?param=250y250`" alt="" />
            <span class="musicname">{{ musicname }}</span>
            <span class="peopname">{{ peopname }}</span>
            <span class="alname">{{ alname }}</span>
          </div>
          <div class="right">
            <p class="headtitle">歌词</p>
            <p v-if="lyricInfo.作词">作词：{{ lyricInfo.作词 }}</p>
            <p v-if="lyricInfo.作曲">作曲：{{ lyricInfo.作曲 }}</p>
            <p v-if="lyricInfo.编曲">编曲：{{ lyricInfo.编曲 }}</p>
            <p v-if="lyricInfo.制作人">制作人：{{ lyricInfo.制作人 }}</p>
            <p v-for="(line, index) in pureLyrics" :key="index" class="word">
              {{ line }}
            </p>
          </div>
        </div>
        <div class="footer">
          <audio :src="musicurl" ref="audioRef" @timeupdate="onTimeUpdate"></audio>
          <el-button style="margin-right: 15px" @click="musicplay">{{
            isPlaying ? '暂停' : '播放'
          }}</el-button>
          <span class="start">{{ formatTime(currentTime) }}</span>
          <el-slider
            v-model="currentTime"
            :max="end"
            @change="onChangeTime"
            class="custom-slider"
          ></el-slider>
          <span class="end">{{ formatTime(end) }}</span>
        </div>
      </template>
    </WrapperContainer>
  </div>
</template>
<style scoped lang="scss">
.my-player {
  background-color: #181818;
}

.top {
  display: flex;
  justify-content: space-between;
  //   height: 70vh;
}

.top .left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top .left img {
  border-radius: 50%;
  margin-top: 40px;
  margin-bottom: 20px;
}

.top .left .musicname {
  color: #fff;
}

.top .left .peopname {
  color: #aaa;
  font-size: 14px;
  display: block;
  margin: 10px 0;
}

.top .left .alname {
  color: #aaa;
  font-size: 14px;
}

.top .right {
  line-height: 2; /* 行间距大一点，阅读更舒服 */
  font-size: 14px;
  text-align: center;
  margin-right: 300px;
  overflow: hidden;
  height: 50vh;
}

.top .right .headtitle {
  margin-top: 15px;
}

.top .right p {
  color: #fff;
}

.top .right .word {
  color: #aaa;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  height: 40vh;
}

.footer .start {
  color: #fff;
}

.footer .end {
  color: #fff;
}

.custom-slider {
  width: 500px;
  margin-left: 12px;
  margin-right: 12px;
}
</style>
