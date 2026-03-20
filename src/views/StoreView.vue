<script setup>
import { inject } from 'vue'

const { state, redeem } = inject('museum')

function tryRedeem(id) {
  redeem(id)
}
</script>

<template>
  <div class="page">
    <p class="lead">使用积分兑换文创（演示：兑换记录在内存中，刷新即重置）。</p>

    <ul class="list">
      <li v-for="item in state.shopItems" :key="item.id" class="card">
        <div class="row">
          <div class="info">
            <h3 class="name">{{ item.name }}</h3>
            <p class="cost">
              <span class="cost-val">{{ item.cost }}</span> 积分
            </p>
          </div>
          <button
            type="button"
            class="redeem"
            :disabled="
              state.points < item.cost || state.redeemedShopIds.includes(item.id)
            "
            @click="tryRedeem(item.id)"
          >
            {{
              state.redeemedShopIds.includes(item.id)
                ? '已兑换'
                : state.points < item.cost
                  ? '积分不足'
                  : '兑换'
            }}
          </button>
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

.lead {
  font-size: 0.95rem;
  color: var(--mq-text-muted);
  line-height: 1.5;
}

.list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  padding: 16px;
  border-radius: var(--mq-radius);
  background: var(--mq-bg-elevated);
  border: 1px solid var(--mq-border);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.info {
  min-width: 0;
}

.name {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.cost {
  font-size: 0.88rem;
  color: var(--mq-text-muted);
}

.cost-val {
  font-weight: 800;
  color: var(--mq-accent);
  font-variant-numeric: tabular-nums;
}

.redeem {
  flex-shrink: 0;
  min-height: var(--mq-tap-min);
  padding: 0 18px;
  border-radius: 10px;
  background: var(--mq-accent);
  color: #1a1508;
  font-weight: 700;
  font-size: 0.9rem;
}

.redeem:disabled {
  background: var(--mq-surface-soft);
  color: var(--mq-text-muted);
  font-weight: 600;
}
</style>
