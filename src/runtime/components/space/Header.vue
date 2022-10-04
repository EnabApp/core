<template>
    <div flex="~" justify="between">
        <!-- Right Titles -->
        <div flex="~" text="2xl medium">
            <!-- Icon -->
            <div flex="~" ml="2" items="center" justify="center" text="hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">
                <IconBoards w="8" />
            </div>
            

            <!-- Business Title -->
            <span text="hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">مطعم ستيف الحزين </span>
            
            <!-- Space Title -->
            <IconArrowLeft w="8" />
            <span text="hover:primaryOp dark:hover:primary" cursor="pointer" p="2" rounded="2xl" bg="hover:secondary dark:hover:secondaryOp">الكاشير حسوني</span>
            
            <!-- Board Title -->
            <IconArrowLeft text="primaryOp dark:primary" w="8" />
            
            <span p="2" text="primaryOp dark:primary">قائمة الأكل</span>
        </div>

        <!-- Left Actions -->
        <div flex="~ gap-3" items="center">
            <div flex="~" items="center" justify="center" w="10" h="10" rounded="full" bg="secondary dark:secondaryOp" cursor="pointer">
                <IconNotification text="primaryOp dark:primary" w="5" h="5" />
            </div>
            <IconUser w="10" cursor="pointer" />
        </div>
    </div>
</template>

<script setup>

</script>