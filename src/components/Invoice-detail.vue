<script setup>
import { computed } from "vue";
import router from "@/router";
// Define props
const props = defineProps({
  data: {
    type: Object,
    required: false, // Allow optional prop
    default: () => ({}),
  },
  history: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// Flatten the invoices array to create a new row for each invoice
const flattenedInvoices = computed(() => {
  const invoices = [];
  props.data.vendor_invoices?.data.forEach((invoiceData) => {
    invoiceData.invoice.forEach((invoice) => {
      invoices.push({
        ...invoiceData,
        ...invoice,
        customer_name: `${invoice.customer.first_name} ${invoice.customer.last_name}`,
        customer_phone: invoice.customer.phone,
        package_zone: invoice.package.zone,
        status: invoice.status,
        number: invoice.number,
        total: invoice.total,
      });
    });
  });
  return invoices;
});

const handleView = (row) => {
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
        <!-- Package ID -->
        <el-table-column prop="id" label="Package ID" width="180"/>

        <!-- Customer Name -->
        <el-table-column label="Customer Name" width="180" prop="customer_name"/>

        <!-- Customer Phone -->
        <el-table-column label="Phone" width="180" prop="customer_phone"/>

        <!-- Price -->
        <el-table-column label="Price" width="180" prop="total"/>

        <!-- Location -->
        <el-table-column label="Location" width="180" prop="package_zone"/>

        <!-- Status -->
        <el-table-column label="Status" prop="status"/>

        <!-- Number -->
        <el-table-column label="Number" width="180" prop="number"/>

        <!-- Total -->
        <el-table-column label="Total" width="180" prop="total"/>

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
