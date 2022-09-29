<template>
    <div w="98%" animate-pulse>
        <div transition="~ duration-200 ease-in-out" p="2%" rounded="10px" flex="~ gap-3" items="center" h="60px">

            <div relative="~">
                <div bg="secondary dark:secondaryOp" w="48px" h="48px" rounded="full"></div>

                <div w="10px" h="10px" right="34px" bottom="2px" position="absolute" border="rounded-full primary dark:primaryOp 3" bg="secondary dark:secondaryOp"></div>
            </div>

            <div flex="~ col gap-2" :class="{
              'w-90%': twoXl || md,
              'w-70%': xl || lg || sm,
              'w-100%': xs || twoXs,
            }">
                <div flex="~" items="center" justify="between">

                    <!--  User Name  -->
                    <span bg="secondary dark:secondaryOp" w="30%" truncate="~" h="25px" rounded="lg"></span>

                    <!--  Last Message   -->
                    <div bg="secondary dark:secondaryOp" w="60px" h="16px" rounded="lg"></div>
                </div>

                <!--  User Last Message Here!   -->
                <span w="70%" bg="secondary dark:secondaryOp" h="20px" rounded="lg"></span>
            </div>
        </div>

        <!--  Divider  -->
        <div h="0.5px" w="full" bg="secondary dark:secondaryOp" m="y-5px"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    BreakpointWindow: {
        type: Object,
    },
});

const { size, twoXs, xs, sm, md, lg, xl, twoXl } = props.BreakpointWindow;

</script>
