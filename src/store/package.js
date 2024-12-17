import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import PackageService from "@/services/PackageService.js";

export const usePackageStore = defineStore('package', () => {
  const data = ref([]);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(15);
  const packageDetail = ref(null);

  const all = async (params) => {
    const response = await PackageService.index(params);
    data.value = response?.data?.packages || []; // Store fetched data in state
    total.value = response?.data?.total || 0; // Set total count from API response
    currentPage.value = response?.data?.current_page || 1; // Set current page from API response
    return response;
  };

  const showProductDetail = async (id) => {
      const response = await PackageService.showPackageDetail(id);
      packageDetail.value = response.data;
      packageDetail.value = response || {};
  };


  return {
    all,
    showProductDetail,
    data: computed(() => data.value),
    total: computed(() => total.value),
    currentPage: computed(() => currentPage.value),
    pageSize: computed(() => pageSize.value),
    packageDetail: computed(() => packageDetail.value),
    setTotal(newTotal) {
      total.value = newTotal;
    },
    setCurrentPage(newPage) {
      currentPage.value = newPage;
    },
    setPageSize(newSize) {
      pageSize.value = newSize;
    },
  };
});
