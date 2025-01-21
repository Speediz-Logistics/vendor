<script setup>
import { computed } from "vue";
import router from "@/router";

// Define props
const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  history: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// Flatten the invoices array
const flattenedInvoices = computed(() => {
  if (!props.data.invoice) return [];
  return props.data.invoice.map((invoice) => ({
    ...invoice,
    customer_name: `${invoice.customer.first_name} ${invoice.customer.last_name}`,
    customer_phone: invoice.customer.phone,
    package_zone: invoice.package.zone,
    status: invoice.status,
    number: invoice.number,
    total: invoice.total,
    package_id: invoice.package.id,
  }));
});

// Handle View Action
const handleView = (row) => {
  if (!row.id) return;
  console.log("Viewing invoice:", row.id);
  router.push({ name: "invoice-detail", params: { id: row.id } });
};
</script>

<template>
  <div class="invoice-container">
    <div class="invoice-info d-flex flex-column gap-3">
      <div>Package info:</div>
      <div class="d-flex gap-5">
        <div>Total: {{ data.package_summary?.total }}</div>
        <div>Pending: {{ data.package_summary?.pending }}</div>
        <div>Canceled: {{ data.package_summary?.cancelled }}</div>
        <div>Complete: {{ data.package_summary?.completed }}</div>
      </div>
      <div>Payment Status: {{ data.package_summary?.payment_status || "N/A" }}</div>
    </div>

    <div class="table">
      <el-table :data="flattenedInvoices">
        <el-table-column prop="package_id" label="Package ID" width="180" />
        <el-table-column label="Customer Name" width="180" prop="customer_name" />
        <el-table-column label="Phone" width="180" prop="customer_phone" />
        <el-table-column label="Price" width="180" prop="total" />
        <el-table-column label="Location" width="180" prop="package_zone" />
        <el-table-column label="Status" prop="status" />
        <el-table-column label="Number" width="180" prop="number" />

        <el-table-column v-if="history" label="Action" width="180">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="handleView(row)">View</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.invoice-container {
  font-family: Inter, sans-serif;
  padding: 1.5em;
  width: 1500px;
  border-radius: 10px;
  border: 1px solid #FFBD59;
}

.invoice-info {
  font-size: 1.2em;
}

.table {
  padding-top: 0.5em;
}
</style>
