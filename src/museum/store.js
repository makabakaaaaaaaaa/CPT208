import { reactive, computed } from 'vue'

/**
 * 同源 GLB（见 public/models/），避免从 GitHub raw 拉取在国内/移动网络被墙或超时导致黑屏。
 * 正式环境可替换为馆方模型，仍建议放在 public 或己方 CDN。
 */
const initialArtifacts = [
  {
    id: 'bronze-ding',
    name: '青铜鼎',
    hallId: 'h1',
    hallName: '青铜时代',
    story:
      '礼器代表，用于祭祀与宴飨。鼎的三足与纹饰反映了当时的铸造工艺与社会等级。',
    points: 30,
    modelGlb: '/models/DamagedHelmet.glb',
  },
  {
    id: 'porcelain-vase',
    name: '青花缠枝纹瓶',
    hallId: 'h2',
    hallName: '瓷韵千年',
    story:
      '青花发色浓艳，缠枝莲寓意生生不息。此类器物多外销，是海上丝绸之路的见证。',
    points: 25,
    modelGlb: '/models/Duck.glb',
  },
  {
    id: 'jade-bi',
    name: '谷纹玉璧',
    hallId: 'h1',
    hallName: '青铜时代',
    story: '玉璧象征天圆，谷纹祈求丰年。汉代葬玉与礼制结合，体现「以玉比德」的观念。',
    points: 20,
    modelGlb: '/models/BoomBox.glb',
  },
]

/** 示例坐标：苏州工业园区独墅湖一带（可改为真实馆址） */
const initialZones = [
  {
    id: 'h1',
    name: '青铜时代',
    hint: '推荐路线起点',
    lng: 120.7388,
    lat: 31.272,
  },
  {
    id: 'h2',
    name: '瓷韵千年',
    hint: '互动展柜较多',
    lng: 120.7414,
    lat: 31.2736,
  },
  {
    id: 'h3',
    name: '书画长廊',
    hint: '光线较暗请注意',
    lng: 120.7374,
    lat: 31.2742,
  },
]

const initialShop = [
  { id: 's1', name: '馆徽金属书签', cost: 80, stock: 99 },
  { id: 's2', name: '文物明信片套装', cost: 50, stock: 200 },
  { id: 's3', name: '限定帆布袋', cost: 120, stock: 30 },
]

const initialPosts = [
  {
    id: 'p1',
    author: '探馆小能手',
    text: '二展厅转角有个隐藏扫码点，扫完送了一张「夜场券」收藏品！',
    likes: 42,
    liked: false,
  },
  {
    id: 'p2',
    author: '周末遛娃',
    text: '孩子最喜欢扫描后的故事朗读，希望能出英文版～',
    likes: 18,
    liked: false,
  },
]

export function createMuseumStore() {
  const state = reactive({
    points: 100,
    unlockedArtifactIds: ['bronze-ding'],
    redeemedShopIds: [],
    artifacts: [...initialArtifacts],
    zones: [...initialZones],
    shopItems: [...initialShop],
    posts: initialPosts.map((p) => ({ ...p })),
    lastScan: null,
    toast: '',
  })

  const collectibles = computed(() =>
    state.artifacts.map((a) => ({
      ...a,
      unlocked: state.unlockedArtifactIds.includes(a.id),
    })),
  )

  const unlockedCount = computed(
    () => state.unlockedArtifactIds.length,
  )

  let toastTimer
  function showToast(msg) {
    state.toast = msg
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      state.toast = ''
    }, 2200)
  }

  function scanArtifact(artifactId) {
    const art = state.artifacts.find((a) => a.id === artifactId)
    if (!art) return
    const already = state.unlockedArtifactIds.includes(artifactId)
    if (!already) {
      state.unlockedArtifactIds.push(artifactId)
      state.points += art.points
      showToast(`获得收藏品「${art.name}」+${art.points} 积分`)
    } else {
      state.points += 5
      showToast(`重温「${art.name}」+5 积分`)
    }
    state.lastScan = { ...art, already }
  }

  function redeem(itemId) {
    const item = state.shopItems.find((i) => i.id === itemId)
    if (!item || state.redeemedShopIds.includes(itemId)) return false
    if (state.points < item.cost) {
      showToast('积分不足')
      return false
    }
    state.points -= item.cost
    state.redeemedShopIds.push(itemId)
    showToast(`已兑换「${item.name}」`)
    return true
  }

  function toggleLike(postId) {
    const p = state.posts.find((x) => x.id === postId)
    if (!p) return
    if (p.liked) {
      p.liked = false
      p.likes = Math.max(0, p.likes - 1)
      state.points = Math.max(0, state.points - 2)
    } else {
      p.liked = true
      p.likes += 1
      state.points += 2
      showToast('点赞 +2 积分')
    }
  }

  function addPost(text) {
    const t = text.trim()
    if (!t) return
    state.posts.unshift({
      id: 'p' + Date.now(),
      author: '我',
      text: t,
      likes: 0,
      liked: false,
    })
    state.points += 5
    showToast('发布成功 +5 积分')
  }

  return {
    state,
    collectibles,
    unlockedCount,
    scanArtifact,
    redeem,
    toggleLike,
    addPost,
  }
}
