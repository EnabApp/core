<template>
  <div flex="~ col gap-42px">
    <div flex="~ col gap-42px" justify="center" items="center">
      <!-- //====== User Picture/Name =======// -->
      <div flex="~ col gap-15px" p="t-20px" items="center">
        <img
          src="https://d1oqwsnd25kjn6.cloudfront.net/production/curio_primary_images/12566/original/Feb._25_2018-SteveJobs.jpg?1518809726"
          w="90px"
          h="90px"
          rounded="full"
        />
        <span text="24px primaryOp dark:primary">ستيف جوبز</span>
      </div>

      <!-- //====== User Stuff =======// -->
      <div flex="~ col gap-8px" w="74%">
        <!-- //====== User Email =======// -->
        <div flex="~" items="center" justify="between">
          <span truncate="~" text="primaryOp dark:primary"
            >gruceing@gmail.com</span
          >
          <IconEmail text="primaryOp dark:primary" w="18px" h="18px" />
        </div>

        <div flex="~" items="center" justify="between">
          <!-- //====== User Phone Number =======// -->
          <span truncate="~" text="primaryOp dark:primary">07730281556</span>
          <IconPhone text="primaryOp dark:primary" w="18px" h="18px" />
        </div>

        <div flex="~" items="center" justify="between">
          <!-- //====== User Business Title =======// -->
          <span truncate="~" text="primaryOp dark:primary">خل يولن</span>
          <IconBusiness text="primaryOp dark:primary" w="18px" h="18px" />
        </div>

        <div flex="~" items="center" justify="between">
          <!-- //====== User Points =======// -->
          <span truncate="~" text="primaryOp dark:primary">5,584</span>
          <IconPoints text="primaryOp dark:primary" w="18px" h="18px" />
        </div>
      </div>
    </div>

    <div flex="~ col gap-5px">
      <span text="right 16px primaryOp dark:primary">تطبيقات المستخدم</span>

      <!-- //====== Component =======// -->
      <div flex="~ col gap-4px">
        <div
          flex="~"
          items="center"
          text="primary"
          w="full"
          h="33px"
          bg="secondaryOp"
          rounded="5px"
        >
          <IconEmail w="18px" h="18px" p="x-2" />
          <span>الحاسبة</span>
        </div>
      </div>
    </div>
  </div>
</template>
