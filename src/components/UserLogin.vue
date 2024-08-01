<template>
  <a-modal
    :visible="visible"
    :on-before-ok="handleOk"
    ok-text="登录"
    @cancel="handleCancel"
    hide-cancel="true"
  >
    <template #title> 用户登录</template>
    <div>
      <a-form
        style="max-width: 480px; margin: 0 auto"
        label-align="left"
        auto-label-width
        :model="form"
      >
        <a-form-item field="userAccount" label="账号">
          <a-input v-model="form.account" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item field="userPassword" label="密码">
          <a-input-password v-model="form.password" placeholder="请输入密码" />
        </a-form-item>
      </a-form>
    </div>
    <template #footer>
      <div style="display: flex; justify-content: center">
        <a-button type="primary" @click="handleOk" :loading="loading"
          >登录
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script>
import { reactive, ref } from "vue";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";

export default {
  props: {
    visible: Boolean,
  },
  emits: ["update:visible"], // 声明自定义事件
  setup(props, { emit }) {
    const form = reactive({
      account: "",
      password: "",
    });
    const loading = ref(false);
    const handleOk = async () => {
      loading.value = true;
      try {
        const res = await UserControllerService.loginUsingPost(form);
        // 登录成功，跳转到主页
        if (res.code === 0) {
          localStorage.setItem("auth_token", res.data.token);
          window.location.reload();
        } else {
          message.error("登陆失败");
        }
      } catch (e) {
        message.error("登陆失败");
      }

      emit("update:visible", false); // 通知父组件关闭模态框
      loading.value = false;
    };

    const handleCancel = () => {
      emit("update:visible", false); // 通知父组件关闭模态框
    };

    return {
      form,
      handleOk,
      handleCancel,
      loading,
    };
  },
};
</script>
