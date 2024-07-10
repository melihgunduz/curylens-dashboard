import { defineStore } from 'pinia';
import { computed, ref } from 'vue';


export const useAppStore = defineStore('appStore', () => {


  const rightDrawerOpen = ref<boolean>(false);
  const getRightDrawerOpen = computed<boolean>(() => rightDrawerOpen.value);

  function changeRightDrawerOpen() {
    rightDrawerOpen.value = !rightDrawerOpen.value;
  }


  return { getRightDrawerOpen, changeRightDrawerOpen };
});
