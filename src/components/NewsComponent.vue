<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { newsRequest } from 'src/helpers/coinStatsFunctions';
import { NewsType } from 'src/helpers/newsType';
import { useQuasar } from 'quasar';

const news = ref<NewsType[]>([]);
const $q = useQuasar();

const slide = ref(0);

onMounted(async () => {
  await newsRequest().then(function(response) {
    console.log('value loaded');
    news.value = response.data.result;
  })
    .catch((error) => {
      $q.notify({
        message: 'An error occurred when trying to fetch news',
        color: 'negative',
        icon: 'mdi-alert-circle',
        position: 'bottom',

      });
      console.log('news component error message: ', error.message, 'error name: ', error.name);
    });
});

</script>

<template>
  <h3>News component</h3>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      animated
      arrows
      control-color="amber"
      height="400px"
      next-icon="mdi-arrow-right"
      prev-icon="mdi-arrow-left"
    >
      <q-carousel-slide v-for="(index, key) in news" :key="key" :img-src="index.imgUrl"
                        :name="key">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">{{ index.title }}</div>
        </div>
        <a :href="index.link" class="custom-link absolute-top text-body2 text-right text-white q-mr-md q-mt-md"
           target="_blank">
          <q-icon name="mdi-link" size="md" />
          {{ index.source }}
        </a>
      </q-carousel-slide>
    </q-carousel>
    <div class="row justify-center q-mt-xs">
      <q-btn-group>
        <q-btn v-for="(index, key) in news" :key="key" :color="slide === key ? 'amber' : 'grey-7'" :label="key+1"
               @click="(slide = key)" />
      </q-btn-group>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.custom-caption
  text-align: left
  font-family: 'Quicksand', sans-serif
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)

.custom-link
  background-color: #1D1D1D
  width: fit-content
  padding: 5px
</style>

