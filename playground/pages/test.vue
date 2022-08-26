<template>
<button @click="logout()">
logout
</button>

</template>

<script setup>
const userProfile = useUserProfile();
 const logout = () => 
  userProfile.logout()
</script>