import request from '@/utils/request'

//获取推荐歌单
export const getGoodMusicCard = () =>
  request.get('/personalized', {
    params: {
      limit: 5,
    },
  })

//获取歌单详情
export const getCardDetail = (id) =>
  request.get('/playlist/detail', {
    params: {
      id,
    },
  })

//获取歌单所有歌曲
export const getCardAllMusic = (id) =>
  request.get('/playlist/track/all', {
    params: {
      id,
      limit: 15,
    },
  })
