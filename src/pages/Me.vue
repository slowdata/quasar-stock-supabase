<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Hello {{ user.user_metadata.name }}</p>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent } from 'vue';

import useAuthUser from 'src/composables/UseAuthUser'

defineComponent({
  name: 'PageMe'
})

const { user } = useAuthUser();


</script>
