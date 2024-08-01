<template>
  <h2>合约</h2>
  <a-form :model="searchParams" layout="inline">
    <a-form-item field="name" label="合约名称" style="min-width: 240px">
      <a-input v-model="searchParams.name" placeholder="请输入名称" />
    </a-form-item>
    <a-form-item field="symbol" label="合约代码" style="min-width: 240px">
      <a-input v-model="searchParams.symbol" placeholder="请输入代码" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="doSubmit">查询</a-button>
    </a-form-item>
  </a-form>
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
          <a-button type="primary" @click="createOrder(record)">下单</a-button>
        </a-space>
      </template>
    </a-table>
  </a-spin>

  <a-drawer
    :width="340"
    :visible="visible"
    @ok="handleOk"
    ok-text="退出"
    @cancel="handleCancel"
    unmountOnClose
    hide-cancel="true"
  >
    <template #title> 合约信息</template>
    <div>
      <InstrumentInfo :instrument-data="instrumentData" />
      <a-form
        style="max-width: 240px; margin: 0 auto"
        label-align="left"
        auto-label-width
        :model="orderForm"
      >
        <a-form-item field="price" label="价格">
          <a-input-number
            v-model="orderForm.price"
            placeholder="对手价"
            :precision="2"
            :allow-clear="true"
            :step="Number(instrumentData.minPriceChangeStr)"
            :min="Number(instrumentData.minPrice)"
            :max="Number(instrumentData.maxPrice)"
          />
        </a-form-item>
        <a-form-item field="volume" label="手数">
          <a-input-number v-model="orderForm.volume" :min="1" :precision="0" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" style="margin-right: 10px" @click="handleBuy"
            >{{ buyPrice }}
          </a-button>
          <a-button type="primary" @click="handleSell"
            >{{ sellPrice }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script>
import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import {
  InstrumentControllerService,
  OrdersControllerService,
} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import InstrumentInfo from "@/components/InstrumentInfo.vue";
import router from "@/router";

export default {
  components: { InstrumentInfo },
  setup() {
    const columns = [
      {
        title: "合约名称",
        dataIndex: "name",
      },
      {
        title: "合约代码",
        dataIndex: "symbol",
      },
      {
        title: "最新成交价",
        dataIndex: "lastPrice",
      },
      {
        slotName: "optional",
      },
    ];
    const searchParams = ref({
      symbol: "",
      name: "",
      current: 1,
      pageSize: 8,
    });
    const orderForm = reactive({
      price: null,
      volume: 1,
    });
    const total = ref(0);
    const data = ref([]);
    const sellPrice = ref("");
    const buyPrice = ref("");
    const instrumentData = ref({});
    const loading = ref(false);
    const loadData = async () => {
      loading.value = true;
      const res =
        await InstrumentControllerService.queryInstrumentListUsingPost(
          searchParams.value
        );
      if (res.code === 0) {
        data.value = res.data.records;
        total.value = res.data.total;
        loading.value = false;
      }
    };
    const visible = ref(false);

    const handleSell = async () => {
      const token = localStorage.getItem("auth_token");
      const headers = { token: token };
      const orderCreate = {
        combOffsetFlag: 0,
        direction: 1,
        instrumentId: instrumentData.value.id,
        limitPrice: !orderForm.price
          ? instrumentData.value.buyPriceStr
          : orderForm.price,
        volumeTotal: orderForm.volume,
      };

      try {
        const res = await OrdersControllerService.createOrderUsingPost(
          orderCreate,
          headers
        );
        if (res.code === 0) {
          message.success("卖开下单成功");
        } else {
          message.error("卖开下单失败");
        }
      } catch (error) {
        message.error("卖开下单失败");
      } finally {
        orderForm.price = null;
        orderForm.volume = 1;
        visible.value = false;
      }
    };
    const handleBuy = async () => {
      const token = localStorage.getItem("auth_token");
      const headers = { token: token };
      const orderCreate = {
        combOffsetFlag: 0,
        direction: 0,
        instrumentId: instrumentData.value.id,
        limitPrice: !orderForm.price
          ? instrumentData.value.sellPriceStr
          : orderForm.price,
        volumeTotal: orderForm.volume,
      };

      try {
        const res = await OrdersControllerService.createOrderUsingPost(
          orderCreate,
          headers
        );
        if (res.code === 0) {
          message.success("买开下单成功");
        } else {
          message.error("买开下单失败");
        }
      } catch (error) {
        message.error("买开下单失败");
      } finally {
        orderForm.price = null;
        orderForm.volume = 1;
        visible.value = false;
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
    const handleOk = () => {
      visible.value = false;
      orderForm.price = null;
      orderForm.volume = 1;
    };
    const handleCancel = () => {
      visible.value = false;
      orderForm.price = null;
      orderForm.volume = 1;
    };

    const doSubmit = () => {
      // 这里需要重置搜索页号
      searchParams.value = {
        ...searchParams.value,
        current: 1,
      };
    };

    const createOrder = async (record) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        message.info("请先登录");
        await router.push("/user/login");
      }
      await InstrumentControllerService.getInstrumentInfoUsingGet(
        record.id
      ).then((res) => {
        if (res.code === 0) {
          instrumentData.value = res.data;
          sellPrice.value = res.data.buyPriceStr + " 卖";
          buyPrice.value = res.data.sellPriceStr + " 买";
        }
      });
      console.log(instrumentData.value);
      visible.value = true;
    };

    watch(
      () => orderForm.price,
      (newValue, oldValue) => {
        if (!newValue) {
          sellPrice.value = instrumentData.value.buyPriceStr + " 卖";
          buyPrice.value = instrumentData.value.sellPriceStr + " 买";
        } else {
          sellPrice.value = newValue.toFixed(2).toString() + " 卖";
          buyPrice.value = newValue.toFixed(2).toString() + " 买";
        }
      }
    );

    const formattedData = computed(() => {
      return data.value.map((record) => ({
        ...record,
        lastPrice: record.lastPrice
          ? parseFloat(record.lastPrice).toFixed(2)
          : "",
      }));
    });
    return {
      columns,
      formattedData,
      searchParams,
      total,
      onPageChange,
      doSubmit,
      createOrder,
      visible,
      handleSell: handleSell,
      handleBuy: handleBuy,
      instrumentData,
      sellPrice,
      buyPrice,
      orderForm,
      handleOk,
      handleCancel,
      loading,
    };
  },
};
</script>

<style scoped></style>
