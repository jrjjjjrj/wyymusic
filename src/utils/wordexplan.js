/**
 * 解析网易云歌词原始文本
 * @param {string} raw - 接口返回的原始歌词字符串
 * @returns {Object} { info: { 作词, 作曲, 编曲, 制作人 }, lyrics: ['歌词1', '歌词2', ...] }
 */
export const parseLyric = (raw) => {
  if (!raw) return { info: {}, lyrics: [] }

  const lines = raw.split('\n')
  const info = { 作词: '', 作曲: '', 编曲: '', 制作人: '' }
  const lyrics = []

  // ----- 第一步：从 JSON 元数据行提取信息 -----
  lines.forEach((line) => {
    const trimmed = line.trim()

    // 如果是 JSON 行（以 { 开头）
    if (trimmed.startsWith('{')) {
      try {
        const json = JSON.parse(trimmed)
        if (json.c && Array.isArray(json.c)) {
          // 将 c 数组的 tx 字段拼接成完整字符串，如 "作词: 蔡健雅"
          const fullText = json.c.map((item) => item.tx || '').join('')

          // 用正则提取关键信息
          const match = fullText.match(/(作词|作曲|编曲|制作人):\s*(.+)/)
          if (match) {
            const key = match[1]
            const value = match[2].trim()
            // 如果该字段还未被赋值，则填入（防止被后续行覆盖）
            if (key in info && !info[key]) {
              info[key] = value
            }
          }
        }
      } catch (e) {
        // 忽略解析失败的行
      }
    }
  })

  // ----- 第二步：从纯文本行提取歌词（去掉时间戳）-----
  lines.forEach((line) => {
    const trimmed = line.trim()
    // 只处理以 [ 开头的歌词行
    if (trimmed.startsWith('[')) {
      // 去掉时间戳部分 [mm:ss.xxx]
      const text = trimmed.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/, '').trim()
      if (text) {
        lyrics.push(text)
      }
    }
  })

  // ----- 第三步：如果制作人还没有提取到，尝试从纯文本中查找（兜底）-----
  if (!info.制作人) {
    for (const line of lyrics) {
      const match = line.match(/制作人[:：]\s*(.+)/)
      if (match) {
        info.制作人 = match[1].trim()
        break
      }
    }
  }

  return { info, lyrics }
}
