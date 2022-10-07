<template>
  <div class="bg-default" h="screen" w="screen" flex="~ col" items="center" justify="center">
    <div w="content" h="content" p="50px" border="rounded-10px" bg="primary dark:primaryOp"
      flex="~ col gap-45px" items="center">
      <div>
        <IconEnab text="primary"  w="128px sm:64px md:96px" h="128px sm:64px md:96px" />
      </div>
      <div flex="~ col gap-30px" justify="center" items="center">

        <div flex="~ col gap-25px">
          <!-- Email -->
          <UiInput v-model="input.email" w="270px" placeholder="البريد الإلكتروني" type="email" icon="IconEmail" />

          <!-- Password -->
          <UiInput v-model="input.password" w="270px" placeholder="كلمة المرور" type="password" icon="IconLock" />

          <!-- Submit -->
          <div v-if="input.email" class="delay-50 duration-200 animate-fade-in">
            <UiButton @click="login()">
              <div flex="~ gap-15px" justify="center" text="primary dark:primaryOp" items="center">
                <span>تسجل الدخول</span>
                <IconLogin w="20px" />
              </div>
            </UiButton>
          </div>
        </div>

        <!-- Divider -->
        <div flex="~" w="full" justify="center" items="center">
          <div w="33%" rounded="full" h="0.5px" bg="secondaryOp dark:secondary" />
          <span>او سجل مع</span>
          <div w="33%" rounded="full" h="0.5px" bg="secondaryOp dark:secondary" />
        </div>
        <div>
          <div flex="~ col gap-8px">

            <!-- Google Login -->
            <div bg="primaryOp dark:primary" hover="secondaryOp dark:bg-secondary" duration="200" rounded="5px"
              w="270px" h="50px" flex="~ gap-10px" justify="center" items="center" cursor="pointer">
              <span text="primary dark:primaryOp" font="semibold">Google</span>
              <IconGoogle w="20px" h="20px" text="primary dark:primaryOp" />
            </div>

            <!-- FaceBook Login -->
            <!-- <div
              bg="primaryOp dark:primary"
              rounded="5px"
              w="270px"
              h="50px"
              flex="~ gap-10px"
              justify="center"
              items="center"
              cursor="pointer"
            >
              <span text="primaryOp" font="semibold">FaceBook</span>
              <div w="20px" h="20px" bg="primary dark:primaryOp" />
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div flex="~ gap-50px" h="48px" w="xs md:2xl lg:3xl" border="rounded-10px" m="10" justify="center" items="center"
      bg="primary dark:primaryOp opacity-50 dark:opacity-50" un-text="primaryOp dark:primary xs md:sm lg:sm xl:md">
      <span cursor="pointer">هل تحتاج المساعدة؟</span>
      <span cursor="pointer">نسيت كلمة المرور؟</span>
      <nuxt-link to="/auth/register">
        <span text="primaryOp dark:primary" underline="~" duration="200" decoration="blue-500 hover:red"
          cursor="pointer">أليس لديك حساب؟</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Home",
  // middleware: auth
});

const input = reactive({
  email: "",
  password: "",
});

async function login() {
  const { data } = await useFetch(() => `api/auth/login`, {
    method: "POST",
    body: {
      email: input.email,
      password: input.password,
    },
  });
}
</script>

<style scoped>
.bg-default {
  background-image: url("https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
  /* background-image: url('imgs/bg.jpg'); */
  background-color: #999;

  /* background-size: cover; */
  background-size: cover;
  /* background-position: 100% 180%; */

  /* animation: lightMove 5s infinite; */
}
</style>
