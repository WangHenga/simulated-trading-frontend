<script setup lang="ts">
import { computed, defineComponent, defineProps } from "vue";

// 定义 props
const props = defineProps({
  instrumentData: {
    type: Object,
    required: true,
  },
});

// eslint-disable-next-line no-undef
const instrumentInfo = computed(() => [
  { label: "合约名称", value: props.instrumentData.name },
  { label: "合约代码", value: props.instrumentData.symbol },
  { label: "最新价", value: props.instrumentData.lastPriceStr },
  {
    label: "卖",
    value:
      (props.instrumentData.sellVolume === 0
        ? "-".repeat(props.instrumentData.sellPriceStr.length)
        : props.instrumentData.sellPriceStr) +
      "         " +
      props.instrumentData.sellVolume,
  },
  {
    label: "买",
    value:
      (props.instrumentData.buyVolume === 0
        ? "-".repeat(props.instrumentData.buyPriceStr.length)
        : props.instrumentData.buyPriceStr) +
      "         " +
      props.instrumentData.buyVolume,
  },
  {
    label: "涨停",
    value: props.instrumentData.maxPrice,
  },
  {
    label: "跌停",
    value: props.instrumentData.minPrice,
  },
  {
    label: "最小变动价位",
    value: props.instrumentData.minPriceChangeStr,
  },
]);
</script>

<template>
  <a-descriptions
    style="margin-top: 20px"
    :data="instrumentInfo"
    size="small"
    :column="1"
  />
</template>

<style scoped></style>
