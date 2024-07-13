import { defineStore } from 'pinia';
import { computed, ref } from 'vue';


export const useAppStore = defineStore('appStore', () => {


  const rightDrawerOpen = ref<boolean>(false);
  const getRightDrawerOpen = computed<boolean>(() => rightDrawerOpen.value);

  function changeRightDrawerOpen() {
    rightDrawerOpen.value = !rightDrawerOpen.value;
  }

  const dataLoading = ref<boolean>(false);
  const getDataLoading = computed(() => dataLoading.value);

  function setDataLoading(value: boolean) {
    dataLoading.value = value;
  }


  return { getRightDrawerOpen, getDataLoading, changeRightDrawerOpen, setDataLoading };
});
