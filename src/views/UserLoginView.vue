<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserControllerService, UserLoginRequest } from "../../generated";

/**
 * 表单信息
 */
const form = reactive({
  account: "",
  password: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  try {
    const res = await UserControllerService.loginUsingPost(form);
    // 登录成功，跳转到主页
    if (res.code === 0) {
      localStorage.setItem("auth_token", res.data.token);
      message.success(res.data.account + ",登录成功");
      console.log(res.data.token);
      await router.push("/");
    } else {
      message.error("登陆失败");
    }
  } catch (e) {
    message.error("登陆失败");
  }
};
</script>
