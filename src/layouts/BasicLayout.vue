<script setup lang="ts">
import UserInfoView from "@/views/UserInfoView.vue";
</script>

<template>
  <a-layout class="a-layout">
    <div :style="{ background: 'var(--color-fill-2)' }">
      <a-page-header
        :style="{ background: 'var(--color-bg-2)' }"
        title="模拟交易系统"
        :show-back="false"
      >
        <template #breadcrumb>
          <a-breadcrumb>
            <a-breadcrumb-item>
              <router-link to="/">合约</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <router-link to="/order">委托</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <router-link to="/position">持仓</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
              <router-link to="/trade">成交</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </template>
      </a-page-header>
    </div>
    <a-layout>
      <a-layout-sider>
        <UserInfoView />
      </a-layout-sider>
      <a-layout-content class="a-layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
    <a-layout-footer class="a-layout-footer"
      >@2024 模拟交易系统 by 汪恒
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.a-layout {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 使布局占满整个视口高度 */
}

.a-layout-content {
  flex: 1; /* 填充剩余空间 */
  overflow-y: auto; /* 如果内容过多，允许垂直滚动 */
}

.a-layout-footer {
  height: 50px; /* 设置固定高度 */
  line-height: 50px; /* 使内容垂直居中 */
  text-align: center; /* 可选，让footer内容居中 */
  background-color: #f0f2f5; /* 可选，设置背景颜色 */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
