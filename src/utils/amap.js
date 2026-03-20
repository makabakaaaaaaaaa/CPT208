/**
 * 动态加载高德地图 JS API 2.0（Web）
 * 需在控制台申请 Key；若控制台要求「安全密钥」，同时配置 VITE_AMAP_SECURITY_CODE
 * https://console.amap.com/
 */
let loadPromise = null

export function getAmapKey() {
  const key = import.meta.env.VITE_AMAP_KEY
  return typeof key === 'string' && key.trim() ? key.trim() : ''
}

export function getAmapSecurityCode() {
  const c = import.meta.env.VITE_AMAP_SECURITY_CODE
  return typeof c === 'string' && c.trim() ? c.trim() : ''
}

export function loadAmap() {
  const key = getAmapKey()
  if (!key) {
    return Promise.reject(new Error('缺少 VITE_AMAP_KEY'))
  }
  if (typeof window !== 'undefined' && window.AMap) {
    return Promise.resolve(window.AMap)
  }
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const security = getAmapSecurityCode()
    if (security) {
      window._AMapSecurityConfig = {
        securityJsCode: security,
      }
    }
    const script = document.createElement('script')
    script.async = true
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`
    script.onload = () => {
      if (window.AMap) resolve(window.AMap)
      else reject(new Error('AMap 未挂载'))
    }
    script.onerror = () => reject(new Error('高德脚本加载失败'))
    document.head.appendChild(script)
  }).catch((err) => {
    loadPromise = null
    return Promise.reject(err)
  })

  return loadPromise
}
