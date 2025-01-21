import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import InvoiceService from "@/services/InvoiceService.js";

export const useInvoiceStore = defineStore('invoice', () => {
  const invoice = ref([]);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(15);
  const listPackage = ref([]);

  const all = async (params) => {
    const response = await InvoiceService.index(params);
    invoice.value = response?.data || []; // Store fetched data in state
    currentPage.value = response?.data?.current_page || 1; // Set current page from API response
    return response;
  };

  const show = async (id) => {
    const response = await InvoiceService.show(id);
    listPackage.value = response?.data || {};
    return response;
  };


  return {
    all,
    show,
    invoice: computed(() => invoice.value),
    total: computed(() => total.value),
    currentPage: computed(() => currentPage.value),
    pageSize: computed(() => pageSize.value),
    listPackage: computed(() => listPackage.value),
  };
});
