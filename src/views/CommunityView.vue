<script setup>
import { ref, inject } from 'vue'

const { state, toggleLike, addPost } = inject('museum')
const draft = ref('')

function submit() {
  addPost(draft.value)
  draft.value = ''
}
</script>

<template>
  <div class="page">
    <section class="composer">
      <label class="label" for="post-input">分享发现或感想</label>
      <textarea
        id="post-input"
        v-model="draft"
        class="textarea"
        rows="3"
        placeholder="例如：三展厅楼梯旁有隐藏扫码点…"
        maxlength="280"
      />
      <div class="composer-foot">
        <span class="count">{{ draft.length }}/280</span>
        <button type="button" class="send" :disabled="!draft.trim()" @click="submit">
          发布
        </button>
      </div>
    </section>

    <h2 class="h2">动态</h2>
    <ul class="feed">
      <li v-for="p in state.posts" :key="p.id" class="post">
        <div class="post-head">
          <span class="author">{{ p.author }}</span>
        </div>
        <p class="text">{{ p.text }}</p>
        <button
          type="button"
          class="like"
          :class="{ on: p.liked }"
          @click="toggleLike(p.id)"
        >
          <span class="like-icon" aria-hidden="true">{{ p.liked ? '♥' : '♡' }}</span>
          <span>{{ p.likes }}</span>
        </button>
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

.composer {
  padding: 16px;
  border-radius: var(--mq-radius);
  background: var(--mq-bg-elevated);
  border: 1px solid var(--mq-border);
}

.label {
  display: block;
  font-size: 0.85rem;
  color: var(--mq-text-muted);
  margin-bottom: 8px;
}

.textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--mq-border);
  background: var(--mq-surface);
  color: var(--mq-text);
  resize: vertical;
  min-height: 88px;
  line-height: 1.5;
}

.textarea::placeholder {
  color: var(--mq-text-muted);
  opacity: 0.8;
}

.composer-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.count {
  font-size: 0.75rem;
  color: var(--mq-text-muted);
}

.send {
  min-height: 44px;
  padding: 0 22px;
  border-radius: 10px;
  background: var(--mq-accent-soft);
  color: var(--mq-accent);
  font-weight: 700;
  border: 1px solid rgba(201, 162, 39, 0.35);
}

.send:disabled {
  opacity: 0.45;
}

.h2 {
  font-size: 1rem;
  color: var(--mq-text-muted);
}

.feed {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post {
  padding: 16px;
  border-radius: var(--mq-radius);
  background: var(--mq-bg-elevated);
  border: 1px solid var(--mq-border);
}

.post-head {
  margin-bottom: 8px;
}

.author {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--mq-accent);
}

.text {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--mq-text);
  margin-bottom: 12px;
}

.like {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--mq-surface);
  color: var(--mq-text-muted);
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
}

.like.on {
  color: #ff8a8a;
  background: rgba(255, 138, 138, 0.12);
}

.like-icon {
  font-size: 1rem;
}
</style>
