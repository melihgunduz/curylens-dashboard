import { defineStore } from 'pinia';
import { computed, ref } from 'vue';


export const useAppStore = defineStore('appStore', () => {

  const theme = ref<string>('light');
  const getTheme = computed(() => theme.value);

  function changeTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  }


  return { theme, getTheme, changeTheme };
});
