<script lang="ts">
import UserInfoView from "@/views/UserInfoView.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { UserInfoView },
  setup() {
    const router = useRouter();
    const filteredRoutes = computed(() => {
      return router.options.routes.filter((route) => !route.meta?.hidden);
    });

    return { filteredRoutes };
  },
};
</script>

<template>
  <a-layout class="a-layout">
    <a-layout-header class="custom-layout-header">
      <div class="header-title">模拟交易系统</div>
      <div :style="{ display: 'flex', alignItems: 'center' }">
        <nav class="navbar">
          <ul class="navbar-list">
            <li
              v-for="route in filteredRoutes"
              :key="route.path"
              class="navbar-item"
            >
              <router-link :to="route.path" class="nav-link"
                >{{ route.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </a-layout-header>
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

.navbar {
  /* 你可以在这里添加导航栏的背景色、内边距等样式 */
  background-color: white;
  height: 10px;
  width: 400px;
}

.navbar-list {
  list-style-type: none; /* 移除列表项前的标记 */
  margin: 0; /* 移除默认的外边距 */
  padding: 0; /* 移除默认的内边距 */
  display: flex; /* 使用Flex布局 */
  justify-content: space-around; /* 列表项之间的空间平均分布 */
  /* 或者使用 justify-content: flex-start; 来使列表项从左边开始排列 */
}

.navbar-item {
  /* 你可以在这里添加列表项的样式，如内边距、背景色等 */
  padding: 10px 20px; /* 示例内边距 */
}

.navbar-item a {
  color: blue; /* 链接文字颜色 */
  font-size: 16px; /* 修改字体大小 */
  text-decoration: none; /* 移除下划线 */
  /* 你可以在这里添加更多的链接样式 */
}

.navbar-item a:hover {
  /* 链接的悬停效果 */
  text-decoration: underline; /* 示例：悬停时添加下划线 */
}

.custom-layout-header {
  display: flex; /* 将 <a-layout-header> 设置为Flex容器 */
  align-items: center; /* 垂直居中子元素 */
  justify-content: space-between; /* 两端对齐子元素 */
  padding: 0 20px; /* 添加一些内边距，以便子元素之间有空间 */
  /* 其他样式，如背景色、边框等 */
}

.header-title {
  /* 标题的样式 */
  font-size: 20px; /* 示例字体大小 */
  font-weight: bold; /* 粗体 */
  /* 其他样式 */
}
</style>
