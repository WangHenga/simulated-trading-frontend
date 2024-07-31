<template>
  <h2>委托</h2>
  <a-spin :loading="loading" dot style="width: 100%">
    <a-table
      :columns="columns"
      :data="formattedData"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-popconfirm @ok="delOrder(record)" content="确认要撤单吗?">
            <a-button type="primary">撤单</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </a-spin>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { OrdersControllerService } from "../../generated";
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
        title: "价格",
        dataIndex: "limitPrice",
      },
      {
        title: "成交数量",
        dataIndex: "volumeTraded",
      },
      {
        title: "剩余数量",
        dataIndex: "volumeTotal",
      },
      {
        slotName: "optional",
      },
    ];
    const searchParams = ref({
      current: 1,
      pageSize: 8,
    });
    const total = ref(0);
    const data = ref([]);
    const loading = ref(false);
    const loadData = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        message.info("请先登录");
        await router.push("/user/login");
        return;
      }
      try {
        const headers = { token: token };
        loading.value = true;
        const res = await OrdersControllerService.queryOrderListUsingPost(
          searchParams.value,
          headers
        );
        if (res.code === 0) {
          data.value = res.data.records;
          total.value = res.data.total;
          loading.value = false;
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

    const delOrder = async (record) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        message.info("请先登录");
        await router.push("/user/login");
        return;
      }
      try {
        const headers = { token: token };
        const res = await OrdersControllerService.cancelOrderUsingPost(
          record.id,
          headers
        );
        if (res.code === 0) {
          message.success(record.id + " 撤单成功");
          await loadData();
        }
      } catch (error) {
        message.info("请先登录");
        await router.push("/user/login");
      }
    };

    const formattedData = computed(() => {
      return data.value.map((record) => ({
        ...record,
        limitPrice: record.limitPrice
          ? parseFloat(record.limitPrice).toFixed(2)
          : "",
      }));
    });
    return {
      columns,
      formattedData,
      searchParams,
      total,
      onPageChange,
      delOrder,
      loading,
    };
  },
};
</script>

<style scoped></style>
