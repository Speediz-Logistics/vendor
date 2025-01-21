<script setup>
import { computed } from "vue";
// Define props
defineProps({
  data: {
    type: Object,
    required: false, // Allow for optional prop
    default: () => ({}),
  },
});

// Compute package stats if data exists
const packageStats = computed(() => {
  if (!data || !data.packages) return { total: 0, pending: 0, canceled: 0, complete: 0 };

  const total = data.packages.length;
  const pending = data.packages.filter(pkg => pkg.status === "pending").length;
  const canceled = data.packages.filter(pkg => pkg.status === "canceled").length;
  const complete = data.packages.filter(pkg => pkg.status === "complete").length;

  return { total, pending, canceled, complete };
});

</script>

<template>
  <div class="invoice-container">
    <div class="invoice-info">
      <div>Invoice No.: {{ data.invoice_number || "N/A" }}</div>
      <div>Date {{data.created_at}}</div>
      <div>Package info:</div>
      <div class="d-flex">
        <div>Total Package:</div>
        <div>Incomplete: </div>
        <div>Canceled: </div>
        <div>Complete: </div>
      </div>
      <div>Payment Status:</div>
    </div>
    <div class="table">
      <el-table :data="data.invoice">
        <el-table-column prop="id" label="Package ID" width="180" />
        <el-table-column prop="customer_name" label="Customer name" width="180" />
        <el-table-column prop="customer_phone" label="Phone" width="180" />
        <el-table-column prop="total" label="Price" width="180" />
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
