<script lang="ts" setup>
import HeaderComponent from 'components/HeaderComponent.vue';
import SearchAccount from 'components/SearchAccount.vue';
</script>

<template>
  <q-layout view="hHh lpr fff">
    <HeaderComponent />
    <q-page-container>
      <search-account />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

