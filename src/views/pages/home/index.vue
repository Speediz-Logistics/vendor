<script lang="ts" setup>
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
  <div class="container">
    <i class="speediz-image speediz-image-logo" />
    <i class="speediz-image speediz-image-BackgroundSplash" />
    <div class="content">
      <h1>Ship your parcel <br>with Shipping Now</h1>
      <span>Lorem ipsum dolor sit amet.
        Lorem ipsum dolor <br> sit amet.Lorem ipsum dolor sit amet.<br>
        Lorem ipsum dolor sit amet.</span>
    </div>
    <div class="button-container d-flex gap-2 position-relative  ms-4 mt-5 ">
      <el-button class="button" round>Login</el-button>
      <el-button class="button" round>Sign Up</el-button>

    </div>

  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .content {
    position: relative;
    z-index: 3;
    padding: 30px;
    left: 100px;
    top: 300px;
    color: white;
  }
  .content h1{
    display: block;
    font-size: 3em;
    font-weight: bold;
    font-family: Inter, sans-serif;
  }
  .content span{
    display: block;
    font-size: 1em;
    font-family: Inter, sans-serif;
    text-align: left;
    block-size: 100px;
    padding-top: 20px;
  }
  .button-container{
    z-index: 4;
    left: 100px;
    top: 250px;
    .button{
      background-color: #FFBD59;
      border: none;
      color: white;
      width: 158px;
      height: 50px;
      font-family: Inter, sans-serif;
    }
    .button:hover{
      background-color: darkgray;
    }


  }
}
</style>

