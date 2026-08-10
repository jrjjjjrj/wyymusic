import request from '@/utils/request'

//生成二维码key接口
export const codeGetKey = () =>
  request.post('/login/qr/key', null, {
    params: {
      t: Date.now(),
    },
  })

//生成二维码图片
export const codeGetPhoto = (key) =>
  request.get('/login/qr/create', {
    params: {
      key,
      qrimg: true,
    },
  })

//获取二维码状态
export const codeGetType = (key) =>
  request.get('/login/qr/check', {
    params: { key },
  })
