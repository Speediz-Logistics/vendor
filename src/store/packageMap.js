import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import PackageMapService from "@/services/PackageMapService.js";

export const usePackageMapStore = defineStore('package_map', () => {
  const packageDetail = ref([]);

  const show = async (id) => {
      const response = await PackageMapService.show(id);
      packageDetail.value = response?.data;
      packageDetail.value = response || {};
      return response;
  };

  return {
    show,
    packageDetail: computed(() => packageDetail.value),
  };
});

