<script lang="ts" setup>
import HeaderComponent from 'components/HeaderComponent.vue';
import { useQuasar } from 'quasar';
import RightDrawer from 'components/RightDrawer.vue';


const $q = useQuasar();


</script>

<template>
  <q-layout :view="$q.screen.gt.sm ? 'hHh lpr fff' : 'hHh lpr ffr'">
    <HeaderComponent />
    <RightDrawer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

