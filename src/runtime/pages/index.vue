<template>
  <Transition name="desktop-loading">
    <NuxtLayout v-if="loading">
      <LoadingDesktop />
    </NuxtLayout>
    <NuxtLayout v-else name="desktop">
      <div @click="appManager.setFocus('')" flex="~" w="full" h="full" items="start" justify="between">
        <!-- Desktop Applications & Icons -->
        <div min-w="1/4" grid="~ cols-2 sm:cols-3 md:cols-4 auto-rows-min" m="70px">
          <IconLoading v-if="appManager.getApps.length <= 0" h="64px" w="64px" />
          <div v-for="component in appManager.getOwned" :key="'app-' + component.id">
            <UiDesktopIcon :app="component" />

            <!-- <Teleport to="#openedwindows"> -->
            <!-- Application -->

            <!-- Application Sub Applications -->
            <!-- <div v-for="subComponent in component?.subApps" :key="component.id + '-sub-' + subComponent.id">
                  <component :app="subComponent" :is="`${component.name}Apps${subComponent.name}`"></component>
                </div> -->
            <!-- </Teleport> -->

            <!-- Application Widget -->
            <!-- <Teleport to='#widgets'> -->
            <!-- <TransitionGroup>
                  <component v-for="widget in component?.widgets" :key="'widget-' + widget.id" :widget="widget" :is="`${component.name}Widgets${widget.name}`"></component>
                </TransitionGroup> -->
            <!-- </Teleport> -->
          </div>
        </div>


        <div position="absolute" v-for="component in appManager.getRunningApps" :key="'app-' + component.id">
          <Transition>
            <UiDesktopWindow v-if="component.running" v-show="!component.minimized && component.booting === false" :app="component" :key="'app-component-transition-' + component.id">

              <Suspense>
                <component :app="component" :is="`${component.name}Main`"></component>
                <template #fallback>
                  <div w="full" h="full" un-text="primaryOp dark:primary" items="center" justify="center" flex="~ col">
                    <IconLoading h="25" w="25" />
                    <span>???????? ?????????? ?????????????? ???? ???????? ??????</span>
                  </div>
                </template>
              </Suspense>
            </UiDesktopWindow>
          </Transition>
        </div>



        <!-- Desktop Widgets -->
        <!-- <div min-w="1/4" @click="appManager.setFocus('')" flex="~" h="h-minus-bottombar" items="center" justify="center">
          <div w="full" overflow-y="scroll" h="minus-bottombar">
            <div id="widgets" p="y-4" flex="~ col gap-2"></div>
          </div>
        </div> -->
      </div>
    </NuxtLayout>
  </Transition>
</template>

<script setup>
import { useAppManager } from '../composables/useAppManager';
import { useUserProfile } from '../composables/useUserProfile';
import { useNotifications } from '../composables/useNotifications';
import { auth } from '../middleware/auth'
import { useSupabaseClient, onMounted, ref } from '#imports'
import { useUser } from '../composables/states'
import { defineAsyncComponent } from 'vue'


definePageMeta({
  title: "Home",
  middleware: auth
});

const loading = ref(true)

const appManager = useAppManager();
const userProfile = useUserProfile();


const user = useUser()
const notifications = useNotifications()



onMounted( async () => {
  await appManager.fetch()
  await userProfile.fetch()
  notifications.join()
  if (import.meta.env.VITE_ENV)
    setTimeout(() => {
      loading.value = false
    }, 3000)
  else
    loading.value = false

})

window.onbeforeunload = function() { window.history.forward(1); };

</script>


<style scoped>
/* CLOSE TRANSITION */
.v-enter-active {
  animation: bounce-in 0.3s;
}

.v-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.desktop-loading-enter-active,
.desktop-loading-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.desktop-loading-enter-from,
.desktop-loading-leave-to {
  opacity: 0;
}

</style>
