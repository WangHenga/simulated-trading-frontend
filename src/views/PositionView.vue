<template>
  <h2>持仓</h2>
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
          <a-button type="primary" @click="createOrder(record)">平仓</a-button>
        </a-space>
      </template>
    </a-table>
  </a-spin>
  <UserLogin
    :visible="visible_login"
    @update:visible="visible_login = $event"
  />
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
          <a-button v-if="buttonFlag === 1" type="primary" @click="handleBuy"
            >{{ buyPrice }}
          </a-button>
          <a-button v-else type="primary" @click="handleSell"
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
  PositionControllerService,
} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import router from "@/router";
import InstrumentInfo from "@/components/InstrumentInfo.vue";
import UserLogin from "@/components/UserLogin.vue";

export default {
  components: { UserLogin, InstrumentInfo },
  setup() {
    const sellPrice = ref("");
    const buyPrice = ref("");
    const instrumentData = ref({});
    const visible = ref(false);
    const visible_login = ref(false);
    const columns = [
      {
        title: "合约",
        dataIndex: "instrumentName",
      },
      {
        title: "多空",
        dataIndex: "typeStr",
      },
      {
        title: "持仓",
        dataIndex: "quantity",
      },
      {
        title: "可用",
        dataIndex: "remainQuantity",
      },
      {
        title: "开仓均价",
        dataIndex: "avePriceStr",
      },
      {
        title: "逐笔浮盈",
        dataIndex: "profitLossStr",
      },
      {
        slotName: "optional",
      },
    ];
    const searchParams = ref({
      current: 1,
      pageSize: 8,
    });
    const orderForm = reactive({
      price: null,
      volume: 1,
    });
    const total = ref(0);
    const data = ref([]);
    const loading = ref(false);
    const loadData = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        visible_login.value = true;
      }
      try {
        const headers = { token: token };
        loading.value = true;
        const res = await PositionControllerService.queryPositionListUsingPost(
          searchParams.value,
          headers
        );
        if (res.code === 0) {
          data.value = res.data.records;
          total.value = res.data.total;
          loading.value = false;
        }
      } catch (error) {
        visible_login.value = true;
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

    const formattedData = computed(() => {
      return data.value.map((record) => ({
        ...record,
        limitPrice: record.limitPrice
          ? parseFloat(record.limitPrice).toFixed(2)
          : "",
      }));
    });
    const buttonFlag = ref(0);
    const createOrder = async (record) => {
      await InstrumentControllerService.getInstrumentInfoUsingGet(
        record.instrumentId
      ).then((res) => {
        if (res.code === 0) {
          instrumentData.value = res.data;
          buttonFlag.value = record.typeStr === "多" ? 0 : 1;
          sellPrice.value = res.data.buyPriceStr + " 卖";
          buyPrice.value = res.data.sellPriceStr + " 买";
        }
      });
      console.log(instrumentData.value);
      visible.value = true;
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
    const handleSell = async () => {
      const token = localStorage.getItem("auth_token");
      const headers = { token: token };
      const orderCreate = {
        combOffsetFlag: 1,
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
          message.success("卖平下单成功");
          await loadData();
        } else {
          message.error("卖平下单失败");
        }
      } catch (error) {
        message.error("卖平下单失败");
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
        combOffsetFlag: 1,
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
          message.success("买平下单成功");
          await loadData();
        } else {
          message.error("买平下单失败");
        }
      } catch (error) {
        message.error("买平下单失败");
      } finally {
        orderForm.price = null;
        orderForm.volume = 1;
        visible.value = false;
      }
    };
    return {
      columns,
      formattedData,
      searchParams,
      total,
      onPageChange,
      createOrder,
      orderForm,
      instrumentData,
      handleCancel,
      handleOk,
      visible,
      buyPrice,
      sellPrice,
      buttonFlag,
      handleBuy,
      handleSell,
      loading,
      visible_login,
    };
  },
};
</script>

<style scoped></style>
