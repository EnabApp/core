<template>
    <div flex="~ col gap-8px" items="center" justify="center" h="292px" m="t-32px">
        <!-- <UiInput w="276px" placeholder="الأسم الثلاثي" /> -->
        <div flex="~ col gap-8px" w="276px">
            <button @click="googleLogin()" cursor="pointer" position="relative" un-text="xl primary dark:primaryOp" border="rounded-5px" p="14px" bg="primaryOp dark:primary">
                Google
                <div position="absolute" top="16px" left="24px" w="22px" h="22px" un-text="primary dark:primaryOp">
                <iconGoogle v-if="!loading.google" />
                <iconLoading v-else />
                </div>
            </button>
            <!-- <button cursor="pointer" position="relative" un-text="xl" border="rounded-5px" p="14px" bg="primaryOp dark:primary">
                Facebook
                <div position="absolute" top="16px" left="24px" w="22px" h="22px" un-text="primary dark:primaryOp" class="i-brandico-facebook"></div>
            </button> -->
        </div>
    </div>
</template>

<script setup>
import { useSupabaseClient, reactive } from '#imports'

const supabase = useSupabaseClient()
const loading = reactive({
    google: false,
})


const googleLogin = async () => {
    loading.google = true
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: import.meta.env.VITE_ENV ? 'https://development.enab.app' : ( import.meta.env.VITE_PRODUCTION ? 'https://enab.app' : 'http://localhost:3000' ),
        }
    })
}


</script>