<template>
  <h2>成交</h2>
  <a-table
    :columns="columns"
    :data="data"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total,
    }"
    @page-change="onPageChange"
  >
  </a-table>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import { TradeControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import router from "@/router";

export default {
  setup() {
    const columns = [
      {
        title: "合约",
        dataIndex: "instrumentName",
      },
      {
        title: "方向",
        dataIndex: "directionStr",
      },
      {
        title: "开平",
        dataIndex: "combOffsetStr",
      },
      {
        title: "成交价",
        dataIndex: "priceStr",
      },
      {
        title: "成交量",
        dataIndex: "volume",
      },
      {
        title: "成交时间",
        dataIndex: "createTimeStr",
      },
    ];
    const searchParams = ref({
      current: 1,
      pageSize: 8,
    });
    const total = ref(0);
    const data = ref([]);
    const loadData = async () => {
      const token = localStorage.getItem("auth_token");
      console.log(token);
      if (!token) {
        message.info("请先登录");
        await router.push("/user/login");
        return;
      }
      try {
        const headers = { token: token };
        const res = await TradeControllerService.queryTradeListUsingPost(
          searchParams.value,
          headers
        );
        if (res.code === 0) {
          data.value = res.data.records;
          total.value = res.data.total;
        }
      } catch (error) {
        message.info("请先登录");
        await router.push("/user/login");
      }
    };
    watchEffect(() => {
      loadData();
    });

    onMounted(() => {
      loadData();
    });

    const onPageChange = (page) => {
      searchParams.value = {
        ...searchParams.value,
        current: page,
      };
    };

    return {
      columns,
      searchParams,
      total,
      onPageChange,
      data,
    };
  },
};
</script>

<style scoped></style>
