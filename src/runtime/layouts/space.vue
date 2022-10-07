<template>
    <div>
        {{businessId}}
        <br />
        {{spaceId}}
        <NuxtLink to="/1">Go to business</NuxtLink><br/>
        <NuxtLink to="/1/1">Go to space</NuxtLink>
    </div>
</template>
  
  
<script setup>
import { useRouter, useRoute, useHead } from '#imports'
import { ref, onMounted, reactive, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useSpace } from '../composables/useSpace'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useScreenOrientation } from '@vueuse/core'
const route = useRoute();
const spaceStore = useSpace();
const businessId = ref(route.params.businessId);
const spaceId = ref(route.params.spaceId);

/** 
 * CASES:
 * 1. [NO] PARAMS
 *    Get Business as space template.
 * 2. [BUSINESS ID] PARAM
 *    Get Spaces as space template.
 * 3. [BUSINESS ID][SPACE ID] PARAM 
 *    Get Space as original data units.
 */



/** [ FIRST - NO PARAMS ] **/
if (!businessId.value && !spaceId.value) {
    console.log('NO PARAMS');
    // spaceStore.getBusiness();
}


/** [ SECOND - BUSINESS ID PARAM ] **/
if (businessId.value && !spaceId.value) {
    console.log('BUSINESS ID PARAM');
    // spaceStore.getSpaces(businessId.value);
}


/** [ THIRD - BUSINESS ID & SPACE ID PARAM ] **/
if (businessId.value && spaceId.value) {
    console.log('BUSINESS ID & SPACE ID PARAM');
    // spaceStore.getSpace(businessId.value, spaceId.value);
}







</script>
  
<style>
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    border-radius: 1rem;

}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, .3);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, .5);
}
</style>
  
  