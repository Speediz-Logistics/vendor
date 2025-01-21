<script setup>
import {useRouter} from "vue-router";
import {useInvoiceStore} from "@/store/invoice.js";
import {onMounted} from "vue";

const router = useRouter();
const invoiceStore = useInvoiceStore();
const tableData = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const date = ref(null);
const dailyInvoice = () => {
  router.push({name: 'daily-invoice'});
}
const invoiceDetail = (id) => {
  router.push({
    name: 'invoice-detail',
    params: { id: id }
  });
};

const backHome = () => {
  router.push({name: 'onboard-Screen'});
}
const fetchInvoice = async () => {
  const params = {
    page: currentPage.value,
    date: date.value ? date.value: null,
  };
  try{
    const response = await invoiceStore.all(params);
    tableData.value = response.data?.data || [];
    totalPages.value = response.data?.pagination?.last_page || 0;
  } catch(error){
    console.log('Error show package data',error);
  }
}

const handleDateChange = (selectedDate) => {
  date.value = selectedDate;
  fetchInvoice(date);

const handlePageChange = (page) => {
  currentPage.value = page;
}
  fetchInvoice();
}

onMounted(() => {
  fetchInvoice();
})
</script>

<template>
  <div class="d-flex flex-row">
    <div class="sidebar">
      <h1 class="text-white fw-bold">Invoice Management</h1>
      <div class="content text-white fw-bold " @click="dailyInvoice()">
        Daily Invoice
      </div>
      <div class="content text-white fw-bold border rounded bg-dark">
        History Invoice
      </div>
      <button @click="backHome">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Back Home
      </button>
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
          @change="handleDateChange"
        />
      </div>
      <div class="table">
        <el-table :data="tableData">
          <el-table-column prop="invoice_number" label="Invoice No." width="180" />
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="total" label="Total" width="180" />
          <el-table-column prop="status" label="Status" width="380" />
          <el-table-column>
            <template #default="scope">
            <font-awesome-icon :icon="['fas', 'eye']" @click="invoiceDetail(scope.row.id)" class="cursor-pointer"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          layout="prev, pager, next"
          :total="totalPages"
          :current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>
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
  font-family: Inter, sans-serif;
  padding: 1.5em;
  width: 1500px;
  h1{
    font-family: Inter, sans-serif;
    font-size: 2em;
    padding-bottom: 1em;

  }
  .table{
    padding-top: 0.5em;
  }
}
</style>
