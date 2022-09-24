<template>
<!--
  <button @click="support.fetchUnSolvedConversations()">المحادثات الغير محلوله </button>
  <button @click="support.fetchSolvedConversations()">المحادثات المحلوله </button>
  <button @click="support.fetchProfile('ffd321ff-c21b-4d52-aa89-4bef48308369')">بروفايل </button>
  <button @click="support.closeConversation('62500f2e-b625-44ba-bf80-4e4133055cf1')">اغلاق المحادثة </button>
  <button @click="support.setAssistant('f14c4d98-3104-431e-bc53-baa272e40e37')">اختيار المساعد </button>
  <button @click="support.fetchMessages('a30245bb-e2ba-4102-9691-0629ae9671e4')">الرسايل </button> -->

  <button @click="support.fetchUnSolvedConversations()">المحادثات الغير محلوله </button>
  <button @click="support.startConversation('hi', 1)"> بدء المحادثة </button>

  <div>
    {{support.getUnSolvedConversations}}
  </div>

</template>

<script setup>
import { useSupport } from '#imports'
const support = useSupport()
//console.log(support.getUnSolvedConversations)
// console.log(support.getSolvedConversations)
// console.log(support.getProfile)
// console.log(support.getMessages)

</script>
