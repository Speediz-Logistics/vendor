<script setup>
import {useRouter } from  'vue-router'
import InvoiceDetail from "@/components/Invoice-detail.vue";
const router = useRouter()

const HistoryInvoice = () => {
  router.push({name: 'history-invoice'});
}
const backHome = () => {
  router.push({name: 'onboard-Screen'});
}
</script>

<template>
  <div class="d-flex flex-row">
    <div class="sidebar">
      <h1 class="text-white fw-bold">Invoice Management</h1>
      <div class="content text-white fw-bold border rounded bg-dark">
        Daily Invoice
      </div>
      <div class="content text-white fw-bold" @click="HistoryInvoice()">
        History Invoice
      </div>
      <button @click="backHome">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Back Home
      </button>
    </div>
    <div class="container">
      <h1>Invoice Detail</h1>
      <InvoiceDetail />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFBD59;
  width: 400px;
  height: 100vh;
  font-family: Inter, sans-serif;
  .content{
    font-size: 1.5em;
    text-align: left;
    padding: 0.5em;
    width: 12em;
    cursor: pointer;

  }
  h1{
    font-family: Inter, sans-serif;
    text-align: center;
    font-size: 2em;
    padding-top: 0.3em;
    padding-bottom: 3em;

  }
  button{
    width: 12em;
    margin-top: 30em;
    padding: 1em;
    background-color: #a9a9a9;
    border: none;
    border-radius: 0.2em;
  }
  button:hover{
    opacity: 0.7;
  }
  button:active {
    opacity: 1;
  }
}
.container{
  width: 1500px;
  padding: 1em;
  h1{
    font-family: Inter, sans-serif;
    font-size: 2em;
    padding-bottom: 1em;
  }
}
</style>
