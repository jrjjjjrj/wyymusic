import request from '@/utils/request'

//获取歌曲详情
export const getMusicDetali = (ids) =>
  request.get('/song/detail', {
    params: {
      ids,
    },
  })

//获取逐字歌词
export const getMusicWord = (id) =>
  request.get('/lyric/new', {
    params: {
      id,
    },
  })

//获取音乐url
export const getMusicUrl = (id) =>
  request.get('/song/url', {
    params: {
      id,
    },
  })

//获取推荐新音乐
export const getNewMusic = () =>
  request.post('/personalized/newsong', null, {
    params: {
      limit: 12,
    },
  })

//关键字得到音乐
export const getKeyMusic = (keywords) =>
  request.get('/cloudsearch', {
    params: {
      keywords,
    },
  })
