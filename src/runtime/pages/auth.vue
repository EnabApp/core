<template>
    <div class="bg-default" h="screen" w="screen" flex="~ col" items="center" justify="center">
        <div w="xs md:2xl lg:3xl" h="lg md:lg lg:md" border="rounded-t-10px" bg="primary dark:primaryOp" flex="~ col"
            items="center">
            <IconEnab text="info" m="t-50px" w="128px sm:64px md:96px" h="128px sm:64px md:96px" />

            <AuthLogin />

        </div>
        <div flex="~ gap-10px" justify="center" items="center" w="xs md:2xl lg:3xl" p="y-5" border="rounded-b-10px"
            bg="primary opacity-90 dark:primaryOp dark:opacity-90">
            <IconMeterialUpdates w="24px" pr="10 md:0" h="24px" un-text="warning"
                class="i-material-symbols-tips-and-updates-rounded" />
            <span pl="2 md:0" un-text="xs md:sm lg:sm xl:md primaryOp dark:primary">تستطيع مشاركة الملفات والتقارير
                والصور من خلال تطبيق ملفاتي</span>
        </div>

        <div flex="~ gap-50px" h="48px" w="xs md:2xl lg:3xl" border="rounded-10px" m="10" justify="center"
            items="center" bg="primary dark:primaryOp opacity-50 dark:opacity-50"
            un-text="primaryOp dark:primary xs md:sm lg:sm xl:md">
            <span cursor="pointer">هل تحتاج المساعدة؟</span>
            <span cursor="pointer">نسيت كلمة المرور؟</span>
        </div>
    </div>
</template>

<script setup>
import { guest } from '../middleware/guest'
import { useSupabaseUser, useUser, useRouter, watch } from '#imports'

definePageMeta({
    title: "Auth",
    middleware: guest
});

const user = useUser();
const router = useRouter();

user.value = useSupabaseUser()
watch (() => user.value, (u) => {
    if (u) router.push('/')
})
</script>

<style scoped>
.bg-default {
    background-image: url('https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
    /* background-image: url('imgs/bg.jpg'); */
    background-color: #999;

    /* background-size: cover; */
    background-size: cover;
    /* background-position: 100% 180%; */

    /* animation: lightMove 5s infinite; */
}
</style>