import request from '@/utils/request'

//获取歌手榜单
export const getPeople = () =>
  request.post('/toplist/artist', null, {
    params: {
      type: 1,
    },
  })
