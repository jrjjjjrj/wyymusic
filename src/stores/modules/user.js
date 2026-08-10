import { defineStore } from 'pinia'
import { ref } from 'vue'
// 注意：原 userGetInfoService 是 itheima 的，网易云可能不需要或需替换
// 这里暂时注释掉，后面会说明如何处理

export const useUserStore = defineStore(
  'user',
  () => {
    // ========== 1. 核心鉴权字段：cookie（替换 token） ==========
    const cookie = ref('') // 存储登录返回的 cookie 字符串
    const setCookie = (newCookie) => {
      cookie.value = newCookie
    }
    const removeCookie = () => {
      cookie.value = ''
    }

    // ========== 2. 用户信息（与原来一致） ==========
    const user = ref({}) // 存储用户资料（如昵称、头像、userId）
    const setUser = (obj) => {
      user.value = obj
    }

    // ========== 3. 获取用户信息的方法（需适配网易云） ==========
    // 注意：网易云获取用户详情需要用户 ID，并且需要携带 cookie
    // 如果你不需要在登录后自动拉取用户信息，可以留空或删除该方法
    const getUser = async () => {
      // 如果你有封装好的网易云获取用户信息的 API，可以在这里调用
      // 例如：
      // import { getUserDetailService } from '@/api/user'
      // if (user.value.userId) {
      //   const res = await getUserDetailService(user.value.userId)
      //   user.value = res.data
      // }
      // 如果没有，可以暂时忽略，登录接口通常已经返回了 profile
      console.warn('getUser 方法尚未适配网易云接口，请自行实现或忽略')
    }

    // ========== 4. 导出所有状态和方法 ==========
    return {
      cookie,
      setCookie,
      removeCookie,
      user,
      setUser,
      getUser,
    }
  },
  {
    // 开启持久化（自动存 localStorage）
    persist: true,
  },
)
