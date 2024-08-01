<template>
  <a-descriptions
    style="margin-top: 20px"
    :data="userData"
    size="small"
    title="账户信息"
    :column="1"
  />
  <a-button v-if="state === 0" type="primary" shape="round">
    <a-spin />
    加载中...
  </a-button>
  <a-button v-if="state === 1" type="primary" shape="round" @click="logout"
    >登出
  </a-button>
  <a-button v-if="state === 2" type="primary" shape="round" @click="login"
    >登录
  </a-button>
  <a-button
    type="primary"
    style="margin-left: 20px"
    shape="round"
    @click="refresh"
    >刷新
  </a-button>
  <UserLogin :visible="visible" @update:visible="visible = $event" />
</template>

<script>
import { reactive, ref } from "vue";
import { UserControllerService } from "../../generated";
import router from "@/router";
import message from "@arco-design/web-vue/es/message";
import UserLogin from "@/components/UserLogin.vue";

export default {
  components: { UserLogin },
  setup() {
    const visible = ref(false);
    const logout = async () => {
      const token = localStorage.getItem("auth_token");
      const headers = { token: token };
      localStorage.removeItem("auth_token");
      UserControllerService.logoutUsingPost(headers);
      await router.push("/");
      await fetchUserInfo();
      message.info("已登出");
    };
    const login = () => {
      // router.push("/user/login");
      visible.value = true;
    };
    const state = ref(0);
    const userData = reactive([
      { label: "账户", value: "Loading..." },
      { label: "余额", value: "Loading..." },
      { label: "冻结保证金", value: "Loading..." },
      { label: "占用保证金", value: "Loading..." },
    ]);

    const fetchUserInfo = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        userData[0].value = "null";
        userData[1].value = "null";
        userData[2].value = "null";
        userData[3].value = "null";
        state.value = 2;
      }

      try {
        const headers = { token: token };
        const res = await UserControllerService.getUserInfoUsingGet(headers);
        if (res.code === 0) {
          userData[0].value = res.data.account;
          userData[1].value = res.data.balance;
          userData[2].value = res.data.frozenMargin;
          userData[3].value = res.data.usedMargin;
          state.value = 1;
        }
      } catch (error) {
        userData[0].value = "null";
        userData[1].value = "null";
        userData[2].value = "null";
        userData[3].value = "null";
        state.value = 2;
      }
    };

    // Fetch user info on component mount
    fetchUserInfo();
    const refresh = () => {
      window.location.reload();
    };

    return {
      userData,
      state,
      logout,
      login,
      refresh,
      visible,
    };
  },
};
</script>

<style scoped></style>
