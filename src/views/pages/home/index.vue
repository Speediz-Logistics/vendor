<script setup>
import {useProductStore} from "@/store/index.js";

const { all: allProduct, data } = useProductStore();

const fetchProductData = async () => {
  await allProduct();
};

onMounted(() => {
  fetchProductData();
});
</script>

<template>
  <div class="d-flex flex-column">
    <div>a</div>
    <div>b</div>

    <i class="speediz-image speediz-image-box" />

    <el-button type="warning" plain>Warning</el-button>

    <el-button type="primary">Primary</el-button>
  </div>
</template>

<style scoped lang="scss">
.title {
  background-color: gray;
}

.title-hello {
  color: red;
}
</style>
