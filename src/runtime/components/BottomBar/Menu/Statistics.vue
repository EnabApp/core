<template>
    <div m="y-13px sm:y-14px xl:y-16px" un-text="white">
        <span un-text="primaryOp dark:primary sm sm:base">إحصائيات</span>
    </div>
    <!-- Row -->
    <div flex="~">
        <!-- Points -->
        <div cursor="pointer" bg="primary hover:secondary dark:primaryOp dark:hover:secondaryOp" un-text="primaryOp dark:primary" p="x-5px y-2.5px sm:x-10px sm:y-5px" h="32px sm:48px xl:64px" w="155px" flex="~" border="rounded-5px" items="center" justify="start">
            <!-- Icon -->
            <div w="26px sm:36px xl:52px" h="26px sm:36px xl:52px" m="r-5px l-9px sm:r-10px sm:l-18px" class="i-carbon-condition-wait-point"></div>
            <!-- Title -->
            <div flex="~ col">
                <span font="bold" un-text="xs sm:sm xl:base">23,400</span>
                <span un-text="xs">نقطة</span>
            </div>
        </div>

        <!-- Users -->
        <div cursor="pointer" bg="primary hover:secondary dark:primaryOp dark:hover:secondaryOp" un-text="primaryOp dark:primary" p="x-5px y-2.5px sm:x-10px sm:y-5px" h="32px sm:48px xl:64px" w="155px" flex="~" border="rounded-5px" items="center" justify="start">
            <!-- Icon -->
            <div w="26px sm:36px xl:52px" h="26px sm:36px xl:52px" m="r-5px l-9px sm:r-10px sm:l-18px" class="i-carbon-user-avatar-filled"></div>
            <!-- Title -->
            <div flex="~ col">
                <span font="bold" un-text="xs sm:sm xl:base">12</span>
                <span un-text="xs">مستخدماً</span>
            </div>
        </div>

        <!-- Businesses -->
        <div cursor="pointer" bg="primary hover:secondary dark:primaryOp dark:hover:secondaryOp" un-text="primaryOp dark:primary" p="x-5px y-2.5px sm:x-10px sm:y-5px" h="32px sm:48px xl:64px" w="155px" flex="~" border="rounded-5px" items="center" justify="start">
            <!-- Icon -->
            <div w="26px sm:36px xl:52px" h="26px sm:36px xl:52px" m="r-5px l-9px sm:r-10px sm:l-18px" class="i-ic-sharp-group-work"></div>
            <!-- Title -->
            <div flex="~ col">
                <span font="bold" un-text="xs sm:sm xl:base">3</span>
                <span un-text="xs">أعمال</span>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>