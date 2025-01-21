<script setup>
const data = ref();
</script>

<template>
  <div class="invoice-container">
    <div class="invoice-info">
      <div>Invoice No.</div>
      <div>Date</div>
      <div>Package info:</div>
      <div class="d-flex">
        <div>Total:</div>
        <div>Pending: </div>
        <div>Canceled: </div>
        <div>Complete: </div>
      </div>
      <div>Payment Status:</div>
    </div>
    <div class="table">
      <el-table :data>
        <el-table-column prop="id" label="Package ID" width="180" />
        <el-table-column prop="customer_name" label="Customer name" width="180" />
        <el-table-column prop="customer_phone" label="Phone" width="180" />
        <el-table-column prop="package_price" label="Price" width="180" />
        <el-table-column prop="location" label="Location" width="180" />
        <el-table-column prop="status" label="Status" />
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  font-family: Inter, sans-serif;
  padding: 1.5em;
  width: 1500px;

  .invoice-container {
    border-radius: 10px;
    border: 1px solid #FFBD59;
    padding: 1em;
  }

  .invoice-info {
    font-size: 1.2em;
  }

  .table {
    padding-top: 0.5em;
  }
}
</style>
