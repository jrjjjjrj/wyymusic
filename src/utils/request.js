import router from '@/router'
import { useUserStore } from '@/stores'
import axios from 'axios'
// import { ElMessage } from 'element-plus'

// ！！！关键修改：换成你本地启动的网易云 API 地址
const baseURL = 'https://netease-cloud-music-api-backup-three-rho.vercel.app/'
// const baseURL = 'http://localhost:3000'

const instance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: false,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const store = useUserStore()

    // 网易云鉴权：从 Store 中取出 cookie，拼到请求参数里 或 放到请求头
    // 方式一（推荐，符合该 API 文档）：拼在 params 或 data 中
    if (store.cookie) {
      // 如果是 GET 请求，拼在 params；POST 请求拼在 data
      if (config.method === 'get') {
        config.params = { ...config.params, cookie: store.cookie }
      } else {
        config.data = { ...config.data, cookie: store.cookie }
      }
    }

    return config
  },
  (err) => Promise.reject(err),
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 网易云 API 成功标识：code === 200 或 200（数字类型）
    // 注意：有些接口返回 code: 200（数字），有些可能是 200（字符串），用 == 宽松比较
    if (res.data.code === 200 || res.data.code === 200) {
      // 直接返回整个 res.data，业务层直接拿数据，省去写 .data
      return res.data
    }

    // 处理登录失效（网易云通常返回 -460）
    if (res.data.code === -460 || res.data.code === 301) {
      ElMessage.error('登录已过期，请重新登录')
      // 清除 Store 中的 cookie
      useUserStore().clearCookie?.()
      router.push('/login')
      return Promise.reject(res.data)
    }

    // 处理其他业务错误（比如 404 资源不存在）
    // ElMessage.error(res.data.msg || res.data.message || '请求失败')
    return Promise.reject(res.data)
  },
  (err) => {
    // 处理网络错误（如断网、超时）
    if (err.response) {
      // 服务器返回了错误状态码（如 500、404）
      ElMessage.error(err.response.data?.msg || err.response.data?.message || '服务器错误')
    } else if (err.request) {
      // 请求发出但没收到响应
      ElMessage.error('网络超时，请检查网络连接')
    } else {
      ElMessage.error('请求配置出错')
    }
    return Promise.reject(err)
  },
)

export default instance
export { baseURL }
