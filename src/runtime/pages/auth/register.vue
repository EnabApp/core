<template>
  <div class="bg-default" h="screen" w="screen" flex="~ col" items="center" justify="center">
    <div w="content" h="content" p="50px" border="rounded-10px" bg="primary dark:primaryOp" flex="~ col gap-45px"
      items="center">
      <div>
        <IconEnab text="primary" w="128px sm:64px md:96px" h="128px sm:64px md:96px" />
      </div>
      <div flex="~ col gap-30px" justify="center" items="center">
        <div flex="~ gap-35px">
          <!-- Name -->
          <UiInput v-model="input.name" w="270px" placeholder="الأسم الثلاثي" type="text" icon="IconProfile" />

          <!-- Phone Number -->
          <UiInput v-model="input.number" w="270px" placeholder="رقم الهاتف" type="text" icon="IconPhone" />
        </div>

        <div flex="~ gap-35px">
          <!-- Email -->
          <UiInput v-model="input.email" w="270px" placeholder="البريد الإلكتروني" type="email" icon="IconEmail" />

          <!-- Password -->
          <UiInput v-model="input.password" w="270px" placeholder="كلمة المرور" type="password" icon="IconLock" />
        </div>

        <!-- Submit -->
        <UiButton @click="register()">
          <div flex="~ gap-15px" justify="center" text="primary dark:primaryOp" items="center">
            <span>انشاء الحساب</span>
            <IconRegister w="20px" />
          </div>
        </UiButton>
      </div>
    </div>

    <div flex="~ gap-50px" h="48px" w="xs md:2xl lg:3xl" border="rounded-10px" m="10" justify="center" items="center"
      bg="primary dark:primaryOp opacity-50 dark:opacity-50" un-text="primaryOp dark:primary xs md:sm lg:sm xl:md">
      <span cursor="pointer">هل تحتاج المساعدة؟</span>
      <nuxt-link to="/auth/login">
        <span text="primaryOp dark:primary" underline="~" duration="200" decoration="blue-500 hover:red"
          cursor="pointer">تمتلك حساب؟</span>
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
  name: "",
  email: "",
  number: "",
  password: "",
});

async function register() {
  const { data } = await useFetch(() => `api/auth/register`, {
    method: "POST",
    body: {
      email: input.email,
      password: input.password,
      name: input.name,
      number: input.number,
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
