<script setup>
import { inject, computed } from 'vue'

const { collectibles, unlockedCount } = inject('museum')

const total = computed(() => collectibles.value.length)
const pct = computed(() =>
  total.value ? Math.round((unlockedCount.value / total.value) * 100) : 0,
)
</script>

<template>
  <div class="page">
    <div class="stats">
      <div class="stat-block">
        <span class="stat-num">{{ unlockedCount }}</span>
        <span class="stat-label">已收集</span>
      </div>
      <div class="stat-bar-wrap" aria-hidden="true">
        <div class="stat-bar" :style="{ width: pct + '%' }" />
      </div>
      <span class="stat-pct">{{ pct }}%</span>
    </div>

    <h2 class="h2">图鉴</h2>
    <ul class="list">
      <li
        v-for="c in collectibles"
        :key="c.id"
        class="item"
        :class="{ locked: !c.unlocked }"
      >
        <div class="thumb" aria-hidden="true">
          {{ c.unlocked ? '文' : '？' }}
        </div>
        <div class="meta">
          <span class="name">{{ c.unlocked ? c.name : '未解锁' }}</span>
          <span class="hall">{{ c.hallName }}</span>
          <p v-if="c.unlocked" class="snippet">{{ c.story.slice(0, 48) }}…</p>
          <p v-else class="snippet muted">到扫描页识别该展品以解锁故事</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stats {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--mq-bg-elevated);
  border-radius: var(--mq-radius);
  border: 1px solid var(--mq-border);
}

.stat-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 56px;
}

.stat-num {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--mq-accent);
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--mq-text-muted);
}

.stat-bar-wrap {
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: var(--mq-surface);
  overflow: hidden;
}

.stat-bar {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--mq-accent), #e8d48a);
  transition: width 0.35s ease;
}

.stat-pct {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--mq-text-muted);
  min-width: 36px;
  text-align: right;
}

.h2 {
  font-size: 1rem;
  color: var(--mq-text-muted);
}

.list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  display: flex;
  gap: 14px;
  padding: 14px;
  background: var(--mq-bg-elevated);
  border-radius: var(--mq-radius);
  border: 1px solid var(--mq-border);
}

.item.locked {
  opacity: 0.72;
}

.thumb {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
  background: var(--mq-surface);
  color: var(--mq-accent);
}

.item.locked .thumb {
  background: var(--mq-surface-soft);
  color: var(--mq-text-muted);
}

.meta {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-weight: 600;
  font-size: 1rem;
}

.hall {
  font-size: 0.78rem;
  color: var(--mq-accent);
}

.snippet {
  font-size: 0.82rem;
  color: var(--mq-text-muted);
  line-height: 1.45;
  margin-top: 4px;
}

.snippet.muted {
  font-style: italic;
}
</style>
