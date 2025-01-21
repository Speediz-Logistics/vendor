<script setup>
import {ref, onMounted, computed} from "vue";
import { useRouter } from "vue-router";
import { useInvoiceStore } from "@/store/invoice.js";

const router = useRouter();
const invoiceStore = useInvoiceStore();
const { all } = invoiceStore;

const data = ref([]);
const invoices = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = ref(10);
const date = ref(null);
import { debounce } from "lodash";

const fetchInvoice = async () => {
  try {
    const params = {
      date: date.value,
    };
    const { data } = await all(params);
    invoices.value = data.vendor_invoices || [];
    console.log('response', invoices.value?.data)

  } catch (error) {
    console.error("Failed to fetch invoices", error);
  }
};
const debounceFetchInvoice = debounce(fetchInvoice, 300);

const invoiceDetail = (id) => {
  router.push({ name: "invoice-detail", params: { id } });
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchInvoice();
};

onMounted(() => {
  fetchInvoice();
});
</script>

<template>
  <div class="d-flex flex-row">
    <div class="sidebar">
      <h1 class="text-white fw-bold">Invoice Management</h1>
      <div class="content text-white fw-bold" @click="router.push({ name: 'daily-invoice' })">
        Daily Invoice
      </div>
      <div class="content text-white fw-bold border rounded bg-dark">
        History Invoice
      </div>
    </div>

    <div class="container">
      <h1 class="fw-bold">History Invoice</h1>

      <div class="date">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="Pick a Date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @update:modelValue="debounceFetchInvoice"
        />
      </div>

      <div class="table">
        <el-table :data="invoices.data?.flatMap(invoice => invoice.invoice)" border stripe>
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="vendor.business_name" label="Vendor" width="200">
            <template #default="{ row }">
              {{ row.vendor?.business_name || 'N/A' }}
            </template>
          </el-table-column>
          <el-table-column prop="number" label="Invoice No" width="150" />
          <el-table-column label="Customer" width="200">
            <template #default="{ row }">
              {{ row.customer?.first_name }} {{ row.customer?.last_name }}
            </template>
          </el-table-column>
          <el-table-column prop="customer.phone" label="Phone" width="150" />
          <el-table-column prop="package.zone" label="Zone" width="150">
            <template #default="{ row }">
              {{ row.package?.zone || 'N/A' }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" width="120" />
          <el-table-column prop="total" label="Total" width="150" />
          <el-table-column label="Action" width="150">
            <template #default="{ row }">
              <el-button type="primary" size="mini" @click="invoiceDetail(row.vendor_invoice_id)">
                View
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination
        layout="prev, pager, next"
        :total="totalPages"
        :page-size="perPage"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffbd59;
  width: 400px;
  height: 100vh;
  font-family: Inter, sans-serif;

  .content {
    font-size: 1.5em;
    text-align: left;
    padding: 0.5em;
    width: 12em;
    cursor: pointer;
  }

  h1 {
    text-align: center;
    font-size: 2em;
    padding-top: 0.3em;
    padding-bottom: 3em;
  }
}

.container {
  font-family: Inter, sans-serif;
  padding: 1.5em;
  width: 1500px;

  h1 {
    font-size: 2em;
    padding-bottom: 1em;
  }

  .table {
    padding-top: 0.5em;
  }
}
</style>
