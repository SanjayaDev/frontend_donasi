<template>
  <div class="mt-20">
    <div v-if="sliders.length > 0">
      <vueper-slides slide-image-inside autoplay>
        <template v-slot:arrow-left>
          <i class="icon icon-arrow-left" />
        </template>
          <vueper-slide v-for="(slider, i) in sliders" :key="i" :image="slider.image" />
        <template v-slot:arrow-right>
          <i class="icon icon-arrow-right" />
        </template>
      </vueper-slides>
    </div>
    <div v-else>
      <ContentLoader />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css'

const store = useStore();

onMounted(() => {
  store.dispatch("slider/getSlider")
});

const sliders = computed(() => {
  return store.state.slider.sliders
});

// export default {
//   components: {
//     ContentLoader,
//     VueperSlide,
//     VueperSlides
//   },

//   setup() {
//     const store = useStore();

//     onMounted(() => {
//       store.dispatch("slider/getSlider")
//     });

//     const slider = computed(() => {
//       return store.state.slider.sliders
//     });

//     return {
//       slider;
//     }
//   }
// }
</script>

<style scoped>
.vueperslide__image {
  transform: scale(1.5) rotate(-10deg);
}

.vueperslide__title {
  font-size: 7em;
  opacity: 0.7;
}
</style>